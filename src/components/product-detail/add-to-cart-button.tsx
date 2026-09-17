import { ShoppingBag } from "lucide-react";

export function AddToCartButton() {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--brand-dark)] px-6 py-4 text-sm font-medium text-white transition hover:opacity-90"
    >
      <ShoppingBag className="size-4" />
      In winkelmand
    </button>
  );
}
