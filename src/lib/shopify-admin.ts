/**
 * Server-side Shopify Admin API client — used only for guest order tracking
 * (looking up an order by number + email), which the Storefront API can't do.
 *
 * Requires a SEPARATE Admin API access token (`SHOPIFY_ADMIN_TOKEN`) from a custom
 * app with the `read_orders` scope. Keep it server-only; never expose it.
 */

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
const API_VERSION = process.env.SHOPIFY_API_VERSION || '2024-10';

/** True only when an Admin token is present, so order tracking degrades gracefully. */
export const adminConfigured = Boolean(DOMAIN && ADMIN_TOKEN);

export async function adminFetch<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  if (!adminConfigured) throw new AdminNotConfiguredError();

  const res = await fetch(`https://${DOMAIN}/admin/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': ADMIN_TOKEN as string,
    },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  });

  if (!res.ok) throw new Error(`Shopify Admin API ${res.status}: ${await res.text()}`);

  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (json.errors?.length) throw new Error(`Shopify Admin error: ${json.errors.map((e) => e.message).join('; ')}`);
  if (!json.data) throw new Error('Shopify Admin response had no data.');
  return json.data;
}

export class AdminNotConfiguredError extends Error {
  constructor() {
    super('Order tracking is not configured (missing SHOPIFY_ADMIN_TOKEN).');
    this.name = 'AdminNotConfiguredError';
  }
}
