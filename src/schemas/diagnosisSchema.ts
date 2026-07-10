import { z } from "zod";

export const diagnosisSchema = z.object({
  nome: z.string().min(3),
  email: z.string().email(),
  whatsapp: z.string().min(10),
  empresa: z.string().min(2),
  cidade: z.string().min(2),
  estado: z.string().min(2),
  produto: z.string().min(2),
  prazo_adequacao: z.string().optional().default(""),
  observacoes: z.string().optional().default(""),
  possui_car: z.boolean(),
  possui_georef: z.boolean(),
  exporta_ue: z.boolean(),
  tem_doc_cadeia: z.boolean(),
  tem_hist_ambiental: z.boolean(),
  aceite: z.literal(true),
});

export type DiagnosisInput = z.infer<typeof diagnosisSchema>;
