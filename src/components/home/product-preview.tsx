const products = [
  ["Antislip babysokjes", "Vanaf €6,95"],
  ["Zachte basics", "Binnenkort"],
  ["Voor onderweg", "Binnenkort"],
];

export function ProductPreview() {
  return (
    <section id="shop" className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm uppercase tracking-[0.2em] text-[#9a786b]">
          Pienelien favorieten
        </p>

        <h2 className="mt-2 text-3xl font-semibold">
          Klein, zacht en praktisch
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map(([title, price]) => (
            <article key={title}>
              <div className="aspect-square rounded-[2rem] bg-[#f3ebe6]" />
              <h3 className="mt-5 text-lg font-medium">{title}</h3>
              <p className="mt-1 text-sm text-[#826f66]">{price}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
