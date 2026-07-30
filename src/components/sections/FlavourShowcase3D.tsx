'use client';
import { useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useModelExists } from '@/hooks/useModelExists';

const ProductScene = dynamic(() => import('@/components/three/ProductScene'), { ssr: false });

const showcase = [
  {
    slug: 'banta-lime-spark',
    name: 'Banta Lime Spark',
    tagline: 'Zesty. Fizzy. Unstoppably fresh.',
    note: 'The classic nimbu-soda kick, reborn as an electrolyte ritual.',
    accent: '#2E5BFF',
    image: '/images/saltd-banta-lime-box.webp',
    // Drop your model here to auto-upgrade to photorealistic 3D:
    model: '/models/sachet-banta-lime-spark.glb',
  },
  {
    slug: 'kala-khatta',
    name: 'Kala Khatta',
    tagline: 'Bold. Tangy. Iconically you.',
    note: 'That nostalgic golgappa-stall flavour, with real electrolytes.',
    accent: '#6C2BD9',
    image: '/images/saltd-kala-khatta-box.webp',
    model: '/models/sachet-kala-khatta.glb',
  },
  {
    slug: 'peach-himalayan',
    name: 'Peach Himalayan',
    tagline: 'Juicy. Peachy. Perfectly balanced.',
    note: 'Soft Himalayan peach with a clean mineral finish.',
    accent: '#F97316',
    image: '/images/saltd-peach-himalayan-box.webp',
    model: '/models/sachet-peach-himalayan.glb',
  },
];

export function FlavourShowcase3D() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(wrapRef);

  const count = showcase.length;
  const scaled = progress * count;
  const active = Math.min(Math.floor(scaled), count - 1);
  const local = scaled - active; // 0→1 within the active flavour
  const flavour = showcase[active];
  const hasModel = useModelExists(flavour.model);

  return (
    <section id="flavour-showcase" ref={wrapRef} className="relative bg-saltd-black" style={{ height: '320vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Ambient accent glow that shifts per flavour */}
        <motion.div
          key={flavour.slug + '-glow'}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.22 }}
          style={{ backgroundColor: flavour.accent }}
        />

        {/* Eyebrow */}
        <div className="relative z-10 pt-24 px-6 lg:px-16 text-center">
          <p className="font-body text-white/40 text-sm font-semibold tracking-[0.3em] uppercase">
            The SALTD Range
          </p>
        </div>

        {/* Product stage */}
        <div className="relative flex-1 flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={flavour.slug}
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {hasModel ? (
                <div className="w-full h-full">
                  <ProductScene modelPath={flavour.model} progress={local} spin={Math.PI * 1.2} scale={1.3} />
                </div>
              ) : (
                /* Polished photo fallback - floats until the .glb is added */
                <motion.div
                  className="relative w-[320px] h-[420px] sm:w-[420px] sm:h-[540px]"
                  animate={{ y: [0, -16, 0], rotate: [-2, 2, -2] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ rotate: (local - 0.5) * 16 }}
                >
                  <Image
                    src={flavour.image}
                    alt={flavour.name}
                    fill
                    priority
                    sizes="(max-width: 640px) 320px, 420px"
                    className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
                  />
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Flavour text */}
        <div className="relative z-10 pb-10 px-6 lg:px-16 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={flavour.slug + '-text'}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-display text-[clamp(40px,8vw,96px)] text-white leading-[0.9] uppercase">
                {flavour.name}
              </h2>
              <p className="font-body text-white/60 mt-3 max-w-[440px] mx-auto">{flavour.note}</p>
            </motion.div>
          </AnimatePresence>

          {/* Progress scrubber */}
          <div className="mt-8 max-w-[420px] mx-auto">
            <div className="h-1 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full transition-[width] duration-150"
                style={{ width: `${progress * 100}%`, backgroundColor: flavour.accent }}
              />
            </div>
            <div className="flex justify-between mt-3">
              {showcase.map((f, i) => (
                <span
                  key={f.slug}
                  className="font-body text-[11px] tracking-widest uppercase transition-colors"
                  style={{ color: i === active ? f.accent : 'rgba(255,255,255,0.3)' }}
                >
                  {f.name.split(' ')[0]}
                </span>
              ))}
            </div>
            <p className="font-body text-white/30 text-xs tracking-[0.3em] uppercase mt-5">
              Scroll to discover ↓
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
