"use client";

import Link from "next/link";
import { Search, ShoppingBag, UserRound } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { cartCount } from "@/lib/cart/cart-utils";

const iconClass = "size-5 stroke-[1.6]";

export function HeaderActions() {
  const { items } = useCart();
  const count = cartCount(items);

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <Link
        href="/zoeken"
        aria-label="Zoeken"
        className="rounded-full p-2.5 transition hover:bg-black/5"
      >
        <Search className={iconClass} />
      </Link>

      <button
        type="button"
        aria-label="Account"
        className="hidden rounded-full p-2.5 transition hover:bg-black/5 sm:block"
      >
        <UserRound className={iconClass} />
      </button>

      <Link
        href="/winkelmand"
        aria-label="Winkelmand"
        className="relative rounded-full p-2.5 transition hover:bg-black/5"
      >
        <ShoppingBag className={iconClass} />

        {count > 0 && (
          <span className="absolute right-0 top-0 flex size-5 items-center justify-center rounded-full bg-[var(--brand-dark)] text-[10px] text-white">
            {count}
          </span>
        )}
      </Link>
    </div>
  );
}
