import { Search, ShoppingBag, UserRound } from "lucide-react";

const iconClass = "size-5 stroke-[1.6]";

export function HeaderActions() {
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <button
        type="button"
        aria-label="Zoeken"
        className="rounded-full p-2.5 transition hover:bg-black/5"
      >
        <Search className={iconClass} />
      </button>

      <button
        type="button"
        aria-label="Account"
        className="hidden rounded-full p-2.5 transition hover:bg-black/5 sm:block"
      >
        <UserRound className={iconClass} />
      </button>

      <button
        type="button"
        aria-label="Winkelmand"
        className="relative rounded-full p-2.5 transition hover:bg-black/5"
      >
        <ShoppingBag className={iconClass} />
        <span className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-[var(--brand-dark)] text-[9px] text-white">
          0
        </span>
      </button>
    </div>
  );
}
