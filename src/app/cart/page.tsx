'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Minus, Plus, X, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCartStore, cartTotal, cartCount, cartItemImage } from '@/store/cart';
import { useProducts } from '@/components/providers/ProductsProvider';
import { startingPack } from '@/lib/product-types';
import { startCheckout } from '@/lib/checkout-client';
import { Navbar } from '@/components/layout/Navbar';
import { TopMarquee } from '@/components/layout/TopMarquee';
import { Footer } from '@/components/layout/Footer';

export default function CartPage() {
  const { items, removeItem, updateQty, clearCart, closeCart } = useCartStore();
  const products = useProducts();
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
      setCheckingOut(false);
    }
  };

  // On the full cart page the slide-out mini-cart is redundant, so keep it
  // closed — including when adding a recommended flavour from this page.
  useEffect(() => {
    closeCart();
  }, [items, closeCart]);

  // Slugs already in the cart (ids look like "kala-khatta-10"), so we never
  // recommend a flavour the shopper has already added.
  const cartSlugs = new Set(items.map((i) => i.id.replace(/-\d+$/, '')));
  const recommendations = products.filter((p) => !cartSlugs.has(p.slug));

  return (
    <>
      <TopMarquee />
      <Navbar />

      <div className="min-h-screen bg-saltd-cream" style={{ paddingTop: 'calc(var(--marquee-h) + 72px)' }}>
      {/* Header */}
      <div className="bg-saltd-black py-16 px-6 lg:px-16">
        <Link href="/shop" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors font-body text-sm mb-6">
          <ArrowLeft size={16} /> Back to shop
        </Link>
        <h1 className="font-display text-section text-white">
          Your cart<span className="text-saltd-lime">.</span>
        </h1>
        {count > 0 && (
          <p className="font-body text-white/50 mt-2">{count} item{count !== 1 ? 's' : ''}</p>
        )}
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-12">
        {items.length === 0 ? (
          /* Empty state */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center py-24 gap-6"
          >
            <ShoppingBag size={64} className="text-saltd-black/15" />
            <h2 className="font-display text-[40px] text-saltd-black">Nothing here yet.</h2>
            <p className="font-body text-saltd-black/50 max-w-[320px]">
              Pick a flavour and start your reset ritual.
            </p>
            <Link
              href="/shop"
              className="bg-saltd-lime text-white font-body font-semibold px-8 py-3.5 rounded-full hover:scale-105 transition-transform"
            >
              Shop flavours →
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
            {/* Items */}
            <div className="space-y-4">
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl p-5 flex gap-5 items-center"
                >
                  <div className="relative w-20 h-20 flex-shrink-0 bg-saltd-cream rounded-xl overflow-hidden">
                    <Image src={cartItemImage(item)} alt={item.name} fill sizes="80px" className="object-contain p-2" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body font-semibold text-saltd-black">{item.name}</p>
                    <p className="font-body text-sm text-saltd-black/50 mt-0.5">₹{item.price} each</p>
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => updateQty(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-saltd-black/20 flex items-center justify-center hover:border-saltd-black transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="font-body font-semibold w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-saltd-black/20 flex items-center justify-center hover:border-saltd-black transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-saltd-black/30 hover:text-saltd-black transition-colors"
                    >
                      <X size={16} />
                    </button>
                    <p className="font-display text-xl text-saltd-black">₹{item.price * item.quantity}</p>
                  </div>
                </motion.div>
              ))}

              <button
                onClick={clearCart}
                className="font-body text-sm text-saltd-black/30 hover:text-saltd-black transition-colors underline underline-offset-4"
              >
                Clear cart
              </button>
            </div>

            {/* Order summary */}
            <div className="self-start">
              <div className="bg-saltd-black rounded-3xl p-6 text-white">
                <h2 className="font-display text-2xl mb-6">Order summary</h2>

                <div className="space-y-3 font-body text-sm">
                  <div className="flex justify-between text-white/60">
                    <span>Subtotal</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Shipping</span>
                    <span className="text-saltd-lime">{total >= 499 ? 'Free' : '₹79'}</span>
                  </div>
                  {total < 499 && (
                    <p className="text-saltd-lime/70 text-xs">Add ₹{499 - total} more for free shipping</p>
                  )}
                  <div className="border-t border-white/10 pt-3 flex justify-between font-semibold text-base text-white">
                    <span>Total</span>
                    <span>₹{total < 499 ? total + 79 : total}</span>
                  </div>
                </div>

                {/* Creates a Shopify cart server-side, then redirects to Shopify's hosted checkout. */}
                <button
                  onClick={handleCheckout}
                  disabled={checkingOut}
                  className="mt-6 block w-full bg-saltd-lime text-white font-body font-semibold py-4 rounded-full text-center hover:scale-[1.02] active:scale-95 transition-transform disabled:opacity-60 disabled:hover:scale-100"
                >
                  {checkingOut ? 'Starting checkout…' : 'Proceed to checkout →'}
                </button>
                {checkoutError && (
                  <p className="font-body text-xs text-red-300 text-center mt-3">{checkoutError}</p>
                )}

                <p className="font-body text-xs text-white/30 text-center mt-4">
                  Secure checkout powered by Shopify
                </p>
              </div>

              {/* You might also like — never shows a flavour that's already in the cart */}
              {recommendations.length > 0 && (
                <div className="mt-8">
                  <p className="font-body font-semibold text-saltd-black/50 text-xs uppercase tracking-widest mb-4">
                    You might also like
                  </p>
                  <div className="space-y-3">
                    {recommendations.map((f) => {
                      const starter = startingPack(f);
                      return (
                      <div key={f.slug} className="bg-white rounded-xl p-3 flex gap-3 items-center">
                        <Link
                          href={`/product/${f.slug}`}
                          className="relative w-12 h-12 flex-shrink-0 bg-saltd-cream rounded-lg overflow-hidden"
                        >
                          <Image src={f.boxImage} alt={f.name} fill sizes="48px" className="object-cover" />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link href={`/product/${f.slug}`}>
                            <p className="font-body font-semibold text-sm text-saltd-black truncate hover:text-saltd-lime transition-colors">
                              {f.name}
                            </p>
                          </Link>
                          <p className="font-body text-xs text-saltd-black/50">From ₹{starter.price}</p>
                        </div>
                        <button
                          onClick={() => useCartStore.getState().addItem({
                            id: `${f.slug}-${starter.size}`,
                            variantId: starter.variantId,
                            name: `${f.name} · ${starter.size} sticks`,
                            price: starter.price,
                            image: f.productShot,
                            quantity: 1,
                          })}
                          className="text-xs font-body font-semibold px-4 py-2 rounded-full bg-saltd-lime text-white hover:scale-105 active:scale-95 transition-transform"
                        >
                          Add
                        </button>
                      </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      </div>

      <Footer />
    </>
  );
}
