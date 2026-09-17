export function HeroVisual() {
  return (
    <div className="relative min-h-[440px] overflow-hidden rounded-[2.5rem] bg-[var(--brand-soft)] sm:min-h-[520px]">
      <div className="absolute inset-8 rounded-[2rem] border border-white/60" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-7xl">🧦</div>
          <p className="mt-5 text-sm text-[var(--brand-muted)]">
            Pienelien productbeeld
          </p>
        </div>
      </div>
    </div>
  );
}
