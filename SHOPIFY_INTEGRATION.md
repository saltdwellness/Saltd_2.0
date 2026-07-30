# SALTD × Shopify integration guide

Goal: products & prices come from Shopify (add a product there → it shows here),
and checkout redirects to Shopify's hosted, PCI-compliant checkout.
Reviews stay as the current placeholders for now.

---

## ✅ Status: IMPLEMENTED (full dynamic sync)

The code is wired up and live-tested with the local fallback. Until you add real
store credentials the site behaves exactly as before (bundled flavours + the two
pack sizes); add `.env.local` and it switches to Shopify automatically — no code
changes needed.

**What the build actually does (differs slightly from the original notes below):**

- **Static export removed** — `next.config.ts` now targets a Node host (Vercel /
  Netlify w/ `@netlify/plugin-nextjs`). Deploy there. `cdn.shopify.com` is
  whitelisted for images.
- **Token is server-only** (no `NEXT_PUBLIC_`). Product reads happen server-side
  in the root layout and are ISR-cached (`revalidate: 3600` → add a product,
  it appears within an hour). Checkout runs through a **Server Action**, so the
  token never reaches the browser. No `@shopify/storefront-api-client` dependency
  — a small `fetch` wrapper in `src/lib/shopify.ts` does it.
- **Packs = Shopify variants.** Each flavour's 10-stick / 30-stick options map to
  **variants** on one Shopify product. Name each variant so its title contains the
  stick count (e.g. `10 sticks`, `30 sticks`); the code parses the number for the
  `₹/serve` math and computes `SAVE %` automatically.
- **Presentation overlay preserved.** The 3D sticks, galleries, nutrition, accent
  colours etc. stay in `src/lib/flavours.ts`, merged onto Shopify data by handle.
  A product whose handle matches (`banta-lime-spark`, `kala-khatta`,
  `peach-himalayan`) gets the full SALTD styling; any new product still renders
  with Shopify's own image/description.

**To go live:**

1. Create the app + Storefront token in Shopify (§0 below).
2. `cp .env.local.example .env.local` and fill in `SHOPIFY_STORE_DOMAIN` +
   `SHOPIFY_STOREFRONT_TOKEN`.
3. Create the 3 products, each with matching **handle** and **10 / 30 stick
   variants** priced ₹549 / ₹1399.
4. `npm run dev` → products, prices and stock now come from Shopify; the
   "Proceed to checkout" button redirects to Shopify's hosted checkout.

Key files: `src/lib/shopify.ts`, `src/lib/products.ts`, `src/lib/product-types.ts`,
`src/components/providers/ProductsProvider.tsx`, `src/app/actions/checkout.ts`,
`src/lib/checkout-client.ts`.

> Optional: to make new products appear instantly instead of within the hour, add
> a Shopify `products/update` + `products/create` webhook → a Route Handler that
> calls `revalidateTag('products')` (the product cache is already tagged).

---
### Original planning notes (for reference — some details superseded above)
---

## 0. What you need from Shopify (one-time)

1. A Shopify store (any plan; even the $1/mo trial works to build).
2. **Storefront API access token**:
   - Shopify admin → **Settings → Apps and sales channels → Develop apps**
   - **Create an app** → name it "SALTD Web"
   - **Configuration → Storefront API** → enable these scopes:
     `unauthenticated_read_product_listings`, `unauthenticated_read_product_inventory`,
     `unauthenticated_write_checkouts`, `unauthenticated_read_checkouts`
   - **Install app** → copy the **Storefront API access token** (starts with a long hex string)
3. Note your store domain, e.g. `saltd.myshopify.com`.

Put them in `.env.local` (never commit this file):

```
NEXT_PUBLIC_SHOPIFY_DOMAIN=saltd.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

3 products to create in Shopify (title them exactly, or update the slug map):
- Banta Lime Spark
- Kala Khatta
- Peach Himalayan

Each with price ₹999, an image, and the flavour in the **handle** (e.g. `banta-lime-spark`).

---

## 1. Hosting decision (important)

Your site is currently a **static export** (`next.config.ts` → `output: "export"`).
Static can't auto-update when you add a product. Two options:

### Option A — Dynamic hosting (recommended, real store)
- Remove `output: "export"` from `next.config.ts`.
- Deploy to **Vercel** (easiest for Next.js) or **Netlify with `@netlify/plugin-nextjs`**.
- Use **ISR**: product pages/data `revalidate` every 60s → add a product in Shopify,
  it appears within a minute, no manual rebuild.

### Option B — Stay static + auto-rebuild
- Keep the `out/` folder workflow.
- In Shopify: **Settings → Notifications → Webhooks** → create `Product update` /
  `Product create` webhooks pointing at a **Netlify build hook URL**
  (Netlify → Site settings → Build & deploy → Build hooks).
- Any product change → webhook → Netlify rebuilds & redeploys (1–2 min).
- Products are fetched at **build time** (in `getStaticProps`-style server code),
  which static export supports.

Checkout redirect works the same in **both** options (it's client-side).

---

## 2. Install the Shopify client

```bash
npm install @shopify/storefront-api-client
```

Create `src/lib/shopify.ts`:

```ts
import { createStorefrontApiClient } from '@shopify/storefront-api-client';

export const shopify = createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN!,
  apiVersion: '2024-10',
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!,
});
```

---

## 3. Fetch products (replace the hardcoded `ALL` array)

In `FlavourTabs.tsx` the flavours are hardcoded. Replace with Shopify data:

```ts
const PRODUCTS_QUERY = `
  query Products {
    products(first: 20) {
      nodes {
        id
        handle
        title
        description
        featuredImage { url altText }
        variants(first: 1) { nodes { id price { amount currencyCode } } }
      }
    }
  }
`;

export async function getProducts() {
  const { data } = await shopify.request(PRODUCTS_QUERY);
  return data.products.nodes.map((p) => ({
    slug: p.handle,
    name: p.title,
    desc: p.description,
    image: p.featuredImage?.url,
    variantId: p.variants.nodes[0].id,   // needed for checkout
    priceNum: Number(p.variants.nodes[0].price.amount),
  }));
}
```

- **Option A:** call this in a Server Component / route with `export const revalidate = 60`.
- **Option B:** call it at build time and pass into the client component as props.

Keep the local `stick` image mapping (Shopify won't have your floating-stick PNGs),
or upload those to each product's image gallery and pull them from Shopify too.

---

## 4. Cart + checkout redirect (the key part)

Replace the current Zustand `image`-only cart with Shopify **cart lines** keyed by
`variantId`. Two mutations:

```ts
const CART_CREATE = `
  mutation cartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart { id checkoutUrl }
    }
  }
`;

export async function startCheckout(lines: { merchandiseId: string; quantity: number }[]) {
  const { data } = await shopify.request(CART_CREATE, { variables: { lines } });
  window.location.href = data.cartCreate.cart.checkoutUrl;  // → Shopify hosted checkout
}
```

Then your **"Checkout →"** button in `CartDrawer.tsx` / `cart/page.tsx` calls:

```ts
startCheckout(items.map(i => ({ merchandiseId: i.variantId, quantity: i.quantity })));
```

That's the whole redirect. Payment, shipping, taxes, order emails — all handled by
Shopify. You never touch card data.

> Current cart stores a product `id` + `image`. You'll add `variantId` to each cart
> item (from step 3) so checkout knows which Shopify variant to buy.

---

## 5. Reviews (later)

Shopify has no native reviews. When ready, install **Judge.me** (free) and fetch:

```
GET https://judge.me/api/v1/reviews?api_token=...&shop_domain=saltd.myshopify.com
```

Map into the existing `Reviews.tsx` shape. Until then the placeholders stay.

---

## Summary of code changes when we implement

| File | Change |
|------|--------|
| `next.config.ts` | (Option A) remove `output: "export"` |
| `.env.local` | add Shopify domain + token |
| `src/lib/shopify.ts` | new — API client |
| `FlavourTabs.tsx`, `Hero.tsx` | products from Shopify instead of hardcoded `ALL` |
| `src/store/cart.ts` | add `variantId` to cart items |
| `CartDrawer.tsx`, `cart/page.tsx` | Checkout button → `startCheckout()` redirect |
| `Reviews.tsx` | (later) Judge.me feed |

## What I need from you to build it
1. Which hosting option (A dynamic, or B static+rebuild).
2. Your `saltd.myshopify.com` domain + Storefront API token (paste into `.env.local`).
3. The 3 products created in Shopify with matching handles.

Then it's roughly a 1–2 hour implementation.
```
