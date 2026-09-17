import { createSupabaseServerClient } from "@/lib/supabase/server";
import { mapProduct, mapVariant } from "./product-mappers";

export async function getProducts() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .order("created_at");

  if (error) {
    throw new Error(`Products ophalen mislukt: ${error.message}`);
  }

  return data.map(mapProduct);
}

export async function getProductBySlug(slug: string) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();

  if (error) {
    throw new Error(`Product ophalen mislukt: ${error.message}`);
  }

  return data ? mapProduct(data) : null;
}

export async function getVariants(productId: string) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("product_variants")
    .select("*")
    .eq("product_id", productId)
    .gt("stock", 0)
    .order("size");

  if (error) {
    throw new Error(`Varianten ophalen mislukt: ${error.message}`);
  }

  return data.map(mapVariant);
}
