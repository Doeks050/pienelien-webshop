import type { Product } from "@/types/product";
import { ProductCard } from "@/components/product/product-card";

export function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) {
    return (
      <div className="rounded-[2rem] bg-[#f8eee8] p-10 text-center">
        <h2 className="text-xl font-semibold">
          Geen producten gevonden
        </h2>

        <p className="mt-2 text-sm text-[var(--brand-muted)]">
          In deze categorie staan nog geen producten.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
