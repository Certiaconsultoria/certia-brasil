type ServiceCardProps = {
  title: string;
  description: string;
};

export function ServiceCard({ title, description }: ServiceCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-[1.5rem] border border-brand-line bg-brand-navy/70 p-6 shadow-soft">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/80 to-transparent opacity-70" />
      <div className="absolute -right-12 top-0 h-28 w-28 rounded-full bg-brand-gold/8 blur-2xl transition group-hover:bg-brand-gold/14" />
      <p className="text-[11px] uppercase tracking-[0.35em] text-brand-gold">Solução</p>
      <h3 className="mt-4 font-serif text-2xl text-brand-cream">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-brand-cream/75">{description}</p>
    </article>
  );
}
