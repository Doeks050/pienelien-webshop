import type { ProductImage } from "@/types/product-image";

export function mapProductImage(
  row: Record<string, unknown>
): ProductImage {
  return {
    id: String(row.id),
    url: String(row.image_url),
    alt: String(row.alt_text ?? ""),
    sortOrder: Number(row.sort_order),
  };
}
