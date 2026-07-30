import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { TopMarquee } from '@/components/layout/TopMarquee';
import { Footer } from '@/components/layout/Footer';

/** Layout wrapper for privacy / terms / refunds / shipping pages. */
export function PolicyPage({
  badge,
  title,
  intro,
  lastUpdated,
  children,
}: {
  badge: string;
  title: string;
  intro?: string;
  lastUpdated?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <TopMarquee />
      <Navbar />

      <main style={{ paddingTop: 'calc(var(--marquee-h) + 72px)' }}>
        {/* Header */}
        <section className="px-6 lg:px-16 pt-10 pb-8 border-b border-saltd-black/10">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-body text-sm text-saltd-black/60 hover:text-saltd-black transition-colors mb-6"
            >
              <ArrowLeft size={16} /> Back to home
            </Link>
            <p className="font-body text-saltd-black/40 text-xs font-semibold tracking-[0.3em] uppercase">{badge}</p>
            <h1 className="font-display text-[clamp(32px,5vw,56px)] leading-[1] text-saltd-black mt-3">{title}</h1>
            {intro ? (
              <p className="font-body text-saltd-black/60 mt-4 max-w-xl">{intro}</p>
            ) : null}
            {lastUpdated ? (
              <p className="font-body text-saltd-black/50 text-sm mt-3">Last updated: {lastUpdated}</p>
            ) : null}
          </div>
        </section>

        {/* Body */}
        <section className="px-6 lg:px-16 py-14 lg:py-20">
          <div className="max-w-3xl mx-auto policy-body space-y-10">{children}</div>
        </section>
      </main>

      <Footer />
    </>
  );
}

/** A titled section inside a policy page. */
export function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl lg:text-2xl text-saltd-black mb-3">{title}</h2>
      <div className="font-body text-saltd-black/70 text-[15px] leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_strong]:text-saltd-black">
        {children}
      </div>
    </section>
  );
}
