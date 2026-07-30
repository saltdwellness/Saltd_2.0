'use client';
import { useEffect, useRef, useState, RefObject } from 'react';

/**
 * 0→1 progress of an element travelling through the viewport.
 * 0 = element's top just entered from the bottom, 1 = element's bottom just left the top.
 * Works for small elements (unlike useScrollProgress, which needs a tall element).
 */
export function useViewProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const compute = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh - rect.top) / (vh + rect.height);
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
