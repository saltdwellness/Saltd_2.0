import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { FaqItem } from '@/components/ui/FaqItem';
import { HOME_FAQS } from '@/lib/faqs';

export function FAQ() {
  return (
    <section id="faq" className="py-24 px-6 lg:px-16 scroll-mt-24">
      <ScrollReveal>
        <h2 className="font-display text-section text-saltd-black">Got questions?</h2>
      </ScrollReveal>
      <div className="max-w-[768px] mt-12 mx-auto">
        {HOME_FAQS.map((faq) => (
          <FaqItem key={faq.q} q={faq.q} a={faq.a} />
        ))}
        <Link
          href="/faq"
          className="mt-8 inline-flex items-center gap-2 font-body font-semibold text-saltd-black hover:text-saltd-lime transition-colors"
        >
          See all questions <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
