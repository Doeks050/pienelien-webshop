import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const [, , slug, filePath, sortArg = "0"] = process.argv;

if (!slug || !filePath) {
  console.error(
    "Gebruik: npm run product:image -- <product-slug> <bestand> [volgorde]"
  );
  process.exit(1);
}

const supabaseUrl = process.env.SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !secretKey) {
  console.error("SUPABASE_URL of SUPABASE_SECRET_KEY ontbreekt.");
  process.exit(1);
}

if (!fs.existsSync(filePath)) {
  console.error(`Bestand niet gevonden: ${filePath}`);
  process.exit(1);
}

const sortOrder = Number(sortArg);

if (!Number.isInteger(sortOrder) || sortOrder < 0) {
  console.error("Volgorde moet 0 of hoger zijn.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, secretKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

const { data: product, error: productError } = await supabase
  .from("products")
  .select("id,name,image_url")
  .eq("slug", slug)
  .single();

if (productError || !product) {
  console.error(`Product niet gevonden: ${slug}`);
  process.exit(1);
}

const extension = path.extname(filePath).toLowerCase();
const filename = `${crypto.randomUUID()}${extension}`;
const storagePath = `${product.id}/${filename}`;
const buffer = fs.readFileSync(filePath);

const contentTypes = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

const contentType = contentTypes[extension];

if (!contentType) {
  console.error("Gebruik JPG, JPEG, PNG of WEBP.");
  process.exit(1);
}

const { error: uploadError } = await supabase.storage
  .from("product-images")
  .upload(storagePath, buffer, {
    contentType,
    upsert: false,
  });

if (uploadError) {
  console.error(uploadError.message);
  process.exit(1);
}

const { data: publicData } = supabase.storage
  .from("product-images")
  .getPublicUrl(storagePath);

const publicUrl = publicData.publicUrl;

const { error: imageError } = await supabase
  .from("product_images")
  .insert({
    product_id: product.id,
    image_url: publicUrl,
    alt_text: product.name,
    sort_order: sortOrder,
  });

if (imageError) {
  await supabase.storage.from("product-images").remove([storagePath]);
  console.error(imageError.message);
  process.exit(1);
}

if (sortOrder === 0 || !product.image_url) {
  const { error: mainImageError } = await supabase
    .from("products")
    .update({ image_url: publicUrl })
    .eq("id", product.id);

  if (mainImageError) {
    console.error(
      `Foto gekoppeld, maar hoofdafbeelding kon niet worden bijgewerkt: ${mainImageError.message}`
    );
    process.exit(1);
  }
}

console.log("");
console.log(`✓ Product: ${product.name}`);
console.log(`✓ Volgorde: ${sortOrder}`);
console.log(`✓ URL: ${publicUrl}`);
