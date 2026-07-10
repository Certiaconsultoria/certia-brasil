import Link from "next/link";

type ProductCardProps = {
  name: string;
  href: string;
  premium?: string;
  description?: string;
};

export function ProductCard({ name, href, premium, description }: ProductCardProps) {
  return (
    <Link
      href={href}
      className="rounded-[1.25rem] border border-brand-line bg-brand-green-deep/35 px-4 py-5 text-center transition hover:-translate-y-1 hover:border-brand-gold hover:bg-brand-green-deep/45 sm:px-5 sm:py-6"
    >
      {premium ? (
        <p className="text-[11px] uppercase tracking-[0.24em] text-brand-gold sm:text-xs sm:tracking-[0.35em]">{premium}</p>
      ) : null}
      <p className="mt-2 text-lg font-medium text-brand-cream sm:text-xl">{name}</p>
      {description ? <p className="mt-3 text-sm leading-6 text-brand-cream/70">{description}</p> : null}
    </Link>
  );
}
