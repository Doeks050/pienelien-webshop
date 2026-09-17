import { NextResponse } from "next/server";
import { requireApiAdmin } from "@/lib/admin/require-api-admin";

type Props = {
  params: Promise<{ id: string }>;
};

const allowed = ["image/jpeg", "image/png", "image/webp"];

export async function POST(request: Request, { params }: Props) {
  const admin = await requireApiAdmin();

  if (!admin) {
    return NextResponse.json({ error: "Geen toegang." }, { status: 403 });
  }

  const { id } = await params;
  const form = await request.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Geen foto gekozen." }, { status: 400 });
  }

  if (!allowed.includes(file.type)) {
    return NextResponse.json(
      { error: "Gebruik JPG, PNG of WEBP." },
      { status: 400 }
    );
  }

  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json(
      { error: "Foto mag maximaal 8 MB zijn." },
      { status: 400 }
    );
  }

  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const storagePath = `${id}/${crypto.randomUUID()}.${extension}`;

  const { error: uploadError } = await admin.storage
    .from("product-images")
    .upload(storagePath, file, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json(
      { error: uploadError.message },
      { status: 400 }
    );
  }

  const { data: publicData } = admin.storage
    .from("product-images")
    .getPublicUrl(storagePath);

  const { count } = await admin
    .from("product_images")
    .select("*", { count: "exact", head: true })
    .eq("product_id", id);

  const { data: image, error: insertError } = await admin
    .from("product_images")
    .insert({
      product_id: id,
      image_url: publicData.publicUrl,
      storage_path: storagePath,
      sort_order: count ?? 0,
    })
    .select()
    .single();

  if (insertError) {
    await admin.storage.from("product-images").remove([storagePath]);

    return NextResponse.json(
      { error: insertError.message },
      { status: 400 }
    );
  }

  if ((count ?? 0) === 0) {
    await admin
      .from("products")
      .update({ image_url: publicData.publicUrl })
      .eq("id", id);
  }

  return NextResponse.json({ image });
}
