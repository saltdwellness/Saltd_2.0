'use client';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { FloatingCTA } from '@/components/ui/FloatingCTA';
import { Navbar } from '@/components/layout/Navbar';
import { TopMarquee } from '@/components/layout/TopMarquee';
import { Hero } from '@/components/sections/Hero';
import { EnhancedHydration } from '@/components/sections/EnhancedHydration';
import { FlavourTabs } from '@/components/sections/FlavourTabs';
import { MarqueeAnimation } from '@/components/ui/MarqueeAnimation';
import { Ingredients } from '@/components/sections/Ingredients';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { SocialProof } from '@/components/sections/SocialProof';
import { Reviews } from '@/components/sections/Reviews';
import { FAQ } from '@/components/sections/FAQ';
import { CTABanner } from '@/components/sections/CTABanner';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  useSmoothScroll();
  return (
    <>
      <FloatingCTA />
      <TopMarquee />
      <Navbar />
      <main>
        <Hero />
        <FlavourTabs />
        <EnhancedHydration />

        {/* Marquee */}
        <div className="py-6 border-y border-saltd-black/10 bg-saltd-lime/10">
          <MarqueeAnimation
            baseVelocity={3}
            direction="right"
            className="font-display uppercase text-saltd-black text-[clamp(28px,5vw,56px)] [&>span]:px-8"
          >
            Hydrate better · Feel sharper · Crave the ritual ·
          </MarqueeAnimation>
        </div>

        <Ingredients />
        <HowItWorks />
        <SocialProof />
        <section id="reviews"><Reviews /></section>
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
