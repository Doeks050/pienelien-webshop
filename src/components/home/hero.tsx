import { Container } from "@/components/ui/container";
import { HeroCopy } from "./hero-copy";
import { HeroVisual } from "./hero-visual";

export function Hero() {
  return (
    <section className="py-12 sm:py-16 lg:py-24">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <HeroCopy />
        <HeroVisual />
      </Container>
    </section>
  );
}
