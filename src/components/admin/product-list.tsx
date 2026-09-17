import Link from "next/link";
import { formatEuro } from "@/lib/currency";

type Variant = {
  id: string;
  stock: number;
};

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  active: boolean;
  image_url: string | null;
  product_variants: Variant[];
};

export function AdminProductList({
  products,
}: {
  products: Product[];
}) {
  return (
    <div className="mt-8 space-y-3">
      {products.map((product) => {
        const stock = product.product_variants.reduce(
          (total, variant) => total + variant.stock,
          0
        );

        return (
          <Link
            key={product.id}
            href={`/beheer/producten/${product.id}`}
            className="flex items-center justify-between gap-4 rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div>
              <p className="font-semibold">
                {product.name}
              </p>

              <p className="mt-1 text-sm text-[var(--brand-muted)]">
                {formatEuro(product.price)} · {stock} op voorraad
              </p>
            </div>

            <span
              className={
                product.active
                  ? "text-sm text-green-700"
                  : "text-sm text-red-700"
              }
            >
              {product.active ? "Online" : "Verborgen"}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
