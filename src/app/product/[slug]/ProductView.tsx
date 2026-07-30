'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Star, Truck, Leaf, Award } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { TopMarquee } from '@/components/layout/TopMarquee';
import { Footer } from '@/components/layout/Footer';
import { startingPack, type Product } from '@/lib/product-types';
import { useCartStore } from '@/store/cart';

export function ProductView({ product }: { product: Product }) {
  const flavour = product; // presentation fields read off the merged product
  const [packSize, setPackSize] = useState<number>(() => startingPack(product).size);
  const [activeImg, setActiveImg] = useState(0);
  const pack = product.packs.find((p) => p.size === packSize) ?? startingPack(product);
  const addItem = useCartStore((s) => s.addItem);

  return (
    <>
      <TopMarquee />
      <Navbar />

      <main style={{ paddingTop: 'calc(var(--marquee-h) + 72px)' }}>
        {/* Back link */}
        <div className="max-w-6xl mx-auto px-6 lg:px-16 pt-8">
          <Link
            href="/#flavours-picker"
            className="inline-flex items-center gap-2 font-body text-sm text-saltd-black/60 hover:text-saltd-black transition-colors"
          >
            <ArrowLeft size={16} /> Back to all flavours
          </Link>
        </div>

        {/* Hero: image + buy panel */}
        <section className="max-w-6xl mx-auto px-6 lg:px-16 pt-8 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Product photo gallery */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute inset-0 m-auto w-[75%] h-[75%] rounded-full blur-3xl opacity-30" style={{ backgroundColor: flavour.accent }} />
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-white shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImg}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={flavour.gallery[activeImg]}
                    alt={`${flavour.name} — SALTD electrolyte, photo ${activeImg + 1}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2.5 mt-4">
              {flavour.gallery.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImg(i)}
                  aria-label={`View photo ${i + 1}`}
                  className={`relative w-16 h-16 lg:w-20 lg:h-20 rounded-xl overflow-hidden bg-white transition-all ${
                    i === activeImg ? 'ring-2 ring-saltd-black ring-offset-2' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Buy panel */}
          <div>
            <p className="font-body text-saltd-black/40 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Flavour · Electrolyte Mix
            </p>
            <h1 className="font-display text-[clamp(32px,5vw,56px)] leading-[1] text-saltd-black">{flavour.name}</h1>

            <div className="flex items-center gap-2 mt-3">
              {[0, 1, 2, 3, 4].map((n) => (
                <Star key={n} size={14} className="text-saltd-lime" fill="#2E5BFF" strokeWidth={0} />
              ))}
              <span className="font-body text-sm text-saltd-black/60">
                {flavour.rating} · {flavour.reviews.toLocaleString()} reviews
              </span>
            </div>

            <p className="font-body text-saltd-black/70 text-base mt-5 leading-relaxed">{flavour.desc}</p>

            {/* Taste pills */}
            <div className="flex flex-wrap gap-2 mt-5">
              {flavour.taste.map((t) => (
                <span key={t} className="bg-saltd-black/[0.05] border border-saltd-black/10 text-saltd-black/70 text-xs px-3 py-1.5 rounded-full font-body">
                  {t}
                </span>
              ))}
            </div>

            {/* Pack picker */}
            <p className="font-body text-saltd-black/40 text-xs uppercase tracking-widest mt-8 mb-2">Choose pack size</p>
            <div className="flex gap-2 flex-wrap">
              {product.packs.map((p) => {
                const isActive = p.size === packSize;
                return (
                  <button
                    key={p.size}
                    onClick={() => setPackSize(p.size)}
                    className={`relative font-body font-semibold text-sm px-5 py-2.5 rounded-full border transition-all ${
                      isActive
                        ? 'bg-saltd-black text-white border-saltd-black'
                        : 'bg-white text-saltd-black/70 border-saltd-black/15 hover:border-saltd-black/40'
                    }`}
                  >
                    <span className="block leading-none">{p.size} sticks</span>
                    <span className={`block text-[11px] font-normal mt-1 ${isActive ? 'text-white/70' : 'text-saltd-black/45'}`}>
                      ₹{p.price} · ₹{Math.round(p.price / p.size)}/serve
                    </span>
                    {p.savePct ? (
                      <span className="absolute -top-2 -right-2 bg-saltd-lime text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                        SAVE {p.savePct}%
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => addItem({
                id: `${flavour.slug}-${pack.size}`,
                variantId: pack.variantId,
                name: `${flavour.name} · ${pack.size} sticks`,
                price: pack.price,
                image: flavour.productShot,
                quantity: 1,
              })}
              className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-saltd-lime text-white font-body font-semibold px-10 py-4 rounded-full hover:scale-[1.02] active:scale-95 transition-transform"
            >
              <ShoppingBag size={18} /> Add to cart · ₹{pack.price}
            </button>

            {/* Trust icons row */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { Icon: Truck, label: 'Free shipping over ₹499' },
                { Icon: Leaf,  label: 'No added sugar, vegan' },
                { Icon: Award, label: 'FSSAI approved' },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex flex-col items-center text-center gap-1.5">
                  <Icon size={20} className="text-saltd-black/60" strokeWidth={1.8} />
                  <span className="font-body text-[11px] text-saltd-black/60 leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Highlights strip */}
        <section className="bg-saltd-pale-lime py-14 px-6 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-body text-saltd-black/50 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Per 7g stick
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { v: '200', u: 'mg Sodium' },
                { v: '350', u: 'mg Potassium' },
                { v: '50',  u: 'mg Magnesium' },
                { v: '10',  u: 'kcal · 0g sugar' },
              ].map(({ v, u }) => (
                <div key={u}>
                  <div className="font-display text-3xl lg:text-4xl text-saltd-black leading-none">{v}</div>
                  <div className="font-body text-xs text-saltd-black/60 mt-1">{u}</div>
                </div>
              ))}
            </div>
            <p className="font-body text-saltd-black/60 text-sm mt-8 max-w-lg mx-auto">
              <span className="font-semibold">Pairs with:</span> {flavour.pairsWith}.
            </p>
          </div>
        </section>

        {/* How to enjoy */}
        <section className="py-16 px-6 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-body text-saltd-black/40 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-3">
              How to enjoy
            </p>
            <h2 className="font-display text-[clamp(28px,4vw,44px)] text-saltd-black leading-tight">
              Tear. Pour. Shake. Done.
            </h2>
            <p className="font-body text-saltd-black/60 mt-4 max-w-md mx-auto">
              Empty one stick into 250 to 300ml of cold water. Stir or shake. Drink whenever your body actually needs it,
              not just when you notice.
            </p>

            <Link
              href="/#flavours-picker"
              className="mt-8 inline-block font-body text-saltd-black/70 hover:text-saltd-black underline underline-offset-4 text-sm"
            >
              Explore other flavours
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      {/* Sticky add-to-cart (mobile) — always in reach without scrolling */}
      <div
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 glass px-4 py-3 flex items-center gap-3"
        style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
      >
        <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-white flex-shrink-0 border border-saltd-black/10">
          <Image src={flavour.productShot} alt="" fill sizes="44px" className="object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-body font-semibold text-saltd-black text-sm truncate">{flavour.name}</p>
          <p className="font-body text-saltd-black/50 text-xs">{pack.size} sticks · ₹{pack.price}</p>
        </div>
        <button
          onClick={() => addItem({
            id: `${flavour.slug}-${pack.size}`,
            variantId: pack.variantId,
            name: `${flavour.name} · ${pack.size} sticks`,
            price: pack.price,
            image: flavour.productShot,
            quantity: 1,
          })}
          className="flex-shrink-0 inline-flex items-center gap-2 bg-saltd-lime text-white font-body font-semibold px-6 py-3 rounded-full active:scale-95 transition-transform"
        >
          <ShoppingBag size={16} /> Add · ₹{pack.price}
        </button>
      </div>
      {/* spacer so the sticky bar never covers footer content */}
      <div className="h-24 lg:hidden" aria-hidden />
    </>
  );
}
