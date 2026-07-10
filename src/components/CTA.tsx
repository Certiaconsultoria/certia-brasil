import Link from "next/link";

type CTAProps = {
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function CTA({
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: CTAProps) {
  const secondaryIsExternal = secondaryHref?.startsWith("http");

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-brand-line bg-brand-navy px-5 py-8 shadow-soft sm:px-6 md:px-10 md:py-10">
      <div className="absolute -right-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-brand-gold/10 blur-3xl" />
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-3">
          <p className="text-[11px] uppercase tracking-[0.24em] text-brand-gold sm:text-xs sm:tracking-[0.35em]">Próximo passo</p>
          <h2 className="text-balance font-serif text-3xl leading-tight text-brand-cream sm:text-4xl">{title}</h2>
          <p className="text-sm text-brand-cream/75 sm:text-base">{description}</p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href={primaryHref}
            className="inline-flex min-h-14 items-center justify-center rounded-full bg-brand-gold px-6 py-3 text-center font-semibold text-brand-navy-deep transition hover:bg-brand-gold-soft"
          >
            {primaryLabel}
          </Link>

          {secondaryHref && secondaryLabel ? (
            secondaryIsExternal ? (
              <a
                href={secondaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-brand-gold px-6 py-3 text-center font-semibold text-brand-gold transition hover:bg-brand-gold hover:text-brand-navy-deep"
              >
                {secondaryLabel}
              </a>
            ) : (
              <Link
                href={secondaryHref}
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-brand-gold px-6 py-3 text-center font-semibold text-brand-gold transition hover:bg-brand-gold hover:text-brand-navy-deep"
              >
                {secondaryLabel}
              </Link>
            )
          ) : null}
        </div>
      </div>
    </section>
  );
}
