"use client";
import { useState } from "react";
import { siteConfig } from "@/content/site";

export default function DiagnosticoPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Converter checkboxes para booleanos
    data.possui_car = data.possui_car === "on";
    data.possui_georef = data.possui_georef === "on";
    data.exporta_ue = data.exporta_ue === "on";
    data.tem_doc_cadeia = data.tem_doc_cadeia === "on";
    data.tem_hist_ambiental = data.tem_hist_ambiental === "on";

    try {
      const res = await fetch("/api/diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Erro ao enviar formulário");
      
      setSuccess(true);
    } catch (err) {
      setError("Houve um erro ao enviar. Tente novamente ou nos chame no WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto text-center bg-green-50 p-10 rounded-xl border border-green-200">
        <h2 className="text-3xl font-bold text-green-800 mb-4">Diagnóstico Enviado com Sucesso!</h2>
        <p className="text-gray-700 mb-6">Recebemos suas informações. Em instantes você receberá o resultado no seu e-mail. Para acelerar o processo, fale agora com nosso especialista.</p>
        <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition">
          Falar no WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-2 text-brand-green">Diagnóstico EUDR Gratuito</h1>
      <p className="text-center text-gray-500 mb-8">Preencha os dados abaixo para descobrir o nível de risco da sua operação.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-xl shadow-md border border-gray-100">
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo*</label>
            <input required type="text" name="nome" className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-brand-green outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail*</label>
            <input required type="email" name="email" className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-brand-green outline-none" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp*</label>
            <input required type="text" name="whatsapp" className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-brand-green outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Empresa / Fazenda*</label>
            <input required type="text" name="empresa" className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-brand-green outline-none" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cidade*</label>
            <input required type="text" name="cidade" className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-brand-green outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado*</label>
            <input required type="text" name="estado" className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-brand-green outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Produto Exportado*</label>
          <input required type="text" name="produto" className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-brand-green outline-none" />
        </div>

        <div className="space-y-2 pt-4 border-t mt-4">
          <p className="font-bold text-gray-800">Checklist de Conformidade:</p>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="possui_car" className="w-4 h-4" /> 
            <span>Possui CAR (Cadastro Ambiental Rural)?</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="possui_georef" className="w-4 h-4" /> 
            <span>Possui georreferenciamento da propriedade?</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="exporta_ue" className="w-4 h-4" /> 
            <span>Já exporta para a União Europeia?</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="tem_doc_cadeia" className="w-4 h-4" /> 
            <span>Possui documentação da cadeia produtiva?</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="tem_hist_ambiental" className="w-4 h-4" /> 
            <span>Possui histórico de conformidade ambiental?</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
          <textarea name="observacoes" rows={3} className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-brand-green outline-none"></textarea>
        </div>

        <div className="flex items-center gap-2">
          <input required type="checkbox" name="aceite" className="w-4 h-4" />
          <label className="text-sm text-gray-600">Aceito a <a href="/politica-de-privacidade" className="text-brand-green underline">Política de Privacidade</a> e autorizo o contato comercial.</label>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button 
          type="submit" 
          disabled={loading} 
          className="w-full bg-brand-green text-white p-3 rounded-lg font-bold text-lg hover:bg-green-800 transition disabled:bg-gray-400"
        >
          {loading ? "Processando..." : "Ver meu Diagnóstico Gratuito"}
        </button>
      </form>
    </div>
  );
}
