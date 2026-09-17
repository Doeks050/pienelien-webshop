import { NextResponse } from "next/server";
import { z } from "zod";
import { requireApiAdmin } from "@/lib/admin/require-api-admin";

const schema = z.object({
  name: z.string().trim().min(2).max(200),
  category: z.string().trim().min(2).max(100),
  description: z.string().trim().max(5000),
  price: z.number().positive().max(10000),
});

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function POST(request: Request) {
  try {
    const admin = await requireApiAdmin();

    if (!admin) {
      return NextResponse.json({ error: "Geen toegang." }, { status: 403 });
    }

    const body = schema.parse(await request.json());
    const slug = `${slugify(body.name)}-${Date.now().toString().slice(-5)}`;

    const { data, error } = await admin
      .from("products")
      .insert({
        name: body.name,
        slug,
        category: body.category,
        description: body.description || null,
        price: body.price,
        active: false,
      })
      .select("id")
      .single();

    if (error) throw error;

    return NextResponse.json({ id: data.id });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Product aanmaken mislukt.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
