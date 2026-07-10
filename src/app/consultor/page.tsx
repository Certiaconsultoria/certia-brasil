import { CTA } from "@/components/CTA";
import { SectionTitle } from "@/components/SectionTitle";
import { ServiceCard } from "@/components/ServiceCard";
import { consultantPage } from "@/content/brandPages";
import { siteConfig } from "@/content/site";

export default function ConsultorPage() {
  return (
    <div className="space-y-14">
      <section className="rounded-[2rem] border border-brand-line bg-hero-gradient px-6 py-14 shadow-soft md:px-10">
        <div className="max-w-4xl space-y-5">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-gold">Área do consultor</p>
          <h1 className="font-serif text-4xl text-brand-cream md:text-5xl">{consultantPage.title}</h1>
          <p className="max-w-3xl text-lg leading-8 text-brand-cream/80">{consultantPage.description}</p>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {consultantPage.resources.map((resource) => (
          <ServiceCard key={resource.title} {...resource} />
        ))}
      </section>

      <CTA
        title="Use a CERTIA como base para conversas mais maduras com seus clientes"
        description="A ideia desta área é acelerar entendimento, triagem e estruturação da jornada de adequação."
        primaryHref="/diagnostico"
        primaryLabel="Testar diagnóstico"
        secondaryHref={siteConfig.secondaryCta.href}
        secondaryLabel="Falar no WhatsApp"
      />
    </div>
  );
}
