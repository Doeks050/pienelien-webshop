"use client";

import { Minus, Plus } from "lucide-react";
import type { CartItem } from "@/types/cart";
import { cartItemKey } from "@/lib/cart/cart-utils";
import { useCart } from "@/context/cart-context";

export function QuantityControl({ item }: { item: CartItem }) {
  const { setQuantity } = useCart();
  const key = cartItemKey(item);

  return (
    <div className="mt-3 flex items-center justify-end gap-2">
      <button
        type="button"
        aria-label="Aantal verminderen"
        onClick={() => setQuantity(key, item.quantity - 1)}
        disabled={item.quantity <= 1}
        className="flex size-8 items-center justify-center rounded-full border border-[var(--brand-border)] disabled:opacity-30"
      >
        <Minus className="size-3" />
      </button>

      <span className="w-7 text-center text-sm">
        {item.quantity}
      </span>

      <button
        type="button"
        aria-label="Aantal verhogen"
        onClick={() => setQuantity(key, item.quantity + 1)}
        disabled={item.quantity >= item.stock}
        className="flex size-8 items-center justify-center rounded-full border border-[var(--brand-border)] disabled:opacity-30"
      >
        <Plus className="size-3" />
      </button>
    </div>
  );
}
