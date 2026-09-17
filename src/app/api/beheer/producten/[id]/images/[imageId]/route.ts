import { NextResponse } from "next/server";
import { requireApiAdmin } from "@/lib/admin/require-api-admin";

type Props = {
  params: Promise<{
    id: string;
    imageId: string;
  }>;
};

export async function PATCH(_: Request, { params }: Props) {
  const admin = await requireApiAdmin();

  if (!admin) {
    return NextResponse.json({ error: "Geen toegang." }, { status: 403 });
  }

  const { id, imageId } = await params;

  const { data: image } = await admin
    .from("product_images")
    .select("image_url")
    .eq("id", imageId)
    .eq("product_id", id)
    .maybeSingle();

  if (!image) {
    return NextResponse.json({ error: "Foto niet gevonden." }, { status: 404 });
  }

  const { error } = await admin
    .from("products")
    .update({ image_url: image.image_url })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: Props) {
  const admin = await requireApiAdmin();

  if (!admin) {
    return NextResponse.json({ error: "Geen toegang." }, { status: 403 });
  }

  const { id, imageId } = await params;

  const { data: image } = await admin
    .from("product_images")
    .select("image_url,storage_path")
    .eq("id", imageId)
    .eq("product_id", id)
    .maybeSingle();

  if (!image) {
    return NextResponse.json({ error: "Foto niet gevonden." }, { status: 404 });
  }

  const { data: product } = await admin
    .from("products")
    .select("image_url")
    .eq("id", id)
    .single();

  await admin
    .from("product_images")
    .delete()
    .eq("id", imageId)
    .eq("product_id", id);

  if (image.storage_path) {
    await admin.storage
      .from("product-images")
      .remove([image.storage_path]);
  }

  if (product?.image_url === image.image_url) {
    const { data: next } = await admin
      .from("product_images")
      .select("image_url")
      .eq("product_id", id)
      .order("sort_order")
      .limit(1)
      .maybeSingle();

    await admin
      .from("products")
      .update({ image_url: next?.image_url ?? null })
      .eq("id", id);
  }

  return NextResponse.json({ ok: true });
}
