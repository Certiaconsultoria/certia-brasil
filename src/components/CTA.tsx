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
    <section className="relative overflow-hidden rounded-[2rem] border border-brand-line bg-brand-navy px-6 py-10 shadow-soft md:px-10">
      <div className="absolute -right-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-brand-gold/10 blur-3xl" />
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">Próximo passo</p>
          <h2 className="font-serif text-3xl text-brand-cream">{title}</h2>
          <p className="text-brand-cream/75">{description}</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href={primaryHref}
            className="rounded-full bg-brand-gold px-6 py-3 text-center font-semibold text-brand-navy-deep transition hover:bg-brand-gold-soft"
          >
            {primaryLabel}
          </Link>

          {secondaryHref && secondaryLabel ? (
            secondaryIsExternal ? (
              <a
                href={secondaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-brand-gold px-6 py-3 text-center font-semibold text-brand-gold transition hover:bg-brand-gold hover:text-brand-navy-deep"
              >
                {secondaryLabel}
              </a>
            ) : (
              <Link
                href={secondaryHref}
                className="rounded-full border border-brand-gold px-6 py-3 text-center font-semibold text-brand-gold transition hover:bg-brand-gold hover:text-brand-navy-deep"
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
