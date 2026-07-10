import { CTA } from "@/components/CTA";
import { SectionTitle } from "@/components/SectionTitle";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/content/services";
import { siteConfig } from "@/content/site";

export default function SolucoesPage() {
  return (
    <div className="space-y-12">
      <SectionTitle
        eyebrow="Soluções"
        title="Serviços pensados para destravar conformidade e confiança comercial"
        description="Da triagem inicial até o acompanhamento contínuo, a CERTIA organiza a jornada de adequação em blocos claros e mais fáceis de executar."
      />

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </section>

      <CTA
        title="Comece pelo ponto mais objetivo"
        description="Se ainda não está claro por onde começar, o diagnóstico ajuda a priorizar riscos e oportunidades da operação."
        primaryHref="/diagnostico"
        primaryLabel="Iniciar diagnóstico"
        secondaryHref={siteConfig.secondaryCta.href}
        secondaryLabel="Falar no WhatsApp"
      />
    </div>
  );
}
