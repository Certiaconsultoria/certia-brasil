import { SectionTitle } from "@/components/SectionTitle";

export default function PoliticaDePrivacidadePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <SectionTitle
        eyebrow="LGPD"
        title="Política de privacidade"
        description="Esta página estabelece uma base mínima de transparência sobre o uso dos dados coletados pela CERTIA Brasil."
      />

      <section className="space-y-6 rounded-[2rem] border border-brand-line bg-brand-navy/70 p-8 shadow-soft text-brand-cream/80">
        <div>
          <h2 className="font-serif text-2xl text-brand-cream">Quais dados são coletados</h2>
          <p className="mt-2 leading-7">
            Dados informados em formulários, como nome, e-mail, telefone, empresa, localização,
            produto e respostas relacionadas ao diagnóstico preliminar.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl text-brand-cream">Para que os dados são usados</h2>
          <p className="mt-2 leading-7">
            Os dados são usados para responder solicitações, realizar triagem comercial, orientar os
            próximos passos de adequação e melhorar o atendimento.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl text-brand-cream">Compartilhamento e armazenamento</h2>
          <p className="mt-2 leading-7">
            Nesta fase do projeto, os dados enviados pelo diagnóstico são processados pela aplicação e
            podem ser acessados pela equipe responsável pelo atendimento. Futuras integrações com
            ferramentas externas devem ser refletidas nesta política.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl text-brand-cream">Solicitações do titular</h2>
          <p className="mt-2 leading-7">
            Para solicitar atualização, esclarecimento ou exclusão de dados, o titular pode entrar em
            contato pelos canais oficiais informados no site.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl text-brand-cream">Consentimento</h2>
          <p className="mt-2 leading-7">
            Ao enviar um formulário com aceite explícito, o usuário concorda com o uso dos dados para
            retorno comercial e atendimento relacionado ao contexto informado.
          </p>
        </div>
      </section>
    </div>
  );
}
