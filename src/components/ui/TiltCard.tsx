'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cart';

interface Flavour {
  slug: string;
  name: string;
  tagline: string;
  accent: string;
  image: string;
  rating: number;
  reviews: number;
  price: string;
  priceNum: number;
}

export function TiltCard({ flavour }: { flavour: Flavour }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });
  const addItem = useCartStore((s) => s.addItem);

  return (
    <motion.div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="flavour-card bg-white rounded-3xl p-4 cursor-pointer group shadow-sm hover:shadow-xl transition-shadow"
    >
      {/* Real product photo - full, uncropped */}
      <div style={{ transform: 'translateZ(28px)' }} className="relative aspect-square rounded-2xl overflow-hidden bg-saltd-cream">
        <Image
          src={flavour.image}
          alt={flavour.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-contain group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="px-2 pt-4 pb-2">
        <div className="h-1 w-10 rounded-full bg-saltd-lime mb-3" />
        <h3 className="font-display text-card text-saltd-black leading-none">{flavour.name}</h3>
        <p className="font-body text-sm text-saltd-black/50 mt-1.5">{flavour.tagline}</p>

        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="font-display text-2xl text-saltd-black">{flavour.price}</span>
            <span className="font-body text-saltd-black/40 text-xs ml-1">/ 20 sticks</span>
          </div>
        </div>

        <button
          onClick={() => addItem({ id: flavour.slug, variantId: `local:${flavour.slug}`, name: flavour.name, price: flavour.priceNum, image: flavour.image, quantity: 1 })}
          className="mt-4 w-full bg-saltd-lime text-white font-body font-semibold text-sm py-3 rounded-full hover:scale-[1.03] active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          <ShoppingBag size={16} /> Add to cart
        </button>
      </div>
    </motion.div>
  );
}
