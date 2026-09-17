export function Footer() {
  return (
    <footer className="bg-[#49372f] px-6 py-14 text-[#f9f3ef]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-2xl font-semibold">Pienelien</div>
          <p className="mt-1 text-sm text-[#d9c9c1]">
            klein geluk, groots geliefd
          </p>
        </div>

        <p className="text-xs text-[#cdbbb2]">
          © 2026 Pienelien. Alle rechten voorbehouden.
        </p>
      </div>
    </footer>
  );
}
