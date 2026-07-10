import { CTA } from "@/components/CTA";
import { SectionTitle } from "@/components/SectionTitle";
import { clientPage } from "@/content/brandPages";
import { siteConfig } from "@/content/site";

export default function ClientePage() {
  return (
    <div className="space-y-14">
      <section className="rounded-[2rem] border border-brand-line bg-hero-gradient px-6 py-14 shadow-soft md:px-10">
        <div className="max-w-4xl space-y-5">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-gold">Área do cliente</p>
          <h1 className="font-serif text-4xl text-brand-cream md:text-5xl">{clientPage.title}</h1>
          <p className="max-w-3xl text-lg leading-8 text-brand-cream/80">{clientPage.description}</p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[1.75rem] border border-brand-line bg-brand-navy/60 p-8 shadow-soft">
          <SectionTitle
            eyebrow="Etapas"
            title="Como essa jornada pode aparecer para o cliente"
            description="A página funciona como demonstração da experiência futura de acompanhamento."
          />
          <div className="mt-8 space-y-6">
            {clientPage.steps.map((step) => (
              <div key={step.title} className="rounded-[1.25rem] border border-brand-line bg-brand-navy-deep/50 p-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="font-serif text-2xl text-brand-cream">{step.title}</h2>
                  <span className="text-xs uppercase tracking-[0.35em] text-brand-gold">{step.status}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-brand-cream/75">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-brand-line bg-brand-green-deep/25 p-8 shadow-soft">
          <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">Notificações recentes</p>
          <div className="mt-5 space-y-4">
            {clientPage.notifications.map((note) => (
              <div key={note} className="rounded-[1.25rem] border border-brand-line bg-brand-navy/55 p-4 text-brand-cream/80">
                {note}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Comece com uma leitura inicial da sua operação"
        description="Antes de uma área autenticada completa, o diagnóstico já serve como porta de entrada para o atendimento."
        primaryHref="/diagnostico"
        primaryLabel="Fazer diagnóstico"
        secondaryHref={siteConfig.secondaryCta.href}
        secondaryLabel="Falar com especialista"
      />
    </div>
  );
}
