import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { mapOrder } from "./order-mapper";

export async function getOrderById(id: string) {
  const supabase = createSupabaseAdminClient();

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (orderError) {
    throw new Error(orderError.message);
  }

  if (!order) {
    return null;
  }

  const { data: items, error: itemError } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", id)
    .order("created_at");

  if (itemError) {
    throw new Error(itemError.message);
  }

  return mapOrder(order, items ?? []);
}
