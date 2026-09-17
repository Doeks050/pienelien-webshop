import { Button } from "@/components/ui/button";

export function HeroCopy() {
  return (
    <div>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-accent)]">
        Voor kleine voetjes & grote ontdekkingen
      </p>

      <h1 className="max-w-xl text-5xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl">
        Kleine dingen voor groot geluk.
      </h1>

      <p className="mt-6 max-w-lg text-base leading-7 text-[var(--brand-muted)] sm:text-lg">
        Mooie, zachte en praktische babyproducten voor thuis, onderweg en alle
        kleine momenten daartussenin.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="#shop">Bekijk de collectie</Button>
        <Button href="#over" variant="secondary">
          Ontdek Pienelien
        </Button>
      </div>
    </div>
  );
}
