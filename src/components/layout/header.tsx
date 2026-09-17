export function Header() {
  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
      <div>
        <div className="text-3xl font-semibold tracking-tight">Pienelien</div>
        <div className="text-xs tracking-wide text-[#8c7770]">
          klein geluk, groots geliefd
        </div>
      </div>

      <nav className="hidden gap-8 text-sm md:flex">
        <a href="#shop">Shop</a>
        <a href="#nieuw">Nieuw</a>
        <a href="#over">Over Pienelien</a>
      </nav>

      <button className="rounded-full border border-[#d9c8bf] px-4 py-2 text-sm">
        Winkelmand
      </button>
    </header>
  );
}
