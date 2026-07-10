import { DiagnosisForm } from "@/components/DiagnosisForm";
import { SectionTitle } from "@/components/SectionTitle";

export default function DiagnosticoPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <SectionTitle
        eyebrow="Diagnóstico"
        title="Entenda seu nível de preparo para a EUDR"
        description="Este formulário gera um resultado preliminar com base nas informações enviadas. Nesta fase do projeto, o retorno aparece na tela e serve como triagem inicial para o contato da equipe."
        align="center"
      />

      <DiagnosisForm />
    </div>
  );
}
