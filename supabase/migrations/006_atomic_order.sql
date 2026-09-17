create or replace function create_order_with_stock(
  customer jsonb,
  cart_items jsonb,
  order_subtotal numeric,
  order_shipping numeric,
  order_total numeric
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  new_order_id uuid;
  item jsonb;
  current_stock integer;
begin
  insert into orders (
    first_name,
    last_name,
    email,
    street,
    house_number,
    postal_code,
    city,
    subtotal,
    shipping,
    total,
    currency
  )
  values (
    customer->>'firstName',
    customer->>'lastName',
    customer->>'email',
    customer->>'street',
    customer->>'houseNumber',
    customer->>'postalCode',
    customer->>'city',
    order_subtotal,
    order_shipping,
    order_total,
    'EUR'
  )
  returning id into new_order_id;

  for item in
    select * from jsonb_array_elements(cart_items)
  loop
    select stock
    into current_stock
    from product_variants
    where id = (item->>'variantId')::uuid
    for update;

    if current_stock is null then
      raise exception 'Variant bestaat niet';
    end if;

    if current_stock < (item->>'quantity')::integer then
      raise exception 'Onvoldoende voorraad voor SKU %', item->>'sku';
    end if;

    update product_variants
    set stock = stock - (item->>'quantity')::integer
    where id = (item->>'variantId')::uuid;

    insert into order_items (
      order_id,
      product_id,
      variant_id,
      sku,
      name,
      color,
      size,
      unit_price,
      quantity,
      line_total
    )
    values (
      new_order_id,
      (item->>'productId')::uuid,
      (item->>'variantId')::uuid,
      item->>'sku',
      item->>'name',
      item->>'color',
      item->>'size',
      (item->>'unitPrice')::numeric,
      (item->>'quantity')::integer,
      (item->>'unitPrice')::numeric * (item->>'quantity')::integer
    );
  end loop;

  return new_order_id;
end;
$$;
