type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionTitleProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "";

  return (
    <div className={`max-w-3xl space-y-3 ${alignment}`}>
      {eyebrow ? (
        <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">{eyebrow}</p>
      ) : null}
      <h2 className="font-serif text-3xl text-brand-cream md:text-4xl">{title}</h2>
      {description ? (
        <p className="text-base leading-7 text-brand-cream/75">{description}</p>
      ) : null}
    </div>
  );
}
