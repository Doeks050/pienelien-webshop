import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function getAdminProduct(id: string) {
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      slug,
      description,
      category,
      price,
      active,
      image_url,
      product_variants (
        id,
        color,
        size,
        stock,
        sku
      ),
      product_images (
        id,
        image_url,
        alt_text,
        sort_order,
        storage_path
      )
    `)
    .eq("id", id)
    .order("sort_order", {
      referencedTable: "product_images",
      ascending: true
    })
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
