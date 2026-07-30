# SALTD. — Design & Competitive Analysis

## 1. Where SALTD sits in the market

The Indian hydration-stick space is small, growing fast, and stylistically split into two camps:

| Camp | Feels like | Examples |
|------|-----------|----------|
| **Pharma / performance** | Clinical, chemistry-forward, tub packaging | Fast&Up Reload, GNC Hydra, Muscleblaze, ORSL |
| **Lifestyle / craveable** | Playful, DTC, flavour-forward, stick sachets | vidRate (UK), Liquid IV (US), LMNT (US) — no strong Indian-flavour lifestyle brand yet |

SALTD sits deliberately in the second camp *with an Indian flavour lens* (Banta / Kala Khatta / Peach). That's the whitespace. The competitive job isn't to out-science Fast&Up — it's to out-*want* them.

---

## 2. Direct + adjacent competitors

| Brand | Region | Format | Price/serve | Positioning | What they do well | Where SALTD can beat them |
|-------|--------|--------|-------------|-------------|-------------------|--------------------------|
| **vidRate** | UK | Stick sachets | ~£0.83 (~₹87) | Vitamin + electrolyte, family-friendly | Clean typography, "Enhanced Hydration" story, flavour tabs, Build-A-Box | Indian palate, price, cultural resonance |
| **Fast&Up Reload** | India | Tubes | ~₹27 | Sport performance | Distribution, cricket associations | Craving, lifestyle, everyday use |
| **Liquid IV** | US | Sticks | ~$1.75 (~₹150) | "Cellular Transport Technology" | Retail dominance, science claims | Price, local flavours |
| **LMNT** | US | Sticks | ~$1.65 (~₹140) | High-sodium keto / athlete | Cult following, taste, minimalist design | Sweet spot for casual users, lower price |
| **Charged Monk** | India | Sticks | ~₹35 | Sport / recovery | Newer, ambitious | Design/brand craft, storytelling |
| **ORSL / Electral** | India | Bottles/sachets | ~₹40 | Medicinal / rehydration | Doctor-recommended trust | Feels sick, not craveable |

**Takeaway:** SALTD's real competitor isn't a brand — it's *plain water plus a chai*. The battle is against habit, not another sachet.

---

## 3. Design analysis — what the current SALTD site does well

**Distinctive brand system**
- Single lime (#A8E63D) accent locks the identity. No colour salad, unlike vidRate (5 flavour colours) or Fast&Up (chart-like colour blocks).
- Anton display + DM Sans body is a strong, confident pairing. Anton is unusual in beverages — most default to Neue Haas or Poppins.
- Cream background feels warm and daily-carry, not clinical.

**Content architecture that respects a 6-second decision**
- Floating "Shop the reset" CTA is always one tap from the buy section.
- The flavour picker is the site's centrepiece, not buried under a hero. That's correct for a 3-SKU brand.
- Pack-size selector (10 / 30) with per-serve maths anchors the value.

**Small things that punch above their weight**
- The scroll-driven 3D sachet — most Indian beverage sites use flat product PNGs. This alone lifts perceived quality.
- Full-bleed marquee + "Water had a new personality" tagline give the brand a voice.
- Enhanced-hydration section adopts vidRate's proven flanking-benefits layout.

---

## 4. Design analysis — what to fix / sharpen

Priority order:

**A. Prove the brand before selling** *(highest impact, cheapest)*
- Add a real founder/story block. One paragraph, one photo, no stock imagery. Indian DTC brands like The Whole Truth, Boat, and MokoBara live and die on founder credibility.
- Replace the placeholder Reviews section with either (a) a "First 100 tasters" waitlist widget or (b) press quotes if any. Fake testimonials are a trust leak.

**B. Show, don't say, the ingredients**
- The Ingredients section is text-heavy. Add the mg-per-serve as a bold chart or Nutrition Facts panel next to the copy. This is what LMNT does obsessively.
- Add "vs. plain water" and "vs. leading sports drink" comparison. Hard numbers convert.

**C. Cut the doodle count**
- Squiggles, sparkles, loops are cute but currently compete with the product photos for attention. Keep 2 per section max, prefer negative space. vidRate uses almost zero doodles — its restraint reads as premium.

**D. Photography is 50% of the perceived quality**
- The three stick PNGs are strong. The lifestyle shots (community grid) are the weakest link — they read as AI/stock. Either shoot real product-in-hand shots on iPhone (better than fake stock), or remove the section until you have real users.

**E. Motion budget**
- The site has ~14 animations layered on the hero alone (marquee, spin, zoom, cards reveal, blob drift, sticker rotate, etc). Cut to 3–4. Motion should reward attention, not demand it. Reference: LMNT ships zero WebGL and outsells everyone.

**F. Copy voice**
- Post-cleanup the em-dashes are gone and copy is more human. Next pass: kill remaining marketing-speak ("your body's been asking for", "make it a ritual"). Best-in-class Indian DTC voice is Blue Tokai and The Whole Truth — plain, direct, occasionally funny. Reread each block asking "would a friend say this?"

**G. Trust chips**
- "No artificial junk / Scientifically backed / Made for real life" are good but vague. Replace with verifiable: "FSSAI approved", "Made in India", "No colours added", "Vegan".

---

## 5. Feature gaps vs. category leaders

| Feature | SALTD today | Table stakes? | Priority |
|---------|-------------|---------------|----------|
| Shopify-backed catalog & checkout | ❌ (mocked) | Yes | **P0** |
| Subscribe & save (10–15% off) | ❌ | Yes for DTC | **P0** |
| Build-a-box / mixed flavour packs | ❌ | vidRate's #1 conversion driver | **P1** |
| Real reviews (Judge.me) | ❌ (placeholder) | Yes | **P1** |
| Founder / brand story page | ❌ | Yes for Indian DTC | **P1** |
| Blog / hydration science content | ❌ | SEO play | **P2** |
| Instagram / UGC feed | ❌ | Table stakes | **P2** |
| Gifting / corporate bulk | ❌ | Underrated in India | **P2** |
| WhatsApp support widget | ❌ | Culturally expected in India | **P1** |
| Cash on Delivery | ❌ | Still ~30% of Indian ecom | **P1** |

---

## 6. Positioning recommendation

Position SALTD as **"the electrolyte you actually reach for"** — the emotional cousin of a nimbu paani, not the medicinal cousin of ORSL.

Three-part message hierarchy, in order:

1. **Craveable** (flavour-first)
2. **Functional** (real electrolytes, real ratios)
3. **Clean** (no sugar, no artificial anything)

That order is the opposite of Fast&Up (function first) and matches Liquid IV/LMNT (craveability first). It's the winning order for lifestyle DTC.

---

## 7. 30-day punch list

1. Wire real Shopify catalog + checkout (SHOPIFY_INTEGRATION.md)
2. Kill placeholder reviews; replace with "Be one of the first 100 tasters" waitlist
3. Add a real founder photo + one-paragraph story block
4. Shoot 8–10 real lifestyle photos on iPhone (better than any AI or stock)
5. Add subscribe-and-save (Shopify Subscriptions or Recharge)
6. Add WhatsApp button (bottom-left, so it doesn't fight the Shop CTA)
7. Add FSSAI number + nutrition panel to each product
8. Cut animations to 4 total; measure Lighthouse before/after
9. Build a "Build Your Box" screen (mix any 3 flavours)
10. Ship Instagram-linked review widget once you have 25 real reviews
