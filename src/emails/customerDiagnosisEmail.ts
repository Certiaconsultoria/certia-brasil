import { formatDiagnosisHtml } from "@/lib/formatDiagnosis";
import type { DiagnosisInput } from "@/schemas/diagnosisSchema";

type DiagnosisResult = {
  score: number;
  level: string;
  message: string;
};

export function customerDiagnosisEmail(input: DiagnosisInput, diagnosis: DiagnosisResult) {
  return {
    subject: "Seu diagnóstico inicial de conformidade EUDR",
    html: formatDiagnosisHtml(input, diagnosis),
  };
}
