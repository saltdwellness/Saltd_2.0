'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { ShoppingBag, Menu, X, User } from 'lucide-react';
import Link from 'next/link';
import { useCartStore, cartCount } from '@/store/cart';

// Section links point at the homepage + hash (e.g. `/#flavours-picker`) so they
// work from any page: on the home page they just scroll, elsewhere they navigate
// home first and then scroll to the section. Bare `#hash` anchors only resolved
// on the home page.
const navLinks = [
  { label: 'SHOP',       href: '/shop' },
  { label: 'FLAVOURS',   href: '/#flavours-picker' },
  { label: 'OUR RITUAL', href: '/#how-it-works' },
  { label: 'ABOUT US',   href: '/#ingredients' },
  { label: 'REVIEWS',    href: '/#reviews' },
  { label: 'FAQ',        href: '/faq' },
];

export function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const { openCart, items } = useCartStore();
  const count = cartCount(items);

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 60));

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        className="fixed inset-x-0 z-50 flex items-center justify-between px-6 lg:px-10 backdrop-blur-xl backdrop-saturate-150"
        style={{ height: '72px', top: 'var(--marquee-h, 44px)', borderBottom: '1px solid transparent' }}
        animate={{
          backgroundColor: scrolled ? 'rgba(245,242,235,0.55)' : 'rgba(245,242,235,0)',
          borderBottomColor: scrolled ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0)',
          boxShadow: scrolled
            ? '0 8px 30px rgba(13,13,13,0.08), inset 0 1px 0 rgba(255,255,255,0.6)'
            : '0 0 0 rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo */}
        <Link href="/" className="font-display text-4xl lg:text-5xl text-saltd-black tracking-tight leading-none">
          SALTD<span className="text-saltd-lime">.</span>
        </Link>

        {/* Center links - desktop */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <Link href={href} className="relative font-body font-bold text-[15px] text-saltd-black hover:text-saltd-black transition-colors group">
                {label}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-saltd-lime origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Right */}
        <div className="flex items-center gap-4">
          <Link href="/account" aria-label="Account" className="text-saltd-black/60 hover:text-saltd-black transition-colors">
            <User size={21} />
          </Link>
          <button onClick={openCart} aria-label="Open cart" className="relative cursor-pointer text-saltd-black/60 hover:text-saltd-black transition-colors">
            <ShoppingBag size={22} />
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-saltd-lime text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                {count}
              </span>
            )}
          </button>
          <a href="/shop" className="hidden sm:block glass-blue font-body font-semibold text-sm px-5 py-2 rounded-full hover:scale-105 active:scale-95 transition-transform">
            SHOP NOW →
          </a>
          <button className="lg:hidden text-saltd-black" onClick={() => setMobileOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-saltd-cream/80 backdrop-blur-2xl backdrop-saturate-150 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
          >
            <button className="absolute top-5 right-6 text-saltd-black" onClick={() => setMobileOpen(false)}>
              <X size={28} />
            </button>
            <motion.ul
              className="flex flex-col items-center gap-8"
              initial="hidden" animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
            >
              {navLinks.map(({ label, href }) => (
                <motion.li key={label} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } } }}>
                  <Link href={href} onClick={() => setMobileOpen(false)} className="font-display text-[48px] text-saltd-black leading-none">{label}</Link>
                </motion.li>
              ))}
              <motion.li variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } } }}>
                <Link href="/account" onClick={() => setMobileOpen(false)} className="font-display text-[48px] text-saltd-black leading-none">ACCOUNT</Link>
              </motion.li>
            </motion.ul>
            <motion.a
              href="/shop" onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="mt-12 glass-blue font-body font-semibold px-8 py-3 rounded-full text-lg"
            >
              SHOP NOW →
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
