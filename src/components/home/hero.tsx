export function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
      <div>
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#9a786b]">
          Voor kleine voetjes & grote ontdekkingen
        </p>

        <h1 className="max-w-xl text-5xl font-semibold leading-tight tracking-tight md:text-6xl">
          Kleine dingen die het dagelijks leven nét wat fijner maken.
        </h1>

        <p className="mt-6 max-w-lg text-lg leading-8 text-[#6f5d55]">
          Zachte, praktische en zorgvuldig gekozen babyproducten voor thuis,
          onderweg en die eerste kleine avonturen.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#shop"
            className="rounded-full bg-[#5b443b] px-7 py-3 text-sm font-medium text-white"
          >
            Bekijk de collectie
          </a>

          <a
            href="#over"
            className="rounded-full border border-[#cdbbb2] px-7 py-3 text-sm font-medium"
          >
            Ontdek Pienelien
          </a>
        </div>
      </div>

      <div className="flex min-h-[480px] items-center justify-center rounded-[2.5rem] bg-[#eadbd2] p-10">
        <div className="text-center">
          <div className="text-7xl">🧦</div>
          <p className="mt-6 text-sm text-[#7d665c]">Productfotografie volgt</p>
        </div>
      </div>
    </section>
  );
}
