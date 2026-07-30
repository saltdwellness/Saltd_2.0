'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, ArrowRight, Truck, Leaf, Award } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { TopMarquee } from '@/components/layout/TopMarquee';
import { Footer } from '@/components/layout/Footer';
import { useProducts } from '@/components/providers/ProductsProvider';
import { startingPack, type Product } from '@/lib/product-types';
import { useCartStore } from '@/store/cart';

function ShopCard({ flavour, index }: { flavour: Product; index: number }) {
  const addItem = useCartStore((s) => s.addItem);
  const starter = startingPack(flavour); // cheapest pack

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-shadow group"
    >
      {/* Product photo → product page */}
      <Link
        href={`/product/${flavour.slug}`}
        className="relative aspect-square rounded-2xl overflow-hidden bg-saltd-cream block"
        aria-label={`View ${flavour.name}`}
      >
        <Image
          src={flavour.boxImage}
          alt={`${flavour.name} — SALTD box and sticks`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      <div className="flex flex-col flex-1 px-2 pt-4 pb-2">
        <div className="h-1 w-10 rounded-full bg-saltd-lime mb-3" />

        <div className="flex items-center gap-1.5 mb-2">
          {[0, 1, 2, 3, 4].map((n) => (
            <Star key={n} size={13} className="text-saltd-lime" fill="#2E5BFF" strokeWidth={0} />
          ))}
          <span className="font-body text-xs text-saltd-black/50">
            {flavour.rating} · {flavour.reviews.toLocaleString()}
          </span>
        </div>

        <Link href={`/product/${flavour.slug}`}>
          <h3 className="font-display text-card text-saltd-black leading-none hover:text-saltd-lime transition-colors">
            {flavour.name}
          </h3>
        </Link>
        <p className="font-body text-sm text-saltd-black/50 mt-1.5 min-h-[2.5rem]">{flavour.short}</p>

        {/* Taste pills */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {flavour.taste.map((t) => (
            <span
              key={t}
              className="bg-saltd-black/[0.05] border border-saltd-black/10 text-saltd-black/60 text-[11px] px-2.5 py-1 rounded-full font-body"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-end justify-between mt-auto pt-5">
          <div>
            <span className="font-body text-saltd-black/40 text-xs">From</span>
            <div className="font-display text-2xl text-saltd-black leading-none">₹{starter.price}</div>
          </div>
          <span className="font-body text-saltd-black/40 text-xs">{starter.size} sticks</span>
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-col gap-2">
          <button
            onClick={() =>
              addItem({
                id: `${flavour.slug}-${starter.size}`,
                variantId: starter.variantId,
                name: `${flavour.name} · ${starter.size} sticks`,
                price: starter.price,
                image: flavour.productShot,
                quantity: 1,
              })
            }
            className="w-full bg-saltd-lime text-white font-body font-semibold text-sm py-3 rounded-full hover:scale-[1.03] active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            <ShoppingBag size={16} /> Add to cart
          </button>
          <Link
            href={`/product/${flavour.slug}`}
            className="w-full border border-saltd-black/15 text-saltd-black font-body font-semibold text-sm py-3 rounded-full hover:border-saltd-black transition-colors flex items-center justify-center gap-1.5"
          >
            View product <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function ShopPage() {
  const products = useProducts();
  return (
    <>
      <TopMarquee />
      <Navbar />
      <main style={{ paddingTop: 'calc(var(--marquee-h) + 72px)' }}>
        {/* Header */}
        <section className="max-w-6xl mx-auto px-6 lg:px-16 pt-12 lg:pt-16 pb-8 text-center">
          <p className="font-body text-saltd-black/40 text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            Shop the reset
          </p>
          <h1 className="font-display text-section text-saltd-black leading-[0.95]">
            Three flavours.<br />One obsession.
          </h1>
          <p className="font-body text-saltd-black/50 text-base max-w-[440px] mx-auto mt-5">
            Real Indian flavours. Real electrolytes. Pick your pack and check out in seconds.
          </p>
        </section>

        {/* Product grid */}
        <section className="max-w-6xl mx-auto px-6 lg:px-16 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((f, i) => (
              <ShopCard key={f.slug} flavour={f} index={i} />
            ))}
          </div>
        </section>

        {/* Trust strip */}
        <section className="bg-saltd-pale-lime py-12 px-6 lg:px-16">
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { Icon: Truck, label: 'Free shipping over ₹499' },
              { Icon: Leaf, label: 'No added sugar · Vegan' },
              { Icon: Award, label: 'FSSAI approved' },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex flex-col items-center text-center gap-2">
                <Icon size={24} className="text-saltd-black/60" strokeWidth={1.8} />
                <span className="font-body text-sm text-saltd-black/60">{label}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
