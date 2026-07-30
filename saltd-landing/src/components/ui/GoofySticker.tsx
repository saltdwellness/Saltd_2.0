'use client';
import { motion } from 'framer-motion';

/**
 * A playful peeled "sticker" badge with rotating circular text.
 * Clicking jumps the visitor straight to the buy section (#flavours)
 * so an order is one tap away from the hero.
 */
export function GoofySticker({ href = '#flavours-picker' }: { href?: string }) {
  return (
    <motion.a
      href={href}
      aria-label="Shop SALTD flavours"
      className="relative inline-flex items-center justify-center w-32 h-32 sm:w-36 sm:h-36"
      initial={{ rotate: -8, scale: 0 }}
      animate={{ rotate: -8, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.6 }}
      whileHover={{ rotate: 4, scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
    >
      {/* rotating text ring */}
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      >
        <defs>
          <path id="sticker-circle" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
        </defs>
        <circle cx="100" cy="100" r="92" fill="#2E5BFF" />
        <circle cx="100" cy="100" r="92" fill="none" stroke="#0D0D0D" strokeWidth="3" strokeDasharray="2 6" />
        <text className="font-body" fill="#0D0D0D" fontSize="17" fontWeight="700" letterSpacing="3">
          <textPath href="#sticker-circle" startOffset="0%">
            SHOP THE RESET • SIP THE UPGRADE •
          </textPath>
        </text>
      </motion.svg>

      {/* center arrow */}
      <span className="relative z-10 w-12 h-12 rounded-full bg-saltd-black text-saltd-lime flex items-center justify-center text-xl font-display">
        →
      </span>
    </motion.a>
  );
}
