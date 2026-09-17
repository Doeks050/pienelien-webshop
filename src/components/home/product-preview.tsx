import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/product/product-card";
import { products } from "@/data/products";

export function ProductPreview() {
  return (
    <section id="shop" className="bg-white py-20">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-accent)]">
              Pienelien favorieten
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em]">
              Klein, zacht en praktisch
            </h2>
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
