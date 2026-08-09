'use client';
import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cart';
import { useProducts } from '@/components/providers/ProductsProvider';
import { startingPack } from '@/lib/product-types';

export function FlavourTabs() {
  const products = useProducts();
  // order holds product indices; the visible row is the first three, rotating.
  const [order, setOrder] = useState<number[]>(() => products.map((_, i) => i));
  const [packSize, setPackSize] = useState<number | null>(null); // null → each product's cheapest
  const dragX = useRef(0);
  const didDrag = useRef(false); // distinguish a swipe from a tap/click
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);

  if (products.length === 0) return null;

  const displayCount = Math.min(3, products.length);
  const centerPos = Math.min(1, displayCount - 1); // 1→0, 2→1, 3→1
  const displayed = order.slice(0, displayCount);
  const active = products[order[centerPos]] ?? products[0];
  const pack = active.packs.find((p) => p.size === packSize) ?? startingPack(active);

  const next = () => setOrder((o) => [...o.slice(1), o[0]]);          // rotate left → left moves to right
  const prev = () => setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);

  return (
    <section className="py-10 lg:py-14 px-6 lg:px-16 relative overflow-hidden bg-saltd-pale-lime/50 scroll-mt-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="font-display text-section text-saltd-black">Mouth-watering flavours</h2>
        <p className="font-body text-saltd-black/55 text-lg mt-3">We believe hydration should be fun and tasty.</p>
      </div>

      {/* Circular queue - all three visible, centre is active */}
      <div id="flavours-picker" className="mt-8 lg:mt-10 relative scroll-mt-24">
        <div
          className="flex items-center justify-center gap-4 sm:gap-10 lg:gap-16 touch-pan-y select-none cursor-grab active:cursor-grabbing"
          onPointerDown={(e) => { dragX.current = e.clientX; }}
          onPointerUp={(e) => {
            const dx = e.clientX - dragX.current;
            if (dx < -45) { next(); didDrag.current = true; }
            else if (dx > 45) { prev(); didDrag.current = true; }
            else didDrag.current = false;
          }}
        >
          {displayed.map((idx, pos) => {
            const f = products[idx];
            const isCenter = pos === centerPos;
            return (
              <motion.div
                key={f.slug}
                layout
                onClick={() => {
                  if (didDrag.current) { didDrag.current = false; return; }
                  if (isCenter) router.push(`/product/${f.slug}`);
                  else if (pos < centerPos) prev();
                  else next();
                }}
                role="button"
                aria-label={isCenter ? `View ${f.name}` : `Show ${f.name}`}
                transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                // scaleAdj is a per-flavour PNG-padding normaliser; cap it at 1 so the
                // active (centre) stick never enlarges past its box and overlaps the
                // title/rating below (transform scale doesn't grow the layout box).
                animate={{ scale: (isCenter ? 1 : 0.66) * Math.min(f.scaleAdj, 1), opacity: isCenter ? 1 : 0.6 }}
                className="w-[120px] sm:w-[155px] lg:w-[176px] flex-shrink-0 cursor-pointer"
                style={{ zIndex: isCenter ? 2 : 1 }}
              >
                <div className="relative w-full aspect-[1/3.4]">
                  <Image
                    src={f.stick}
                    alt={f.name}
                    fill
                    sizes="160px"
                    className="object-contain drop-shadow-2xl pointer-events-none"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* arrows */}
        {products.length > 1 && (
          <>
            <button onClick={prev} aria-label="Previous"
              className="absolute left-0 lg:left-[20%] top-1/2 -translate-y-1/2 bg-white border border-saltd-black/10 text-saltd-black rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:bg-saltd-lime transition-colors z-10">
              <ChevronLeft size={22} />
            </button>
            <button onClick={next} aria-label="Next"
              className="absolute right-0 lg:right-[20%] top-1/2 -translate-y-1/2 bg-white border border-saltd-black/10 text-saltd-black rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:bg-saltd-lime transition-colors z-10">
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>

      {/* Active flavour detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.slug}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.3 }}
          className="text-center max-w-md mx-auto mt-6"
        >
          <div className="flex items-center justify-center gap-1.5 text-saltd-black/60">
            {[0, 1, 2, 3, 4].map((n) => (
              <Star key={n} size={14} className="text-saltd-lime" fill="#2E5BFF" strokeWidth={0} />
            ))}
            <span className="text-saltd-black/50 text-sm font-body ml-1">{active.rating} ({active.reviews.toLocaleString()})</span>
          </div>
          <h3 className="font-display text-3xl text-saltd-black mt-3">{active.name}</h3>
          <p className="font-body text-saltd-black/55 text-sm mt-3">{active.desc}</p>

          {/* Pack-size selector */}
          <p className="font-body text-saltd-black/40 text-xs uppercase tracking-widest mt-5 mb-2">Choose pack size</p>
          <div className="flex justify-center gap-2 flex-wrap">
            {active.packs.map((p) => {
              const isActive = p.size === pack.size;
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

          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => addItem({
                id: `${active.slug}-${pack.size}`,
                variantId: pack.variantId,
                name: `${active.name} · ${pack.size} sticks`,
                price: pack.price,
                image: active.image,
                quantity: 1,
              })}
              className="inline-block bg-saltd-black text-white font-body font-semibold px-8 py-3.5 rounded-full hover:scale-105 active:scale-95 transition-transform"
            >
              Add to cart · ₹{pack.price}
            </button>
            <Link
              href={`/product/${active.slug}`}
              className="inline-block bg-white text-saltd-black border border-saltd-black/15 font-body font-semibold px-8 py-3.5 rounded-full hover:border-saltd-black transition-colors"
            >
              View details
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
