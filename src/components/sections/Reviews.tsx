'use client';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const reviews = [
  {
    quote: 'SALTD is now a non-negotiable in my gym bag. The flavours are insanely good.',
    name: 'Aarav M.',
    role: 'Fitness Enthusiast',
    avatar: '/images/avatar-aarav.webp',
    flavour: 'Banta Lime Spark',
    accent: '#2E5BFF',
  },
  {
    quote: "Finally, electrolytes that don't taste like medicine. Kala Khatta is pure nostalgia!",
    name: 'Priya S.',
    role: 'Marketing Manager',
    avatar: '/images/avatar-priya.webp',
    flavour: 'Kala Khatta',
    accent: '#6C2BD9',
  },
  {
    quote: 'Peach Himalayan is my daily reset. Keeps me fresh, focused and hydrated.',
    name: 'Neha R.',
    role: 'Travel Creator',
    avatar: '/images/avatar-neha.webp',
    flavour: 'Peach Himalayan',
    accent: '#F97316',
  },
  {
    quote: 'Switched from a leading brand and never looked back. The taste is in a different league.',
    name: 'Rohan K.',
    role: 'Ultra Runner',
    avatar: '/images/avatar-rohan.webp',
    flavour: 'Banta Lime Spark',
    accent: '#2E5BFF',
  },
];

export function Reviews() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 3000, stopOnInteraction: true })]
  );

  return (
    <section className="py-24 px-6 lg:px-16">
      <ScrollReveal>
        <h2 className="font-display text-section text-saltd-black">What our community says</h2>
      </ScrollReveal>

      <div className="mt-12">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {reviews.map((review, i) => (
              <div
                key={i}
                className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 px-3"
              >
                <div className="bg-white rounded-2xl p-6 flex flex-col h-full">
                  <div className="flex gap-0.5">
                    {[0, 1, 2, 3, 4].map((j) => (
                      <Star key={j} size={14} className="text-saltd-lime" fill="#2E5BFF" strokeWidth={0} />
                    ))}
                  </div>
                  <p className="font-body italic text-[17px] text-saltd-black/90 mt-3 flex-1">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 mt-6">
                    <div className="w-12 h-12 rounded-full overflow-hidden relative flex-shrink-0">
                      <Image
                        src={review.avatar}
                        alt={review.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-body font-semibold text-saltd-black text-sm truncate">{review.name}</div>
                      <div className="font-body text-saltd-black/50 text-sm truncate">{review.role}</div>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full font-body font-semibold bg-saltd-lime/20 text-saltd-black whitespace-nowrap">
                      {review.flavour}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="bg-white border border-saltd-black/10 text-saltd-black rounded-full w-10 h-10 flex items-center justify-center hover:bg-saltd-lime hover:text-saltd-black transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            className="bg-white border border-saltd-black/10 text-saltd-black rounded-full w-10 h-10 flex items-center justify-center hover:bg-saltd-lime hover:text-saltd-black transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
