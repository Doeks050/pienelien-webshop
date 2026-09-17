import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { ProductGallery } from "@/components/product-detail/product-gallery";
import { ProductInfo } from "@/components/product-detail/product-info";
import { getProductBySlug } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="py-10 sm:py-16">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-start">
        <ProductGallery name={product.name} />
        <ProductInfo product={product} />
      </Container>
    </main>
  );
}
