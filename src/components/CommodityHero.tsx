type CommodityHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function CommodityHero({ eyebrow, title, description }: CommodityHeroProps) {
  return (
    <section className="rounded-[2rem] border border-brand-line bg-hero-gradient px-5 py-12 shadow-soft sm:px-6 md:px-10 md:py-16">
      <div className="max-w-4xl space-y-5">
        <p className="text-[11px] uppercase tracking-[0.24em] text-brand-gold sm:text-xs sm:tracking-[0.4em]">{eyebrow}</p>
        <h1 className="text-balance font-serif text-[2.5rem] leading-tight text-brand-cream sm:text-4xl md:text-5xl">{title}</h1>
        <p className="max-w-3xl text-base leading-8 text-brand-cream/80 sm:text-lg">{description}</p>
      </div>
    </section>
  );
}
