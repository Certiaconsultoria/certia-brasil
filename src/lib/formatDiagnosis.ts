import type { DiagnosisInput } from "@/schemas/diagnosisSchema";

type DiagnosisResult = {
  score: number;
  level: string;
  message: string;
};

export function formatDiagnosisSummary(input: DiagnosisInput, diagnosis: DiagnosisResult) {
  return [
    `Nome: ${input.nome}`,
    `E-mail: ${input.email}`,
    `WhatsApp: ${input.whatsapp}`,
    `Empresa/Fazenda: ${input.empresa}`,
    `Localização: ${input.cidade} - ${input.estado}`,
    `Produto: ${input.produto}`,
    `Prazo para adequação: ${input.prazo_adequacao || "Não informado"}`,
    `Resultado: ${diagnosis.level} (${diagnosis.score} pontos)`,
    `Possui CAR: ${yesNo(input.possui_car)}`,
    `Possui georreferenciamento: ${yesNo(input.possui_georef)}`,
    `Já exporta para UE: ${yesNo(input.exporta_ue)}`,
    `Possui documentação da cadeia: ${yesNo(input.tem_doc_cadeia)}`,
    `Possui histórico ambiental: ${yesNo(input.tem_hist_ambiental)}`,
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
      <p><strong>E-mail:</strong> ${escapeHtml(input.email)}</p>
      <p><strong>WhatsApp:</strong> ${escapeHtml(input.whatsapp)}</p>
      <p><strong>Empresa/Fazenda:</strong> ${escapeHtml(input.empresa)}</p>
      <p><strong>Localização:</strong> ${escapeHtml(input.cidade)} - ${escapeHtml(input.estado)}</p>
      <p><strong>Produto:</strong> ${escapeHtml(input.produto)}</p>
      <p><strong>Prazo:</strong> ${escapeHtml(input.prazo_adequacao || "Não informado")}</p>
      <p><strong>Resultado:</strong> ${escapeHtml(diagnosis.level)} (${diagnosis.score} pontos)</p>
      <p><strong>Mensagem:</strong> ${escapeHtml(diagnosis.message)}</p>
      <p><strong>Observações:</strong> ${escapeHtml(input.observacoes || "Sem observações")}</p>
    </div>
  `;
}

export function leadFieldsForAirtable(input: DiagnosisInput, diagnosis: DiagnosisResult) {
  return {
    Nome: input.nome,
    Email: input.email,
    WhatsApp: input.whatsapp,
    Empresa: input.empresa,
    Cidade: input.cidade,
    Estado: input.estado,
    Produto: input.produto,
    "Prazo para adequação": input.prazo_adequacao || "",
    "Possui CAR": yesNo(input.possui_car),
    "Possui georreferenciamento": yesNo(input.possui_georef),
    "Exporta para UE": yesNo(input.exporta_ue),
    "Documentação da cadeia": yesNo(input.tem_doc_cadeia),
    "Histórico ambiental": yesNo(input.tem_hist_ambiental),
    Observações: input.observacoes || "",
    "Diagnóstico": diagnosis.level,
    "Pontuação": diagnosis.score,
    "Mensagem do diagnóstico": diagnosis.message,
  };
}

function yesNo(value: boolean) {
  return value ? "Sim" : "Não";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
