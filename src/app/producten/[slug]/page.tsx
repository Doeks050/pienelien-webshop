import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { ProductGallery } from "@/components/product-detail/product-gallery";
import { ProductInfo } from "@/components/product-detail/product-info";
import {
  getProductBySlug,
  getVariants,
} from "@/lib/data/products";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const variants = await getVariants(product.id);

  return (
    <main className="py-10 sm:py-16">
      <Container className="grid gap-12 lg:grid-cols-2">
        <ProductGallery name={product.name} image={product.image} images={product.images} />
        <ProductInfo product={product} variants={variants} />
      </Container>
    </main>
  );
}
