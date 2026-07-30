'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function CTABanner() {
  return (
    <section className="py-20 px-6 lg:px-16">
      <motion.div
        className="rounded-[32px] bg-saltd-lime p-10 lg:p-14 flex flex-col lg:flex-row justify-between items-center gap-10 overflow-hidden relative"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Left */}
        <div className="relative z-10">
          <svg width="60" height="16" viewBox="0 0 60 16" fill="none" className="mb-3">
            <path d="M0 8 C10 2, 20 14, 30 8 S50 2, 60 8" stroke="#ffffff" strokeWidth="2.5" fill="none"/>
          </svg>
          <h2 className="font-display text-section text-white">Make reset your daily ritual.</h2>
          <p className="font-body text-base text-white/70 mt-3">All three flavours. One SALTD ritual.</p>
          <a
            href="/shop"
            className="mt-6 inline-block bg-saltd-black text-white font-body font-semibold px-8 py-4 rounded-full text-lg hover:scale-105 active:scale-95 transition-transform"
          >
            Get SALTD →
          </a>
        </div>

        {/* Right */}
        <Image
          src="/images/saltd-all-three-flatlay.webp"
          alt="All three SALTD flavours"
          width={320}
          height={240}
          sizes="(max-width: 1024px) 80vw, 320px"
          className="object-contain drop-shadow-2xl"
        />
      </motion.div>
    </section>
  );
}
