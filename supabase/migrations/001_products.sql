create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  category text not null,
  price numeric(10,2) not null check (price >= 0),
  active boolean not null default true,
  badge text,
  created_at timestamptz not null default now()
);

create table if not exists product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  color text not null,
  size text not null,
  stock integer not null default 0 check (stock >= 0),
  sku text unique not null,
  created_at timestamptz not null default now()
);

create index if not exists products_slug_idx
on products(slug);

create index if not exists variants_product_idx
on product_variants(product_id);

alter table products enable row level security;
alter table product_variants enable row level security;

create policy "Public can read active products"
on products
for select
using (active = true);

create policy "Public can read product variants"
on product_variants
for select
using (true);
