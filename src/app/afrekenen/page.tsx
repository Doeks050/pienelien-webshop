import { Container } from "@/components/ui/container";
import { CheckoutForm } from "@/components/checkout/checkout-form";

export default function CheckoutPage() {
  return (
    <main className="py-12 sm:py-16">
      <Container className="max-w-2xl">
        <h1 className="mb-8 text-4xl font-semibold">Afrekenen</h1>
        <CheckoutForm />
      </Container>
    </main>
  );
}
