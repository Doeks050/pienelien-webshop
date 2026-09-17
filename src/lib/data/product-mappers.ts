import type { Product } from "@/types/product";
import type { ProductVariant } from "@/types/product-variant";

export function mapProduct(row: Record<string, unknown>): Product {
  return {
    id: String(row.id),
    name: String(row.name),
    slug: String(row.slug),
    price: Number(row.price),
    category: String(row.category),
    badge: row.badge ? String(row.badge) : undefined,
  };
}

export function mapVariant(
  row: Record<string, unknown>
): ProductVariant {
  return {
    id: String(row.id),
    productId: String(row.product_id),
    color: String(row.color),
    size: String(row.size),
    stock: Number(row.stock),
    sku: String(row.sku),
  };
}
