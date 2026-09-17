import type { Product } from "@/types/product";
import { formatEuro } from "@/lib/currency";
import { productColors } from "@/data/product-options";
import { PurchasePanel } from "./purchase-panel";

export function ProductInfo({ product }: { product: Product }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-accent)]">
        {product.category}
      </p>

      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">
        {product.name}
      </h1>

      <p className="mt-4 text-xl font-medium">
        {formatEuro(product.price)}
      </p>

      <p className="mt-6 leading-7 text-[var(--brand-muted)]">
        Zachte babysokjes met antislip grip voor kleine voetjes die volop
        ontdekken.
      </p>

      <div className="mt-8">
        <p className="text-sm font-medium">Kleur</p>
        <p className="mt-2 text-sm text-[var(--brand-muted)]">
          {productColors[product.slug]}
        </p>
      </div>

      <PurchasePanel product={product} />

      <p className="mt-4 text-center text-xs text-[var(--brand-muted)]">
        Veilig betalen met iDEAL
      </p>
    </div>
  );
}
