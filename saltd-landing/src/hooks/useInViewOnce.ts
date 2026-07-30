'use client';
import { useEffect, useState, type RefObject } from 'react';

/**
 * Fires once when `ref` first scrolls within `rootMargin` of the viewport, then
 * stops observing. Used to defer mounting heavy (e.g. WebGL / three.js) subtrees
 * until they are about to be seen — the generous default margin gives the code
 * chunk + model time to download before the element is actually on screen.
 */
export function useInViewOnce(
  ref: RefObject<HTMLElement | null>,
  rootMargin = '400px',
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    // No IntersectionObserver (old browsers / SSR safety) → just show it.
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, inView, rootMargin]);

  return inView;
}
