import { CTA } from "@/components/CTA";
import { FAQ } from "@/components/FAQ";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { SectionTitle } from "@/components/SectionTitle";
import { ServiceCard } from "@/components/ServiceCard";
import { StatCard } from "@/components/StatCard";
import { faqs } from "@/content/faqs";
import { products } from "@/content/products";
import { services } from "@/content/services";
import { siteConfig } from "@/content/site";

export default function Home() {
  return (
    <div className="space-y-20 pb-8">
      <Hero
        title={siteConfig.heroTitle}
        description={siteConfig.heroDescription}
        primaryHref={siteConfig.primaryCta.href}
        primaryLabel={siteConfig.primaryCta.label}
        secondaryHref={siteConfig.secondaryCta.href}
        secondaryLabel={siteConfig.secondaryCta.label}
      />

      <section className="-mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard value="30+" label="anos de experiência como linguagem de autoridade" source="Direção visual do site legado" />
        <StatCard value="+25%" label="potencial de diferenciação comercial em mercados premium" source="Mensagem comercial" />
        <StatCard value="-50%" label="espaço para ganho de eficiência na organização do processo" source="Mensagem comercial" />
        <StatCard value="€40B" label="escala de mercado citada na narrativa comercial" source="Referência institucional" />
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="rounded-[1.9rem] border border-brand-line bg-brand-navy/55 p-8 shadow-soft md:p-10">
          <SectionTitle
            eyebrow="Vantagem estratégica"
            title="Três décadas conectando exigência técnica a oportunidade comercial"
            description="O site antigo tinha uma cadência institucional forte. Aqui eu trouxe essa mesma lógica: primeiro autoridade, depois clareza regulatória, depois proposta comercial."
          />
          <div className="mt-8 space-y-5 text-brand-cream/78">
            <p>
              A CERTIA entra para organizar o que normalmente chega fragmentado: documentos, evidências
              de origem, leitura de risco e material de resposta para o mercado.
            </p>
            <p>
              O objetivo não é só cumprir uma exigência, mas melhorar o nível de preparo da operação
              para vender com mais confiança.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-brand-line bg-brand-navy/45 p-8 shadow-soft md:p-10">
        <SectionTitle
          eyebrow="EUDR"
          title="Uma exigência regulatória que afeta operação, documentação e venda"
          description="A EUDR exige evidências sobre origem, rastreabilidade e conformidade socioambiental. O desafio não está só em entender a regra, mas em montar um fluxo confiável para responder a ela."
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {[
            ["Rastreabilidade", "Mapear a origem da produção e organizar evidências da cadeia."],
            ["Conformidade", "Reduzir risco documental e ambiental antes de uma exigência crítica do comprador."],
            ["Posicionamento", "Chegar mais preparado a negociações, auditorias e processos de homologação."],
          ].map(([title, description]) => (
            <ServiceCard key={title} title={title} description={description} />
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <SectionTitle
          eyebrow="Commodities"
          title="Commodities elegíveis à narrativa premium da CERTIA"
          description="Cada cadeia tem linguagem própria, mas todas dependem de origem, documentação e capacidade de resposta para sustentar valor diante de mercados mais exigentes."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.href} {...product} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[1.75rem] border border-brand-line bg-brand-navy/55 p-8 shadow-soft">
          <SectionTitle
            eyebrow="Financeiro e mercado"
            title="Três formas de capturar valor com uma operação mais preparada"
            description="A linguagem visual do site anterior misturava conformidade com narrativa de ganho. Trouxe esse mesmo eixo sem forçar promessas automáticas no produto."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              ["Precificação premium", "Melhor argumento para negociar com compradores mais rigorosos."],
              ["Crédito e confiança", "Mais consistência para conversar com parceiros e instituições."],
              ["Compradores premium", "Operação mais apresentável para homologação e due diligence."],
            ].map(([title, description]) => (
              <div key={title} className="rounded-[1.25rem] border border-brand-line bg-brand-navy-deep/45 p-5">
                <p className="font-serif text-2xl text-brand-cream">{title}</p>
                <p className="mt-3 text-sm leading-6 text-brand-cream/72">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-brand-line bg-brand-green-deep/25 p-8 shadow-soft">
          <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">Diagnóstico em 3 minutos</p>
          <h2 className="mt-3 font-serif text-3xl text-brand-cream">
            Uma porta de entrada simples para uma conversa mais técnica
          </h2>
          <div className="mt-6 space-y-4 text-brand-cream/78">
            <p>1. Você informa dados básicos da operação.</p>
            <p>2. O sistema gera um retrato preliminar de risco.</p>
            <p>3. A equipe usa isso para orientar próximos passos com contexto.</p>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <SectionTitle
          eyebrow="Perguntas frequentes"
          title="O que normalmente precisa ficar claro antes de começar"
          align="center"
        />
        <FAQ items={faqs} />
      </section>

      <CTA
        title="Descubra seu nível de preparo antes de virar urgência"
        description="O diagnóstico preliminar ajuda a entender riscos documentais e prioridade comercial, sem prometer mais do que o sistema entrega nesta fase."
        primaryHref="/diagnostico"
        primaryLabel="Iniciar diagnóstico"
        secondaryHref={siteConfig.secondaryCta.href}
        secondaryLabel="Falar no WhatsApp"
      />
    </div>
  );
}
