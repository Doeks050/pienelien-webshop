import { Container } from "@/components/ui/container";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OrderPage({ params }: Props) {
  const { id } = await params;

  return (
    <main className="py-16">
      <Container className="max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-accent)]">
          Bestelling ontvangen
        </p>

        <h1 className="mt-3 text-4xl font-semibold">
          Dankjewel voor je bestelling
        </h1>

        <p className="mt-5 text-[var(--brand-muted)]">
          Je bestelling is opgeslagen onder nummer:
        </p>

        <p className="mt-2 font-mono text-sm">
          {id}
        </p>

        <p className="mt-6 text-sm text-[var(--brand-muted)]">
          Betaling wordt later aan deze stap gekoppeld.
        </p>
      </Container>
    </main>
  );
}
