import { About } from "@/components/home/about";
import { Hero } from "@/components/home/hero";
import { ProductPreview } from "@/components/home/product-preview";
import { UspBar } from "@/components/home/usp-bar";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProductPreview />
      <About />
      <UspBar />
    </main>
  );
}
