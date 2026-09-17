"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { CustomerFields } from "./customer-fields";

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

    try {
      setLoading(true);

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, customer }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Bestelling mislukt");
      }

      clearCart();
      router.push(`/bestelling/${data.orderId}`);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Er ging iets mis.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit}>
      <CustomerFields />

      <button
        type="submit"
        disabled={loading || items.length === 0}
        className="mt-6 w-full rounded-full bg-[var(--brand-dark)] px-6 py-4 text-sm font-medium text-white disabled:opacity-50"
      >
        {loading ? "Bestelling opslaan..." : "Bestelling plaatsen"}
      </button>

      <p className="mt-3 text-center text-xs text-[var(--brand-muted)]">
        Betaling wordt later via iDEAL toegevoegd.
      </p>
    </form>
  );
}
