import { NextResponse } from "next/server";
import { calculateDiagnosis } from "@/lib/calculateDiagnosis";
import { saveLead } from "@/lib/saveLead";
import { sendDiagnosisEmails } from "@/lib/sendEmail";
import { diagnosisSchema } from "@/schemas/diagnosisSchema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = diagnosisSchema.parse(body);
    const diagnosis = calculateDiagnosis(validated);
    const [leadResult, emailResult] = await Promise.all([
      saveLead(validated, diagnosis),
      sendDiagnosisEmails(validated, diagnosis),
    ]);

    console.log("NOVO LEAD RECEBIDO");
    console.log({
      nome: validated.nome,
      email: validated.email,
      produto: validated.produto,
      estado: validated.estado,
      diagnosis,
      leadResult,
      emailResult,
    });

    return NextResponse.json({
      success: true,
      message: "Diagnóstico calculado com sucesso",
      diagnosis,
      delivery: {
        lead: leadResult,
        email: emailResult,
      },
    });
  } catch (error) {
    console.error("Erro no processamento do diagnóstico:", error);
    return NextResponse.json(
      { error: "Dados inválidos. Verifique os campos obrigatórios." },
      { status: 400 },
    );
  }
}
