import type { CartItem } from "@/types/cart";

export function cartItemKey(item: CartItem) {
  return `${item.productId}-${item.size}`;
}

export function cartTotal(items: CartItem[]) {
  return items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}

export function cartCount(items: CartItem[]) {
  return items.reduce((total, item) => total + item.quantity, 0);
}
