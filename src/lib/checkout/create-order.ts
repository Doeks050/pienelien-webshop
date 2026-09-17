import { createSupabaseAdminClient } from "@/lib/supabase/admin";

type ValidatedItem = {
  productId: string;
  variantId: string;
  sku: string;
  name: string;
  color: string;
  size: string;
  unitPrice: number;
  quantity: number;
};

export async function createOrder(items: ValidatedItem[]) {
  const supabase = createSupabaseAdminClient();

  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  const shipping = subtotal >= 39 ? 0 : 4.95;
  const total = subtotal + shipping;

  const { data: order, error } = await supabase
    .from("orders")
    .insert({
      subtotal,
      shipping,
      total,
      currency: "EUR",
    })
    .select("id, total")
    .single();

  if (error || !order) {
    throw new Error(error?.message ?? "Order aanmaken mislukt");
  }

  const rows = items.map((item) => ({
    order_id: order.id,
    product_id: item.productId,
    variant_id: item.variantId,
    sku: item.sku,
    name: item.name,
    color: item.color,
    size: item.size,
    unit_price: item.unitPrice,
    quantity: item.quantity,
    line_total: item.unitPrice * item.quantity,
  }));

  const { error: itemError } = await supabase
    .from("order_items")
    .insert(rows);

  if (itemError) {
    throw new Error(itemError.message);
  }

  return order;
}
