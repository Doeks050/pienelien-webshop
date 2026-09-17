import { CheckoutShell } from "@/components/checkout/checkout-shell";
import { Container } from "@/components/ui/container";

export default function CheckoutPage() {
  return (
    <main className="py-12 sm:py-16">
      <Container className="max-w-6xl">
        <CheckoutShell />
      </Container>
    </main>
  );
}
