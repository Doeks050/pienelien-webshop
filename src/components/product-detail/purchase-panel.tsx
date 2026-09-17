"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import type { ProductVariant } from "@/types/product-variant";
import { useCart } from "@/context/cart-context";

type Props = {
  product: Product;
  variants: ProductVariant[];
};

export function PurchasePanel({ product, variants }: Props) {
  const [variantId, setVariantId] = useState(variants[0]?.id ?? "");
  const { addItem } = useCart();

  const selected = variants.find((variant) => variant.id === variantId);

  function addToCart() {
    if (!selected) return;

    addItem({
      productId: product.id,
      variantId: selected.id,
      sku: selected.sku,
      name: product.name,
      slug: product.slug,
      price: product.price,
      color: selected.color,
      size: selected.size,
      quantity: 1,
    });
  }

  if (!variants.length) {
    return (
      <p className="mt-8 text-sm text-[var(--brand-muted)]">
        Tijdelijk uitverkocht.
      </p>
    );
  }

  return (
    <div className="mt-8 space-y-6">
      <div>
        <p className="text-sm font-medium">Maat</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {variants.map((variant) => (
            <button
              key={variant.id}
              type="button"
              onClick={() => setVariantId(variant.id)}
              className={
                variantId === variant.id
                  ? "rounded-full bg-[var(--brand-dark)] px-4 py-2 text-sm text-white"
                  : "rounded-full border border-[var(--brand-border)] px-4 py-2 text-sm"
              }
            >
              {variant.size}
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <p className="text-xs text-[var(--brand-muted)]">
          {selected.color} · {selected.stock} op voorraad
        </p>
      )}

      <button
        type="button"
        onClick={addToCart}
        className="w-full rounded-full bg-[var(--brand-dark)] px-6 py-4 text-sm font-medium text-white"
      >
        In winkelmand
      </button>
    </div>
  );
}
