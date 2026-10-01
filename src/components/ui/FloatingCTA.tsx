'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useProducts } from '@/components/providers/ProductsProvider';
import { startingPack, packCartItem } from '@/lib/product-types';

/**
 * Floating call-to-action.
 * Desktop: a "Shop the reset" pill. Mobile: a sticky bottom bar that shows
 * "From ₹…" until the shopper picks a flavour in the flavour section, then
 * becomes a one-tap Add to cart for that flavour + pack.
 */
export function FloatingCTA() {
  // a short mount delay lets it spring in
  const [show, setShow] = useState(false);
  const products = useProducts();
  const picked = useCartStore((s) => s.picked);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 800);
    return () => clearTimeout(t);
  }, []);

  const pickedProduct = picked && products.find((p) => p.slug === picked.slug);
  const pickedPack = pickedProduct && pickedProduct.packs.find((p) => p.variantId === picked.variantId);
  const fromPrice = products.length ? Math.min(...products.map((p) => startingPack(p).price)) : null;

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.a
            key="pill"
            href="/shop"
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden lg:flex fixed bottom-5 right-5 z-[90] items-center gap-2 glass-blue font-body font-semibold pl-5 pr-6 py-3.5 rounded-full"
          >
            <ShoppingBag size={20} />
            Shop the reset →
            {/* subtle pulse ring */}
            <span className="absolute inset-0 rounded-full ring-2 ring-saltd-lime animate-ping opacity-20 pointer-events-none" />
          </motion.a>

          <motion.div
            key="bar"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="lg:hidden fixed bottom-0 inset-x-0 z-[90] glass px-4 py-3 flex items-center gap-3"
            style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
          >
            {pickedProduct && pickedPack ? (
              <>
                <div className="min-w-0 flex-1">
                  <p className="font-body font-semibold text-saltd-black text-sm truncate">{pickedProduct.name}</p>
                  <p className="font-body text-saltd-black/55 text-xs">{pickedPack.label} · ₹{pickedPack.price}</p>
                </div>
                <button
                  onClick={() => addItem(packCartItem(pickedProduct, pickedPack))}
                  disabled={!pickedPack.available}
                  className="flex-shrink-0 inline-flex items-center gap-2 bg-saltd-lime text-white font-body font-semibold px-5 py-3 rounded-full active:scale-95 transition-transform disabled:opacity-50"
                >
                  <ShoppingBag size={16} /> {pickedPack.available ? 'Add to cart' : 'Coming soon'}
                </button>
              </>
            ) : (
              <>
                <p className="min-w-0 flex-1 font-body text-sm text-saltd-black truncate">
                  <span className="font-display">SALTD.</span>
                  {fromPrice !== null && <span className="text-saltd-black/55"> · From ₹{fromPrice}</span>}
                </p>
                <a
                  href="/shop"
                  className="flex-shrink-0 bg-saltd-lime text-white font-body font-semibold px-5 py-3 rounded-full active:scale-95 transition-transform"
                >
                  Shop now →
                </a>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
