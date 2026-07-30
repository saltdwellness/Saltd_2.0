import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FLAVOURS } from '@/lib/flavours';

export interface CartItem {
  id: string;         // UI/dedupe key, e.g. "banta-lime-spark-10"
  variantId: string;  // Shopify variant GID — what checkout actually buys ("local:*" when offline)
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const existing = get().items.find((i) => i.id === item.id);
        if (existing) {
          set((s) => ({
            items: s.items.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i),
            isOpen: true,
          }));
        } else {
          set((s) => ({ items: [...s.items, { ...item, quantity: 1 }], isOpen: true }));
        }
      },

      removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),

      updateQty: (id, qty) => {
        if (qty < 1) { get().removeItem(id); return; }
        set((s) => ({ items: s.items.map((i) => i.id === id ? { ...i, quantity: qty } : i) }));
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: 'saltd-cart',
      // Only persist the cart contents — never the drawer's open/closed state,
      // otherwise a reload could reopen the mini-cart on its own.
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export const cartTotal = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.price * i.quantity, 0);

export const cartCount = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.quantity, 0);

/**
 * Resolve a cart item's thumbnail from the canonical flavour data (by slug parsed
 * from the id, e.g. "peach-himalayan-10" → "peach-himalayan"). This auto-heals
 * items saved with an older/broken image path; falls back to the stored image.
 */
export const cartItemImage = (item: CartItem): string => {
  const slug = item.id.replace(/-\d+$/, '');
  return FLAVOURS.find((f) => f.slug === slug)?.productShot ?? item.image;
};
