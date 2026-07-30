/**
 * Shared product shape used across server (data layer) and client (UI) code.
 * Kept free of any server-only imports so client components can `import type` it.
 *
 * A `Product` is the merge of Shopify commerce data (price, variants, stock) with
 * the local presentation overlay in `flavours.ts` (3D stick, gallery, nutrition).
 */

/** One buyable option of a product — maps 1:1 to a Shopify variant. */
export type Pack = {
  size: number;        // stick count, parsed from the variant title (for ₹/serve math)
  label: string;       // e.g. "10 sticks"
  price: number;       // whole rupees
  variantId: string;   // Shopify variant GID — the id checkout buys. `local:*` when offline.
  available: boolean;   // Shopify availableForSale
  savePct?: number;    // computed discount vs the priciest-per-serve pack
};

export type Product = {
  slug: string;        // Shopify handle
  name: string;
  short: string;       // one-line hook
  desc: string;        // longer description
  accent: string;
  stick: string;       // tall floating stick image (carousel)
  image: string;       // lifestyle / cart thumbnail
  productShot: string; // main product photo (PDP hero)
  gallery: string[];   // PDP image gallery
  boxImage: string;    // box photo (shop card / recommendations)
  scaleAdj: number;    // normalises sticks whose PNG has extra padding
  rating: number;
  reviews: number;
  taste: string[];     // pill row
  pairsWith: string;
  packs: Pack[];       // buyable options, ascending by size
};

/** Cheapest pack — used for "From ₹…" and default selection. */
export function startingPack(product: Product): Pack {
  return product.packs.reduce((min, p) => (p.price < min.price ? p : min), product.packs[0]);
}
