"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import type { CartItem } from "@/types/cart";
import { cartReducer } from "@/lib/cart/cart-reducer";

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (key: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    const stored = window.localStorage.getItem("pienelien-cart");

    if (stored) {
      const parsed = JSON.parse(stored) as CartItem[];

      const valid = parsed.filter(
        (item) =>
          item.variantId &&
          typeof item.stock === "number"
      );

      dispatch({ type: "load", items: valid });
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("pienelien-cart", JSON.stringify(items));
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem: (item) => dispatch({ type: "add", item }),
        removeItem: (key) => dispatch({ type: "remove", key }),
        setQuantity: (key, quantity) =>
          dispatch({ type: "quantity", key, quantity }),
        clearCart: () => dispatch({ type: "clear" }),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
