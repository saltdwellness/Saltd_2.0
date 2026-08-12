'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCartStore, cartTotal, cartCount, cartItemImage } from '@/store/cart';
import { startCheckout } from '@/lib/checkout-client';
import Link from 'next/link';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty } = useCartStore();
  const total = cartTotal(items);
  const count = cartCount(items);
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setCheckoutError(null);
    setCheckingOut(true);
    const error = await startCheckout(items);
    if (error) {
      setCheckoutError(error);
      setCheckingOut(false); // on success we navigate away, so no need to reset
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-[200] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-[420px] bg-saltd-cream/85 backdrop-blur-2xl backdrop-saturate-150 border-l border-white/40 z-[201] flex flex-col shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-saltd-black/10">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-saltd-black" />
                <span className="font-display text-xl text-saltd-black">
                  Cart {count > 0 && <span className="text-saltd-lime">({count})</span>}
                </span>
              </div>
              <button onClick={closeCart} className="text-saltd-black/50 hover:text-saltd-black transition-colors">
                <X size={22} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag size={48} className="text-saltd-black/20" />
                  <p className="font-body text-saltd-black/50">Your cart is empty.</p>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="bg-saltd-black text-white font-body font-semibold px-6 py-3 rounded-full text-sm hover:bg-saltd-purple transition-colors"
                  >
                    Shop flavours
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-white rounded-2xl p-4">
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-saltd-cream">
                      <Image src={cartItemImage(item)} alt={item.name} fill sizes="64px" className="object-contain p-1" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body font-semibold text-sm text-saltd-black truncate">{item.name}</p>
                      <p className="font-body text-xs text-saltd-black/50 mt-0.5">₹{item.price}</p>
                      {/* Qty controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQty(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-full border border-saltd-black/20 flex items-center justify-center hover:border-saltd-black transition-colors"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="font-body text-sm w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full border border-saltd-black/20 flex items-center justify-center hover:border-saltd-black transition-colors"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-saltd-black/30 hover:text-saltd-black transition-colors"
                      >
                        <X size={14} />
                      </button>
                      <p className="font-body font-semibold text-sm text-saltd-black">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-saltd-black/10 space-y-3">
                <div className="flex justify-between font-body font-semibold text-saltd-black">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <p className="font-body text-xs text-saltd-black/40">
                  Free shipping on orders above ₹499. Taxes calculated at checkout.
                </p>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="block w-full bg-saltd-black text-white font-body font-semibold py-3.5 rounded-full text-center hover:bg-saltd-purple transition-colors text-sm"
                >
                  View cart
                </Link>
                {/* Creates a Shopify cart server-side, then redirects to Shopify's hosted checkout. */}
                <button
                  onClick={handleCheckout}
                  disabled={checkingOut}
                  className="block w-full glass-blue font-body font-semibold py-3.5 rounded-full text-center hover:scale-[1.02] transition-transform text-sm disabled:opacity-60 disabled:hover:scale-100"
                >
                  {checkingOut ? 'Starting checkout…' : 'Checkout →'}
                </button>
                {checkoutError && (
                  <p className="font-body text-xs text-red-600/90 text-center">{checkoutError}</p>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
