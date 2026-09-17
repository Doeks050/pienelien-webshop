import { Container } from "@/components/ui/container";
import { HeaderActions } from "./header-actions";
import { Logo } from "./logo";

const links = [
  ["Shop", "#shop"],
  ["Nieuw", "#nieuw"],
  ["Over Pienelien", "#over"],
];

export function Header() {
  return (
    <header className="border-b border-[var(--brand-border)] bg-[var(--brand-bg)]">
      <Container className="flex h-24 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-8 text-sm md:flex">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="transition hover:text-[var(--brand-muted)]"
            >
              {label}
            </a>
          ))}
        </nav>

        <HeaderActions />
      </Container>
    </header>
  );
}
