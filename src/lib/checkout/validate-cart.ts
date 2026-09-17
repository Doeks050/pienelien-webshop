import type { CartItem } from "@/types/cart";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function validateCart(items: CartItem[]) {
  const supabase = createSupabaseAdminClient();
  const validated = [];

  for (const item of items) {
    const { data: variant, error } = await supabase
      .from("product_variants")
      .select("id, color, size, stock, sku, products(id, name, price)")
      .eq("id", item.variantId)
      .single();

    if (error || !variant) {
      throw new Error(`Variant niet gevonden: ${item.variantId}`);
    }

    if (variant.stock < item.quantity) {
      throw new Error(`Niet genoeg voorraad voor ${item.name}`);
    }

    const product = Array.isArray(variant.products)
      ? variant.products[0]
      : variant.products;

    if (!product) {
      throw new Error(`Product ontbreekt voor ${item.sku}`);
    }

    validated.push({
      productId: product.id,
      variantId: variant.id,
      sku: variant.sku,
      name: product.name,
      color: variant.color,
      size: variant.size,
      unitPrice: Number(product.price),
      quantity: item.quantity,
    });
  }

  return validated;
}
