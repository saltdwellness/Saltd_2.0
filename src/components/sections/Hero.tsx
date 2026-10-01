'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from '@/lib/gsap';

export function Hero() {
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const ctx = gsap.context(() => {
        gsap.from('.word-inner', { y: 110, opacity: 0, duration: 0.9, stagger: 0.08, ease: 'power4.out', delay: 0.1 });
      }, headlineRef);
      return () => ctx.revert();
    }
  }, []);

  const words = ['Reset', 'starts', 'with', 'SALTD'];

  return (
    <section className="relative" style={{ paddingTop: 'calc(var(--marquee-h) + 72px)' }}>
      {/* photo layer */}
      <div
        aria-hidden
        className="absolute inset-0 bg-no-repeat bg-[url(/images/hero-sticks-mobile-crop.webp)] bg-cover bg-bottom lg:bg-[url(/images/hero-banner.webp)] lg:bg-right"
      />
      <div className="relative z-[1] min-h-[calc(100svh_-_var(--marquee-h)_-_72px)] lg:min-h-screen lg:overflow-hidden flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_46%] flex-1">
          {/* Left - brand story */}
          <div className="flex flex-col justify-start lg:justify-center pt-10 pb-12 lg:py-0 px-6 lg:pl-12 lg:pr-8 relative z-10">
            <div ref={headlineRef} className="overflow-hidden">
              <h1 className="font-display text-hero text-white leading-[0.95] [text-shadow:0_1px_10px_rgba(0,0,0,0.45)] md:[text-shadow:none]">
                {words.map((word, i) => (
                  <span key={i} className="overflow-hidden inline-block mr-[0.25em]">
                    <span className="word-inner block">
                      {word === 'SALTD' ? <>{word}<span className="text-saltd-lime">.</span></> : word}
                    </span>
                  </span>
                ))}
              </h1>
            </div>

            {/* Subheading — hidden for now, re-enable if needed
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="font-body font-bold text-lg text-white max-w-[460px] mt-6 [text-shadow:0_1px_8px_rgba(0,0,0,0.4)]"
            >
              Electrolytes in flavours you actually want to drink. Made for workouts, workdays,
              travel days, and everything in between. Clean ingredients. Honest labels. Real hydration.
            </motion.p>
            */}

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
              className="flex flex-wrap gap-3 mt-8"
            >
              <a href="/shop" className="inline-flex items-center justify-center bg-saltd-lime text-white font-body font-semibold px-7 py-3.5 rounded-full shadow-xl shadow-black/30 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all">
                Shop the reset →
              </a>
              <a href="#flavours-picker" className="border-2 border-white/70 bg-white/10 backdrop-blur-sm text-white font-body font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-black/25 hover:bg-white/20 hover:border-white hover:scale-105 active:scale-95 transition-all [text-shadow:0_1px_10px_rgba(0,0,0,0.4)]">
                Explore flavours
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }}
              className="self-start mt-10 px-6 py-3 rounded-full font-body text-xl sm:text-2xl text-white bg-white/10 border border-white/40 backdrop-blur-md backdrop-saturate-150 shadow-[0_8px_30px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-1px_0_rgba(255,255,255,0.15)] [text-shadow:0_1px_8px_rgba(0,0,0,0.35)]"
            >
              Water had a new personality.
            </motion.p>
          </div>

          {/* Right - empty spacer so the headline stays left while the background product shows on the right (desktop) */}
          <div className="hidden lg:block" />
        </div>
      </div>

    </section>
  );
}
