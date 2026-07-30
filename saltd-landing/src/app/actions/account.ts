'use server';

import { cookies } from 'next/headers';
import { shopifyFetch, shopifyConfigured } from '@/lib/shopify';
import type { AuthResult, Customer, CustomerOrder } from '@/lib/account-types';

/**
 * Shopify customer accounts via the Storefront API. The customer access token is
 * kept in an httpOnly cookie (never exposed to JS), so sessions survive reloads
 * without putting the token in the client bundle. Passwords are sent straight to
 * Shopify over HTTPS and never stored by us.
 */
const COOKIE = 'saltd_customer_token';

async function setTokenCookie(accessToken: string, expiresAt: string) {
  const store = await cookies();
  const expires = new Date(expiresAt);
  store.set(COOKIE, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires,
  });
}

/* ---- mutations / queries ---- */
const TOKEN_CREATE = /* GraphQL */ `
  mutation Login($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken { accessToken expiresAt }
      customerUserErrors { message }
    }
  }
`;

const CUSTOMER_CREATE = /* GraphQL */ `
  mutation Register($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer { id }
      customerUserErrors { message }
    }
  }
`;

const CUSTOMER_QUERY = /* GraphQL */ `
  query Me($token: String!) {
    customer(customerAccessToken: $token) {
      firstName
      lastName
      email
      orders(first: 25, sortKey: PROCESSED_AT, reverse: true) {
        nodes {
          orderNumber
          processedAt
          financialStatus
          fulfillmentStatus
          currentTotalPrice { amount currencyCode }
          lineItems(first: 100) { nodes { quantity } }
        }
      }
    }
  }
`;

const money = (amount: string) => `₹${Math.round(Number(amount)).toLocaleString('en-IN')}`;

const notConfigured = { ok: false as const, error: 'Accounts aren’t connected yet.' };

/** Sign a customer in and start a session. */
export async function signInCustomer(email: string, password: string): Promise<AuthResult> {
  if (!shopifyConfigured) return notConfigured;
  try {
    const data = await shopifyFetch<{
      customerAccessTokenCreate: {
        customerAccessToken: { accessToken: string; expiresAt: string } | null;
        customerUserErrors: { message: string }[];
      };
    }>(TOKEN_CREATE, { input: { email, password } }, { revalidate: false });

    const { customerAccessToken, customerUserErrors } = data.customerAccessTokenCreate;
    if (!customerAccessToken) {
      return { ok: false, error: customerUserErrors[0]?.message || 'Incorrect email or password.' };
    }
    await setTokenCookie(customerAccessToken.accessToken, customerAccessToken.expiresAt);
    return { ok: true };
  } catch (err) {
    console.error('[account] signIn failed:', err);
    return { ok: false, error: 'Could not sign in right now. Please try again.' };
  }
}

/** Create an account, then sign in automatically. */
export async function registerCustomer(input: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}): Promise<AuthResult> {
  if (!shopifyConfigured) return notConfigured;
  try {
    const data = await shopifyFetch<{
      customerCreate: { customer: { id: string } | null; customerUserErrors: { message: string }[] };
    }>(CUSTOMER_CREATE, { input }, { revalidate: false });

    const { customer, customerUserErrors } = data.customerCreate;
    if (!customer) {
      return { ok: false, error: customerUserErrors[0]?.message || 'Could not create account.' };
    }
    // Log the new customer straight in.
    return signInCustomer(input.email, input.password);
  } catch (err) {
    console.error('[account] register failed:', err);
    return { ok: false, error: 'Could not create your account right now. Please try again.' };
  }
}

/** End the session. */
export async function signOutCustomer(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
}

/** The signed-in customer + their orders, or null if not signed in. */
export async function getCustomer(): Promise<Customer | null> {
  if (!shopifyConfigured) return null;
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;

  try {
    const data = await shopifyFetch<{
      customer: {
        firstName: string | null;
        lastName: string | null;
        email: string;
        orders: {
          nodes: {
            orderNumber: number;
            processedAt: string | null;
            financialStatus: string | null;
            fulfillmentStatus: string | null;
            currentTotalPrice: { amount: string };
            lineItems: { nodes: { quantity: number }[] };
          }[];
        };
      } | null;
    }>(CUSTOMER_QUERY, { token }, { revalidate: false });

    if (!data.customer) {
      // Token expired/invalid — clear it so the UI shows the login form.
      await signOutCustomer();
      return null;
    }

    const orders: CustomerOrder[] = data.customer.orders.nodes.map((o) => ({
      number: `#${o.orderNumber}`,
      processedAt: o.processedAt,
      financialStatus: o.financialStatus ?? 'PENDING',
      fulfillmentStatus: o.fulfillmentStatus ?? 'UNFULFILLED',
      total: money(o.currentTotalPrice.amount),
      itemCount: o.lineItems.nodes.reduce((n, l) => n + l.quantity, 0),
    }));

    return {
      firstName: data.customer.firstName,
      lastName: data.customer.lastName,
      email: data.customer.email,
      orders,
    };
  } catch (err) {
    console.error('[account] getCustomer failed:', err);
    return null;
  }
}
