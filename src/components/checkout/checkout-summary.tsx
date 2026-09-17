"use client";

import { useCart } from "@/context/cart-context";
import { cartTotal } from "@/lib/cart/cart-utils";
import { formatEuro } from "@/lib/currency";

export function CheckoutSummary() {
  const { items } = useCart();
  const subtotal = cartTotal(items);
  const shipping = subtotal >= 39 ? 0 : 4.95;
  const total = subtotal + shipping;

  return (
    <aside className="rounded-[2rem] bg-[#f8eee8] p-6 lg:sticky lg:top-6">
      <h2 className="text-xl font-semibold">Je bestelling</h2>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={item.variantId} className="flex justify-between gap-4">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="mt-1 text-xs text-[var(--brand-muted)]">
                {item.color} · {item.size} · {item.quantity}×
              </p>
            </div>

            <p className="shrink-0">
              {formatEuro(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3 border-t border-[var(--brand-border)] pt-5">
        <div className="flex justify-between">
          <span>Subtotaal</span>
          <span>{formatEuro(subtotal)}</span>
        </div>

        <div className="flex justify-between">
          <span>Verzending</span>
          <span>{shipping === 0 ? "Gratis" : formatEuro(shipping)}</span>
        </div>

        <div className="flex justify-between border-t border-[var(--brand-border)] pt-4 text-lg">
          <strong>Totaal</strong>
          <strong>{formatEuro(total)}</strong>
        </div>
      </div>

      {subtotal < 39 && (
        <p className="mt-4 text-xs text-[var(--brand-muted)]">
          Nog {formatEuro(39 - subtotal)} tot gratis verzending.
        </p>
      )}
    </aside>
  );
}
