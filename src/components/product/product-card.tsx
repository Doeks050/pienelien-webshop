import Link from "next/link";
import type { Product } from "@/types/product";
import { ProductImage } from "./product-image";
import { ProductPrice } from "./product-price";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article>
      <Link href={`/producten/${product.slug}`} className="block">
        <ProductImage name={product.name} badge={product.badge} />

        <div className="mt-4">
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--brand-muted)]">
            {product.category}
          </p>

          <h3 className="mt-1 text-base font-medium">{product.name}</h3>

          <ProductPrice
            price={product.price}
            compareAtPrice={product.compareAtPrice}
          />
        </div>
      </Link>
    </article>
  );
}
