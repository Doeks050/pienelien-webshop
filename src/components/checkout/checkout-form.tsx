"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";

export function CheckoutForm() {
  const { items, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const customer = {
      firstName: String(form.get("firstName") ?? ""),
      lastName: String(form.get("lastName") ?? ""),
      email: String(form.get("email") ?? ""),
      street: String(form.get("street") ?? ""),
      houseNumber: String(form.get("houseNumber") ?? ""),
      postalCode: String(form.get("postalCode") ?? ""),
      city: String(form.get("city") ?? ""),
    };

    setLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items, customer }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Bestelling mislukt");
      }

      clearCart();
      router.push(`/bestelling/${data.orderId}`);
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Er ging iets mis."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="firstName" required placeholder="Voornaam" className="rounded-xl border p-3" />
        <input name="lastName" required placeholder="Achternaam" className="rounded-xl border p-3" />
      </div>

      <input
        name="email"
        type="email"
        required
        placeholder="E-mailadres"
        className="w-full rounded-xl border p-3"
      />

      <div className="grid gap-4 sm:grid-cols-[1fr_140px]">
        <input name="street" required placeholder="Straat" className="rounded-xl border p-3" />
        <input name="houseNumber" required placeholder="Huisnr." className="rounded-xl border p-3" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <input name="postalCode" required placeholder="Postcode" className="rounded-xl border p-3" />
        <input name="city" required placeholder="Plaats" className="rounded-xl border p-3" />
      </div>

      <button
        type="submit"
        disabled={loading || items.length === 0}
        className="w-full rounded-full bg-[var(--brand-dark)] px-6 py-4 text-sm font-medium text-white disabled:opacity-50"
      >
        {loading ? "Bestelling opslaan..." : "Bestelling plaatsen"}
      </button>
    </form>
  );
}
