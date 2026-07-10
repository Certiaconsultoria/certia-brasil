import { z } from "zod";
import {
  areaTotalValues,
  brazilStateValues,
  carStatusValues,
  commodityValues,
  destinationValues,
  documentValues,
  exportContractValues,
  georeferencingValues,
  objectiveValues,
  volumeAnnualValues,
} from "@/content/diagnosisOptions";

export const diagnosisSchema = z.object({
  nome: z.string().min(3),
  cargo: z.string().min(2),
  email: z.string().email(),
  whatsapp: z.string().min(10),
  empresa: z.string().min(2),
  estado: z.enum(brazilStateValues),
  produto: z.enum(commodityValues),
  area_total: z.enum(areaTotalValues),
  destino_producao: z.enum(destinationValues),
  documentos_em_dia: z.array(z.enum(documentValues)).default([]),
  situacao_car: z.enum(carStatusValues),
  georreferenciamento: z.enum(georeferencingValues),
  volume_anual: z.enum(volumeAnnualValues),
  contrato_exportacao: z.enum(exportContractValues),
  objetivo_principal: z.enum(objectiveValues),
  observacoes: z.string().optional().default(""),
  aceite: z.literal(true),
});

export type DiagnosisInput = z.infer<typeof diagnosisSchema>;
