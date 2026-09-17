import { CartContent } from "@/components/cart/cart-content";
import { Container } from "@/components/ui/container";

export default function CartPage() {
  return (
    <main className="py-12 sm:py-16">
      <Container>
        <CartContent />
      </Container>
    </main>
  );
}
