import { createSupabaseServerClient } from "@/lib/supabase/server";
import { mapProduct } from "./product-mappers";

export async function searchProducts(query: string) {
  const term = query.trim();

  if (!term) return [];

  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .or(`name.ilike.%${term}%,category.ilike.%${term}%`)
    .order("created_at");

  if (error) {
    throw new Error(`Zoeken mislukt: ${error.message}`);
  }

  return data.map(mapProduct);
}
