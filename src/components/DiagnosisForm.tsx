"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode, type Ref } from "react";
import {
  areaTotalOptions,
  brazilStateOptions,
  carStatusOptions,
  commodityOptions,
  destinationOptions,
  documentOptions,
  exportContractOptions,
  georeferencingOptions,
  objectiveOptions,
  type DocumentValue,
  volumeAnnualOptions,
} from "@/content/diagnosisOptions";
import { siteConfig } from "@/content/site";
import type { DiagnosisInput } from "@/schemas/diagnosisSchema";

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

type FormState = {
  nome: string;
  cargo: string;
  email: string;
  whatsapp: string;
  empresa: string;
  produto: DiagnosisInput["produto"] | "";
  area_total: DiagnosisInput["area_total"] | "";
  estado: DiagnosisInput["estado"] | "";
  destino_producao: DiagnosisInput["destino_producao"] | "";
  documentos_em_dia: DiagnosisInput["documentos_em_dia"];
  situacao_car: DiagnosisInput["situacao_car"] | "";
  georreferenciamento: DiagnosisInput["georreferenciamento"] | "";
  volume_anual: DiagnosisInput["volume_anual"] | "";
  contrato_exportacao: DiagnosisInput["contrato_exportacao"] | "";
  objetivo_principal: DiagnosisInput["objetivo_principal"] | "";
  observacoes: string;
  aceite: boolean;
};

const STEPS = [
  { number: "1", label: "Contato", description: "Dados do responsável" },
  { number: "2", label: "Propriedade", description: "Perfil da área" },
  { number: "3", label: "Documentos", description: "Base documental" },
  { number: "4", label: "Operação", description: "Momento comercial" },
] as const;

const INITIAL_FORM_STATE: FormState = {
  nome: "",
  cargo: "",
  email: "",
  whatsapp: "",
  empresa: "",
  produto: "",
  area_total: "",
  estado: "",
  destino_producao: "",
  documentos_em_dia: [],
  situacao_car: "",
  georreferenciamento: "",
  volume_anual: "",
  contrato_exportacao: "",
  objetivo_principal: "",
  observacoes: "",
  aceite: false,
};

export function DiagnosisForm() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM_STATE);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<DiagnosisResponse | null>(null);
  const [error, setError] = useState("");
  const primaryMetricRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!success) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      primaryMetricRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      primaryMetricRef.current?.focus({ preventScroll: true });
    }, 120);

    return () => window.clearTimeout(timeoutId);
  }, [success]);

  const stepIsValid = isStepValid(form, currentStep);

  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const toggleDocument = (value: DocumentValue) => {
    setForm((current) => ({
      ...current,
      documentos_em_dia: current.documentos_em_dia.includes(value)
        ? current.documentos_em_dia.filter((item) => item !== value)
        : [...current.documentos_em_dia, value],
    }));
  };

  const handleNext = () => {
    if (!stepIsValid) {
      setError(stepErrorMessage(currentStep));
      return;
    }

    setError("");
    setCurrentStep((step) => Math.min(step + 1, STEPS.length - 1));
  };

  const handleBack = () => {
    setError("");
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  const handleRestart = () => {
    setSuccess(null);
    setError("");
    setCurrentStep(0);
    setForm(INITIAL_FORM_STATE);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isStepValid(form, 3)) {
      setError(stepErrorMessage(3));
      return;
    }

    const payload = buildPayload(form);

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const responsePayload = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(responsePayload.error || "Erro ao enviar formulario");
      }

      const responsePayload = (await res.json()) as DiagnosisResponse;
      setSuccess(responsePayload);
      setCurrentStep(0);
      setForm(INITIAL_FORM_STATE);
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
          <p className="text-[11px] uppercase tracking-[0.24em] text-brand-gold sm:text-xs sm:tracking-[0.35em]">
            Resultado preliminar
          </p>
          <h2 className="mt-3 text-balance font-serif text-3xl text-brand-cream sm:text-4xl">
            {success.diagnosis.opportunityTitle}
          </h2>
          <p className="mt-4 text-brand-cream/80">{success.diagnosis.message}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <MetricCard
            label="Potencial indicativo"
            value={success.diagnosis.annualOpportunity}
            detail="faixa de oportunidade anual"
            valueRef={primaryMetricRef}
            highlight
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
          <p className="text-[11px] uppercase tracking-[0.24em] text-brand-gold sm:text-xs sm:tracking-[0.35em]">
            Oportunidade que pode estar escapando
          </p>
          <h3 className="mt-3 text-balance font-serif text-2xl text-brand-cream sm:text-3xl">
            {success.diagnosis.level}
          </h3>
          <p className="mt-3 text-brand-cream/78">{success.diagnosis.missedOpportunity}</p>
          <p className="mt-4 text-sm text-brand-cream/70">{success.diagnosis.premiumHeadline}</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-[1.5rem] border border-brand-line bg-brand-navy-deep/50 p-6">
            <p className="text-[11px] uppercase tracking-[0.24em] text-brand-gold sm:text-xs sm:tracking-[0.35em]">
              O que hoje trava esse ganho
            </p>
            <div className="mt-4 space-y-3 text-sm text-brand-cream/80">
              {success.diagnosis.blockers.length > 0 ? (
                success.diagnosis.blockers.map((blocker) => <p key={blocker}>- {blocker}</p>)
              ) : (
                <p>Sua base atual parece bem estruturada. Vale validar tecnicamente os detalhes finais.</p>
              )}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-brand-line bg-brand-navy-deep/50 p-6">
            <p className="text-[11px] uppercase tracking-[0.24em] text-brand-gold sm:text-xs sm:tracking-[0.35em]">
              Próximo passo recomendado
            </p>
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
          <p className="text-balance font-serif text-2xl text-brand-gold">
            Você já viu o tamanho da oportunidade. Agora precisa decidir se vai capturá-la.
          </p>
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
            className="inline-flex min-h-14 items-center justify-center rounded-full bg-brand-gold px-6 py-4 text-center font-semibold leading-tight text-brand-navy-deep transition hover:bg-brand-gold-soft sm:min-w-[250px]"
          >
            Quero destravar essa oportunidade
          </a>
          <button
            type="button"
            onClick={handleRestart}
            className="inline-flex min-h-14 items-center justify-center rounded-full border border-brand-gold px-6 py-4 text-center font-semibold leading-tight text-brand-gold transition hover:bg-brand-gold hover:text-brand-navy-deep sm:min-w-[250px]"
          >
            Fazer novo diagnóstico
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-[2rem] border border-brand-line bg-brand-navy/70 p-5 shadow-soft sm:p-8"
    >
      <ProgressSteps currentStep={currentStep} />

      <div className="rounded-[1.75rem] border border-brand-line bg-brand-navy-deep/40 p-5 sm:p-8">
        {currentStep === 0 ? (
          <StepShell
            eyebrow="Fase 1"
            title="Seus dados"
            description="Precisamos dos dados do responsável para entregar o diagnóstico e dar retorno."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <TextField
                id="nome"
                label="Nome completo *"
                value={form.nome}
                onChange={(value) => updateField("nome", value)}
                placeholder="Como podemos te chamar"
              />
              <TextField
                id="cargo"
                label="Cargo *"
                value={form.cargo}
                onChange={(value) => updateField("cargo", value)}
                placeholder="Ex.: Proprietário, gerente, comprador"
              />
              <TextField
                id="email"
                label="E-mail *"
                type="email"
                value={form.email}
                onChange={(value) => updateField("email", value)}
                placeholder="voce@empresa.com"
              />
              <TextField
                id="whatsapp"
                label="WhatsApp *"
                value={form.whatsapp}
                onChange={(value) => updateField("whatsapp", value)}
                placeholder="(00) 00000-0000"
              />
              <div className="md:col-span-2">
                <TextField
                  id="empresa"
                  label="Empresa ou fazenda *"
                  value={form.empresa}
                  onChange={(value) => updateField("empresa", value)}
                  placeholder="Nome da empresa ou fazenda"
                />
              </div>
            </div>
          </StepShell>
        ) : null}

        {currentStep === 1 ? (
          <StepShell
            eyebrow="Fase 2"
            title="Sua propriedade"
            description="Escolha as opções que melhor representam a operação."
          >
            <div className="space-y-6">
              <SelectionSection label="Commodity principal *">
                <OptionGrid
                  options={commodityOptions}
                  selectedValue={form.produto}
                  onSelect={(value) => updateField("produto", value as FormState["produto"])}
                />
              </SelectionSection>

              <div className="grid gap-4 md:grid-cols-2">
                <SelectField
                  id="area_total"
                  label="Área total (hectares) *"
                  value={form.area_total}
                  onChange={(value) => updateField("area_total", value as FormState["area_total"])}
                  options={areaTotalOptions}
                />
                <SelectField
                  id="estado"
                  label="Estado *"
                  value={form.estado}
                  onChange={(value) => updateField("estado", value as FormState["estado"])}
                  options={brazilStateOptions}
                />
              </div>

              <SelectionSection label="Destino da produção *">
                <OptionGrid
                  options={destinationOptions}
                  selectedValue={form.destino_producao}
                  onSelect={(value) =>
                    updateField("destino_producao", value as FormState["destino_producao"])
                  }
                />
              </SelectionSection>
            </div>
          </StepShell>
        ) : null}

        {currentStep === 2 ? (
          <StepShell
            eyebrow="Fase 3"
            title="Documentação"
            description="Marque o que já existe hoje e a situação do CAR e do georreferenciamento."
          >
            <div className="space-y-6">
              <SelectionSection label="Documentos em dia (marque os que possui)">
                <OptionGrid
                  options={documentOptions}
                  selectedValues={form.documentos_em_dia}
                  onToggle={(value) => toggleDocument(value as DocumentValue)}
                />
              </SelectionSection>

              <SelectField
                id="situacao_car"
                label="Situação do CAR *"
                value={form.situacao_car}
                onChange={(value) => updateField("situacao_car", value as FormState["situacao_car"])}
                options={carStatusOptions}
              />

              <SelectionSection label="Georreferenciamento dos talhões *">
                <OptionGrid
                  options={georeferencingOptions}
                  selectedValue={form.georreferenciamento}
                  onSelect={(value) =>
                    updateField("georreferenciamento", value as FormState["georreferenciamento"])
                  }
                />
              </SelectionSection>
            </div>
          </StepShell>
        ) : null}

        {currentStep === 3 ? (
          <StepShell
            eyebrow="Fase 4"
            title="Sua operação"
            description="Agora vamos entender o momento comercial e o objetivo principal."
          >
            <div className="space-y-6">
              <SelectField
                id="volume_anual"
                label="Volume anual de produção *"
                value={form.volume_anual}
                onChange={(value) => updateField("volume_anual", value as FormState["volume_anual"])}
                options={volumeAnnualOptions}
              />

              <SelectionSection label="Contrato de exportação vigente? *">
                <OptionGrid
                  options={exportContractOptions}
                  selectedValue={form.contrato_exportacao}
                  onSelect={(value) =>
                    updateField("contrato_exportacao", value as FormState["contrato_exportacao"])
                  }
                />
              </SelectionSection>

              <SelectField
                id="objetivo_principal"
                label="Objetivo principal *"
                value={form.objetivo_principal}
                onChange={(value) =>
                  updateField("objetivo_principal", value as FormState["objetivo_principal"])
                }
                options={objectiveOptions}
              />

              <div className="space-y-2">
                <label htmlFor="observacoes" className="text-sm font-medium text-brand-cream">
                  Observações
                </label>
                <textarea
                  id="observacoes"
                  name="observacoes"
                  rows={4}
                  value={form.observacoes}
                  onChange={(event) => updateField("observacoes", event.target.value)}
                  className="w-full rounded-2xl border border-brand-line bg-brand-navy-deep px-4 py-3 text-brand-cream outline-none transition placeholder:text-brand-cream/35 focus:border-brand-gold"
                  placeholder="Se quiser, compartilhe contexto adicional da operação."
                />
              </div>

              <label className="flex items-start gap-3 rounded-2xl border border-brand-line bg-brand-navy/40 px-4 py-4 text-sm text-brand-cream/80">
                <input
                  id="aceite"
                  name="aceite"
                  type="checkbox"
                  checked={form.aceite}
                  onChange={(event) => updateField("aceite", event.target.checked)}
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
            </div>
          </StepShell>
        ) : null}
      </div>

      {error ? <p className="text-sm text-red-300">{error}</p> : null}

      <div className="flex flex-col gap-3 border-t border-brand-line pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={handleBack}
          disabled={currentStep === 0}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand-line px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-brand-cream transition hover:border-brand-gold hover:text-brand-gold disabled:cursor-not-allowed disabled:opacity-40 sm:min-w-[160px]"
        >
          Voltar
        </button>

        {currentStep < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex min-h-14 items-center justify-center rounded-full bg-brand-gold px-6 py-4 text-center font-semibold leading-tight text-brand-navy-deep transition hover:bg-brand-gold-soft sm:min-w-[220px]"
          >
            Próximo
          </button>
        ) : (
          <button
            type="submit"
            disabled={loading}
            className="inline-flex min-h-14 items-center justify-center rounded-full bg-brand-gold px-6 py-4 text-center font-semibold leading-tight text-brand-navy-deep transition hover:bg-brand-gold-soft disabled:cursor-not-allowed disabled:bg-brand-line disabled:text-brand-cream/50 sm:min-w-[260px]"
          >
            {loading ? "Processando..." : "Ver meu potencial de ganho"}
          </button>
        )}
      </div>
    </form>
  );
}

function ProgressSteps({ currentStep }: { currentStep: number }) {
  const progress = `${(currentStep / (STEPS.length - 1)) * 100}%`;

  return (
    <div className="relative px-1">
      <div className="absolute left-0 right-0 top-5 h-px bg-brand-line" />
      <div className="absolute left-0 top-5 h-px bg-brand-gold transition-all duration-300" style={{ width: progress }} />
      <div className="relative grid grid-cols-4 gap-2">
        {STEPS.map((step, index) => {
          const isCurrent = index === currentStep;
          const isDone = index < currentStep;

          return (
            <div key={step.number} className="flex flex-col items-center text-center">
              <div
                className={[
                  "flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition",
                  isDone
                    ? "border-emerald-400 bg-emerald-500 text-white"
                    : isCurrent
                      ? "border-brand-gold bg-brand-gold text-brand-navy-deep"
                      : "border-brand-line bg-brand-navy-deep text-brand-gold",
                ].join(" ")}
              >
                {isDone ? "OK" : step.number}
              </div>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-cream sm:text-xs">
                {step.label}
              </p>
              <p className="mt-1 hidden text-xs text-brand-cream/60 sm:block">{step.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StepShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] uppercase tracking-[0.24em] text-brand-gold sm:text-xs sm:tracking-[0.35em]">
          {eyebrow}
        </p>
        <h3 className="mt-3 font-serif text-3xl text-brand-cream">{title}</h3>
        <p className="mt-3 max-w-2xl text-brand-cream/72">{description}</p>
      </div>
      <div className="border-t border-brand-line pt-6">{children}</div>
    </div>
  );
}

function SelectionSection({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-cream">{label}</p>
      {children}
    </div>
  );
}

function OptionGrid({
  options,
  selectedValue,
  selectedValues,
  onSelect,
  onToggle,
}: {
  options: ReadonlyArray<{ value: string; label: string; description?: string }>;
  selectedValue?: string;
  selectedValues?: string[];
  onSelect?: (value: string) => void;
  onToggle?: (value: string) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {options.map((option) => {
        const isSelected = selectedValue
          ? selectedValue === option.value
          : selectedValues?.includes(option.value) ?? false;

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isSelected}
            onClick={() => (onSelect ? onSelect(option.value) : onToggle?.(option.value))}
            className={[
              "min-h-[104px] rounded-[1.25rem] border px-4 py-4 text-center transition",
              isSelected
                ? "border-brand-gold bg-brand-gold/15 shadow-[0_0_0_1px_rgba(201,169,97,0.35)]"
                : "border-brand-line bg-brand-navy/30 hover:border-brand-gold/60 hover:bg-brand-navy/50",
            ].join(" ")}
          >
            <p className="font-semibold text-brand-cream">{option.label}</p>
            {option.description ? (
              <p className="mt-2 text-sm text-brand-cream/65">{option.description}</p>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-brand-cream">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-brand-line bg-brand-navy-deep px-4 py-3 text-brand-cream outline-none transition placeholder:text-brand-cream/35 focus:border-brand-gold"
      />
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: ReadonlyArray<{ value: string; label: string }>;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-brand-cream">
        {label}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-brand-line bg-brand-navy-deep px-4 py-3 text-brand-cream outline-none transition focus:border-brand-gold"
      >
        <option value="">Selecione...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
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
  valueRef,
  highlight = false,
}: {
  label: string;
  value: string;
  detail: string;
  valueRef?: Ref<HTMLParagraphElement>;
  highlight?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-[1.25rem] border p-5 text-center",
        highlight
          ? "border-brand-gold bg-brand-gold/10 shadow-[0_0_0_1px_rgba(201,169,97,0.2)]"
          : "border-brand-line bg-brand-navy-deep/50",
      ].join(" ")}
    >
      <p className="text-[11px] uppercase tracking-[0.22em] text-brand-gold sm:text-xs sm:tracking-[0.3em]">
        {label}
      </p>
      <p
        ref={valueRef}
        tabIndex={highlight ? -1 : undefined}
        className="mt-3 font-serif text-3xl text-brand-cream outline-none sm:text-4xl"
      >
        {value}
      </p>
      <p className="mt-2 text-sm text-brand-cream/70">{detail}</p>
    </div>
  );
}

function isStepValid(form: FormState, step: number) {
  if (step === 0) {
    return (
      form.nome.trim().length >= 3 &&
      form.cargo.trim().length >= 2 &&
      isValidEmail(form.email) &&
      digitsOnly(form.whatsapp).length >= 10 &&
      form.empresa.trim().length >= 2
    );
  }

  if (step === 1) {
    return Boolean(form.produto && form.area_total && form.estado && form.destino_producao);
  }

  if (step === 2) {
    return Boolean(form.situacao_car && form.georreferenciamento);
  }

  return Boolean(
    form.volume_anual &&
      form.contrato_exportacao &&
      form.objetivo_principal &&
      form.aceite,
  );
}

function stepErrorMessage(step: number) {
  if (step === 0) {
    return "Preencha nome, cargo, e-mail, WhatsApp e empresa ou fazenda para continuar.";
  }

  if (step === 1) {
    return "Selecione commodity, área total, estado e destino da produção.";
  }

  if (step === 2) {
    return "Informe a situação do CAR e o status do georreferenciamento.";
  }

  return "Complete a operação e aceite a política de privacidade para ver o resultado.";
}

function buildPayload(form: FormState): DiagnosisInput {
  return {
    nome: form.nome.trim(),
    cargo: form.cargo.trim(),
    email: form.email.trim(),
    whatsapp: form.whatsapp.trim(),
    empresa: form.empresa.trim(),
    produto: form.produto as DiagnosisInput["produto"],
    area_total: form.area_total as DiagnosisInput["area_total"],
    estado: form.estado as DiagnosisInput["estado"],
    destino_producao: form.destino_producao as DiagnosisInput["destino_producao"],
    documentos_em_dia: form.documentos_em_dia,
    situacao_car: form.situacao_car as DiagnosisInput["situacao_car"],
    georreferenciamento: form.georreferenciamento as DiagnosisInput["georreferenciamento"],
    volume_anual: form.volume_anual as DiagnosisInput["volume_anual"],
    contrato_exportacao: form.contrato_exportacao as DiagnosisInput["contrato_exportacao"],
    objetivo_principal: form.objetivo_principal as DiagnosisInput["objetivo_principal"],
    observacoes: form.observacoes.trim(),
    aceite: true,
  };
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}
