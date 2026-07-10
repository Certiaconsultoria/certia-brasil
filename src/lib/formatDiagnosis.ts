import {
  areaTotalOptions,
  carStatusOptions,
  commodityOptions,
  destinationOptions,
  documentOptions,
  exportContractOptions,
  georeferencingOptions,
  getMultiOptionLabels,
  getOptionLabel,
  objectiveOptions,
  volumeAnnualOptions,
} from "@/content/diagnosisOptions";
import type { DiagnosisInput } from "@/schemas/diagnosisSchema";

type DiagnosisResult = {
  score: number;
  level: string;
  message: string;
};

export function formatDiagnosisSummary(input: DiagnosisInput, diagnosis: DiagnosisResult) {
  return [
    `Nome: ${input.nome}`,
    `Cargo: ${input.cargo}`,
    `E-mail: ${input.email}`,
    `WhatsApp: ${input.whatsapp}`,
    `Empresa/Fazenda: ${input.empresa}`,
    `Estado: ${input.estado}`,
    `Commodity principal: ${getOptionLabel(commodityOptions, input.produto)}`,
    `Área total: ${getOptionLabel(areaTotalOptions, input.area_total)}`,
    `Destino da produção: ${getOptionLabel(destinationOptions, input.destino_producao)}`,
    `Documentos em dia: ${getMultiOptionLabels(documentOptions, input.documentos_em_dia)}`,
    `Situação do CAR: ${getOptionLabel(carStatusOptions, input.situacao_car)}`,
    `Georreferenciamento: ${getOptionLabel(georeferencingOptions, input.georreferenciamento)}`,
    `Volume anual: ${getOptionLabel(volumeAnnualOptions, input.volume_anual)}`,
    `Contrato de exportação: ${getOptionLabel(exportContractOptions, input.contrato_exportacao)}`,
    `Objetivo principal: ${getOptionLabel(objectiveOptions, input.objetivo_principal)}`,
    `Resultado: ${diagnosis.level} (${diagnosis.score} pontos)`,
    `Observações: ${input.observacoes || "Sem observações"}`,
  ].join("\n");
}

export function formatDiagnosisHtml(input: DiagnosisInput, diagnosis: DiagnosisResult) {
  return `
    <div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.6;">
      <h1 style="margin-bottom: 16px;">Diagnóstico preliminar CERTIA Brasil</h1>
      <p>Olá, ${escapeHtml(input.nome)}.</p>
      <p>
        Seu resultado preliminar foi <strong>${escapeHtml(diagnosis.level)}</strong>
        com <strong>${diagnosis.score} pontos</strong>.
      </p>
      <p>${escapeHtml(diagnosis.message)}</p>
      <p>
        Próximo passo recomendado: responder este e-mail ou falar com a equipe da CERTIA
        para uma análise técnica mais detalhada.
      </p>
    </div>
  `;
}

export function formatInternalLeadHtml(input: DiagnosisInput, diagnosis: DiagnosisResult) {
  return `
    <div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.6;">
      <h1 style="margin-bottom: 16px;">Novo diagnóstico recebido pelo site</h1>
      <p><strong>Nome:</strong> ${escapeHtml(input.nome)}</p>
      <p><strong>Cargo:</strong> ${escapeHtml(input.cargo)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(input.email)}</p>
      <p><strong>WhatsApp:</strong> ${escapeHtml(input.whatsapp)}</p>
      <p><strong>Empresa/Fazenda:</strong> ${escapeHtml(input.empresa)}</p>
      <p><strong>Estado:</strong> ${escapeHtml(input.estado)}</p>
      <p><strong>Commodity principal:</strong> ${escapeHtml(getOptionLabel(commodityOptions, input.produto))}</p>
      <p><strong>Área total:</strong> ${escapeHtml(getOptionLabel(areaTotalOptions, input.area_total))}</p>
      <p><strong>Destino da produção:</strong> ${escapeHtml(getOptionLabel(destinationOptions, input.destino_producao))}</p>
      <p><strong>Documentos em dia:</strong> ${escapeHtml(getMultiOptionLabels(documentOptions, input.documentos_em_dia))}</p>
      <p><strong>Situação do CAR:</strong> ${escapeHtml(getOptionLabel(carStatusOptions, input.situacao_car))}</p>
      <p><strong>Georreferenciamento:</strong> ${escapeHtml(getOptionLabel(georeferencingOptions, input.georreferenciamento))}</p>
      <p><strong>Volume anual:</strong> ${escapeHtml(getOptionLabel(volumeAnnualOptions, input.volume_anual))}</p>
      <p><strong>Contrato de exportação:</strong> ${escapeHtml(getOptionLabel(exportContractOptions, input.contrato_exportacao))}</p>
      <p><strong>Objetivo principal:</strong> ${escapeHtml(getOptionLabel(objectiveOptions, input.objetivo_principal))}</p>
      <p><strong>Resultado:</strong> ${escapeHtml(diagnosis.level)} (${diagnosis.score} pontos)</p>
      <p><strong>Mensagem:</strong> ${escapeHtml(diagnosis.message)}</p>
      <p><strong>Observações:</strong> ${escapeHtml(input.observacoes || "Sem observações")}</p>
    </div>
  `;
}

export function leadFieldsForAirtable(input: DiagnosisInput, diagnosis: DiagnosisResult) {
  return {
    Nome: input.nome,
    Cargo: input.cargo,
    Email: input.email,
    WhatsApp: input.whatsapp,
    Empresa: input.empresa,
    Estado: input.estado,
    "Commodity principal": getOptionLabel(commodityOptions, input.produto),
    "Área total": getOptionLabel(areaTotalOptions, input.area_total),
    "Destino da produção": getOptionLabel(destinationOptions, input.destino_producao),
    "Documentos em dia": getMultiOptionLabels(documentOptions, input.documentos_em_dia),
    "Situação do CAR": getOptionLabel(carStatusOptions, input.situacao_car),
    Georreferenciamento: getOptionLabel(georeferencingOptions, input.georreferenciamento),
    "Volume anual": getOptionLabel(volumeAnnualOptions, input.volume_anual),
    "Contrato de exportação": getOptionLabel(exportContractOptions, input.contrato_exportacao),
    "Objetivo principal": getOptionLabel(objectiveOptions, input.objetivo_principal),
    Observações: input.observacoes || "",
    Diagnóstico: diagnosis.level,
    Pontuação: diagnosis.score,
    "Mensagem do diagnóstico": diagnosis.message,
  };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
