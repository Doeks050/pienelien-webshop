import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function requireApiAdmin() {
  const server = await createSupabaseServerClient();

  const {
    data: { user },
  } = await server.auth.getUser();

  if (!user) return null;

  const admin = createSupabaseAdminClient();

  const { data } = await admin
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  return data ? admin : null;
}
