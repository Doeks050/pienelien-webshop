import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const schema = z.object({
  price: z.number().positive().max(10000),
  active: z.boolean(),
  variants: z.array(
    z.object({
      id: z.string().uuid(),
      stock: z.number().int().min(0).max(100000),
    })
  ),
});

type Props = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: Props) {
  try {
    const { id } = await params;
    const server = await createSupabaseServerClient();

    const {
      data: { user },
    } = await server.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Niet ingelogd." }, { status: 401 });
    }

    const admin = createSupabaseAdminClient();

    const { data: adminUser } = await admin
      .from("admin_users")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!adminUser) {
      return NextResponse.json({ error: "Geen toegang." }, { status: 403 });
    }

    const body = schema.parse(await request.json());

    const { error: productError } = await admin
      .from("products")
      .update({
        price: body.price,
        active: body.active,
      })
      .eq("id", id);

    if (productError) throw productError;

    for (const variant of body.variants) {
      const { error } = await admin
        .from("product_variants")
        .update({ stock: variant.stock })
        .eq("id", variant.id)
        .eq("product_id", id);

      if (error) throw error;
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Opslaan mislukt.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
