/** Single source of truth for flavour data - used by the picker and product pages. */

export type Flavour = {
  slug: string;
  name: string;
  short: string;       // one-line hook
  desc: string;        // longer description
  accent: string;
  stick: string;       // tall floating stick image
  image: string;       // lifestyle / hero shot (cart thumbnail)
  productShot: string; // real product photo (box + sachet + fruit) for the PDP hero
  gallery: string[];   // PDP image gallery (first entry is the main shot)
  boxImage: string;    // fallback / box photo
  scaleAdj: number;
  rating: number;
  reviews: number;
  taste: string[];     // "Zesty", "Fizzy" etc for the pill row on product page
  pairsWith: string;
};

export const FLAVOURS: Flavour[] = [
  {
    slug: 'banta-lime-spark',
    name: 'Banta Lime Spark',
    short: 'Classic nimbu-soda energy, rebuilt with real electrolytes.',
    desc: 'Zesty lime with a soft fizz. Built on the ratio that made banta a street-corner classic, now with the electrolytes and vitamins your body actually asked for. Crisp, clean, and quietly addictive.',
    accent: '#2E5BFF',
    stick: '/images/stick-banta.webp',
    image: '/images/flavour-banta-hero.webp',
    productShot: '/images/product-banta.webp',
    gallery: ['/images/product-banta.webp', '/images/gallery-banta-1.webp', '/images/gallery-banta-2.webp', '/images/gallery-banta-3.webp'],
    boxImage: '/images/saltd-banta-lime-box.webp',
    scaleAdj: 1,
    rating: 4.8,
    reviews: 1230,
    taste: ['Zesty', 'Fizzy', 'Crisp'],
    pairsWith: 'Post-workout, mid-workday, hot afternoons',
  },
  {
    slug: 'kala-khatta',
    name: 'Kala Khatta',
    short: 'That golgappa-stall nostalgia, in a glass.',
    desc: 'Bold, tangy, and unmistakably ours. Kala khatta is one of those flavours you either love or love more. Deep, complex, and surprisingly clean - no sugar overload, just real hydration.',
    accent: '#6C2BD9',
    stick: '/images/stick-kala.webp',
    image: '/images/flavour-kala-hero.webp',
    productShot: '/images/product-kala.webp',
    gallery: ['/images/product-kala.webp', '/images/gallery-kala-1.webp', '/images/gallery-kala-2.webp', '/images/gallery-kala-3.webp'],
    boxImage: '/images/saltd-kala-khatta-box.webp',
    scaleAdj: 1.18,
    rating: 4.8,
    reviews: 1104,
    taste: ['Tangy', 'Bold', 'Nostalgic'],
    pairsWith: 'Long drives, late nights, anything with maggi',
  },
  {
    slug: 'peach-himalayan',
    name: 'Peach Himalayan',
    short: 'Soft Himalayan peach with a clean mineral finish.',
    desc: 'Juicy, balanced, easy to keep drinking. Peach carries the flavour, Himalayan pink salt does the electrolyte work. The one you reach for when you want something gentle but functional.',
    accent: '#F97316',
    stick: '/images/stick-peach.webp',
    image: '/images/flavour-peach-hero.webp',
    productShot: '/images/product-peach.webp',
    gallery: ['/images/product-peach.webp', '/images/gallery-peach-1.webp', '/images/gallery-peach-2.webp', '/images/gallery-peach-3.webp'],
    boxImage: '/images/saltd-peach-himalayan-box.webp',
    scaleAdj: 1,
    rating: 4.8,
    reviews: 989,
    taste: ['Juicy', 'Balanced', 'Gentle'],
    pairsWith: 'Mornings, travel days, gym recovery',
  },
];

export type Pack = { size: number; price: number; savePct?: number };
export const PACKS: Pack[] = [
  { size: 10, price: 799 },
  { size: 30, price: 2100 },
];

export function getFlavour(slug: string): Flavour | undefined {
  return FLAVOURS.find((f) => f.slug === slug);
}
