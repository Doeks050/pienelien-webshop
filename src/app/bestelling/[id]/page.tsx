import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { OrderCard } from "@/components/order/order-card";
import { getOrderById } from "@/lib/data/orders";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OrderPage({ params }: Props) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <main className="py-16">
      <Container className="max-w-2xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-accent)]">
            Bestelling ontvangen
          </p>

          <h1 className="mt-3 text-4xl font-semibold">
            Dankjewel, {order.firstName}
          </h1>

          <p className="mt-4 text-sm text-[var(--brand-muted)]">
            Ordernummer
          </p>

          <p className="mt-1 font-mono text-xs">
            {order.id}
          </p>
        </div>

        <div className="mt-10">
          <OrderCard order={order} />
        </div>

        <p className="mt-6 text-center text-sm text-[var(--brand-muted)]">
          Betaling via iDEAL voegen we toe zodra de betaalprovider actief is.
        </p>
      </Container>
    </main>
  );
}
