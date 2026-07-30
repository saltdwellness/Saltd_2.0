'use client';
import { useEffect, useRef, useState, RefObject } from 'react';

/**
 * Returns a 0→1 progress value for how far the user has scrolled THROUGH
 * a tall section. Pair with a sticky inner wrapper to build pinned,
 * scroll-scrubbed sequences. Works with Lenis (listens to native scroll).
 *
 * progress = 0  → section top just reached viewport top
 * progress = 1  → section bottom about to leave viewport top
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const compute = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = rect.height - vh;
      if (scrollable <= 0) { setProgress(0); return; }
      const p = -rect.top / scrollable;
      setProgress(Math.min(Math.max(p, 0), 1));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref]);

  return progress;
}
