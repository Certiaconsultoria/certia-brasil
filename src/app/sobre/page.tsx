import { CTA } from "@/components/CTA";
import { SectionTitle } from "@/components/SectionTitle";
import { siteConfig } from "@/content/site";

export default function SobrePage() {
  return (
    <div className="space-y-12">
      <SectionTitle
        eyebrow="Sobre"
        title="Uma proposta técnica e comercial para operações que precisam se adequar"
        description="A CERTIA Brasil nasce para traduzir exigências regulatórias em um caminho mais objetivo para produtores, exportadores e consultores."
      />

      <section className="grid gap-6 md:grid-cols-3">
        {[
          [
            "Quem é a CERTIA",
            "Uma estrutura voltada a conformidade EUDR, organização documental e melhor preparação para mercados mais exigentes.",
          ],
          [
            "Autoridade técnica",
            "Atuação orientada por leitura regulatória, diligência e necessidade prática de quem precisa provar origem e conformidade.",
          ],
          [
            "Diferenciais",
            "Comunicação clara, foco em conversão comercial e um fluxo simples para identificar prioridades de adequação.",
          ],
        ].map(([title, description]) => (
          <div key={title} className="rounded-[1.5rem] border border-brand-line bg-brand-navy/70 p-6 shadow-soft">
            <h2 className="font-serif text-2xl text-brand-cream">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-brand-cream/75">{description}</p>
          </div>
        ))}
      </section>

      <CTA
        title="Quer transformar a leitura regulatória em um plano de ação?"
        description="O diagnóstico preliminar é o ponto de partida mais simples para mapear o que já existe e o que ainda precisa ser organizado."
        primaryHref="/diagnostico"
        primaryLabel="Fazer diagnóstico"
        secondaryHref={siteConfig.secondaryCta.href}
        secondaryLabel="Falar com especialista"
      />
    </div>
  );
}
