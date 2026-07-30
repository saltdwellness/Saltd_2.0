import type { Metadata } from 'next';
import { Montserrat, DM_Sans } from 'next/font/google';
import './globals.css';
import { getProducts } from '@/lib/products';
import { ProductsProvider } from '@/components/providers/ProductsProvider';
import { CartDrawer } from '@/components/ui/CartDrawer';

// Display face matched to the bold geometric "SALTD." wordmark on the product sticks.
const montserrat = Montserrat({ weight: ['600', '700', '800'], subsets: ['latin'], variable: '--font-montserrat', display: 'swap' });
const dmSans = DM_Sans({ weight: ['400', '500', '600'], subsets: ['latin'], variable: '--font-dm-sans', display: 'swap' });

export const metadata: Metadata = {
  title: 'SALTD. Hydration, made a ritual.',
  description: 'Electrolytes in craveable Indian flavours for workouts, workdays, travel days, and everything in between.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Fetched once here (Server Component, ISR-cached) and shared with all client
  // components via context. Falls back to the local catalogue when Shopify is
  // not configured — see src/lib/products.ts.
  const products = await getProducts();

  return (
    <html lang="en" className={`${montserrat.variable} ${dmSans.variable}`}>
      <body>
        <ProductsProvider products={products}>
          {children}
          {/* Mounted once here so the mini-cart works on every page. */}
          <CartDrawer />
        </ProductsProvider>
      </body>
    </html>
  );
}
