"use client";

import Link from "next/link";
import type { CartItem } from "@/types/cart";
import { formatEuro } from "@/lib/currency";
import { cartItemKey } from "@/lib/cart/cart-utils";
import { useCart } from "@/context/cart-context";

export function CartRow({ item }: { item: CartItem }) {
  const { removeItem, setQuantity } = useCart();
  const key = cartItemKey(item);

  return (
    <div className="flex gap-4 border-b border-[var(--brand-border)] py-5">
      <div className="size-24 rounded-2xl bg-[#f3ebe6]" />

      <div className="flex flex-1 justify-between gap-4">
        <div>
          <Link href={`/producten/${item.slug}`} className="font-medium">
            {item.name}
          </Link>

          <p className="mt-1 text-sm text-[var(--brand-muted)]">
            {item.color} · {item.size}
          </p>

          <p className="mt-1 text-xs text-[var(--brand-muted)]">
            SKU: {item.sku}
          </p>

          <button
            type="button"
            onClick={() => removeItem(key)}
            className="mt-3 text-xs underline"
          >
            Verwijderen
          </button>
        </div>

        <div className="text-right">
          <p>{formatEuro(item.price * item.quantity)}</p>

          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(event) =>
              setQuantity(key, Number(event.target.value))
            }
            className="mt-3 w-16 rounded-lg border p-2 text-center"
          />
        </div>
      </div>
    </div>
  );
}
