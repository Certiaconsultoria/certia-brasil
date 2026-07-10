type FaqItem = {
  question: string;
  answer: string;
};

type FAQProps = {
  items: FaqItem[];
};

export function FAQ({ items }: FAQProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <details
          key={item.question}
          className="rounded-[1.25rem] border border-brand-line bg-brand-navy/60 p-5"
        >
          <summary className="cursor-pointer list-none font-medium text-brand-cream">
            {item.question}
          </summary>
          <p className="mt-3 text-sm leading-6 text-brand-cream/75">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
