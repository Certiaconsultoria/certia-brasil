"use client";

import { useState } from "react";
import { siteConfig } from "@/content/site";

type DiagnosisResponse = {
  diagnosis: {
    score: number;
    level: string;
    message: string;
    opportunityTitle: string;
    urgencyLabel: string;
    nextStep: string;
    blockers: string[];
    premiumPercent: number;
    annualOpportunity: string;
    creditSavings: string;
    buyerAccess: string;
    premiumHeadline: string;
    missedOpportunity: string;
    disclaimer: string;
  };
  delivery: {
    lead:
      | { status: "saved"; provider: string }
      | { status: "skipped"; reason: string }
      | { status: "failed"; reason: string };
    email:
      | { status: "sent" }
      | { status: "skipped"; reason: string }
      | { status: "failed"; reason: string };
  };
};

export function DiagnosisForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<DiagnosisResponse | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      nome: String(formData.get("nome") || ""),
      email: String(formData.get("email") || ""),
      whatsapp: String(formData.get("whatsapp") || ""),
      empresa: String(formData.get("empresa") || ""),
      cidade: String(formData.get("cidade") || ""),
      estado: String(formData.get("estado") || ""),
      produto: String(formData.get("produto") || ""),
      prazo_adequacao: String(formData.get("prazo_adequacao") || ""),
      observacoes: String(formData.get("observacoes") || ""),
      possui_car: formData.get("possui_car") === "on",
      possui_georef: formData.get("possui_georef") === "on",
      exporta_ue: formData.get("exporta_ue") === "on",
      tem_doc_cadeia: formData.get("tem_doc_cadeia") === "on",
      tem_hist_ambiental: formData.get("tem_hist_ambiental") === "on",
      aceite: formData.get("aceite") === "on",
    };

    try {
      const res = await fetch("/api/diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const payload = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(payload.error || "Erro ao enviar formulário");
      }

      const payload = (await res.json()) as DiagnosisResponse;
      setSuccess(payload);
      e.currentTarget.reset();
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Houve um erro ao enviar. Tente novamente ou nos chame no WhatsApp.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    const whatsappText = encodeURIComponent(
      `Olá, acabei de fazer o diagnóstico CERTIA e quero entender como destravar ${success.diagnosis.annualOpportunity} em oportunidade estimada. Meu resultado foi ${success.diagnosis.level}.`,
    );
    const whatsappHref = `https://wa.me/${siteConfig.whatsapp}?text=${whatsappText}`;

    return (
      <div className="space-y-6 rounded-[2rem] border border-brand-line bg-brand-navy/70 p-5 shadow-soft sm:p-8">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.24em] text-brand-gold sm:text-xs sm:tracking-[0.35em]">Resultado preliminar</p>
          <h2 className="mt-3 text-balance font-serif text-3xl text-brand-cream sm:text-4xl">
            {success.diagnosis.opportunityTitle}
          </h2>
          <p className="mt-4 text-brand-cream/80">{success.diagnosis.message}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <MetricCard
            label="Potencial indicativo"
            value={success.diagnosis.annualOpportunity}
            detail={`faixa de oportunidade anual`}
          />
          <MetricCard
            label="Prêmio potencial"
            value={`+${success.diagnosis.premiumPercent}%`}
            detail="margem comercial indicativa"
          />
          <MetricCard
            label="Crédito verde"
            value={success.diagnosis.creditSavings}
            detail="alívio estimado no custo"
          />
        </div>

        <div className="rounded-[1.5rem] border border-brand-line bg-brand-green-deep/20 p-6">
          <p className="text-[11px] uppercase tracking-[0.24em] text-brand-gold sm:text-xs sm:tracking-[0.35em]">Oportunidade que pode estar escapando</p>
          <h3 className="mt-3 text-balance font-serif text-2xl text-brand-cream sm:text-3xl">{success.diagnosis.level}</h3>
          <p className="mt-3 text-brand-cream/78">{success.diagnosis.missedOpportunity}</p>
          <p className="mt-4 text-sm text-brand-cream/70">{success.diagnosis.premiumHeadline}</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-[1.5rem] border border-brand-line bg-brand-navy-deep/50 p-6">
            <p className="text-[11px] uppercase tracking-[0.24em] text-brand-gold sm:text-xs sm:tracking-[0.35em]">O que hoje trava esse ganho</p>
            <div className="mt-4 space-y-3 text-sm text-brand-cream/80">
              {success.diagnosis.blockers.map((blocker) => (
                <p key={blocker}>• {blocker}</p>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-brand-line bg-brand-navy-deep/50 p-6">
            <p className="text-[11px] uppercase tracking-[0.24em] text-brand-gold sm:text-xs sm:tracking-[0.35em]">Próximo passo recomendado</p>
            <p className="mt-4 text-brand-cream/80">{success.diagnosis.nextStep}</p>
            <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-brand-gold sm:text-sm sm:tracking-[0.25em]">
              {success.diagnosis.urgencyLabel}
            </p>
            <p className="mt-3 text-sm text-brand-cream/70">
              Acesso comercial estimado: {success.diagnosis.buyerAccess}
            </p>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-brand-line bg-brand-navy/55 p-6 text-center">
          <p className="text-balance font-serif text-2xl text-brand-gold">Você já viu o tamanho da oportunidade. Agora precisa decidir se vai capturá-la.</p>
          <p className="mt-3 text-brand-cream/78">
            Seus dados foram recebidos e a equipe da CERTIA pode usar esse contato para orientar os próximos passos.
          </p>
          <div className="mt-4 space-y-2 text-sm text-brand-cream/75">
            <p>{leadStatusMessage(success.delivery.lead)}</p>
            <p>{emailStatusMessage(success.delivery.email)}</p>
            <p>{success.diagnosis.disclaimer}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-brand-gold px-6 py-3 font-semibold text-brand-navy-deep transition hover:bg-brand-gold-soft"
          >
            Quero destravar essa oportunidade
          </a>
          <button
            type="button"
            onClick={() => setSuccess(null)}
            className="rounded-full border border-brand-gold px-6 py-3 font-semibold text-brand-gold transition hover:bg-brand-gold hover:text-brand-navy-deep"
          >
            Fazer novo diagnóstico
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-[2rem] border border-brand-line bg-brand-navy/70 p-8 shadow-soft">
      <div className="grid gap-4 md:grid-cols-2">
        <Field id="nome" label="Nome completo*" required />
        <Field id="email" label="E-mail*" type="email" required />
        <Field id="whatsapp" label="WhatsApp*" required />
        <Field id="empresa" label="Empresa ou fazenda*" required />
        <Field id="cidade" label="Cidade*" required />
        <Field id="estado" label="Estado*" required />
      </div>

      <Field id="produto" label="Produto exportado*" required />
      <Field id="prazo_adequacao" label="Tem prazo para adequação?" placeholder="Ex.: 90 dias, sem prazo definido" />

      <div className="space-y-3 border-t border-brand-line pt-6">
        <p className="font-medium text-brand-cream">Checklist de conformidade</p>
        <Checkbox id="possui_car" label="Possui CAR (Cadastro Ambiental Rural)?" />
        <Checkbox id="possui_georef" label="Possui georreferenciamento da propriedade?" />
        <Checkbox id="exporta_ue" label="Já exporta para a União Europeia?" />
        <Checkbox id="tem_doc_cadeia" label="Possui documentação da cadeia produtiva?" />
        <Checkbox id="tem_hist_ambiental" label="Possui histórico de conformidade ambiental?" />
      </div>

      <div className="space-y-2">
        <label htmlFor="observacoes" className="text-sm font-medium text-brand-cream">
          Observações
        </label>
        <textarea
          id="observacoes"
          name="observacoes"
          rows={4}
          className="w-full rounded-2xl border border-brand-line bg-brand-navy-deep px-4 py-3 text-brand-cream outline-none transition focus:border-brand-gold"
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-brand-cream/80">
        <input
          required
          id="aceite"
          name="aceite"
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-brand-line"
        />
        <span>
          Aceito a{" "}
          <a href="/politica-de-privacidade" className="text-brand-gold underline">
            política de privacidade
          </a>{" "}
          e autorizo contato comercial da CERTIA Brasil.
        </span>
      </label>

      {error ? <p className="text-sm text-red-300">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-brand-gold px-6 py-4 font-semibold text-brand-navy-deep transition hover:bg-brand-gold-soft disabled:cursor-not-allowed disabled:bg-brand-line disabled:text-brand-cream/50"
      >
        {loading ? "Processando..." : "Ver meu diagnóstico preliminar"}
      </button>
    </form>
  );
}

function leadStatusMessage(delivery: DiagnosisResponse["delivery"]["lead"]) {
  if (delivery.status === "saved") {
    return `Lead salvo com sucesso em ${delivery.provider}.`;
  }

  if (delivery.status === "failed") {
    return `O lead não foi salvo automaticamente: ${delivery.reason}`;
  }

  return `Integração de leads ainda não configurada: ${delivery.reason}`;
}

function emailStatusMessage(delivery: DiagnosisResponse["delivery"]["email"]) {
  if (delivery.status === "sent") {
    return "E-mails enviados com sucesso para o cliente e para a equipe.";
  }

  if (delivery.status === "failed") {
    return `Houve falha no envio de e-mail: ${delivery.reason}`;
  }

  return `Envio de e-mail ainda não configurado: ${delivery.reason}`;
}

function MetricCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-[1.25rem] border border-brand-line bg-brand-navy-deep/50 p-5 text-center">
      <p className="text-[11px] uppercase tracking-[0.22em] text-brand-gold sm:text-xs sm:tracking-[0.3em]">{label}</p>
      <p className="mt-3 font-serif text-3xl text-brand-cream sm:text-4xl">{value}</p>
      <p className="mt-2 text-sm text-brand-cream/70">{detail}</p>
    </div>
  );
}

type FieldProps = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
};

function Field({ id, label, type = "text", placeholder, required }: FieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-brand-cream">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-2xl border border-brand-line bg-brand-navy-deep px-4 py-3 text-brand-cream outline-none transition placeholder:text-brand-cream/35 focus:border-brand-gold"
      />
    </div>
  );
}

type CheckboxProps = {
  id: string;
  label: string;
};

function Checkbox({ id, label }: CheckboxProps) {
  return (
    <label htmlFor={id} className="flex items-center gap-3 text-sm text-brand-cream/80">
      <input id={id} name={id} type="checkbox" className="h-4 w-4 rounded border-brand-line" />
      <span>{label}</span>
    </label>
  );
}
