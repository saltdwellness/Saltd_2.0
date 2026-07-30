import { Droplets, Zap, Heart } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const benefits = [
  { Icon: Droplets, title: 'Hydrate better',   body: 'Replenish electrolytes and stay balanced.' },
  { Icon: Zap,      title: 'Feel sharper',     body: 'Keep your mind clear and your energy up.' },
  { Icon: Heart,    title: 'Crave the ritual', body: 'Flavours that make hydration something you look forward to.' },
];

export function BenefitsBar() {
  return (
    <ScrollReveal>
      <section className="py-12 px-6 lg:px-16">
        <div className="rounded-3xl bg-saltd-pale-lime p-8 lg:p-12 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
          <h2 className="font-display text-section text-saltd-black max-w-[260px] flex-shrink-0">
            Your new reset ritual.
          </h2>

          <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-saltd-lime/40 flex-1">
            {benefits.map(({ Icon, title, body }) => (
              <div key={title} className="px-0 sm:px-8 py-4 sm:py-0 first:pt-0 sm:first:pl-0">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-3">
                  <Icon size={20} className="text-saltd-black" strokeWidth={1.8} />
                </div>
                <h3 className="font-body font-semibold text-base text-saltd-black">{title}</h3>
                <p className="font-body text-sm text-saltd-black/55 mt-1">{body}</p>
              </div>
            ))}
          </div>

          <a href="#ingredients" className="flex-shrink-0 bg-saltd-black text-white font-body font-semibold px-6 py-3 rounded-full hover:bg-saltd-black/80 transition-colors">
            Explore the benefits
          </a>
        </div>
      </section>
    </ScrollReveal>
  );
}
