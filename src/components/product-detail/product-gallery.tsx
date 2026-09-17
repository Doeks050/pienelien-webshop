"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductImage } from "@/types/product-image";

type Props = {
  name: string;
  image?: string;
  images?: ProductImage[];
};

export function ProductGallery({
  name,
  image,
  images = [],
}: Props) {
  const gallery = images.length
    ? images
    : image
      ? [{ id: "main", url: image, alt: name, sortOrder: 0 }]
      : [];

  const [active, setActive] = useState(0);
  const current = gallery[active];

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-[#f3ebe6]">
        {current ? (
          <Image
            src={current.url}
            alt={current.alt || name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-8xl">
            🧦
          </div>
        )}
      </div>

      {gallery.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {gallery.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(index)}
              className="relative aspect-square overflow-hidden rounded-xl bg-[#f3ebe6]"
            >
              <Image
                src={item.url}
                alt={item.alt || name}
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
