import { Container } from "@/components/ui/container";
import { CategoryFilter } from "@/components/shop/category-filter";
import { ProductGrid } from "@/components/shop/product-grid";
import { ShopHeader } from "@/components/shop/shop-header";
import { getProducts } from "@/lib/data/products";

type Props = {
  searchParams: Promise<{
    categorie?: string;
  }>;
};

export default async function ShopPage({ searchParams }: Props) {
  const { categorie } = await searchParams;
  const products = await getProducts();

  const categories = [...new Set(products.map((product) => product.category))];

  const filtered = categorie
    ? products.filter((product) => product.category === categorie)
    : products;

  return (
    <main className="py-12 sm:py-16">
      <Container>
        <ShopHeader />

        <div className="mt-8">
          <CategoryFilter
            categories={categories}
            active={categorie}
          />
        </div>

        <div className="mt-10">
          <ProductGrid products={filtered} />
        </div>
      </Container>
    </main>
  );
}
