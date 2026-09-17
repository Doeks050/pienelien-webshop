import Link from "next/link";

type Props = {
  categories: string[];
  active?: string;
};

export function CategoryFilter({ categories, active }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/shop"
        className={
          !active
            ? "rounded-full bg-[var(--brand-dark)] px-4 py-2 text-sm text-white"
            : "rounded-full border border-[var(--brand-border)] px-4 py-2 text-sm"
        }
      >
        Alles
      </Link>

      {categories.map((category) => (
        <Link
          key={category}
          href={`/shop?categorie=${encodeURIComponent(category)}`}
          className={
            active === category
              ? "rounded-full bg-[var(--brand-dark)] px-4 py-2 text-sm text-white"
              : "rounded-full border border-[var(--brand-border)] px-4 py-2 text-sm"
          }
        >
          {category}
        </Link>
      ))}
    </div>
  );
}
