import type { Product } from "@/types/product";
import type { ProductVariant } from "@/types/product-variant";
import { formatEuro } from "@/lib/currency";
import { PurchasePanel } from "./purchase-panel";

type Props = {
  product: Product;
  variants: ProductVariant[];
};

export function ProductInfo({ product, variants }: Props) {
  const color = variants[0]?.color ?? "";

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

      {color && (
        <div className="mt-8">
          <p className="text-sm font-medium">Kleur</p>
          <p className="mt-2 text-sm text-[var(--brand-muted)]">
            {color}
          </p>
        </div>
      )}

      <PurchasePanel product={product} variants={variants} />

      <p className="mt-4 text-center text-xs text-[var(--brand-muted)]">
        Veilig betalen met iDEAL
      </p>
    </div>
  );
}
