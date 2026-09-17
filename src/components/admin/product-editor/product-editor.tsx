"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StockRow } from "./stock-row";
import { PhotoManager } from "./photo-manager";
import { ProductFields } from "./product-fields";

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
  description: string | null;
  category: string;
  price: number;
  active: boolean;
  image_url: string | null;
  product_variants: Variant[];
  product_images: {
    id: string;
    image_url: string;
  }[];
};

export function ProductEditor({ product }: { product: Product }) {
  const router = useRouter();
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description ?? "");
  const [category, setCategory] = useState(product.category);
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
        name,
        description,
        category,
        price: Number(price.replace(",", ".")),
        active,
        variants: variants.map(({ id, stock }) => ({ id, stock })),
      }),
    });

    const data = await response.json();

    setMessage(
      response.ok
        ? "Wijzigingen opgeslagen."
        : data.error ?? "Opslaan mislukt."
    );

    setSaving(false);

    if (response.ok) {
      router.refresh();
    }
  }

  return (
    <div className="space-y-6">
      <ProductFields
        name={name}
        description={description}
        category={category}
        price={price}
        active={active}
        onName={setName}
        onDescription={setDescription}
        onCategory={setCategory}
        onPrice={setPrice}
        onActive={setActive}
      />

      <section className="rounded-[2rem] bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Voorraad</h2>

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

      <PhotoManager
        productId={product.id}
        mainImage={product.image_url}
        photos={product.product_images}
      />

      {message && (
        <p className="text-sm text-[var(--brand-muted)]">{message}</p>
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
