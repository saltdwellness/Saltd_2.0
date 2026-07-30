'use client';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

/** Hero ingredient card — our differentiator. The full formula lives in the panel. */
const ingredients = [
  {
    Icon: Sparkles,
    name: 'Ashwagandha + Monk Fruit',
    amount: '125 + 150',
    unit: 'mg',
    line: 'Adaptogen for calm focus, monk fruit for clean sweetness. No sugar, no crash.',
    hero: true,
  },
];

export function Ingredients() {
  return (
    <section id="ingredients" className="py-16 lg:py-24 px-6 lg:px-16">
      {/* Header */}
      <ScrollReveal>
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-body text-saltd-black/40 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            What’s actually in it
          </p>
          <h2 className="font-display text-[clamp(30px,5vw,56px)] leading-[1] text-saltd-black">
            Everything that matters.<br />Nothing that doesn’t.
          </h2>
          <p className="font-body text-saltd-black/55 text-base mt-4 max-w-xl mx-auto">
            The full formula, per 7g stick. No fine print, no proprietary blends.
          </p>
        </div>
      </ScrollReveal>

      {/* NUTRITION PANEL — the LMNT-style "show, don't say" block */}
      <ScrollReveal delay={0.05}>
        <div className="mt-10 lg:mt-14 flex flex-col gap-4 lg:gap-6 max-w-3xl mx-auto">
          {/* Hero ingredient card */}
          <div className="grid grid-cols-1 gap-3 lg:gap-4">
            {ingredients.map((ing, i) => {
              const { Icon } = ing;
              return (
                <motion.div
                  key={ing.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className={`rounded-2xl border p-6 lg:p-8 ${
                    ing.hero
                      ? 'bg-saltd-lime border-saltd-lime'
                      : 'bg-white border-saltd-black/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                      ing.hero ? 'bg-saltd-black' : 'bg-saltd-lime/15'
                    }`}>
                      <Icon size={18} className={ing.hero ? 'text-saltd-lime' : 'text-saltd-lime'} strokeWidth={2} />
                    </div>
                    <div className="text-right">
                      <div className={`font-display leading-none tabular-nums ${
                        ing.hero ? 'text-white text-xl lg:text-2xl' : 'text-saltd-black text-2xl lg:text-3xl'
                      }`}>
                        {ing.amount}
                      </div>
                      <div className={`font-body text-[10px] uppercase tracking-widest mt-0.5 ${
                        ing.hero ? 'text-white/60' : 'text-saltd-black/60'
                      }`}>
                        {ing.unit} / stick
                      </div>
                    </div>
                  </div>
                  <h3 className={`font-display text-xl lg:text-2xl mt-4 ${ing.hero ? 'text-white' : 'text-saltd-black'}`}>{ing.name}</h3>
                  <p className={`font-body text-sm lg:text-base mt-2 leading-snug ${ing.hero ? 'text-white/70' : 'text-saltd-black/55'}`}>
                    {ing.line}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Supplement Facts panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl bg-saltd-black text-white p-6 lg:p-7 border-4 border-saltd-black"
          >
            <div className="flex items-baseline justify-between border-b-4 border-white/90 pb-2">
              <p className="font-display text-xl">Supplement Facts</p>
              <p className="font-body text-[11px] text-white/60">1 stick · 7g</p>
            </div>

            <div className="mt-3 pb-2 border-b border-white/20 flex justify-between font-body text-sm">
              <span className="font-bold">Energy</span>
              <span className="tabular-nums font-semibold">10 kcal</span>
            </div>
            <div className="pb-2 pt-2 border-b border-white/20 flex justify-between font-body text-sm">
              <span className="font-bold">Total Carbohydrate</span>
              <span className="tabular-nums font-semibold">&lt;1 g</span>
            </div>

            {/* Electrolytes */}
            <p className="font-body font-bold text-[10px] uppercase tracking-widest text-white/50 mt-4 mb-1">Electrolytes</p>
            <table className="w-full font-body text-sm">
              <tbody>
                {[
                  { k: 'Sodium (Pink Himalayan)', v: '200 mg',  rda: '10%',   hi: true },
                  { k: 'Potassium',               v: '350 mg',  rda: '7%',    hi: true },
                  { k: 'Chloride',                v: '310 mg',  rda: '13%' },
                  { k: 'Magnesium (Citrate)',     v: '50 mg',   rda: '14%',   hi: true },
                  { k: 'Zinc (Citrate)',          v: '3 mg',    rda: '25%' },
                ].map((row) => (
                  <tr key={row.k} className="border-b border-white/10">
                    <td className={`py-1.5 pr-2 ${row.hi ? 'font-semibold' : 'text-white/85'}`}>{row.k}</td>
                    <td className={`py-1.5 text-right tabular-nums ${row.hi ? 'text-saltd-lime font-bold' : ''}`}>{row.v}</td>
                    <td className="py-1.5 pl-2 text-right text-white/50 text-xs tabular-nums w-14">{row.rda}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Vitamins */}
            <p className="font-body font-bold text-[10px] uppercase tracking-widest text-white/50 mt-4 mb-1">Vitamins</p>
            <table className="w-full font-body text-sm">
              <tbody>
                {[
                  { k: 'Vitamin C',    v: '100 mg',  rda: '125%' },
                  { k: 'Vitamin B5',   v: '10 mg',   rda: '200%' },
                  { k: 'Vitamin B6',   v: '2 mg',    rda: '118%' },
                  { k: 'Vitamin B12',  v: '100 mcg', rda: '4000%', hi: true },
                ].map((row) => (
                  <tr key={row.k} className="border-b border-white/10">
                    <td className={`py-1.5 pr-2 ${row.hi ? 'font-semibold' : 'text-white/85'}`}>{row.k}</td>
                    <td className={`py-1.5 text-right tabular-nums ${row.hi ? 'text-saltd-lime font-bold' : ''}`}>{row.v}</td>
                    <td className="py-1.5 pl-2 text-right text-white/50 text-xs tabular-nums w-14">{row.rda}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Botanicals & amino */}
            <p className="font-body font-bold text-[10px] uppercase tracking-widest text-white/50 mt-4 mb-1">Botanicals & Amino</p>
            <table className="w-full font-body text-sm">
              <tbody>
                {[
                  { k: 'Ashwagandha Extract',  v: '125 mg' },
                  { k: 'Taurine',              v: '250 mg' },
                  { k: 'Monk Fruit Extract',   v: '150 mg' },
                  { k: 'Elderberry Extract',   v: '**' },
                ].map((row) => (
                  <tr key={row.k} className="border-b border-white/10">
                    <td className="py-1.5 pr-2 text-white/85">{row.k}</td>
                    <td className="py-1.5 text-right tabular-nums font-semibold">{row.v}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="font-body text-[10px] text-white/40 mt-4 leading-snug">
              % RDA values based on ICMR-NIN Guidelines for Adults. RDA not established for botanicals,
              amino acids &amp; natural sweeteners.
            </p>
          </motion.div>
        </div>
      </ScrollReveal>

    </section>
  );
}
