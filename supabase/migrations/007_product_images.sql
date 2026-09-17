alter table products
add column if not exists image_url text;

insert into storage.buckets (
  id,
  name,
  public
)
values (
  'product-images',
  'product-images',
  true
)
on conflict (id) do nothing;

create policy "Public can view product images"
on storage.objects
for select
using (bucket_id = 'product-images');
