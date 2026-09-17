"use client";

import { useCart } from "@/context/cart-context";
import { CartRow } from "./cart-row";
import { CartSummary } from "./cart-summary";

export function CartContent() {
  const { items } = useCart();

  if (!items.length) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-3xl font-semibold">Je winkelmand is leeg</h1>
        <p className="mt-3 text-[var(--brand-muted)]">
          Voeg eerst iets moois toe.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
      <div>
        <h1 className="text-3xl font-semibold">Winkelmand</h1>

        <div className="mt-6">
          {items.map((item) => (
            <CartRow
              key={`${item.productId}-${item.size}`}
              item={item}
            />
          ))}
        </div>
      </div>

      <CartSummary />
    </div>
  );
}
