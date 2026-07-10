type StatCardProps = {
  value: string;
  label: string;
  source?: string;
};

export function StatCard({ value, label, source }: StatCardProps) {
  return (
    <div className="relative overflow-hidden rounded-[1.5rem] border border-brand-line bg-brand-navy/60 p-5 shadow-soft sm:p-6">
      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-brand-gold to-transparent" />
      <p className="font-serif text-4xl text-brand-gold sm:text-5xl">{value}</p>
      <p className="mt-3 text-sm leading-7 text-brand-cream sm:text-base">{label}</p>
      {source ? <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-brand-cream/45 sm:text-xs sm:tracking-[0.25em]">{source}</p> : null}
    </div>
  );
}
