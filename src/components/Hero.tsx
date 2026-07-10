import Link from "next/link";

type HeroProps = {
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
};

export function Hero({
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden rounded-[2.25rem] border border-brand-line bg-hero-gradient px-6 py-14 shadow-soft md:px-10 md:py-20">
      <div className="absolute -left-12 top-10 h-44 w-44 rounded-full bg-brand-gold/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-64 w-64 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.22),transparent_66%)]" />
      <div className="absolute inset-y-0 right-0 hidden w-[38%] border-l border-brand-line/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0)),radial-gradient(circle_at_top,rgba(212,175,55,0.16),transparent_55%)] lg:block" />

      <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_320px] lg:items-end">
        <div className="max-w-3xl space-y-6">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-gold">CERTIA Brasil</p>
          <h1 className="font-serif text-4xl leading-tight text-brand-cream md:text-6xl">
            {title}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-brand-cream/80">{description}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={primaryHref}
              className="rounded-full bg-brand-gold px-7 py-3 text-center font-semibold text-brand-navy-deep transition hover:bg-brand-gold-soft"
            >
              {primaryLabel}
            </Link>
            <a
              href={secondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-brand-gold px-7 py-3 text-center font-semibold text-brand-gold transition hover:bg-brand-gold hover:text-brand-navy-deep"
            >
              {secondaryLabel}
            </a>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="rounded-[1.75rem] border border-brand-line bg-brand-navy-deep/50 p-6 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">Foco imediato</p>
            <div className="mt-6 space-y-5">
              <div>
                <p className="font-serif text-3xl text-brand-cream">Rastreabilidade</p>
                <p className="mt-2 text-sm leading-6 text-brand-cream/70">
                  Evidências de origem e coerência territorial.
                </p>
              </div>
              <div>
                <p className="font-serif text-3xl text-brand-cream">Conformidade</p>
                <p className="mt-2 text-sm leading-6 text-brand-cream/70">
                  Organização documental para reduzir fricção comercial.
                </p>
              </div>
              <div>
                <p className="font-serif text-3xl text-brand-cream">Mercado</p>
                <p className="mt-2 text-sm leading-6 text-brand-cream/70">
                  Preparação para compradores e mercados premium europeus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
