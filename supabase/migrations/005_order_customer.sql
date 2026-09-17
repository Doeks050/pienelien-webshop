alter table orders
add column if not exists first_name text;

alter table orders
add column if not exists last_name text;

alter table orders
add column if not exists street text;

alter table orders
add column if not exists house_number text;

alter table orders
add column if not exists postal_code text;

alter table orders
add column if not exists city text;
