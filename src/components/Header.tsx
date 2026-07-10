import Link from "next/link";
import { siteConfig } from "@/content/site";

export function Header() {
  return (
    <header className="border-b border-brand-line bg-brand-navy/95 backdrop-blur">
      <div className="container mx-auto flex flex-col gap-4 px-4 py-5 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="text-2xl font-serif font-semibold text-brand-cream">
          {siteConfig.shortName}
          <span className="ml-2 text-sm font-sans uppercase tracking-[0.35em] text-brand-gold">
            Brasil
          </span>
        </Link>

        <nav className="flex flex-wrap items-center gap-4 text-sm text-brand-cream/85">
          {siteConfig.nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-brand-gold">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
