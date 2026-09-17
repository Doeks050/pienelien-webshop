import type { Customer } from "@/types/customer";
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

type CreateOrderInput = {
  items: ValidatedItem[];
  customer: Customer;
};

export async function createOrder({
  items,
  customer,
}: CreateOrderInput) {
  const supabase = createSupabaseAdminClient();

  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  const shipping = subtotal >= 39 ? 0 : 4.95;
  const total = subtotal + shipping;

  const { data, error } = await supabase.rpc(
    "create_order_with_stock",
    {
      customer,
      cart_items: items,
      order_subtotal: subtotal,
      order_shipping: shipping,
      order_total: total,
    }
  );

  if (error || !data) {
    throw new Error(
      error?.message ?? "Bestelling aanmaken mislukt"
    );
  }

  return {
    id: String(data),
    total,
  };
}
