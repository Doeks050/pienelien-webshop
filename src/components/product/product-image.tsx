import Image from "next/image";
import { ProductBadge } from "./product-badge";

type Props = {
  name: string;
  image?: string;
  badge?: string;
};

export function ProductImage({ name, image, badge }: Props) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-[#f3ebe6]">
      <ProductBadge label={badge} />

      {image ? (
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl">🧦</div>
            <p className="mt-4 px-4 text-xs text-[var(--brand-muted)]">
              {name}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
