import Link from "next/link";
import { getAdmin } from "@/lib/admin/get-admin";
import { NewProductForm } from "@/components/admin/new-product-form";

export default async function NewProductPage() {
  await getAdmin();

  return (
    <main className="min-h-screen bg-[#f8eee8] px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/beheer"
          className="text-sm text-[var(--brand-muted)] hover:underline"
        >
          ← Terug
        </Link>

        <h1 className="mt-5 text-4xl font-semibold">
          Nieuw product
        </h1>

        <p className="mt-2 text-[var(--brand-muted)]">
          Maak eerst het product aan. Daarna voeg je maten,
          voorraad en foto&apos;s toe.
        </p>

        <div className="mt-8">
          <NewProductForm />
        </div>
      </div>
    </main>
  );
}
