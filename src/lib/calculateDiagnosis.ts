import { getCommodityEconomics } from "@/content/economics";

type DiagnosisInput = {
  produto: string;
  prazo_adequacao?: string;
  possui_car: boolean;
  possui_georef: boolean;
  exporta_ue: boolean;
  tem_doc_cadeia: boolean;
  tem_hist_ambiental: boolean;
};

export function calculateDiagnosis(data: DiagnosisInput) {
  let score = 0;
  const blockers: string[] = [];
  const economics = getCommodityEconomics(data.produto);

  if (!data.possui_car) {
    score += 2;
    blockers.push("CAR pendente ou inexistente");
  }
  if (!data.possui_georef) {
    score += 2;
    blockers.push("Georreferenciamento incompleto");
  }
  if (data.exporta_ue) score += 1;
  if (!data.tem_doc_cadeia) {
    score += 2;
    blockers.push("Documentação da cadeia produtiva frágil");
  }
  if (!data.tem_hist_ambiental) {
    score += 1;
    blockers.push("Histórico ambiental sem organização");
  }
  if (data.prazo_adequacao && data.prazo_adequacao.trim() !== "") {
    score += 1;
  }

  let level = "Potencial premium destravável";
  let message =
    "Sua operação já mostra sinais de base documental relevante, mas ainda pode estar deixando margem e acesso comercial na mesa sem uma adequação mais estruturada.";
  let opportunityTitle = "Você já tem base para capturar mais valor";
  let urgencyLabel = "Janela favorável";
  let nextStep = "Validar tecnicamente os pontos faltantes e transformar a operação em argumento comercial premium.";

  if (score >= 4 && score <= 7) {
    level = "Bom potencial com gargalos relevantes";
    message =
      "Foram identificados gargalos que podem estar bloqueando prêmio de preço, resposta a compradores e acesso a crédito verde. A oportunidade existe, mas ela está parcialmente travada.";
    opportunityTitle = "Parte do seu potencial pode estar ficando na mesa";
    urgencyLabel = "Ajuste em 60 dias";
    nextStep = "Corrigir os gargalos documentais mais sensíveis e estruturar uma narrativa de conformidade para compradores e parceiros financeiros.";
  } else if (score >= 8) {
    level = "Alto potencial bloqueado por gargalos críticos";
    message =
      "Sua operação pode estar deixando de capturar uma oportunidade comercial relevante por falta de documentação, rastreabilidade e preparo para due diligence. Hoje o custo da não adequação tende a ser alto.";
    opportunityTitle = "Você pode estar perdendo dinheiro e tempo comercial";
    urgencyLabel = "Prioridade imediata";
    nextStep = "Entrar em plano de adequação com prioridade para parar a perda de oportunidade e destravar acesso a compradores premium.";
  }

  return {
    score,
    level,
    message,
    opportunityTitle,
    urgencyLabel,
    nextStep,
    blockers,
    premiumPercent: economics.premiumPercent,
    annualOpportunity: economics.annualOpportunity,
    creditSavings: economics.creditSavings,
    buyerAccess: economics.buyerAccess,
    premiumHeadline: economics.premiumHeadline,
    missedOpportunity:
      score >= 8
        ? "Hoje você pode estar operando com desconto comercial invisível e menos poder de negociação."
        : "Hoje há sinais de que sua operação ainda não captura todo o valor que poderia apresentar ao mercado.",
    disclaimer:
      "Estimativas preliminares. O potencial real depende de validação técnica, contexto comercial e maturidade documental da operação.",
  };
}
