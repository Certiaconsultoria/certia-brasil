import { CTA } from "@/components/CTA";
import { CommodityHero } from "@/components/CommodityHero";
import { SectionTitle } from "@/components/SectionTitle";
import { ServiceCard } from "@/components/ServiceCard";
import { StatCard } from "@/components/StatCard";
import { siteConfig } from "@/content/site";
import type { CommodityPageContent } from "@/content/commodities";

export function CommodityPage({ commodity }: { commodity: CommodityPageContent }) {
  return (
    <div className="space-y-14">
      <CommodityHero
        eyebrow={commodity.eyebrow}
        title={commodity.heroTitle}
        description={commodity.intro}
      />

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[1.75rem] border border-brand-line bg-brand-navy/60 p-8 shadow-soft">
          <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">Narrativa setorial</p>
          <h2 className="mt-3 font-serif text-3xl text-brand-cream">{commodity.storyTitle}</h2>
          <p className="mt-4 text-brand-cream/75 leading-7">{commodity.storyDescription}</p>
          <p className="mt-6 text-brand-cream/75 leading-7">{commodity.closing}</p>
        </div>

        <div className="rounded-[1.75rem] border border-brand-line bg-brand-green-deep/25 p-8 shadow-soft">
          <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">Por que isso importa</p>
          <ul className="mt-4 space-y-4 text-brand-cream/80">
            <li>Mais preparo para responder exigências de origem e rastreabilidade.</li>
            <li>Menos fragilidade documental em momentos críticos de negociação.</li>
            <li>Melhor base para posicionamento comercial em mercados premium.</li>
          </ul>
        </div>
      </section>

      <section className="space-y-8">
        <SectionTitle eyebrow="Mercado" title={commodity.marketTitle} />
        <div className="grid gap-6 md:grid-cols-3">
          {commodity.marketStats.map((stat) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} source={stat.source} />
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <SectionTitle
          eyebrow="Três pilares"
          title={`Como a CERTIA estrutura a adequação para ${commodity.name.toLowerCase()}`}
        />
        <div className="grid gap-6 md:grid-cols-3">
          {commodity.pillars.map((pillar) => (
            <ServiceCard key={pillar.title} {...pillar} />
          ))}
        </div>
      </section>

      <CTA
        title={`Pronto para avaliar sua operação de ${commodity.name.toLowerCase()}?`}
        description="O diagnóstico preliminar ajuda a entender o tamanho do esforço e quais lacunas merecem prioridade."
        primaryHref="/diagnostico"
        primaryLabel="Fazer diagnóstico"
        secondaryHref={siteConfig.secondaryCta.href}
        secondaryLabel="Falar com especialista"
      />
    </div>
  );
}
