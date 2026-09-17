import type { CartItem } from "@/types/cart";
import { cartItemKey } from "./cart-utils";

export type CartAction =
  | { type: "load"; items: CartItem[] }
  | { type: "add"; item: CartItem }
  | { type: "remove"; key: string }
  | { type: "quantity"; key: string; quantity: number }
  | { type: "clear" };

export function cartReducer(
  state: CartItem[],
  action: CartAction
): CartItem[] {
  if (action.type === "load") return action.items;
  if (action.type === "clear") return [];

  if (action.type === "remove") {
    return state.filter((item) => cartItemKey(item) !== action.key);
  }

  if (action.type === "quantity") {
    return state.map((item) => {
      if (cartItemKey(item) !== action.key) return item;

      const stock = item.stock ?? 1;

      return {
        ...item,
        quantity: Math.min(
          Math.max(1, action.quantity),
          stock
        ),
      };
    });
  }

  const key = cartItemKey(action.item);
  const existing = state.find((item) => cartItemKey(item) === key);

  if (!existing) {
    return [
      ...state,
      {
        ...action.item,
        quantity: Math.min(action.item.quantity, action.item.stock),
      },
    ];
  }

  return state.map((item) =>
    cartItemKey(item) === key
      ? {
          ...item,
          stock: action.item.stock,
          quantity: Math.min(
            item.quantity + action.item.quantity,
            action.item.stock
          ),
        }
      : item
  );
}
