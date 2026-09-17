"use client";

import { useCart } from "@/context/cart-context";
import { cartTotal } from "@/lib/cart/cart-utils";
import { formatEuro } from "@/lib/currency";

export function CartSummary() {
  const { items } = useCart();
  const total = cartTotal(items);

  return (
    <aside className="rounded-[2rem] bg-[#f8eee8] p-6">
      <h2 className="text-xl font-semibold">Overzicht</h2>

      <div className="mt-6 flex justify-between">
        <span>Subtotaal</span>
        <strong>{formatEuro(total)}</strong>
      </div>

      <p className="mt-3 text-xs text-[var(--brand-muted)]">
        Verzendkosten worden later berekend.
      </p>

      <button
        type="button"
        className="mt-6 w-full rounded-full bg-[var(--brand-dark)] px-6 py-4 text-sm font-medium text-white"
      >
        Naar afrekenen
      </button>
    </aside>
  );
}
