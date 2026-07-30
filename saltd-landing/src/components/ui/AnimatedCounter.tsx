'use client';
import { useEffect, useRef, useState } from 'react';

export function AnimatedCounter({ target, suffix = '', decimals = 0, label }: {
  target: number;
  suffix?: string;
  decimals?: number;
  label: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      let start = 0;
      const step = target / 60;
      const timer = setInterval(() => {
        start += step;
        if (start >= target) { setCount(target); clearInterval(timer); return; }
        setCount(parseFloat(start.toFixed(decimals)));
      }, 16);
      obs.disconnect();
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, decimals]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-[56px] leading-none text-white">
        {count.toFixed(decimals)}{suffix}
      </div>
      <div className="font-body text-sm text-white/50 mt-1">{label}</div>
    </div>
  );
}
