'use client';
import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollProgress } from '@/hooks/useScrollProgress';

const RitualScene3D = dynamic(() => import('@/components/three/RitualScene3D'), { ssr: false });

const stages = [
  { key: 'pour',  number: '01', word: 'Pour',  body: 'Tear one SALTD stick and pour it into a tall glass of cold water.' },
  { key: 'mix',   number: '02', word: 'Mix',   body: 'Drop in ice and stir until it dissolves. Watch the flavour come alive.' },
  { key: 'reset', number: '03', word: 'Reset', body: 'Sip, hydrate, and feel the difference. Every single time.' },
];

// scroll thresholds that match the 3D animation phases
function stageFor(p: number) {
  if (p < 0.45) return 0;       // pouring
  if (p < 0.78) return 1;       // ice + mix
  return 2;                     // reset
}

export function RitualScroll3D() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(wrapRef);

  const active = stageFor(progress);
  const stage = stages[active];

  return (
    <section id="how-it-works">
      {/* Pinned scroll-driven 3D ritual */}
      <div ref={wrapRef} className="relative" style={{ height: '400vh' }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Ambient lime glow */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[150px] opacity-[0.14] bg-saltd-lime pointer-events-none" />

          {/* Giant watermark number */}
          <AnimatePresence mode="wait">
            <motion.span
              key={stage.number}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-white/[0.04] select-none pointer-events-none leading-none"
              style={{ fontSize: 'clamp(280px, 60vw, 720px)' }}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              {stage.number}
            </motion.span>
          </AnimatePresence>

          {/* Eyebrow */}
          <div className="absolute top-24 inset-x-0 text-center z-10 px-6">
            <p className="font-body text-white/40 text-sm font-semibold tracking-[0.3em] uppercase">
              The Ritual · Three steps, one reset
            </p>
          </div>

          {/* The live 3D animation */}
          <div className="absolute inset-0 z-0">
            <RitualScene3D progress={progress} />
          </div>

          {/* Word + body */}
          <div className="absolute bottom-16 inset-x-0 px-6 lg:px-16 z-10 pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage.key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <h2
                  className="font-display uppercase leading-[0.85] text-saltd-lime"
                  style={{ fontSize: 'clamp(60px,12vw,160px)' }}
                >
                  {stage.word}
                </h2>
                <p className="font-body text-white/70 text-lg mt-4 max-w-[460px] mx-auto">{stage.body}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Vertical progress rail */}
          <div className="absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-10">
            {stages.map((s, i) => (
              <span
                key={s.key}
                className="rounded-full transition-all duration-300"
                style={{
                  width: 8, height: i === active ? 28 : 8,
                  backgroundColor: i === active ? '#2E5BFF' : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>

          {/* scroll hint */}
          <div className="absolute bottom-6 inset-x-0 text-center z-10 pointer-events-none">
            <span className="font-body text-white/25 text-xs tracking-[0.3em] uppercase">Scroll to make your reset ↓</span>
          </div>
        </div>
      </div>

    </section>
  );
}
