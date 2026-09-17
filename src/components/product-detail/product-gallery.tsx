type ProductGalleryProps = {
  name: string;
};

export function ProductGallery({ name }: ProductGalleryProps) {
  return (
    <div className="aspect-square overflow-hidden rounded-[2.5rem] bg-[#f3ebe6]">
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="text-8xl">🧦</div>
          <p className="mt-5 text-sm text-[var(--brand-muted)]">
            {name}
          </p>
        </div>
      </div>
    </div>
  );
}
