import Image from "next/image";

type Props = {
  name: string;
  image?: string;
};

export function ProductGallery({ name, image }: Props) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-[#f3ebe6]">
      {image ? (
        <Image
          src={image}
          alt={name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-8xl">🧦</div>
            <p className="mt-5 text-sm text-[var(--brand-muted)]">
              {name}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
