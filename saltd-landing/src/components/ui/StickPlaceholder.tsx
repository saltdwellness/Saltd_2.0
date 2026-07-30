'use client';

/**
 * Placeholder SALTD sachet (vidRate-style) until real stick cut-outs are supplied.
 * Swap this for a transparent stick PNG per flavour later.
 */
export function StickPlaceholder({ name, accent }: { name: string; accent: string }) {
  return (
    <div className="relative w-full aspect-[1/3] rounded-[20px] bg-white shadow-xl overflow-hidden">
      {/* crimped top */}
      <div
        className="absolute inset-x-0 top-0 h-3"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, ${accent} 0 4px, rgba(255,255,255,0.5) 4px 8px)`,
        }}
      />

      {/* coloured V head */}
      <div
        className="absolute inset-x-0 top-3 h-[60%]"
        style={{ background: accent, clipPath: 'polygon(0 0,100% 0,100% 72%,50% 100%,0 72%)' }}
      />

      {/* head text */}
      <div className="absolute inset-x-0 top-[16%] text-center px-2">
        <p className="font-display text-white text-xl leading-none">SALTD.</p>
        <p className="font-body text-white/85 text-[10px] tracking-[0.15em] mt-1.5">{name.toUpperCase()}</p>
      </div>

      {/* body text */}
      <div className="absolute inset-x-0 bottom-5 text-center px-2">
        <p className="font-display text-saltd-black text-base leading-none">SALTD.</p>
        <p className="font-body text-saltd-black/45 text-[10px] mt-1">hydration enhanced</p>
        <p className="font-body text-saltd-black/35 text-[9px] mt-2">electrolyte mix · 5g</p>
      </div>

      {/* crimped bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-3"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, ${accent} 0 4px, rgba(255,255,255,0.5) 4px 8px)`,
        }}
      />
    </div>
  );
}
