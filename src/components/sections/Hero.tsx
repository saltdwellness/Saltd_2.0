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
    <section
      className="relative bg-no-repeat bg-[url(/images/hero-sticks-mobile-crop.webp)] bg-cover bg-bottom lg:bg-[url(/images/hero-banner.webp)] lg:bg-right"
      style={{ paddingTop: 'calc(var(--marquee-h) + 72px)' }}
    >
      <div className="relative z-[1] min-h-[calc(100svh_-_var(--marquee-h)_-_72px)] lg:min-h-screen lg:overflow-hidden flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_46%] flex-1">
          {/* Left - brand story */}
          <div className="flex flex-col justify-start lg:justify-center pt-10 pb-12 lg:py-0 px-6 lg:pl-12 lg:pr-8 relative z-10">
            <div ref={headlineRef} className="overflow-hidden">
              <h1 className="font-display text-hero text-saltd-black leading-[0.95]">
                {words.map((word, i) => (
                  <span key={i} className="overflow-hidden inline-block mr-[0.25em]">
                    <span className="word-inner block">
                      {word === 'SALTD' ? <>{word}<span className="text-saltd-lime">.</span></> : word}
                    </span>
                  </span>
                ))}
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="font-body text-lg text-saltd-black/80 lg:text-saltd-black/60 max-w-[460px] mt-6"
            >
              Electrolytes in flavours you actually want to drink. Made for workouts, workdays,
              travel days, and everything in between. Clean ingredients. Honest labels. Real hydration.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
              className="flex flex-wrap gap-3 mt-8"
            >
              <a href="/shop" className="bg-saltd-lime text-white font-body font-semibold px-7 py-3.5 rounded-full hover:scale-105 active:scale-95 transition-transform">
                Shop the reset →
              </a>
              <a href="#flavours-picker" className="border-2 border-saltd-black/15 text-saltd-black font-body font-semibold px-7 py-3.5 rounded-full hover:border-saltd-black transition-colors">
                Explore flavours
              </a>
            </motion.div>

            <p className="font-body italic text-sm text-saltd-black/50 mt-10">Water had a new personality.</p>
          </div>

          {/* Right - empty spacer so the headline stays left while the background product shows on the right (desktop) */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
