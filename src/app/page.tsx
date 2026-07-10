import { siteConfig } from "@/content/site";

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center py-10 bg-brand-light rounded-xl px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-green mb-4">
          Adequação à EUDR sem complicação para o seu agronegócio
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Descubra em minutos o nível de preparo da sua fazenda ou empresa para a Regulação Europeia contra o Desmatamento.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/diagnostico" className="bg-brand-green text-white px-8 py-3 rounded-lg font-bold text-lg shadow hover:bg-green-800 transition">
            Fazer Diagnóstico Gratuito
          </a>
          <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" className="border-2 border-brand-green text-brand-green px-8 py-3 rounded-lg font-bold text-lg hover:bg-brand-green hover:text-white transition">
            Falar com Especialista
          </a>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-center mb-6">Nossas Soluções</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-xl mb-2 text-brand-green">Diagnóstico Inicial</h3>
            <p className="text-gray-600">Avaliação rápida e gratuita do seu nível de conformidade atual com a EUDR.</p>
          </div>
          <div className="border p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-xl mb-2 text-brand-green">Certificação EUDR</h3>
            <p className="text-gray-600">Emissão da documentação necessária e suporte completo para validação.</p>
          </div>
          <div className="border p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-xl mb-2 text-brand-green">Monitoramento Contínuo</h3>
            <p className="text-gray-600">Acompanhamento de georreferenciamento e cadeia produtiva para manter a conformidade.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
