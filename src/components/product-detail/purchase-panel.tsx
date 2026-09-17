"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import { productSizes } from "@/data/product-options";
import { useCart } from "@/context/cart-context";

export function PurchasePanel({ product }: { product: Product }) {
  const [size, setSize] = useState(productSizes[0]);
  const { addItem } = useCart();

  function addToCart() {
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      size,
      quantity: 1,
    });
  }

  return (
    <div className="mt-8 space-y-6">
      <div>
        <p className="text-sm font-medium">Maat</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {productSizes.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSize(option)}
              className={
                size === option
                  ? "rounded-full bg-[var(--brand-dark)] px-4 py-2 text-sm text-white"
                  : "rounded-full border border-[var(--brand-border)] px-4 py-2 text-sm"
              }
            >
              {option}
            </button>
          ))}
        </div>
      </div>

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
