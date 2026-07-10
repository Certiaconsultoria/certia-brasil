import { CTA } from "@/components/CTA";
import { SectionTitle } from "@/components/SectionTitle";
import { ServiceCard } from "@/components/ServiceCard";
import { whoWeAre } from "@/content/brandPages";
import { siteConfig } from "@/content/site";

export default function QuemSomosPage() {
  return (
    <div className="space-y-14">
      <section className="rounded-[2rem] border border-brand-line bg-hero-gradient px-6 py-14 shadow-soft md:px-10">
        <div className="max-w-4xl space-y-5">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-gold">Quem somos</p>
          <h1 className="font-serif text-4xl text-brand-cream md:text-5xl">{whoWeAre.title}</h1>
          <p className="max-w-3xl text-lg leading-8 text-brand-cream/80">{whoWeAre.description}</p>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {whoWeAre.pillars.map((pillar) => (
          <ServiceCard key={pillar.title} {...pillar} />
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.75rem] border border-brand-line bg-brand-navy/60 p-8 shadow-soft">
          <SectionTitle title={whoWeAre.story.title} description={whoWeAre.story.description} />
        </div>
        <div className="rounded-[1.75rem] border border-brand-line bg-brand-green-deep/25 p-8 shadow-soft">
          <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">Por que a CERTIA é diferente</p>
          <div className="mt-5 space-y-4 text-brand-cream/80">
            {whoWeAre.differentiators.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Quer entender como essa estrutura se aplica ao seu caso?"
        description="O diagnóstico preliminar cria um ponto de partida claro para a conversa com a equipe."
        primaryHref="/diagnostico"
        primaryLabel="Fazer diagnóstico"
        secondaryHref={siteConfig.secondaryCta.href}
        secondaryLabel="Falar com especialista"
      />
    </div>
  );
}
