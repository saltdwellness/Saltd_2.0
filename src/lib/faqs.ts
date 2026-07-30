/**
 * FAQ content — mirrored exactly from the previous hydration.club site.
 * Grouped by category for the dedicated /faq page; a curated subset shows on the home page.
 */
export type FaqItem = { q: string; a: string };
export type FaqCategory = { title: string; items: FaqItem[] };

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    title: 'The basics',
    items: [
      {
        q: 'Why are electrolytes important for the body?',
        a: `Electrolytes like sodium, potassium, and magnesium regulate fluid balance, nerve signaling, muscle contractions, and energy production. When you sweat, fast, train, sit long hours in AC, or live in hot climates, you lose these minerals. If they're not replaced, you may experience fatigue, headaches, cramps, brain fog, or low stamina. Hydration isn't just about water — it's about mineral balance.`,
      },
      {
        q: 'When should I take an electrolyte drink mix?',
        a: `SALTD. can be used in the morning for better hydration, before or after workouts, during long office hours, while fasting, during travel, in hot or humid weather, or whenever you feel low energy or dehydrated. You don't need to wait until you feel exhausted — electrolytes work best when used proactively.`,
      },
      {
        q: 'How much water should I drink daily?',
        a: `For most adults, 2.5–3.5 litres per day is a general guideline. However, your needs increase if you exercise regularly, live in hot or humid climates, sweat heavily, fast, or spend long hours in air conditioning. Hydration is not just about quantity — it's about electrolyte balance.`,
      },
      {
        q: 'Can drinking too much water be harmful?',
        a: `Yes. Drinking excessive water without electrolytes can dilute sodium levels in the body. This may cause fatigue, confusion, headaches, or cramps. Balance matters more than volume.`,
      },
    ],
  },
  {
    title: 'SALTD. product',
    items: [
      {
        q: 'Is SALTD. safe for daily use?',
        a: `Yes. SALTD. is formulated as a daily electrolyte supplement for hydration, workouts, fasting, and long workdays. If you have kidney issues, high blood pressure, or medical conditions requiring sodium restriction, consult your doctor before use.`,
      },
      {
        q: 'How is SALTD. different from sugary electrolyte powders in India?',
        a: `Many electrolyte drinks in India contain added sugar or artificial sweeteners. SALTD. is zero sugar, sweetened with Monk Fruit, free from artificial sweeteners, free from preservatives, and designed for daily hydration — not just sports use. Clean formulation. Functional dosing.`,
      },
      {
        q: 'Can I use SALTD. during intermittent fasting?',
        a: `Yes. SALTD. contains zero sugar and does not cause blood sugar spikes. It can support hydration and reduce fatigue during fasting periods.`,
      },
      {
        q: 'Does SALTD. replace ORS?',
        a: `No. ORS (Oral Rehydration Solution) is designed for medical dehydration, especially during diarrhoea or illness. SALTD. is formulated for daily hydration, performance, and lifestyle support — not medical treatment.`,
      },
    ],
  },
  {
    title: 'Performance & lifestyle',
    items: [
      {
        q: 'Can I take SALTD. before workouts?',
        a: `Yes. Taking electrolytes before or during workouts can support stamina, reduce cramping, and improve performance — especially in hot conditions.`,
      },
      {
        q: 'Is SALTD. suitable for yoga and low-intensity workouts?',
        a: `Absolutely. Even moderate sweating can lead to mineral loss. Electrolytes help maintain hydration and muscle function regardless of workout intensity.`,
      },
      {
        q: 'Will this help with brain fog?',
        a: `Mild brain fog can sometimes be linked to dehydration or low sodium levels. By restoring electrolyte balance, many people experience improved clarity and steadier energy. However, brain fog can have multiple causes, and persistent symptoms should be evaluated medically.`,
      },
      {
        q: 'Can electrolytes replace coffee?',
        a: `Electrolytes don't stimulate like caffeine. But if your fatigue is linked to dehydration, restoring minerals can provide steady energy without the crash that coffee sometimes causes.`,
      },
      {
        q: 'Why do I feel dizzy or low energy during the day?',
        a: `This can happen due to dehydration, low sodium intake, excess sweating, skipping meals, or fasting without mineral balance. Increasing water alone may not fix it. Restoring electrolytes often helps stabilize energy levels within hours. If symptoms persist, consult a healthcare professional.`,
      },
      {
        q: 'Are sports drinks necessary?',
        a: `Most commercial sports drinks contain added sugar, artificial flavours, and preservatives. They may provide quick energy from sugar, but they are not ideal for daily hydration. SALTD. is designed as a zero sugar electrolyte hydration powder — giving you essential minerals without glucose spikes.`,
      },
    ],
  },
  {
    title: 'Nutrition',
    items: [
      {
        q: 'Can I get electrolytes from food?',
        a: `Yes, natural foods like fruits, leafy greens, coconut water, and mineral salts contain electrolytes. However, during intense sweating, long workouts, fasting, or Indian summer heat, food alone may not replace electrolytes quickly enough. That's where a balanced electrolyte supplement like SALTD. can help.`,
      },
    ],
  },
];

/** Flat list of every FAQ, in category order. */
export const ALL_FAQS: FaqItem[] = FAQ_CATEGORIES.flatMap((c) => c.items);

/** The handful surfaced on the home page (rest live on /faq). */
const HOME_QUESTIONS = new Set([
  'Why are electrolytes important for the body?',
  'When should I take an electrolyte drink mix?',
  'Is SALTD. safe for daily use?',
  'How is SALTD. different from sugary electrolyte powders in India?',
  'Can I use SALTD. during intermittent fasting?',
  'Can I take SALTD. before workouts?',
]);

export const HOME_FAQS: FaqItem[] = ALL_FAQS.filter((f) => HOME_QUESTIONS.has(f.q));
