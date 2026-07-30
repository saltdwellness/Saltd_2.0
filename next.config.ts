import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dynamic hosting (Vercel / Netlify with @netlify/plugin-nextjs / any Node host).
  // We dropped `output: "export"` so product data can be fetched from Shopify and
  // revalidated on an interval (ISR) — add a product in Shopify and it appears here
  // without a manual rebuild. See src/lib/shopify.ts for the revalidate window.
  trailingSlash: true,
  images: {
    // Local product art stays bundled; Shopify-hosted images come from its CDN.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com" },
    ],
  },
};

export default nextConfig;
