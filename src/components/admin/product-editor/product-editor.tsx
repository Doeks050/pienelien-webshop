"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StockRow } from "./stock-row";

type Variant = {
  id: string;
  color: string;
  size: string;
  stock: number;
  sku: string;
};

type Product = {
  id: string;
  name: string;
  price: number;
  active: boolean;
  product_variants: Variant[];
};

export function ProductEditor({ product }: { product: Product }) {
  const router = useRouter();
  const [price, setPrice] = useState(product.price.toFixed(2));
  const [active, setActive] = useState(product.active);
  const [variants, setVariants] = useState(product.product_variants);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function updateStock(id: string, stock: number) {
    setVariants((current) =>
      current.map((variant) =>
        variant.id === id ? { ...variant, stock } : variant
      )
    );
  }

  async function save() {
    setSaving(true);
    setMessage("");

    const response = await fetch(`/api/beheer/producten/${product.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        price: Number(price.replace(",", ".")),
        active,
        variants: variants.map(({ id, stock }) => ({ id, stock })),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error ?? "Opslaan mislukt.");
      setSaving(false);
      return;
    }

    setMessage("Wijzigingen opgeslagen.");
    setSaving(false);
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Product</h2>

        <label className="mt-6 block text-sm font-medium">
          Verkoopprijs
        </label>

        <div className="mt-2 flex max-w-xs items-center rounded-xl border border-[var(--brand-border)] bg-white px-4">
          <span>€</span>
          <input
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            inputMode="decimal"
            className="w-full bg-transparent px-3 py-3 outline-none"
          />
        </div>

        <label className="mt-6 flex cursor-pointer items-center justify-between rounded-xl bg-[#f8eee8] p-4">
          <div>
            <p className="font-medium">Product zichtbaar</p>
            <p className="text-xs text-[var(--brand-muted)]">
              Zet uit om het product tijdelijk uit de webshop te halen.
            </p>
          </div>

          <input
            type="checkbox"
            checked={active}
            onChange={(event) => setActive(event.target.checked)}
            className="size-5"
          />
        </label>
      </section>

      <section className="rounded-[2rem] bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Voorraad</h2>

        <p className="mt-1 text-sm text-[var(--brand-muted)]">
          Pas de voorraad per maat aan.
        </p>

        <div className="mt-4">
          {variants.map((variant) => (
            <StockRow
              key={variant.id}
              size={variant.size}
              color={variant.color}
              value={variant.stock}
              onChange={(stock) => updateStock(variant.id, stock)}
            />
          ))}
        </div>
      </section>

      {message && (
        <p className="text-sm text-[var(--brand-muted)]">
          {message}
        </p>
      )}

      <button
        type="button"
        onClick={save}
        disabled={saving}
        className="w-full rounded-full bg-[var(--brand-dark)] px-6 py-4 font-medium text-white disabled:opacity-50"
      >
        {saving ? "Opslaan..." : "Wijzigingen opslaan"}
      </button>
    </div>
  );
}
