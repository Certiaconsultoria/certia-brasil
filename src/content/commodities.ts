export type CommodityPageContent = {
  slug: string;
  name: string;
  eyebrow: string;
  heroTitle: string;
  intro: string;
  storyTitle: string;
  storyDescription: string;
  marketTitle: string;
  marketStats: Array<{ label: string; value: string; source: string }>;
  pillars: Array<{ title: string; description: string }>;
  closing: string;
};

export const commodityPages: CommodityPageContent[] = [
  {
    slug: "pecuaria",
    name: "Pecuária",
    eyebrow: "Pecuária / Carne bovina",
    heroTitle: "Sua pecuária conectada ao mercado europeu com mais segurança documental",
    intro:
      "A exigência de rastreabilidade e origem pressiona toda a cadeia. A CERTIA ajuda a organizar evidências e reduzir ruído entre campo, frigorífico e comprador.",
    storyTitle: "Do pasto ao embarque",
    storyDescription:
      "A conformidade precisa conversar com origem, área produtiva, documentação e narrativa comercial para sustentar confiança de mercado.",
    marketTitle: "Indicadores que pressionam a cadeia",
    marketStats: [
      { label: "Pressão por rastreabilidade", value: "Alta", source: "Compradores e due diligence" },
      { label: "Tempo para resposta ao comprador", value: "Curto", source: "Rotina comercial" },
      { label: "Sensibilidade reputacional", value: "Muito alta", source: "Mercado externo" },
    ],
    pillars: [
      { title: "Origem e áreas", description: "Checar vínculo entre operação, território e evidência espacial." },
      { title: "Documentação da cadeia", description: "Reduzir lacunas antes que elas virem barreira comercial." },
      { title: "Leitura de risco", description: "Entender prioridades de adequação para não responder no improviso." },
    ],
    closing: "A pecuária precisa de rastreabilidade confiável para sustentar acesso e valor em mercados exigentes.",
  },
  {
    slug: "soja",
    name: "Soja",
    eyebrow: "Soja",
    heroTitle: "Sua soja conectada ao mercado europeu com preparo regulatório mais claro",
    intro:
      "A cadeia da soja exige resposta rápida sobre origem, fornecedores e evidências. O foco da CERTIA é transformar isso em processo organizado.",
    storyTitle: "Força comercial com menos fragilidade documental",
    storyDescription:
      "A operação precisa estar pronta para responder sobre rastreabilidade, diligência e coerência das informações ao longo da cadeia.",
    marketTitle: "Pontos críticos da cadeia exportadora",
    marketStats: [
      { label: "Dependência de documentação", value: "Alta", source: "Exportação e trading" },
      { label: "Sensibilidade regulatória", value: "Crescente", source: "Mercado europeu" },
      { label: "Necessidade de resposta", value: "Rápida", source: "Homologação comercial" },
    ],
    pillars: [
      { title: "Rastreabilidade da cadeia", description: "Conectar origem, fornecedores e evidências principais." },
      { title: "Conformidade operacional", description: "Mapear risco documental e pontos de ruptura antes da cobrança externa." },
      { title: "Confiança para negociar", description: "Fortalecer a resposta comercial diante de exigências mais duras." },
    ],
    closing: "Na soja, preparo regulatório e velocidade de resposta caminham juntos.",
  },
  {
    slug: "cafe",
    name: "Café",
    eyebrow: "Café",
    heroTitle: "Seu café conectado ao mundo com uma narrativa de origem mais forte",
    intro:
      "O café já carrega valor simbólico, territorial e comercial. A CERTIA ajuda a estruturar a parte regulatória para que isso também se sustente em auditoria e diligência.",
    storyTitle: "Origem, qualidade e conformidade precisam andar juntas",
    storyDescription:
      "Mercados premium valorizam história e qualidade, mas exigem cada vez mais comprovação objetiva da operação.",
    marketTitle: "Onde a pressão aparece",
    marketStats: [
      { label: "Valor da origem", value: "Muito alto", source: "Mercado premium" },
      { label: "Cobrança documental", value: "Crescente", source: "Importadores" },
      { label: "Diferenciação possível", value: "Alta", source: "Segmentos especiais" },
    ],
    pillars: [
      { title: "Narrativa com evidência", description: "Sustentar a história do produto com documentação consistente." },
      { title: "Leitura territorial", description: "Organizar evidências sobre a origem da produção e sua área." },
      { title: "Preparação comercial", description: "Usar conformidade para proteger e fortalecer posicionamento." },
    ],
    closing: "No café, uma boa história comercial precisa ser acompanhada por prova sólida de origem e preparo.",
  },
  {
    slug: "madeira",
    name: "Madeira",
    eyebrow: "Madeira",
    heroTitle: "Sua madeira conectada ao mercado global com diligência reforçada",
    intro:
      "Produtos florestais enfrentam uma das combinações mais sensíveis entre origem, licenças, rastreabilidade e reputação. A CERTIA organiza esse jogo.",
    storyTitle: "Floresta em pé, documentação em ordem",
    storyDescription:
      "A madeira exige evidência consistente de origem e movimentação. A preparação precisa ser técnica e comercial ao mesmo tempo.",
    marketTitle: "Ambiente de exigência",
    marketStats: [
      { label: "Risco reputacional", value: "Muito alto", source: "Mercado externo" },
      { label: "Dependência de evidências", value: "Crítica", source: "Due diligence" },
      { label: "Complexidade operacional", value: "Elevada", source: "Cadeia florestal" },
    ],
    pillars: [
      { title: "Origem e licenças", description: "Conectar evidências operacionais e permissões relevantes." },
      { title: "Fluxo de documentação", description: "Reduzir inconsistências na cadeia e no histórico do produto." },
      { title: "Resposta ao comprador", description: "Preparar melhor o material de comprovação para negociação." },
    ],
    closing: "Na madeira, robustez documental deixa de ser diferencial e vira condição de entrada.",
  },
  {
    slug: "cacau",
    name: "Cacau",
    eyebrow: "Cacau",
    heroTitle: "Seu cacau conectado ao mercado europeu com origem, floresta e valor",
    intro:
      "O cacau conversa com território, floresta, qualidade e narrativa. A CERTIA ajuda a transformar isso em um pacote regulatório mais defensável.",
    storyTitle: "Produção com floresta, prova com consistência",
    storyDescription:
      "O valor simbólico do cacau cresce quando a origem e a conformidade conseguem ser demonstradas de forma clara para o mercado.",
    marketTitle: "Fatores de valorização",
    marketStats: [
      { label: "Valor de narrativa", value: "Alto", source: "Chocolate e origem" },
      { label: "Exigência de origem", value: "Crescente", source: "Mercado externo" },
      { label: "Espaço para diferenciação", value: "Muito alto", source: "Segmentos premium" },
    ],
    pillars: [
      { title: "Origem e território", description: "Provar a base produtiva com clareza e coerência." },
      { title: "Adequação documental", description: "Reduzir fragilidade antes de exigências mais severas." },
      { title: "Posicionamento premium", description: "Usar conformidade como reforço de valor comercial." },
    ],
    closing: "No cacau, origem comprovável fortalece tanto a confiança quanto a narrativa de valor.",
  },
  {
    slug: "oleo-de-palma",
    name: "Óleo de palma",
    eyebrow: "Óleo de palma / Dendê",
    heroTitle: "Seu dendê conectado ao mercado global com uma leitura regulatória mais madura",
    intro:
      "O dendê brasileiro convive com forte sensibilidade ambiental. A CERTIA ajuda a estruturar as evidências necessárias para reduzir ruído regulatório.",
    storyTitle: "Escala produtiva com prova de responsabilidade",
    storyDescription:
      "A preparação precisa alinhar território, documentação, cadeia e posicionamento diante de mercados mais atentos ao risco.",
    marketTitle: "Pressões do setor",
    marketStats: [
      { label: "Sensibilidade ambiental", value: "Muito alta", source: "Mercado internacional" },
      { label: "Necessidade de evidência", value: "Alta", source: "Due diligence" },
      { label: "Complexidade de cadeia", value: "Média a alta", source: "Operação" },
    ],
    pillars: [
      { title: "Contexto territorial", description: "Organizar melhor a leitura da área e da origem da produção." },
      { title: "Conformidade e cadeia", description: "Conectar documentos e pontos críticos de diligência." },
      { title: "Defesa comercial", description: "Preparar a operação para responder com mais segurança a compradores." },
    ],
    closing: "No óleo de palma, contexto territorial e evidência objetiva pesam muito na confiança do mercado.",
  },
  {
    slug: "borracha-natural",
    name: "Borracha natural",
    eyebrow: "Borracha natural / Látex",
    heroTitle: "Sua borracha conectada ao mercado global com origem e consistência operacional",
    intro:
      "A borracha natural combina potencial de valorização com necessidade de boa leitura de origem e cadeia. A CERTIA organiza esse terreno.",
    storyTitle: "Valor comercial sustentado por evidência",
    storyDescription:
      "Quando a cadeia consegue responder melhor sobre origem e organização, o produto ganha força para disputar mercados mais criteriosos.",
    marketTitle: "Sinais do mercado",
    marketStats: [
      { label: "Potencial de diferenciação", value: "Alto", source: "Mercado industrial" },
      { label: "Maturidade documental", value: "Variável", source: "Base produtiva" },
      { label: "Necessidade de preparo", value: "Crescente", source: "Compradores" },
    ],
    pillars: [
      { title: "Origem comprovável", description: "Organizar melhor a base produtiva e a conexão com a cadeia." },
      { title: "Evidência operacional", description: "Reduzir zonas cinzentas antes de uma diligência mais dura." },
      { title: "Posicionamento de mercado", description: "Usar consistência documental para reforçar valor comercial." },
    ],
    closing: "Na borracha natural, clareza de origem e organização operacional aumentam a confiança do comprador.",
  },
];

export function getCommodityBySlug(slug: string) {
  return commodityPages.find((commodity) => commodity.slug === slug);
}
