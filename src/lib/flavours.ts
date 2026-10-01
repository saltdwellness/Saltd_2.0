/** Single source of truth for flavour data - used by the picker and product pages. */

export type Flavour = {
  slug: string;
  name: string;
  short: string;       // one-line hook
  desc: string;        // longer description
  accent: string;
  stick: string;       // tall floating stick image
  image: string;       // lifestyle / hero shot (cart thumbnail)
  productShot: string; // real product photo (pouch + stick) for the PDP hero
  gallery: string[];   // PDP image gallery (first entry is the main shot)
  boxImage: string;    // pack photo (pouch)
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
    productShot: '/images/pouch-banta.webp',
    gallery: ['/images/pouch-banta.webp', '/images/saltd-community-1.webp', '/images/campaign-hero.webp', '/images/flavour-banta-hero.webp'],
    boxImage: '/images/pouch-banta.webp',
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
    productShot: '/images/pouch-kala.webp',
    gallery: ['/images/pouch-kala.webp', '/images/saltd-community-2.webp', '/images/gallery-kala-2.webp', '/images/gallery-kala-3.webp'],
    boxImage: '/images/pouch-kala.webp',
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
    productShot: '/images/pouch-peach.webp',
    gallery: ['/images/pouch-peach.webp', '/images/saltd-community-4.webp', '/images/gallery-peach-3.webp', '/images/flavour-peach-hero.webp'],
    boxImage: '/images/pouch-peach.webp',
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
];

/** Presentation overlay for the Shopify `discovery-pack` product (not a flavour, so kept out of FLAVOURS). */
export const DISCOVERY: Flavour = {
  slug: 'discovery-pack',
  name: 'Discovery Pack',
  short: 'All three flavours, two sticks each. Find your favourite.',
  desc: 'Six sticks: two Banta Lime Spark, two Kala Khatta, two Peach Himalayan. The easiest way to find your flavour. Want the full ritual? Pick the First Sip Kit and get the same six sticks plus the SALTD signature glass.',
  accent: '#2E5BFF',
  stick: '/images/pouch-discovery.webp',
  image: '/images/pouch-discovery.webp',
  productShot: '/images/pouch-discovery.webp',
  gallery: ['/images/pouch-discovery.webp', '/images/pouch-first-sip.webp', '/images/first-sip-lifestyle-v9.webp'],
  boxImage: '/images/pouch-discovery.webp',
  scaleAdj: 1,
  rating: 4.8,
  reviews: 0,
  taste: ['Zesty', 'Tangy', 'Juicy'],
  pairsWith: 'First-timers, gifting, and anyone who cannot pick just one',
};

export function getFlavour(slug: string): Flavour | undefined {
  return FLAVOURS.find((f) => f.slug === slug);
}
