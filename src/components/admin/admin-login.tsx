"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");

    setLoading(true);
    setError("");

    const supabase = createSupabaseBrowserClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("E-mailadres of wachtwoord klopt niet.");
      setLoading(false);
      return;
    }

    router.replace("/beheer");
    router.refresh();
  }

  return (
    <form
      onSubmit={submit}
      className="mx-auto max-w-md rounded-[2rem] bg-white p-8 shadow-sm"
    >
      <h1 className="text-3xl font-semibold">Pienelien Beheer</h1>

      <p className="mt-2 text-sm text-[var(--brand-muted)]">
        Log in om producten en voorraad te beheren.
      </p>

      <div className="mt-8 space-y-4">
        <input
          name="email"
          type="email"
          required
          placeholder="E-mailadres"
          className="w-full rounded-xl border border-[var(--brand-border)] px-4 py-3"
        />

        <input
          name="password"
          type="password"
          required
          placeholder="Wachtwoord"
          className="w-full rounded-xl border border-[var(--brand-border)] px-4 py-3"
        />
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        disabled={loading}
        className="mt-6 w-full rounded-full bg-[var(--brand-dark)] px-5 py-3 text-white disabled:opacity-50"
      >
        {loading ? "Inloggen..." : "Inloggen"}
      </button>
    </form>
  );
}
