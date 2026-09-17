insert into product_variants (
  product_id,
  color,
  size,
  stock,
  sku
)
select id, 'Zwart', size, 25, sku
from products
cross join (
  values
    ('0-6 mnd', 'PIE-ZWA-06'),
    ('6-12 mnd', 'PIE-ZWA-12'),
    ('1-2 jaar', 'PIE-ZWA-24')
) as v(size, sku)
where slug = 'antislip-babysokjes-zwart'
on conflict (sku) do nothing;

insert into product_variants (
  product_id,
  color,
  size,
  stock,
  sku
)
select id, 'Wit', size, 25, sku
from products
cross join (
  values
    ('0-6 mnd', 'PIE-WIT-06'),
    ('6-12 mnd', 'PIE-WIT-12'),
    ('1-2 jaar', 'PIE-WIT-24')
) as v(size, sku)
where slug = 'antislip-babysokjes-wit'
on conflict (sku) do nothing;

insert into product_variants (
  product_id,
  color,
  size,
  stock,
  sku
)
select id, 'Beige', size, 25, sku
from products
cross join (
  values
    ('0-6 mnd', 'PIE-BEI-06'),
    ('6-12 mnd', 'PIE-BEI-12'),
    ('1-2 jaar', 'PIE-BEI-24')
) as v(size, sku)
where slug = 'antislip-babysokjes-beige'
on conflict (sku) do nothing;
