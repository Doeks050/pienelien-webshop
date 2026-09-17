import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function getAdmin() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/beheer/login");
  }

  const admin = createSupabaseAdminClient();

  const { data } = await admin
    .from("admin_users")
    .select("user_id,email")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!data) {
    await supabase.auth.signOut();
    redirect("/beheer/login");
  }

  return {
    id: user.id,
    email: data.email,
  };
}
