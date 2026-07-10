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
        <p className="text-[11px] uppercase tracking-[0.24em] text-brand-gold sm:text-xs sm:tracking-[0.35em]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance font-serif text-3xl leading-tight text-brand-cream sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-sm leading-7 text-brand-cream/75 sm:text-base">{description}</p>
      ) : null}
    </div>
  );
}
