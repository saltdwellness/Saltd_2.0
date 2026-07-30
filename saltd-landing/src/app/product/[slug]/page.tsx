import { notFound } from 'next/navigation';
import { getProducts, getProduct } from '@/lib/products';
import { ProductView } from './ProductView';

// Pre-render a page for every product currently in the catalogue. New products
// added to Shopify later are rendered on demand (dynamicParams defaults to true)
// and picked up here on the next revalidation.
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  return <ProductView product={product} />;
}
