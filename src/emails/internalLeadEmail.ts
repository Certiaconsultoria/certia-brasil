import { formatDiagnosisSummary, formatInternalLeadHtml } from "@/lib/formatDiagnosis";
import type { DiagnosisInput } from "@/schemas/diagnosisSchema";

type DiagnosisResult = {
  score: number;
  level: string;
  message: string;
};

export function internalLeadEmail(input: DiagnosisInput, diagnosis: DiagnosisResult) {
  return {
    subject: "Novo diagnóstico recebido pelo site",
    html: formatInternalLeadHtml(input, diagnosis),
    text: formatDiagnosisSummary(input, diagnosis),
  };
}
