const items = [
  ["Met zorg gekozen", "Praktische babyproducten"],
  ["Snelle verzending", "Vanuit Nederland"],
  ["Veilig betalen", "iDEAL en meer"],
];

export function UspBar() {
  return (
    <section className="border-y border-[#eadfd8] bg-[#f8eee8] px-6 py-10">
      <div className="mx-auto grid max-w-6xl gap-8 text-center md:grid-cols-3">
        {items.map(([title, text]) => (
          <div key={title}>
            <strong className="block">{title}</strong>
            <span className="mt-1 block text-sm text-[#806c63]">{text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
