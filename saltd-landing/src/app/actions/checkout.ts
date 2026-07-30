'use server';

import { shopifyFetch, shopifyConfigured } from '@/lib/shopify';

/** A line the shopper wants to buy: a Shopify variant id + how many. */
export type CheckoutLine = { merchandiseId: string; quantity: number };

export type CheckoutResult = { url: string } | { error: string };

const CART_CREATE = /* GraphQL */ `
  mutation CartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart { checkoutUrl }
      userErrors { message }
    }
  }
`;

/**
 * Creates a Shopify cart from the given lines and returns its hosted checkout URL.
 * Payment, shipping, tax and order emails are all handled by Shopify — we never
 * touch card data. Called from the client, which then redirects to the URL.
 */
export async function createCheckoutUrl(lines: CheckoutLine[]): Promise<CheckoutResult> {
  if (!shopifyConfigured) {
    return { error: 'Checkout isn’t connected yet — add your Shopify store credentials to enable it.' };
  }

  // Guard against the offline sentinel ids (`local:*`) reaching a real store.
  const realLines = lines.filter((l) => l.merchandiseId && !l.merchandiseId.startsWith('local:'));
  if (realLines.length === 0) {
    return { error: 'Your cart has no Shopify-linked items to check out.' };
  }

  try {
    const data = await shopifyFetch<{
      cartCreate: {
        cart: { checkoutUrl: string } | null;
        userErrors: { message: string }[];
      };
    }>(CART_CREATE, { lines: realLines }, { revalidate: false });

    const { cart, userErrors } = data.cartCreate;
    if (userErrors.length) return { error: userErrors.map((e) => e.message).join('; ') };
    if (!cart?.checkoutUrl) return { error: 'Could not start checkout. Please try again.' };
    return { url: cart.checkoutUrl };
  } catch (err) {
    console.error('[shopify] cartCreate failed:', err);
    return { error: 'Could not reach checkout. Please try again.' };
  }
}
