'use client';
import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export function CustomCursor() {
  const dot  = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      gsap.to(dot.current,  { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(ring.current, { x: e.clientX, y: e.clientY, duration: 0.35, ease: 'power2.out' });
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      <div ref={dot}  className="fixed top-0 left-0 w-2 h-2 bg-saltd-lime rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2" />
      <div ref={ring} className="fixed top-0 left-0 w-8 h-8 border border-saltd-lime/60 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2" />
    </>
  );
}
