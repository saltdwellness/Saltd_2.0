'use client';
import { createContext, useContext } from 'react';
import type { Product } from '@/lib/product-types';

/**
 * Makes the Shopify-backed catalogue available to every client component without
 * threading props through each page. The list is fetched once in the root layout
 * (a Server Component) and passed in here; components read it with the hooks below.
 */
const ProductsContext = createContext<Product[]>([]);

export function ProductsProvider({
  products,
  children,
}: {
  products: Product[];
  children: React.ReactNode;
}) {
  return <ProductsContext value={products}>{children}</ProductsContext>;
}

/** All products (already merged: Shopify commerce data + local presentation). */
export function useProducts(): Product[] {
  return useContext(ProductsContext);
}

/** A single product by slug/handle. */
export function useProduct(slug: string): Product | undefined {
  return useContext(ProductsContext).find((p) => p.slug === slug);
}
