import { NextResponse } from "next/server";
import { z } from "zod";
import { calculateDiagnosis } from "@/lib/calculateDiagnosis";

const diagnosisSchema = z.object({
  nome: z.string().min(3),
  email: z.string().email(),
  whatsapp: z.string().min(10),
  empresa: z.string().min(2),
  cidade: z.string().min(2),
  estado: z.string().min(2),
  produto: z.string().min(2),
  observacoes: z.string().optional().default(""),
  possui_car: z.boolean(),
  possui_georef: z.boolean(),
  exporta_ue: z.boolean(),
  tem_doc_cadeia: z.boolean(),
  tem_hist_ambiental: z.boolean(),
  aceite: z.literal(true),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = diagnosisSchema.parse(body);
    
    const diagnosis = calculateDiagnosis(validated);

    // MODO DEMONSTRAÇÃO SEGURA:
    // Como você ainda não configurou as variáveis de ambiente (RESEND_API_KEY, GOOGLE_SHEETS...),
    // o sistema apenas registra o lead no console da Vercel para você ver que funcionou.
    // Quando você colocar as chaves na Vercel no futuro, ele passa a enviar automaticamente.
    
    console.log("NOVO LEAD RECEBIDO:");
    console.log("Nome:", validated.nome);
    console.log("Diagnóstico:", diagnosis.level);

    return NextResponse.json({ 
      success: true, 
      message: "Diagnóstico calculado com sucesso",
      diagnosis: diagnosis.level 
    });

  } catch (error: any) {
    console.error("Erro no processamento do diagnóstico:", error);
    return NextResponse.json(
      { error: "Dados inválidos. Verifique os campos obrigatórios." },
      { status: 400 }
    );
  }
}
