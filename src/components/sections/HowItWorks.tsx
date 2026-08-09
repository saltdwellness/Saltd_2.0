'use client';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Sparkle, Loop } from '@/components/ui/Doodles';

const steps = [
  { number: '1', title: 'Pour',  body: 'Empty one SALTD stick into 250–300ml of cold water.', image: '/images/saltd-step-pour.webp' },
  { number: '2', title: 'Mix',   body: 'Stir or shake until dissolved. Watch the flavour come alive.', image: '/images/saltd-step-mix.webp' },
  { number: '3', title: 'Reset', body: 'Sip, hydrate, and feel the difference. Every time.', image: '/images/saltd-step-reset.webp' },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 lg:px-16 relative">
      <Loop className="absolute bottom-12 right-[4%] hidden lg:block" />

      <ScrollReveal>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <h2 className="font-display text-section text-saltd-black">
            Three steps.<br />One reset.
          </h2>
          <a href="/shop" className="inline-block bg-saltd-lime text-white font-body font-semibold px-6 py-3 rounded-full hover:scale-105 transition-transform self-start">
            Start your ritual →
          </a>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-4 items-start">
        {steps.map((step, i) => (
          <div key={step.number} className="flex items-start gap-2">
            <ScrollReveal delay={i * 0.12} className="flex-1">
              <div className="relative">
                {/* big lime number */}
                <span
                  className="absolute -top-4 -left-4 md:-top-14 md:-left-8 z-10 font-display text-[130px] leading-none select-none pointer-events-none"
                  style={{ color: '#2E5BFF', WebkitTextStroke: '2px #0D0D0D', paintOrder: 'stroke' }}
                >
                  {step.number}
                </span>
                {/* photo */}
                <div className="relative h-56 rounded-2xl overflow-hidden bg-white shadow-sm">
                  <Image src={step.image} alt={step.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
                </div>
                <div className="mt-5">
                  <h3 className="font-display text-[32px] text-saltd-black leading-none">{step.title}</h3>
                  <p className="font-body text-[15px] text-saltd-black/55 mt-2 max-w-[260px]">{step.body}</p>
                </div>
              </div>
            </ScrollReveal>
            {i < 2 && <ArrowRight className="text-saltd-lime hidden md:block flex-shrink-0 mt-24" size={28} />}
          </div>
        ))}
      </div>

      <Sparkle className="absolute bottom-16 left-[6%] hidden lg:block" />
    </section>
  );
}
