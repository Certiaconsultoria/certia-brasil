import Link from "next/link";
import { siteConfig } from "@/content/site";

export function Header() {
  return (
    <header className="border-b border-brand-line bg-brand-navy/95 backdrop-blur">
      <div className="container mx-auto flex flex-col gap-4 px-4 py-5 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="text-xl font-serif font-semibold text-brand-cream sm:text-2xl">
          {siteConfig.shortName}
          <span className="ml-2 text-xs font-sans uppercase tracking-[0.28em] text-brand-gold sm:text-sm sm:tracking-[0.35em]">
            Brasil
          </span>
        </Link>

        <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-brand-cream/85 sm:text-sm">
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
