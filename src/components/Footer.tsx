import Link from "next/link";
import { siteConfig } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-brand-line bg-brand-navy-deep">
      <div className="container mx-auto grid gap-8 px-4 py-12 md:grid-cols-3">
        <div className="space-y-3">
          <p className="font-serif text-2xl text-brand-cream">{siteConfig.name}</p>
          <p className="max-w-sm text-sm leading-6 text-brand-cream/75">
            {siteConfig.description}
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">Navegação</p>
          <div className="flex flex-col gap-2 text-sm text-brand-cream/80">
            {siteConfig.nav.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-brand-gold">
                {item.label}
              </Link>
            ))}
            <Link href="/politica-de-privacidade" className="transition hover:text-brand-gold">
              Política de privacidade
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">Contato</p>
          <div className="space-y-2 text-sm text-brand-cream/80">
            <p>{siteConfig.email}</p>
            <p>{siteConfig.whatsappDisplay}</p>
            <a
              href={siteConfig.secondaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-brand-gold px-4 py-2 text-brand-gold transition hover:bg-brand-gold hover:text-brand-navy-deep"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
