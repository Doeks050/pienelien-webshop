import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function getAdminProducts() {
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      slug,
      price,
      active,
      image_url,
      product_variants (
        id,
        stock
      )
    `)
    .order("created_at");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
