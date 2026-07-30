'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useViewProgress } from '@/hooks/useViewProgress';
import { useInViewOnce } from '@/hooks/useInViewOnce';
import { useModelExists } from '@/hooks/useModelExists';

const StickScene = dynamic(() => import('@/components/three/StickScene'), { ssr: false });
const STICK_MODEL = '/models/sachet-banta-lime-spark.glb';

const benefits = [
  { title: 'All Natural', body: 'Clean ingredients, vegan, and zero added sugar. Each slim stick is just 5g.' },
  { title: 'Essential Electrolytes', body: 'Sodium, potassium, magnesium, and vitamin C in a research-backed ratio.' },
  { title: 'Stay Hydrated', body: 'Pulls water into your cells so you actually absorb it, not just sip it.' },
  { title: 'Feel Sharper', body: 'Beat the dehydration fog. Stay clear, focused and energised all day.' },
  { title: 'Made for Real Life', body: 'Workouts, workdays, travel days, late nights. There’s no wrong time.' },
  { title: 'On The Go', body: 'Slim sticks that live in your bag. Tear, pour, shake, done in seconds.' },
];
const left = benefits.slice(0, 3);
const right = benefits.slice(3);

function Benefit({ title, body, align = 'left' }: { title: string; body: string; align?: 'left' | 'right' }) {
  return (
    <div className={align === 'right' ? 'lg:text-right' : ''}>
      <h3 className="font-display text-2xl text-saltd-black">{title}</h3>
      <p className="font-body text-sm text-saltd-black/55 mt-2 leading-relaxed max-w-[260px] lg:inline-block">{body}</p>
    </div>
  );
}

/**
 * Scroll-spun 3D stick. Each instance measures its own wrapper, so the spin
 * starts exactly when the stick reaches the viewport centre (progress 0.5):
 * straight on the way in, then rotates as you keep scrolling.
 */
function ProductStick() {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useViewProgress(ref);
  const inView = useInViewOnce(ref);
  const hasModel = useModelExists(STICK_MODEL);
  const model = hasModel ? STICK_MODEL : undefined;

  return (
    <div ref={ref} className="relative w-full aspect-square">
      <div className="absolute inset-0 m-auto w-[80%] h-[80%] rounded-full bg-saltd-lime/20 blur-2xl" />
      {/* Defer the three.js chunk + model download until this scrolls near view. */}
      {inView && <StickScene flavour="Banta Lime Spark" model={model} progress={progress} startAt={0.5} />}
    </div>
  );
}

export function EnhancedHydration() {
  const [i, setI] = useState(0);
  const b = benefits[i];

  // Mobile carousel auto-advances (no manual arrows).
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % benefits.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="py-20 px-6 lg:px-16 bg-saltd-pale-lime">
      <ScrollReveal>
        <h2 className="font-display text-section text-saltd-black text-center">Enhanced hydration</h2>
      </ScrollReveal>

      {/* DESKTOP - benefits flanking the product */}
      <div className="hidden lg:grid grid-cols-[1fr_minmax(280px,420px)_1fr] gap-6 items-center mt-12">
        <div className="flex flex-col gap-10">
          {left.map((x, idx) => <ScrollReveal key={x.title} delay={idx * 0.08}><Benefit {...x} align="right" /></ScrollReveal>)}
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <ProductStick />
        </motion.div>
        <div className="flex flex-col gap-10">
          {right.map((x, idx) => <ScrollReveal key={x.title} delay={idx * 0.08}><Benefit {...x} align="left" /></ScrollReveal>)}
        </div>
      </div>

      {/* MOBILE - product + one benefit at a time */}
      <div className="lg:hidden mt-8">
        <div className="max-w-[280px] mx-auto"><ProductStick /></div>

        <div className="mt-6 text-center min-h-[120px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-display text-2xl text-saltd-black">{b.title}</h3>
              <p className="font-body text-sm text-saltd-black/55 mt-2 max-w-[300px] mx-auto">{b.body}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-1.5 mt-5">
          {benefits.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Go to benefit ${idx + 1}`}
              className="rounded-full transition-all"
              style={{ width: idx === i ? 18 : 6, height: 6, backgroundColor: idx === i ? '#2E5BFF' : 'rgba(13,13,13,0.2)' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
