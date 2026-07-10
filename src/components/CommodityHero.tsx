type CommodityHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function CommodityHero({ eyebrow, title, description }: CommodityHeroProps) {
  return (
    <section className="rounded-[2rem] border border-brand-line bg-hero-gradient px-6 py-14 shadow-soft md:px-10 md:py-16">
      <div className="max-w-4xl space-y-5">
        <p className="text-xs uppercase tracking-[0.4em] text-brand-gold">{eyebrow}</p>
        <h1 className="font-serif text-4xl leading-tight text-brand-cream md:text-5xl">{title}</h1>
        <p className="max-w-3xl text-lg leading-8 text-brand-cream/80">{description}</p>
      </div>
    </section>
  );
}
