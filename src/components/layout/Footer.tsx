import Image from 'next/image';
import { NewsletterForm } from './NewsletterForm';

const shopLinks = [
  { label: 'All Products', href: '/shop' },
  { label: 'Why SALTD.', href: '/#ingredients' },
  { label: 'FAQ', href: '/faq' },
];

const accountLinks = [
  { label: 'Sign In', href: '/account' },
  { label: 'Order Tracking', href: '/account' },
  { label: 'Support', href: 'mailto:hello@saltd.club' },
];

const legalLinks = [
  { label: 'PRIVACY', href: '/privacy' },
  { label: 'TERMS', href: '/terms' },
  { label: 'REFUNDS', href: '/refunds' },
  { label: 'SHIPPING', href: '/shipping' },
];

/* ── Section heading: quoted, blue, wide-tracked ───────────────────────── */
function ColHeading({ children }: { children: string }) {
  return (
    <p className="font-body text-[13px] font-bold text-saltd-lime uppercase tracking-[0.3em] mb-7">
      &quot;{children}&quot;
    </p>
  );
}

function LinkCol({ heading, links }: { heading: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <ColHeading>{heading}</ColHeading>
      <ul className="space-y-5">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="font-body text-lg text-white/90 hover:text-white transition-colors">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Payment / trust marks ─────────────────────────────────────────────── */
function PayBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center h-9 px-3 rounded-lg bg-white/[0.06] border border-white/10 font-body text-[13px] font-semibold text-white/80">
      {children}
    </span>
  );
}

export function Footer() {
  return (
    <footer className="bg-saltd-black text-white pt-20 pb-10 px-6 lg:px-16">
      {/* Top grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
        {/* Brand */}
        <div className="md:col-span-5">
          <Image src="/images/saltd-logo-white.png" alt="SALTD." width={1021} height={348} className="h-8 w-auto" />

          <p className="font-body text-2xl text-white/85 leading-snug mt-6 max-w-[340px]">
            &quot;High-performance hydration rituals for the modern palate.&quot;
          </p>
          <p className="font-body text-sm text-white/50 uppercase tracking-[0.2em] mt-10">
            — Hydration.Club
          </p>
          <a href="https://instagram.com/saltd.ritual" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 mt-5 text-white/50 hover:text-white transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-label="Instagram">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            <span className="font-body text-sm uppercase tracking-[0.2em]">@SALTD.RITUAL</span>
          </a>
        </div>

        {/* Link columns */}
        <div className="md:col-span-2">
          <LinkCol heading="SHOP" links={shopLinks} />
        </div>
        <div className="md:col-span-2">
          <LinkCol heading="ACCOUNT" links={accountLinks} />
        </div>

        {/* Newsletter */}
        <div className="md:col-span-3">
          <ColHeading>NEWSLETTER</ColHeading>
          <p className="font-body text-base text-white/60 leading-relaxed">
            Early access, ritual tips, new flavors. No spam.
          </p>
          <NewsletterForm />
        </div>
      </div>

      {/* Secured by + Make in India */}
      <div className="border-t border-white/10 mt-20 pt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-body text-[11px] text-white/40 uppercase tracking-[0.25em] mr-1">Secured by</span>
          <PayBadge>Razorpay</PayBadge>
          <PayBadge><span className="text-[#5F259F]">UPI</span></PayBadge>
          <PayBadge>RuPay</PayBadge>
          <PayBadge><span className="text-[#1A1F71] italic">VISA</span></PayBadge>
          <PayBadge>
            <span className="relative inline-flex items-center" aria-label="Mastercard">
              <span className="w-3.5 h-3.5 rounded-full bg-[#EB001B]" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#F79E1B]/90 -ml-1.5" />
            </span>
          </PayBadge>
          <PayBadge><span className="text-[#1F72CD]">AMEX</span></PayBadge>
        </div>

        <div className="inline-flex items-center gap-2.5 h-9 px-4 rounded-lg bg-white/[0.06] border border-white/10 self-start lg:self-auto">
          <svg width="20" height="14" viewBox="0 0 20 14" className="rounded-[2px] shrink-0" aria-label="Indian flag">
            <rect width="20" height="14" rx="1.5" fill="#fff" />
            <rect width="20" height="4.667" fill="#FF9933" />
            <rect y="9.333" width="20" height="4.667" fill="#138808" />
            <circle cx="10" cy="7" r="1.9" fill="none" stroke="#000080" strokeWidth="0.5" />
            <circle cx="10" cy="7" r="0.35" fill="#000080" />
          </svg>
          <span className="font-body text-[13px] font-bold text-white/90 uppercase tracking-[0.2em]">Make in India</span>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="font-body text-[13px] text-white/40 uppercase tracking-[0.15em]">
          © 2026 SALTD — Aurevia Ventures
        </span>
        <div className="flex items-center gap-7">
          {legalLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-body text-[13px] text-white/60 hover:text-white uppercase tracking-[0.15em] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
