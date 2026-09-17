import { formatEuro } from "@/lib/currency";

type Props = {
  subtotal: number;
  shipping: number;
  total: number;
};

export function OrderTotals({
  subtotal,
  shipping,
  total,
}: Props) {
  return (
    <div className="mt-6 space-y-3 border-t border-[var(--brand-border)] pt-5">
      <div className="flex justify-between">
        <span>Subtotaal</span>
        <span>{formatEuro(subtotal)}</span>
      </div>

      <div className="flex justify-between">
        <span>Verzending</span>
        <span>{shipping === 0 ? "Gratis" : formatEuro(shipping)}</span>
      </div>

      <div className="flex justify-between border-t border-[var(--brand-border)] pt-4 text-lg">
        <strong>Totaal</strong>
        <strong>{formatEuro(total)}</strong>
      </div>
    </div>
  );
}
