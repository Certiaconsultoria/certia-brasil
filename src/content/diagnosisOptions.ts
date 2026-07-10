type Option<T extends string> = {
  value: T;
  label: string;
  description?: string;
};

export const commodityValues = [
  "pecuaria",
  "soja",
  "cafe",
  "cacau",
  "oleo de palma",
  "madeira",
  "borracha",
  "multiplas",
] as const;

export type CommodityValue = (typeof commodityValues)[number];

export const commodityOptions: ReadonlyArray<Option<CommodityValue>> = [
  { value: "pecuaria", label: "Pecuária", description: "Carne bovina" },
  { value: "soja", label: "Soja", description: "Grãos" },
  { value: "cafe", label: "Café", description: "Grãos e produtos" },
  { value: "cacau", label: "Cacau", description: "Amêndoas" },
  { value: "oleo de palma", label: "Óleo de Palma", description: "Dendê" },
  { value: "madeira", label: "Madeira", description: "Produtos florestais" },
  { value: "borracha", label: "Borracha", description: "Látex natural" },
  { value: "multiplas", label: "Múltiplas", description: "Mais de uma cadeia" },
];

export const areaTotalValues = [
  "ate_100",
  "101_500",
  "501_2000",
  "2001_10000",
  "acima_10000",
] as const;

export type AreaTotalValue = (typeof areaTotalValues)[number];

export const areaTotalOptions: ReadonlyArray<Option<AreaTotalValue>> = [
  { value: "ate_100", label: "Até 100 ha" },
  { value: "101_500", label: "101 a 500 ha" },
  { value: "501_2000", label: "501 a 2.000 ha" },
  { value: "2001_10000", label: "2.001 a 10.000 ha" },
  { value: "acima_10000", label: "Acima de 10.000 ha" },
];

export const brazilStateValues = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
] as const;

export type BrazilStateValue = (typeof brazilStateValues)[number];

export const brazilStateOptions: ReadonlyArray<Option<BrazilStateValue>> =
  brazilStateValues.map((value) => ({
    value,
    label: value,
  }));

export const destinationValues = [
  "uniao_europeia",
  "outros_paises",
  "mercado_interno",
  "trading_company",
] as const;

export type DestinationValue = (typeof destinationValues)[number];

export const destinationOptions: ReadonlyArray<Option<DestinationValue>> = [
  { value: "uniao_europeia", label: "União Europeia", description: "Exportação direta" },
  { value: "outros_paises", label: "Outros Países", description: "Exportação geral" },
  { value: "mercado_interno", label: "Mercado Interno", description: "Consumo nacional" },
  { value: "trading_company", label: "Trading Company", description: "Venda para traders" },
];

export const documentValues = [
  "car",
  "ccir",
  "itr",
  "matricula",
  "licencas",
] as const;

export type DocumentValue = (typeof documentValues)[number];

export const documentOptions: ReadonlyArray<Option<DocumentValue>> = [
  { value: "car", label: "CAR", description: "Cadastro Ambiental" },
  { value: "ccir", label: "CCIR", description: "Certificado INCRA" },
  { value: "itr", label: "ITR", description: "Imposto Territorial" },
  { value: "matricula", label: "Matrícula", description: "Registro atualizado" },
  { value: "licencas", label: "Licenças", description: "Ambientais" },
];

export const carStatusValues = [
  "regular",
  "em_ajuste",
  "nao_regularizado",
] as const;

export type CarStatusValue = (typeof carStatusValues)[number];

export const carStatusOptions: ReadonlyArray<Option<CarStatusValue>> = [
  { value: "regular", label: "Regular" },
  { value: "em_ajuste", label: "Em ajuste" },
  { value: "nao_regularizado", label: "Não regularizado" },
];

export const georeferencingValues = [
  "completo",
  "parcial",
  "nao_realizei",
] as const;

export type GeoreferencingValue = (typeof georeferencingValues)[number];

export const georeferencingOptions: ReadonlyArray<Option<GeoreferencingValue>> = [
  { value: "completo", label: "Completo", description: "Todos os talhões" },
  { value: "parcial", label: "Parcial", description: "Apenas parte" },
  { value: "nao_realizei", label: "Não realizei", description: "Nunca fiz" },
];

export const volumeAnnualValues = [
  "ate_500",
  "501_2000",
  "2001_10000",
  "acima_10000",
] as const;

export type VolumeAnnualValue = (typeof volumeAnnualValues)[number];

export const volumeAnnualOptions: ReadonlyArray<Option<VolumeAnnualValue>> = [
  { value: "ate_500", label: "Até 500 por ano" },
  { value: "501_2000", label: "501 a 2.000 por ano" },
  { value: "2001_10000", label: "2.001 a 10.000 por ano" },
  { value: "acima_10000", label: "Acima de 10.000 por ano" },
];

export const exportContractValues = [
  "embarque_90_dias",
  "embarque_6_12_meses",
  "em_negociacao",
  "ainda_nao_exporto",
] as const;

export type ExportContractValue = (typeof exportContractValues)[number];

export const exportContractOptions: ReadonlyArray<Option<ExportContractValue>> = [
  { value: "embarque_90_dias", label: "Embarque <= 90 dias", description: "Contrato fechado" },
  { value: "embarque_6_12_meses", label: "Embarque 6-12m", description: "Planejamento" },
  { value: "em_negociacao", label: "Em negociação", description: "Sem contrato ainda" },
  { value: "ainda_nao_exporto", label: "Ainda não exporto", description: "Quero começar" },
];

export const objectiveValues = [
  "acessar_premium_europeu",
  "organizar_documentacao",
  "destravar_credito_verde",
  "ganhar_velocidade_comprador",
] as const;

export type ObjectiveValue = (typeof objectiveValues)[number];

export const objectiveOptions: ReadonlyArray<Option<ObjectiveValue>> = [
  { value: "acessar_premium_europeu", label: "Acessar pricing premium europeu" },
  { value: "organizar_documentacao", label: "Organizar a documentação da operação" },
  { value: "destravar_credito_verde", label: "Destravar crédito verde e melhores taxas" },
  { value: "ganhar_velocidade_comprador", label: "Ganhar velocidade na due diligence" },
];

export function getOptionLabel<T extends string>(
  options: ReadonlyArray<Option<T>>,
  value: string,
  fallback = "Não informado",
) {
  return options.find((option) => option.value === value)?.label ?? fallback;
}

export function getMultiOptionLabels<T extends string>(
  options: ReadonlyArray<Option<T>>,
  values: string[],
  fallback = "Nenhum",
) {
  if (values.length === 0) {
    return fallback;
  }

  return values.map((value) => getOptionLabel(options, value, value)).join(", ");
}
