insert into products (
  name,
  slug,
  description,
  category,
  price,
  badge
)
values
(
  'Antislip babysokjes zwart',
  'antislip-babysokjes-zwart',
  'Zachte babysokjes met antislip grip.',
  'Sokjes',
  6.95,
  'Nieuw'
),
(
  'Antislip babysokjes wit',
  'antislip-babysokjes-wit',
  'Zachte babysokjes met antislip grip.',
  'Sokjes',
  6.95,
  null
),
(
  'Antislip babysokjes beige',
  'antislip-babysokjes-beige',
  'Zachte babysokjes met antislip grip.',
  'Sokjes',
  6.95,
  null
)
on conflict (slug) do nothing;
