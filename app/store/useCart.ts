import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  quantity: number;
}

export interface CartStore {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  deleteFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem)
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };

          return {
            items: [...state.items, item],
          };
        }),
      removeFromCart: (id) =>
        set((state) => {
          return {
            items: state.items
              .map((i) =>
                i.id === id ? { ...i, quantity: i.quantity - 1 } : i
              )
              .filter((i) => i.quantity > 0),
          };
        }),
      deleteFromCart: (id) =>
        set((state) => {
          return {
            items: state.items.filter((i) => i.id !== id),
          };
        }),
      clearCart: () =>
        set(() => {
          return {
            items: [],
          };
        }),
    }),
    { name: "cart" }
  )
);
