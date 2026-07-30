'use client';

const retailers = ['amazon', 'Blinkit', 'Zepto', 'BigBasket', 'Swiggy Instamart', 'Flipkart', 'Nykaa'];

export function RetailerStrip() {
  const row = [...retailers, ...retailers];
  return (
    <section className="relative bg-saltd-black overflow-hidden">
      {/* wavy top edge */}
      <svg className="absolute -top-px inset-x-0 w-full" viewBox="0 0 1440 40" preserveAspectRatio="none" style={{ height: 40 }}>
        <path d="M0 40 C 240 0, 480 0, 720 18 C 960 36, 1200 36, 1440 8 L1440 0 L0 0 Z" fill="#F5F2EB" />
      </svg>

      <div className="pt-16 pb-12">
        <p className="font-display text-white text-center text-2xl lg:text-3xl mb-8">
          Coming soon to<span className="text-saltd-lime">.</span>
        </p>
        <div className="overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee items-center gap-16 w-max">
            {row.map((r, i) => (
              <span key={i} className="font-body text-white/45 text-2xl font-semibold tracking-wide">
                {r}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
