import { ProductBadge } from "./product-badge";

type ProductImageProps = {
  name: string;
  badge?: string;
};

export function ProductImage({ name, badge }: ProductImageProps) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-[#f3ebe6]">
      <ProductBadge label={badge} />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl">🧦</div>
          <p className="mt-4 px-4 text-xs text-[var(--brand-muted)]">{name}</p>
        </div>
      </div>
    </div>
  );
}
