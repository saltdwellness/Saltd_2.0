/**
 * Minimal server-side Shopify Storefront API client.
 *
 * NOTE: import this only from server code (Server Components, Server Actions).
 * It reads server-only env vars and must never be pulled into a client bundle.
 *
 * We talk to the GraphQL endpoint with plain `fetch` (no SDK dependency) so the
 * Storefront token never leaves the server. Catalog reads are cached with Next's
 * ISR (`next.revalidate`) + a `products` tag for optional on-demand invalidation
 * from a Shopify webhook.
 */

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN;
const API_VERSION = process.env.SHOPIFY_API_VERSION || '2024-10';

/** True only when the store credentials are present. Everything else falls back
 *  to the bundled local catalogue, so the site builds and runs without Shopify. */
export const shopifyConfigured = Boolean(DOMAIN && TOKEN);

/** Seconds before cached product data is refreshed (add-a-product latency). */
export const PRODUCTS_REVALIDATE = 3600;

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

export type ShopifyFetchOptions = {
  /** ISR window in seconds. Omit for an uncached (dynamic) request — used at checkout. */
  revalidate?: number | false;
  /** Cache tags for on-demand `revalidateTag`. */
  tags?: string[];
};

export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {},
  { revalidate, tags }: ShopifyFetchOptions = {},
): Promise<T> {
  if (!shopifyConfigured) {
    throw new ShopifyNotConfiguredError();
  }

  const res = await fetch(`https://${DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN as string,
    },
    body: JSON.stringify({ query, variables }),
    // `no-store` (revalidate:false) for mutations; a positive number caches the read.
    ...(revalidate === false
      ? { cache: 'no-store' as const }
      : { next: { revalidate, tags } }),
  });

  if (!res.ok) {
    throw new Error(`Shopify Storefront API ${res.status}: ${await res.text()}`);
  }

  const json = (await res.json()) as GraphQLResponse<T>;
  if (json.errors?.length) {
    throw new Error(`Shopify GraphQL error: ${json.errors.map((e) => e.message).join('; ')}`);
  }
  if (!json.data) {
    throw new Error('Shopify GraphQL response had no data.');
  }
  return json.data;
}

/** Thrown when the store isn't wired up yet, so callers can fall back gracefully. */
export class ShopifyNotConfiguredError extends Error {
  constructor() {
    super('Shopify is not configured (missing SHOPIFY_STORE_DOMAIN / SHOPIFY_STOREFRONT_TOKEN).');
    this.name = 'ShopifyNotConfiguredError';
  }
}
