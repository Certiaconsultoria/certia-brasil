import { DiagnosisForm } from "@/components/DiagnosisForm";
import { SectionTitle } from "@/components/SectionTitle";

export default function DiagnosticoPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <SectionTitle
        eyebrow="Diagnóstico de oportunidade"
        title="Descubra quanto sua operação pode estar deixando de ganhar sem uma estrutura pronta para a EUDR"
        description="Em poucos minutos você recebe um score preliminar, leitura dos gargalos que travam sua margem e uma estimativa da oportunidade comercial que pode estar ficando na mesa."
        align="center"
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[
          ["Resultado imediato", "Veja na hora o retrato comercial e documental da sua operação."],
          ["Faixa de oportunidade", "Entenda o ganho que pode estar sendo perdido por falta de preparo."],
          ["Próximo passo claro", "Saia do diagnóstico com urgência, desejo e direção de ação."],
        ].map(([title, description]) => (
          <div key={title} className="rounded-[1.25rem] border border-brand-line bg-brand-navy/60 p-5 text-center">
            <p className="font-serif text-xl text-brand-cream sm:text-2xl">{title}</p>
            <p className="mt-3 text-sm leading-6 text-brand-cream/75">{description}</p>
          </div>
        ))}
      </section>

      <DiagnosisForm />
    </div>
  );
}
