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
        kicker="Janela de ganho e diferenciação"
        title="Descubra quanto da sua margem pode estar escapando sem uma operação pronta para a EUDR"
        description="Quem chega ao comprador com origem, rastreabilidade e narrativa de conformidade negocia melhor, acessa canais premium e reduz fricção comercial. O diagnóstico mostra quanto valor você pode estar deixando na mesa."
        primaryHref={siteConfig.primaryCta.href}
        primaryLabel="Calcular meu potencial de ganho"
        secondaryHref={siteConfig.secondaryCta.href}
        secondaryLabel="Ver minha oportunidade com especialista"
      />

      <section className="-mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard value="30+" label="anos de experiência como linguagem de autoridade" source="Direção visual do site legado" />
        <StatCard value="+25%" label="potencial indicativo de prêmio em cadeias preparadas" source="Faixa comercial estimada" />
        <StatCard value="-50%" label="potencial indicativo de alívio no custo do capital" source="Faixa comercial estimada" />
        <StatCard value="€40B" label="escala de mercado que premia operações mais rastreáveis" source="Narrativa de oportunidade" />
      </section>

      <section className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr] xl:items-start">
        <div className="rounded-[1.9rem] border border-brand-line bg-brand-navy/55 p-8 shadow-soft md:p-10">
          <SectionTitle
            eyebrow="Perda invisível"
            title="O maior custo pode não ser a certificação. Pode ser continuar vendendo abaixo do seu potencial."
            description="Quando a operação não consegue provar origem, organização documental e preparo regulatório, ela perde poder de negociação mesmo sem perceber. A EUDR transforma preparo em argumento comercial."
          />
          <div className="mt-8 space-y-5 text-brand-cream/78">
            <p>
              O comprador premium não paga só pela commodity. Ele paga por confiança, velocidade de resposta e menor risco de due diligence.
            </p>
            <p>
              A CERTIA organiza o que normalmente bloqueia esse ganho: documentação, rastreabilidade, narrativa comercial e leitura de oportunidade.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-brand-line bg-brand-navy/45 p-8 shadow-soft md:p-10">
        <SectionTitle
          eyebrow="Oportunidade e urgência"
          title="Sem adequação, você não perde só compliance. Você pode perder margem, crédito e comprador."
          description="A EUDR afeta acesso comercial, velocidade de homologação e percepção de risco. A pergunta não é apenas se você está conforme, mas quanto valor deixa de capturar enquanto não estiver."
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {[
            ["Preço melhor", "Operações preparadas conseguem defender prêmio com mais força em negociações."],
            ["Crédito mais leve", "Menor percepção de risco ajuda a abrir espaço para capital mais barato."],
            ["Comprador premium", "Quem responde melhor à due diligence entra mais forte em mercados seletivos."],
          ].map(([title, description]) => (
            <ServiceCard key={title} title={title} description={description} />
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <SectionTitle
          eyebrow="Onde o ganho aparece"
          title="As cadeias que mais sentem a perda de valor quando a operação não está pronta"
          description="Cada commodity tem sua linguagem comercial, mas todas são impactadas quando documentação, origem e rastreabilidade não conseguem sustentar um prêmio convincente."
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
            eyebrow="Desejo comercial"
            title="Três formas de transformar adequação em dinheiro, confiança e acesso"
            description="A certificação e a preparação documental não são só custo. Elas podem virar argumento de margem, de crédito e de acesso a compradores que pagam melhor."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              ["Precificação premium", "Melhor argumento para defender valor e reduzir desconto invisível."],
              ["Crédito e confiança", "Mais preparo para discutir capital verde e percepção de risco."],
              ["Compradores premium", "Mais chance de entrar em canais que selecionam operação, não só preço."],
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
            Descubra o potencial que sua operação pode estar deixando na mesa
          </h2>
          <div className="mt-6 space-y-4 text-brand-cream/78">
            <p>1. Você informa os sinais principais da sua operação.</p>
            <p>2. O sistema estima score, gargalos e faixa de oportunidade comercial.</p>
            <p>3. A CERTIA usa isso para mostrar o que pode ser destravado com prioridade.</p>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <SectionTitle
          eyebrow="Perguntas frequentes"
          title="O que a persona quer saber antes de clicar no diagnóstico"
          align="center"
        />
        <FAQ items={faqs} />
      </section>

      <CTA
        title="Antes de continuar vendendo pelo preço spot, descubra seu potencial premium"
        description="O diagnóstico foi desenhado para mostrar o que você pode estar perdendo hoje e onde a adequação começa a virar dinheiro, crédito e acesso comercial."
        primaryHref="/diagnostico"
        primaryLabel="Calcular meu potencial agora"
        secondaryHref={siteConfig.secondaryCta.href}
        secondaryLabel="Falar no WhatsApp"
      />
    </div>
  );
}
