import type { Order } from "@/types/order";
import { OrderItems } from "./order-items";
import { OrderTotals } from "./order-totals";

export function OrderCard({ order }: { order: Order }) {
  return (
    <div className="rounded-[2rem] bg-[#f8eee8] p-6 text-left sm:p-8">
      <p className="text-sm">
        Bestelling voor{" "}
        <strong>
          {order.firstName} {order.lastName}
        </strong>
      </p>

      <p className="mt-1 text-xs text-[var(--brand-muted)]">
        {order.email}
      </p>

      <OrderItems items={order.items} />

      <OrderTotals
        subtotal={order.subtotal}
        shipping={order.shipping}
        total={order.total}
      />
    </div>
  );
}
