export function SearchForm({ query = "" }: { query?: string }) {
  return (
    <form action="/zoeken" method="get" className="flex gap-3">
      <input
        name="q"
        defaultValue={query}
        placeholder="Zoek producten..."
        className="min-w-0 flex-1 rounded-full border border-[var(--brand-border)] bg-white px-5 py-3 outline-none focus:border-[var(--brand-dark)]"
      />

      <button
        type="submit"
        className="rounded-full bg-[var(--brand-dark)] px-6 py-3 text-sm font-medium text-white"
      >
        Zoeken
      </button>
    </form>
  );
}
