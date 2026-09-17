import type { Order, OrderItem } from "@/types/order";

function mapOrderItem(row: Record<string, unknown>): OrderItem {
  return {
    id: String(row.id),
    name: String(row.name),
    color: String(row.color),
    size: String(row.size),
    sku: String(row.sku),
    unitPrice: Number(row.unit_price),
    quantity: Number(row.quantity),
    lineTotal: Number(row.line_total),
  };
}

export function mapOrder(
  row: Record<string, unknown>,
  items: Record<string, unknown>[]
): Order {
  return {
    id: String(row.id),
    firstName: String(row.first_name ?? ""),
    lastName: String(row.last_name ?? ""),
    email: String(row.email ?? ""),
    subtotal: Number(row.subtotal),
    shipping: Number(row.shipping),
    total: Number(row.total),
    currency: String(row.currency),
    status: String(row.status),
    createdAt: String(row.created_at),
    items: items.map(mapOrderItem),
  };
}
