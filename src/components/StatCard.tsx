type StatCardProps = {
  value: string;
  label: string;
  source?: string;
};

export function StatCard({ value, label, source }: StatCardProps) {
  return (
    <div className="relative overflow-hidden rounded-[1.5rem] border border-brand-line bg-brand-navy/60 p-6 shadow-soft">
      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-brand-gold to-transparent" />
      <p className="font-serif text-5xl text-brand-gold">{value}</p>
      <p className="mt-3 text-base leading-7 text-brand-cream">{label}</p>
      {source ? <p className="mt-3 text-xs uppercase tracking-[0.25em] text-brand-cream/45">{source}</p> : null}
    </div>
  );
}
