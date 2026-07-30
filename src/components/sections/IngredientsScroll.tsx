'use client';
import { useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplet, Zap, Sparkles, Shield } from 'lucide-react';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useModelExists } from '@/hooks/useModelExists';

const ProductScene = dynamic(() => import('@/components/three/ProductScene'), { ssr: false });

// Single generic sachet model drives this section. Drop it here to go 3D:
const SACHET_MODEL = '/models/sachet.glb';

const ingredients = [
  {
    key: 'sodium',
    icon: Droplet,
    name: 'Sodium',
    amount: '500mg',
    headline: 'Hydrate, for real.',
    body: 'The electrolyte you lose most through sweat. Sodium is what actually pulls water into your cells - plain water alone can’t.',
    accent: '#2E5BFF',
  },
  {
    key: 'potassium',
    icon: Zap,
    name: 'Potassium',
    amount: '200mg',
    headline: 'No more cramps.',
    body: 'Keeps your muscles firing and your nerves signalling. The difference between a strong finish and a mid-session fade.',
    accent: '#6C2BD9',
  },
  {
    key: 'magnesium',
    icon: Sparkles,
    name: 'Magnesium',
    amount: '60mg',
    headline: 'Recover sharper.',
    body: 'Powers over 300 reactions in your body - energy, recovery, and a calmer, clearer head after the grind.',
    accent: '#F97316',
  },
  {
    key: 'vitamin-c',
    icon: Shield,
    name: 'Vitamin C',
    amount: '40mg',
    headline: 'Defend the reset.',
    body: 'Antioxidant support to round out every serving. No artificial colours, no sugar overload - just the good stuff.',
    accent: '#2E5BFF',
  },
];

export function IngredientsScroll() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(wrapRef);
  const hasModel = useModelExists(SACHET_MODEL);

  const count = ingredients.length;
  const scaled = progress * count;
  const active = Math.min(Math.floor(scaled), count - 1);
  const local = scaled - active;
  const item = ingredients[active];
  const Icon = item.icon;

  return (
    <section id="ingredients" ref={wrapRef} className="relative bg-saltd-black" style={{ height: '420vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Glow */}
        <motion.div
          key={item.key + '-glow'}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          style={{ backgroundColor: item.accent }}
        />

        {/* Left - text */}
        <div className="relative z-10 flex flex-col justify-center px-6 lg:px-16 pt-24 lg:pt-0">
          <p className="font-body text-white/40 text-sm font-semibold tracking-[0.3em] uppercase mb-8">
            What’s inside
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
                style={{ backgroundColor: item.accent + '22' }}
              >
                <Icon size={16} style={{ color: item.accent }} />
                <span className="font-body text-sm font-semibold" style={{ color: item.accent }}>
                  {item.name} · {item.amount}
                </span>
              </div>
              <h2 className="font-display text-[clamp(40px,6vw,72px)] text-white leading-[0.95]">
                {item.headline}
              </h2>
              <p className="font-body text-white/60 text-lg mt-5 max-w-[440px] leading-relaxed">
                {item.body}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right - product + dots */}
        <div className="relative flex items-center justify-center">
          {hasModel ? (
            <div className="w-full h-full">
              <ProductScene modelPath={SACHET_MODEL} progress={local + active} spin={Math.PI * 4} scale={1.1} />
            </div>
          ) : (
            <motion.div
              key={item.key + '-img'}
              className="relative w-[220px] h-[420px] sm:w-[280px] sm:h-[520px]"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ rotate: (local - 0.5) * 10 }}
            >
              <Image
                src="/images/saltd-banta-lime-box.webp"
                alt="SALTD sachet"
                fill
                sizes="280px"
                className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
              />
            </motion.div>
          )}

          {/* Side dots */}
          <div className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4">
            {ingredients.map((ing, i) => (
              <div key={ing.key} className="flex items-center gap-3 justify-end">
                <span
                  className="font-body text-[11px] tracking-widest uppercase transition-opacity hidden lg:block"
                  style={{ color: ing.accent, opacity: i === active ? 1 : 0 }}
                >
                  {ing.name}
                </span>
                <span
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? 10 : 8,
                    height: i === active ? 10 : 8,
                    backgroundColor: i === active ? ing.accent : 'rgba(255,255,255,0.25)',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
