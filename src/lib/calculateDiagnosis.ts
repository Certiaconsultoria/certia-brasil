import { getCommodityEconomics } from "@/content/economics";
import type { DiagnosisInput } from "@/schemas/diagnosisSchema";

export function calculateDiagnosis(data: DiagnosisInput) {
  let score = 0;
  const blockers: string[] = [];
  const economics = getCommodityEconomics(data.produto);
  const documents = new Set(data.documentos_em_dia);

  if (!documents.has("car")) {
    score += 2;
    addBlocker(blockers, "CAR ainda não está disponível para diligência");
  }

  if (data.situacao_car === "em_ajuste") {
    score += 1;
    addBlocker(blockers, "Situação do CAR pede ajustes antes de abordar compradores");
  } else if (data.situacao_car === "nao_regularizado") {
    score += 2;
    addBlocker(blockers, "Situação do CAR ainda não está regularizada");
  }

  if (data.georreferenciamento === "parcial") {
    score += 1;
    addBlocker(blockers, "Georreferenciamento dos talhões está apenas parcial");
  } else if (data.georreferenciamento === "nao_realizei") {
    score += 2;
    addBlocker(blockers, "Georreferenciamento dos talhões ainda não foi realizado");
  }

  if (documents.size <= 2) {
    score += 2;
    addBlocker(blockers, "Base documental da propriedade ainda está incompleta");
  } else if (documents.size === 3) {
    score += 1;
    addBlocker(blockers, "Documentação-chave ainda precisa de consolidação");
  }

  if (!documents.has("matricula")) {
    score += 1;
    addBlocker(blockers, "Matrícula ou registro da área precisa estar pronto para due diligence");
  }

  if (!documents.has("licencas")) {
    score += 1;
    addBlocker(blockers, "Licenças ambientais ainda não estão organizadas");
  }

  if (data.destino_producao === "uniao_europeia") {
    score += 1;
  }

  if (data.contrato_exportacao === "embarque_90_dias") {
    score += 2;
    addBlocker(blockers, "Existe janela comercial curta para responder com conformidade");
  } else if (data.contrato_exportacao === "embarque_6_12_meses") {
    score += 1;
    addBlocker(blockers, "Planejamento comercial já pede adequação documental");
  }

  let level = "Potencial premium destravável";
  let message =
    "Sua operação já mostra sinais de base documental relevante, mas ainda pode estar deixando margem e acesso comercial na mesa sem uma adequação mais estruturada.";
  let opportunityTitle = "Você já tem base para capturar mais valor";
  let urgencyLabel = "Janela favorável";
  let nextStep =
    "Validar tecnicamente os pontos faltantes e transformar a operação em argumento comercial premium.";

  if (score >= 4 && score <= 7) {
    level = "Bom potencial com gargalos relevantes";
    message =
      "Foram identificados gargalos que podem estar bloqueando prêmio de preço, resposta a compradores e acesso a crédito verde. A oportunidade existe, mas ela está parcialmente travada.";
    opportunityTitle = "Parte do seu potencial pode estar ficando na mesa";
    urgencyLabel = "Ajuste em 60 dias";
    nextStep =
      "Corrigir os gargalos documentais mais sensíveis e estruturar uma narrativa de conformidade para compradores e parceiros financeiros.";
  } else if (score >= 8) {
    level = "Alto potencial bloqueado por gargalos críticos";
    message =
      "Sua operação pode estar deixando de capturar uma oportunidade comercial relevante por falta de documentação, rastreabilidade e preparo para due diligence. Hoje o custo da não adequação tende a ser alto.";
    opportunityTitle = "Você pode estar perdendo dinheiro e tempo comercial";
    urgencyLabel = "Prioridade imediata";
    nextStep =
      "Entrar em plano de adequação com prioridade para parar a perda de oportunidade e destravar acesso a compradores premium.";
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

function addBlocker(blockers: string[], blocker: string) {
  if (!blockers.includes(blocker)) {
    blockers.push(blocker);
  }
}
