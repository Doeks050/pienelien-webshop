"use client";

type Props = {
  name: string;
  description: string;
  category: string;
  price: string;
  active: boolean;
  onName: (value: string) => void;
  onDescription: (value: string) => void;
  onCategory: (value: string) => void;
  onPrice: (value: string) => void;
  onActive: (value: boolean) => void;
};

const inputClass =
  "mt-2 w-full rounded-xl border border-[var(--brand-border)] bg-white px-4 py-3 outline-none";

export function ProductFields(props: Props) {
  return (
    <section className="rounded-[2rem] bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Productgegevens</h2>

      <label className="mt-6 block text-sm font-medium">
        Productnaam
        <input
          value={props.name}
          onChange={(e) => props.onName(e.target.value)}
          className={inputClass}
        />
      </label>

      <label className="mt-5 block text-sm font-medium">
        Omschrijving
        <textarea
          value={props.description}
          onChange={(e) => props.onDescription(e.target.value)}
          rows={5}
          className={inputClass}
        />
      </label>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">
          Categorie
          <input
            value={props.category}
            onChange={(e) => props.onCategory(e.target.value)}
            className={inputClass}
          />
        </label>

        <label className="text-sm font-medium">
          Verkoopprijs
          <input
            value={props.price}
            onChange={(e) => props.onPrice(e.target.value)}
            inputMode="decimal"
            className={inputClass}
          />
        </label>
      </div>

      <label className="mt-6 flex cursor-pointer items-center justify-between rounded-xl bg-[#f8eee8] p-4">
        <div>
          <p className="font-medium">Product zichtbaar</p>
          <p className="text-xs text-[var(--brand-muted)]">
            Zet uit om het product tijdelijk te verbergen.
          </p>
        </div>

        <input
          type="checkbox"
          checked={props.active}
          onChange={(e) => props.onActive(e.target.checked)}
          className="size-5"
        />
      </label>
    </section>
  );
}
