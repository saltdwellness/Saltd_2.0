'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

/**
 * Floating call-to-action. Appears once the user scrolls past the hero and
 * always jumps them to the flavour/product section so they can add a flavour first.
 */
export function FloatingCTA() {
  // visible from the landing page onward; a short mount delay lets it spring in
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 800);
    return () => clearTimeout(t);
  }, []);

  const handleClick = () => {
    // send them to the shop page to browse all flavours
    window.location.href = '/shop';
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={handleClick}
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-5 right-5 z-[90] flex items-center gap-2 glass-blue font-body font-semibold pl-5 pr-6 py-3.5 rounded-full"
          aria-label="Shop flavours"
        >
          <ShoppingBag size={20} />
          Shop the reset →

          {/* subtle pulse ring */}
          <span className="absolute inset-0 rounded-full ring-2 ring-saltd-lime animate-ping opacity-20 pointer-events-none" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
