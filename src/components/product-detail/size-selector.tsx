import { productSizes } from "@/data/product-options";

export function SizeSelector() {
  return (
    <div>
      <p className="text-sm font-medium">Maat</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {productSizes.map((size) => (
          <button
            key={size}
            type="button"
            className="rounded-full border border-[var(--brand-border)] px-4 py-2 text-sm transition hover:bg-white"
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
