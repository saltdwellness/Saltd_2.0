import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { TopMarquee } from '@/components/layout/TopMarquee';
import { Footer } from '@/components/layout/Footer';
import { FaqItem } from '@/components/ui/FaqItem';
import { FAQ_CATEGORIES } from '@/lib/faqs';

export const metadata: Metadata = {
  title: 'FAQs — SALTD.',
  description: 'Everything you need to know about electrolytes, SALTD., and daily hydration.',
};

export default function FaqPage() {
  return (
    <>
      <TopMarquee />
      <Navbar />

      <main style={{ paddingTop: 'calc(var(--marquee-h) + 72px)' }}>
        {/* Header band */}
        <div className="bg-saltd-black py-16 px-6 lg:px-16">
          <p className="font-body text-saltd-lime/80 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            Answers
          </p>
          <h1 className="font-display text-section text-white leading-[0.95]">
            Hydration &amp; electrolyte FAQs<span className="text-saltd-lime">.</span>
          </h1>
          <p className="font-body text-white/50 text-base max-w-[520px] mt-4">
            Everything you need to know about electrolytes, SALTD., and daily hydration.
          </p>
        </div>

        {/* Categories */}
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14 space-y-14">
          {FAQ_CATEGORIES.map((cat) => (
            <section key={cat.title}>
              <h2 className="font-body text-saltd-black/40 text-xs font-semibold tracking-[0.25em] uppercase mb-2">
                {cat.title}
              </h2>
              <div>
                {cat.items.map((faq) => (
                  <FaqItem key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Still curious */}
        <section className="bg-saltd-pale-lime py-16 px-6 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-body text-saltd-black/40 text-xs font-semibold tracking-[0.25em] uppercase mb-3">
              Still curious?
            </p>
            <h2 className="font-display text-[clamp(28px,4vw,44px)] text-saltd-black leading-tight">
              Have another question?
            </h2>
            <p className="font-body text-saltd-black/60 mt-4 max-w-md mx-auto">
              We&apos;re here. Reach out anytime — our team responds quickly.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <a
                href="mailto:hello@saltd.club"
                className="bg-saltd-black text-white font-body font-semibold px-8 py-3.5 rounded-full hover:bg-saltd-purple transition-colors"
              >
                Email us →
              </a>
              <Link
                href="/shop"
                className="bg-white text-saltd-black border border-saltd-black/15 font-body font-semibold px-8 py-3.5 rounded-full hover:border-saltd-black transition-colors"
              >
                Shop SALTD.
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
