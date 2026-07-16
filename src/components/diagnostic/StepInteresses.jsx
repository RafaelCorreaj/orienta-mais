import React from "react";
import { INTERESSES_OPTIONS, OPCOES_APRENDIZADO } from "@/lib/diagnosticUtils";

export default function StepInteresses({ data, updateData }) {
  const toggleInteresse = (interesseId) => {
    const current = data.interesses || [];
    updateData("interesses", current.includes(interesseId)
      ? current.filter(i => i !== interesseId)
      : [...current, interesseId]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-xl font-bold mb-2">Quais áreas despertam seu interesse?</h2>
        <p className="text-sm text-muted-foreground mb-6">Marque as áreas que você gosta ou tem curiosidade.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {INTERESSES_OPTIONS.map(interesse => {
            const selected = data.interesses?.includes(interesse.id);
            return (
              <button
                key={interesse.id}
                type="button"
                onClick={() => toggleInteresse(interesse.id)}
                className={`p-4 text-left rounded-xl border transition-all ${
                  selected
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card border-border hover:border-primary/50 hover:bg-primary/5"
                }`}
              >
                <div className="font-medium">{interesse.label}</div>
                <div className={`text-sm ${selected ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {interesse.descricao}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t pt-6 space-y-4">
        <div>
          <label className="block font-medium mb-2">O que você faz no seu tempo livre?</label>
          <textarea
            value={data.tempoLivre || ""}
            onChange={(e) => updateData("tempoLivre", e.target.value)}
            placeholder="Ex: Gosto de desenhar, jogar videogame, ler livros, praticar esportes..."
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none h-24"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Já tem alguma profissão em mente?</label>
          <input
            type="text"
            value={data.profissaoEmMente || ""}
            onChange={(e) => updateData("profissaoEmMente", e.target.value)}
            placeholder="Ex: Médico, programador, professor, empresário..."
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        <div>
          <label className="block font-medium mb-3">Você prefere aprender de forma:</label>
          <div className="flex flex-wrap gap-2">
            {OPCOES_APRENDIZADO.map(opcao => (
              <button
                key={opcao}
                type="button"
                onClick={() => updateData("preferenciaAprendizado", opcao)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                  data.preferenciaAprendizado === opcao
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border hover:border-primary/50"
                }`}
              >
                {opcao}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}