import type { OrderItem } from "@/types/order";
import { formatEuro } from "@/lib/currency";

export function OrderItems({ items }: { items: OrderItem[] }) {
  return (
    <div className="mt-6 space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex justify-between gap-4">
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="mt-1 text-xs text-[var(--brand-muted)]">
              {item.color} · {item.size} · {item.quantity}×
            </p>
          </div>

          <p>{formatEuro(item.lineTotal)}</p>
        </div>
      ))}
    </div>
  );
}
