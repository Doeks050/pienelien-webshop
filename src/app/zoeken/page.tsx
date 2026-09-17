import { Container } from "@/components/ui/container";
import { SearchForm } from "@/components/search/search-form";
import { SearchResults } from "@/components/search/search-results";
import { searchProducts } from "@/lib/data/search-products";

type Props = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const products = q ? await searchProducts(q) : [];

  return (
    <main className="py-12 sm:py-16">
      <Container className="max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-accent)]">
          Zoeken
        </p>

        <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em]">
          Vind wat je zoekt
        </h1>

        <div className="mt-8 max-w-2xl">
          <SearchForm query={q} />
        </div>

        <div className="mt-10">
          <SearchResults query={q} products={products} />
        </div>
      </Container>
    </main>
  );
}
