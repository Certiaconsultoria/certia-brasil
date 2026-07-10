export function calculateDiagnosis(data: any) {
  let score = 0;

  if (!data.possui_car) score += 2;
  if (!data.possui_georef) score += 2;
  if (data.exporta_ue) score += 1; 
  if (!data.tem_doc_cadeia) score += 2;
  if (!data.tem_hist_ambiental) score += 1;

  let level = "Baixo Risco";
  let message = "Sua operação parece ter uma base documental inicial positiva, mas ainda recomendamos uma análise técnica para confirmar conformidade com a EUDR.";

  if (score >= 4 && score <= 7) {
    level = "Médio Risco";
    message = "Foram identificados pontos de atenção que podem impactar a adequação à EUDR. Recomendamos uma avaliação detalhada.";
  } else if (score >= 8) {
    level = "Alto Risco";
    message = "Foram identificadas lacunas relevantes de documentação, rastreabilidade ou conformidade. Recomendamos iniciar um plano de adequação com prioridade.";
  }

  return { score, level, message };
}
