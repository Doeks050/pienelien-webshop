import type { Product } from "@/types/product";
import { ProductGrid } from "@/components/shop/product-grid";

type Props = {
  query: string;
  products: Product[];
};

export function SearchResults({ query, products }: Props) {
  if (!query) {
    return (
      <p className="text-sm text-[var(--brand-muted)]">
        Vul hierboven een zoekterm in.
      </p>
    );
  }

  return (
    <div>
      <p className="mb-6 text-sm text-[var(--brand-muted)]">
        {products.length} resultaat{products.length === 1 ? "" : "en"} voor
        {" "}
        <strong>&ldquo;{query}&rdquo;</strong>
      </p>

      <ProductGrid products={products} />
    </div>
  );
}
