import { shopifyFetch, shopifyConfigured, PRODUCTS_REVALIDATE } from './shopify';
import { FLAVOURS, PACKS, type Flavour } from './flavours';
import type { Product, Pack } from './product-types';

export type { Product, Pack } from './product-types';
export { startingPack } from './product-types';

/* ------------------------------------------------------------------ *
 * Presentation overlay
 * ------------------------------------------------------------------ *
 * Shopify owns the catalogue (which products exist, prices, stock). The local
 * FLAVOURS array owns the SALTD look — 3D stick, gallery, accent, nutrition —
 * which Shopify has no concept of. We look the overlay up by handle and fall
 * back to Shopify's own image/description for anything unmatched, so a brand
 * new product added in Shopify still renders (just with default styling).
 */
const overlayFor = (handle: string): Flavour | undefined =>
  FLAVOURS.find((f) => f.slug === handle);

/* ------------------------------------------------------------------ *
 * Shopify GraphQL
 * ------------------------------------------------------------------ */
const PRODUCTS_QUERY = /* GraphQL */ `
  query Products {
    products(first: 50, sortKey: CREATED_AT) {
      nodes {
        handle
        title
        description
        featuredImage { url }
        images(first: 12) { nodes { url } }
        variants(first: 20) {
          nodes {
            id
            title
            availableForSale
            price { amount }
            selectedOptions { name value }
          }
        }
      }
    }
  }
`;

type ShopifyVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: { amount: string };
  selectedOptions: { name: string; value: string }[];
};

type ShopifyProduct = {
  handle: string;
  title: string;
  description: string;
  featuredImage: { url: string } | null;
  images: { nodes: { url: string }[] };
  variants: { nodes: ShopifyVariant[] };
};

/** Pull the first integer out of a string ("30 sticks" → 30, "Pack of 10" → 10). */
function parseSize(...candidates: string[]): number | undefined {
  for (const c of candidates) {
    const m = c?.match(/\d+/);
    if (m) return Number(m[0]);
  }
  return undefined;
}

/** Turn Shopify variants into ascending packs with a computed save %. */
function packsFromVariants(variants: ShopifyVariant[]): Pack[] {
  const packs: Pack[] = variants.map((v, i) => {
    const optionValues = v.selectedOptions.map((o) => o.value);
    const size = parseSize(v.title, ...optionValues) ?? (i + 1) * 10;
    return {
      size,
      label: v.title && v.title !== 'Default Title' ? v.title : `${size} sticks`,
      price: Math.round(Number(v.price.amount)),
      variantId: v.id,
      available: v.availableForSale,
    };
  });

  packs.sort((a, b) => a.size - b.size);

  // Save % is relative to the most expensive per-serve pack (usually the smallest).
  const maxPerServe = Math.max(...packs.map((p) => p.price / p.size));
  for (const p of packs) {
    const pct = Math.round((1 - p.price / p.size / maxPerServe) * 100);
    if (pct > 0) p.savePct = pct;
  }
  return packs;
}

function mergeProduct(sp: ShopifyProduct): Product {
  const ov = overlayFor(sp.handle);
  const shopifyImages = sp.images.nodes.map((n) => n.url);
  const hero = ov?.productShot ?? sp.featuredImage?.url ?? shopifyImages[0] ?? '';

  return {
    slug: sp.handle,
    name: ov?.name ?? sp.title,
    short: ov?.short ?? sp.description.split('. ')[0] ?? sp.title,
    desc: ov?.desc ?? sp.description,
    accent: ov?.accent ?? '#2E5BFF',
    stick: ov?.stick ?? hero,
    image: ov?.image ?? hero,
    productShot: hero,
    gallery: ov?.gallery ?? (shopifyImages.length ? shopifyImages : [hero]),
    boxImage: ov?.boxImage ?? hero,
    scaleAdj: ov?.scaleAdj ?? 1,
    rating: ov?.rating ?? 4.8,
    reviews: ov?.reviews ?? 0,
    taste: ov?.taste ?? [],
    pairsWith: ov?.pairsWith ?? '',
    packs: packsFromVariants(sp.variants.nodes),
  };
}

/* ------------------------------------------------------------------ *
 * Local fallback (no Shopify configured / fetch failed)
 * ------------------------------------------------------------------ *
 * Reproduces today's behaviour exactly: the bundled flavours + the two hardcoded
 * pack sizes, with sentinel `local:` variant ids so checkout can tell it isn't
 * connected to a real store yet.
 */
function localProducts(): Product[] {
  return FLAVOURS.map((f) => {
    const maxPerServe = Math.max(...PACKS.map((p) => p.price / p.size));
    const packs: Pack[] = PACKS.map((p) => {
      const pct = Math.round((1 - p.price / p.size / maxPerServe) * 100);
      return {
        size: p.size,
        label: `${p.size} sticks`,
        price: p.price,
        variantId: `local:${f.slug}-${p.size}`,
        available: true,
        ...(p.savePct ? { savePct: p.savePct } : pct > 0 ? { savePct: pct } : {}),
      };
    });
    return { ...f, packs };
  });
}

/* ------------------------------------------------------------------ *
 * Public API — call from Server Components / Server Actions only.
 * ------------------------------------------------------------------ */

/** All products. Shopify-backed & ISR-cached when configured, else local fallback. */
export async function getProducts(): Promise<Product[]> {
  if (!shopifyConfigured) return localProducts();
  try {
    const data = await shopifyFetch<{ products: { nodes: ShopifyProduct[] } }>(
      PRODUCTS_QUERY,
      {},
      { revalidate: PRODUCTS_REVALIDATE, tags: ['products'] },
    );
    const products = data.products.nodes
      .filter((p) => p.variants.nodes.length > 0)
      .map(mergeProduct);
    // If the store is reachable but empty, don't render a blank shop — show local.
    return products.length ? products : localProducts();
  } catch (err) {
    console.error('[shopify] product fetch failed, using local catalogue:', err);
    return localProducts();
  }
}

/** A single product by handle/slug, or undefined if not found. */
export async function getProduct(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug);
}
