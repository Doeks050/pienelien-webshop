import { createSupabaseServerClient } from "@/lib/supabase/server";
import { mapProduct, mapVariant } from "./product-mappers";
import { mapProductImage } from "./product-image-mapper";

export async function getProducts() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .order("created_at");

  if (error) {
    throw new Error(error.message);
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
    throw new Error(error.message);
  }

  if (!data) return null;

  const { data: images, error: imageError } = await supabase
    .from("product_images")
    .select("*")
    .eq("product_id", data.id)
    .order("sort_order");

  if (imageError) {
    throw new Error(imageError.message);
  }

  return {
    ...mapProduct(data),
    images: (images ?? []).map(mapProductImage),
  };
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
    throw new Error(error.message);
  }

  return data.map(mapVariant);
}
