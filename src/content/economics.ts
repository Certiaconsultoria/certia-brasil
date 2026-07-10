export type CommodityEconomics = {
  labels: string[];
  premiumPercent: number;
  premiumHeadline: string;
  annualOpportunity: string;
  creditSavings: string;
  buyerAccess: string;
};

export const commodityEconomics: CommodityEconomics[] = [
  {
    labels: ["pecuaria", "carne", "carne bovina"],
    premiumPercent: 18,
    premiumHeadline: "Rastreabilidade da pecuária libera acesso a compradores mais seletivos.",
    annualOpportunity: "R$ 18 mil a R$ 95 mil",
    creditSavings: "até 1,8 p.p. ao ano",
    buyerAccess: "frigoríficos e importadores premium",
  },
  {
    labels: ["soja"],
    premiumPercent: 22,
    premiumHeadline: "Soja com origem comprovável negocia melhor e responde mais rápido à due diligence.",
    annualOpportunity: "R$ 22 mil a R$ 120 mil",
    creditSavings: "até 2,1 p.p. ao ano",
    buyerAccess: "tradings e compradores europeus",
  },
  {
    labels: ["cafe", "café"],
    premiumPercent: 25,
    premiumHeadline: "Café com narrativa de origem e conformidade tende a capturar mais margem.",
    annualOpportunity: "R$ 25 mil a R$ 140 mil",
    creditSavings: "até 2,2 p.p. ao ano",
    buyerAccess: "mercado especial e compradores premium",
  },
  {
    labels: ["madeira"],
    premiumPercent: 20,
    premiumHeadline: "Madeira com evidência robusta reduz fricção comercial e risco reputacional.",
    annualOpportunity: "R$ 20 mil a R$ 110 mil",
    creditSavings: "até 1,9 p.p. ao ano",
    buyerAccess: "indústrias e importadores regulados",
  },
  {
    labels: ["cacau"],
    premiumPercent: 24,
    premiumHeadline: "Cacau rastreável fortalece valor de origem e posição em mercados premium.",
    annualOpportunity: "R$ 24 mil a R$ 130 mil",
    creditSavings: "até 2 p.p. ao ano",
    buyerAccess: "chocolate premium e exportadores especializados",
  },
  {
    labels: ["oleo de palma", "óleo de palma", "dende", "dendê"],
    premiumPercent: 19,
    premiumHeadline: "Dendê com leitura territorial madura reduz objeções ambientais do comprador.",
    annualOpportunity: "R$ 19 mil a R$ 100 mil",
    creditSavings: "até 1,7 p.p. ao ano",
    buyerAccess: "indústria alimentícia e trading internacional",
  },
  {
    labels: ["borracha", "borracha natural", "latex", "látex"],
    premiumPercent: 16,
    premiumHeadline: "Borracha com origem comprovável tende a ganhar força em negociação industrial.",
    annualOpportunity: "R$ 16 mil a R$ 85 mil",
    creditSavings: "até 1,5 p.p. ao ano",
    buyerAccess: "indústria e compradores de nicho",
  },
];

export function getCommodityEconomics(product: string) {
  const normalized = product.toLowerCase();
  return (
    commodityEconomics.find((item) =>
      item.labels.some((label) => normalized.includes(label)),
    ) || {
      labels: ["geral"],
      premiumPercent: 18,
      premiumHeadline:
        "Operações mais organizadas costumam capturar melhor margem e responder com mais segurança ao comprador.",
      annualOpportunity: "R$ 15 mil a R$ 80 mil",
      creditSavings: "até 1,5 p.p. ao ano",
      buyerAccess: "compradores premium e crédito verde",
    }
  );
}
