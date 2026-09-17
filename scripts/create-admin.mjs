import { createClient } from "@supabase/supabase-js";

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!email || !password) {
  console.error("ADMIN_EMAIL en ADMIN_PASSWORD ontbreken.");
  process.exit(1);
}

if (password.length < 8) {
  console.error("Gebruik een wachtwoord van minimaal 8 tekens.");
  process.exit(1);
}

const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL;

const secretKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !secretKey) {
  console.error(
    "Supabase URL of SUPABASE_SECRET_KEY ontbreekt in .env.local."
  );
  process.exit(1);
}

const supabase = createClient(
  supabaseUrl,
  secretKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

const { data, error } = await supabase.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
});

if (error) {
  console.error(error.message);
  process.exit(1);
}

const { error: adminError } = await supabase
  .from("admin_users")
  .insert({
    user_id: data.user.id,
    email,
  });

if (adminError) {
  await supabase.auth.admin.deleteUser(data.user.id);
  console.error(adminError.message);
  process.exit(1);
}

console.log("");
console.log("✓ Beheeraccount aangemaakt");
console.log(`✓ E-mail: ${email}`);
