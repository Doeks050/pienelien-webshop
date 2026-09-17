import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="inline-flex flex-col">
      <span className="text-3xl font-semibold tracking-[-0.04em]">
        Pienelien
      </span>
      <span className="mt-0.5 text-[11px] tracking-[0.08em] text-[var(--brand-muted)]">
        klein geluk, groots geliefd
      </span>
    </Link>
  );
}
