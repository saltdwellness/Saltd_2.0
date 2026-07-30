'use server';

import { adminFetch, adminConfigured } from '@/lib/shopify-admin';
import type { TrackResult } from '@/lib/account-types';

const ORDER_QUERY = /* GraphQL */ `
  query TrackOrder($q: String!) {
    orders(first: 1, query: $q) {
      nodes {
        name
        email
        processedAt
        displayFinancialStatus
        displayFulfillmentStatus
        subtotalPriceSet { shopMoney { amount } }
        totalShippingPriceSet { shopMoney { amount } }
        totalPriceSet { shopMoney { amount } }
        shippingAddress { name address1 address2 city province zip country }
        lineItems(first: 50) {
          nodes {
            title
            quantity
            variantTitle
            discountedTotalSet { shopMoney { amount } }
          }
        }
        fulfillments { trackingInfo { number url company } }
      }
    }
  }
`;

const money = (amount: string) => `₹${Math.round(Number(amount)).toLocaleString('en-IN')}`;

/**
 * Look up an order by its number + the email used to place it. Both must match —
 * we re-check the email on the returned order so a number alone can't reveal it.
 */
export async function trackOrder(orderId: string, email: string): Promise<TrackResult> {
  if (!adminConfigured) {
    return { ok: false, error: 'Order tracking isn’t connected yet. Sign in to see your orders instead.' };
  }

  const num = orderId.replace(/[^0-9]/g, '');
  const cleanEmail = email.trim().toLowerCase();
  if (!num || !cleanEmail) {
    return { ok: false, error: 'Enter both your order ID and the email you ordered with.' };
  }

  try {
    const data = await adminFetch<{
      orders: {
        nodes: {
          name: string;
          email: string | null;
          processedAt: string | null;
          displayFinancialStatus: string | null;
          displayFulfillmentStatus: string | null;
          subtotalPriceSet: { shopMoney: { amount: string } } | null;
          totalShippingPriceSet: { shopMoney: { amount: string } } | null;
          totalPriceSet: { shopMoney: { amount: string } };
          shippingAddress: {
            name: string | null; address1: string | null; address2: string | null;
            city: string | null; province: string | null; zip: string | null; country: string | null;
          } | null;
          lineItems: {
            nodes: {
              title: string;
              quantity: number;
              variantTitle: string | null;
              discountedTotalSet: { shopMoney: { amount: string } } | null;
            }[];
          };
          fulfillments: { trackingInfo: { number: string | null; url: string | null; company: string | null }[] }[];
        }[];
      };
    }>(ORDER_QUERY, { q: `name:${num} email:${cleanEmail}` });

    const order = data.orders.nodes[0];
    // Guard: number + email must both match this exact order.
    if (!order || order.email?.toLowerCase() !== cleanEmail) {
      return { ok: false, error: 'No order found with that ID and email.' };
    }

    return {
      ok: true,
      order: {
        number: order.name,
        processedAt: order.processedAt,
        financialStatus: order.displayFinancialStatus ?? 'PENDING',
        fulfillmentStatus: order.displayFulfillmentStatus ?? 'UNFULFILLED',
        subtotal: money(order.subtotalPriceSet?.shopMoney.amount ?? '0'),
        shipping: money(order.totalShippingPriceSet?.shopMoney.amount ?? '0'),
        total: money(order.totalPriceSet.shopMoney.amount),
        lineItems: order.lineItems.nodes.map((li) => ({
          title: li.title,
          variant: li.variantTitle && li.variantTitle !== 'Default Title' ? li.variantTitle : null,
          quantity: li.quantity,
          total: money(li.discountedTotalSet?.shopMoney.amount ?? '0'),
        })),
        shippingAddress: order.shippingAddress,
        tracking: order.fulfillments.flatMap((f) => f.trackingInfo),
      },
    };
  } catch (err) {
    console.error('[orders] trackOrder failed:', err);
    return { ok: false, error: 'Could not look up your order right now. Please try again.' };
  }
}
