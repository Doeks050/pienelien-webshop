import { getAdmin } from "@/lib/admin/get-admin";
import { getAdminProducts } from "@/lib/admin/get-admin-products";
import { AdminProductList } from "@/components/admin/product-list";

export default async function AdminPage() {
  const admin = await getAdmin();
  const products = await getAdminProducts();

  return (
    <main className="min-h-screen bg-[#f8eee8] px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm text-[var(--brand-muted)]">
          Ingelogd als {admin.email}
        </p>

        <div className="mt-2 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-semibold">
              Producten
            </h1>

            <p className="mt-2 text-[var(--brand-muted)]">
              Pas producten, foto's, prijzen en voorraad aan.
            </p>
          </div>
        </div>

        <AdminProductList products={products} />
      </div>
    </main>
  );
}
