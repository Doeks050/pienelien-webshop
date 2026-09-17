"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function NewProductForm() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");

    const form = new FormData(event.currentTarget);

    const response = await fetch("/api/beheer/producten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: String(form.get("name") ?? ""),
        category: String(form.get("category") ?? ""),
        description: String(form.get("description") ?? ""),
        price: Number(String(form.get("price") ?? "").replace(",", ".")),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error ?? "Product aanmaken mislukt.");
      setSaving(false);
      return;
    }

    router.push(`/beheer/producten/${data.id}`);
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-5 rounded-[2rem] bg-white p-6 shadow-sm"
    >
      <input
        name="name"
        required
        placeholder="Productnaam"
        className="w-full rounded-xl border border-[var(--brand-border)] px-4 py-3"
      />

      <input
        name="category"
        required
        placeholder="Categorie"
        className="w-full rounded-xl border border-[var(--brand-border)] px-4 py-3"
      />

      <textarea
        name="description"
        rows={5}
        placeholder="Omschrijving"
        className="w-full rounded-xl border border-[var(--brand-border)] px-4 py-3"
      />

      <input
        name="price"
        required
        inputMode="decimal"
        placeholder="Prijs, bijvoorbeeld 6,95"
        className="w-full rounded-xl border border-[var(--brand-border)] px-4 py-3"
      />

      {error && <p className="text-sm text-red-700">{error}</p>}

      <button
        disabled={saving}
        className="w-full rounded-full bg-[var(--brand-dark)] px-6 py-4 text-white disabled:opacity-50"
      >
        {saving ? "Aanmaken..." : "Product aanmaken"}
      </button>
    </form>
  );
}
