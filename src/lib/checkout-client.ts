'use client';

import { createCheckoutUrl } from '@/app/actions/checkout';
import type { CartItem } from '@/store/cart';

/**
 * Kicks off Shopify's hosted checkout for the current cart: asks the server to
 * create a Shopify cart, then redirects the browser to the returned checkout URL.
 * Returns an error string if it couldn't start (e.g. store not configured yet).
 */
export async function startCheckout(items: CartItem[]): Promise<string | void> {
  if (items.length === 0) return 'Your cart is empty.';

  const result = await createCheckoutUrl(
    items.map((i) => ({ merchandiseId: i.variantId, quantity: i.quantity })),
  );

  if ('url' in result) {
    window.location.href = result.url; // → Shopify hosted, PCI-compliant checkout
    return;
  }
  return result.error;
}
