import { formatEuro } from "@/lib/currency";

type ProductPriceProps = {
  price: number;
  compareAtPrice?: number;
};

export function ProductPrice({
  price,
  compareAtPrice,
}: ProductPriceProps) {
  return (
    <div className="mt-1 flex items-center gap-2 text-sm">
      <span className="font-medium">{formatEuro(price)}</span>

      {compareAtPrice ? (
        <span className="text-[var(--brand-muted)] line-through">
          {formatEuro(compareAtPrice)}
        </span>
      ) : null}
    </div>
  );
}
