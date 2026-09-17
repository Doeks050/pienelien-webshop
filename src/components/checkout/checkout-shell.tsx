import { CheckoutForm } from "./checkout-form";
import { CheckoutSummary } from "./checkout-summary";

export function CheckoutShell() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-accent)]">
          Gegevens
        </p>

        <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em]">
          Afrekenen
        </h1>

        <p className="mt-3 text-sm text-[var(--brand-muted)]">
          Vul je gegevens in om je bestelling te plaatsen.
        </p>

        <div className="mt-8">
          <CheckoutForm />
        </div>
      </section>

      <CheckoutSummary />
    </div>
  );
}
