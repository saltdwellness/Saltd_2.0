'use client';
import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { TiltCard } from '@/components/ui/TiltCard';
import { Sparkle } from '@/components/ui/Doodles';

const BRAND = '#2E5BFF'; // single brand colour for every flavour

export const flavours = [
  {
    slug: 'banta-lime-spark',
    name: 'Banta Lime Spark',
    tagline: 'Zesty. Fizzy. Unstoppably fresh.',
    accent: BRAND,
    image: '/images/flavour-banta-hero.webp',
    rating: 4.8,
    reviews: 1230,
    price: '₹999',
    priceNum: 999,
  },
  {
    slug: 'kala-khatta',
    name: 'Kala Khatta',
    tagline: 'Bold. Tangy. Iconically you.',
    accent: BRAND,
    image: '/images/flavour-kala-hero.webp',
    rating: 4.8,
    reviews: 1104,
    price: '₹999',
    priceNum: 999,
  },
  {
    slug: 'peach-himalayan',
    name: 'Peach Himalayan',
    tagline: 'Juicy. Peachy. Perfectly balanced.',
    accent: BRAND,
    image: '/images/flavour-peach-hero.webp',
    rating: 4.8,
    reviews: 989,
    price: '₹999',
    priceNum: 999,
  },
];

export function FlavourCards() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const ctx = gsap.context(() => {
        gsap.from('.flavour-card', {
          scrollTrigger: { trigger: '.flavour-cards-grid', start: 'top 80%' },
          y: 60, opacity: 0, stagger: 0.15, duration: 0.7, ease: 'power3.out',
        });
      }, sectionRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 lg:px-16 relative">
      <Sparkle className="absolute top-16 right-[8%] hidden lg:block" />
      {/* Section header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
        <div>
          <p className="font-body text-saltd-black/40 text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            Pick your reset
          </p>
          <h2 className="font-display text-section text-saltd-black">
            Three flavours.<br />One obsession.
          </h2>
        </div>
        <p className="font-body text-saltd-black/50 text-base max-w-[340px] lg:text-right">
          Real Indian flavours. Real electrolytes. Pick a pack and check out in seconds.
        </p>
      </div>

      {/* Cards */}
      <div className="flavour-cards-grid grid grid-cols-1 sm:grid-cols-3 gap-6">
        {flavours.map((f) => <TiltCard key={f.slug} flavour={f} />)}
      </div>
    </section>
  );
}
