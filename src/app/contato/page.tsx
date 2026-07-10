import { CTA } from "@/components/CTA";
import { SectionTitle } from "@/components/SectionTitle";
import { siteConfig } from "@/content/site";

export default function ContatoPage() {
  return (
    <div className="space-y-12">
      <SectionTitle
        eyebrow="Contato"
        title="Fale com a CERTIA Brasil"
        description="Se você já sabe seu contexto ou quer discutir um caso específico, use os canais abaixo para acelerar a conversa."
      />

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[1.5rem] border border-brand-line bg-brand-navy/70 p-6 shadow-soft">
          <h2 className="font-serif text-2xl text-brand-cream">Atendimento comercial</h2>
          <p className="mt-3 text-brand-cream/75">
            WhatsApp: {siteConfig.whatsappDisplay}
          </p>
          <p className="mt-2 text-brand-cream/75">E-mail: {siteConfig.email}</p>
        </div>

        <div className="rounded-[1.5rem] border border-brand-line bg-brand-navy/70 p-6 shadow-soft">
          <h2 className="font-serif text-2xl text-brand-cream">Melhor forma de começar</h2>
          <p className="mt-3 text-brand-cream/75">
            Se você quer um retorno mais contextualizado, faça primeiro o diagnóstico preliminar.
          </p>
        </div>
      </section>

      <CTA
        title="Prefere chegar na conversa com um retrato inicial?"
        description="O diagnóstico cria uma base simples para a equipe entender seu momento antes do contato."
        primaryHref="/diagnostico"
        primaryLabel="Fazer diagnóstico"
        secondaryHref={siteConfig.secondaryCta.href}
        secondaryLabel="Chamar no WhatsApp"
      />
    </div>
  );
}
