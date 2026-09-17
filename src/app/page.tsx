import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { About } from "@/components/home/about";
import { Hero } from "@/components/home/hero";
import { ProductPreview } from "@/components/home/product-preview";
import { UspBar } from "@/components/home/usp-bar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#3f342f]">
      <AnnouncementBar />
      <Header />
      <Hero />
      <ProductPreview />
      <About />
      <UspBar />
      <Footer />
    </main>
  );
}
