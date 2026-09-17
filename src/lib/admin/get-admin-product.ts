import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function getAdminProduct(id: string) {
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
        color,
        size,
        stock,
        sku
      )
    `)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
