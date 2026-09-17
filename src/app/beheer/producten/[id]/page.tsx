import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdmin } from "@/lib/admin/get-admin";
import { getAdminProduct } from "@/lib/admin/get-admin-product";
import { ProductEditor } from "@/components/admin/product-editor/product-editor";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminProductPage({ params }: Props) {
  await getAdmin();

  const { id } = await params;
  const product = await getAdminProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f8eee8] px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/beheer"
          className="text-sm text-[var(--brand-muted)] hover:underline"
        >
          ← Terug naar producten
        </Link>

        <h1 className="mt-5 text-4xl font-semibold">
          {product.name}
        </h1>

        <p className="mt-2 text-sm text-[var(--brand-muted)]">
          Beheer prijs, zichtbaarheid en voorraad.
        </p>

        <div className="mt-8">
          <ProductEditor product={product} />
        </div>
      </div>
    </main>
  );
}
