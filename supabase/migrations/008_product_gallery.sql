create table if not exists product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  image_url text not null,
  alt_text text,
  sort_order integer not null default 0 check (sort_order >= 0),
  created_at timestamptz not null default now()
);

create index if not exists product_images_product_id_idx
on product_images(product_id);

alter table product_images enable row level security;

create policy "Public can view product images"
on product_images
for select
using (
  exists (
    select 1
    from products
    where products.id = product_images.product_id
      and products.active = true
  )
);
