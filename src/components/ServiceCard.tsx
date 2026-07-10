type ServiceCardProps = {
  title: string;
  description: string;
};

export function ServiceCard({ title, description }: ServiceCardProps) {
  return (
    <article className="group relative flex h-full min-h-[15rem] flex-col overflow-hidden rounded-[1.5rem] border border-brand-line bg-brand-navy/70 p-5 shadow-soft sm:min-h-[18rem] sm:p-6">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/80 to-transparent opacity-70" />
      <div className="absolute -right-12 top-0 h-28 w-28 rounded-full bg-brand-gold/8 blur-2xl transition group-hover:bg-brand-gold/14" />
      <p className="text-[11px] uppercase tracking-[0.24em] text-brand-gold sm:tracking-[0.35em]">Solução</p>
      <h3 className="mt-4 break-words font-serif text-[1.55rem] leading-[1.08] text-brand-cream sm:text-[1.75rem] xl:text-[1.9rem]">
        {title}
      </h3>
      <p className="mt-4 text-sm leading-7 text-brand-cream/75 sm:text-base">{description}</p>
    </article>
  );
}
