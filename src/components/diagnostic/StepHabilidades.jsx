import React from "react";
import { HABILIDADES_OPTIONS, OPCOES_COMO_RESOLVE } from "@/lib/diagnosticUtils";

export default function StepHabilidades({ data, updateData }) {
  const toggleHabilidade = (habilidadeId) => {
    const current = data.habilidades || [];
    updateData("habilidades", current.includes(habilidadeId)
      ? current.filter(h => h !== habilidadeId)
      : [...current, habilidadeId]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-xl font-bold mb-2">Quais dessas habilidades você possui?</h2>
        <p className="text-sm text-muted-foreground mb-6">Marque todas as opções que fazem sentido para você.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {HABILIDADES_OPTIONS.map(habilidade => {
            const selected = data.habilidades?.includes(habilidade.id);
            return (
              <button
                key={habilidade.id}
                type="button"
                onClick={() => toggleHabilidade(habilidade.id)}
                className={`p-4 text-left rounded-xl border transition-all ${
                  selected
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card border-border hover:border-primary/50 hover:bg-primary/5"
                }`}
              >
                <div className="font-medium">{habilidade.label}</div>
                <div className={`text-sm ${selected ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {habilidade.descricao}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t pt-6">
        <label className="block font-medium mb-3">Como você resolve problemas?</label>
        <div className="flex flex-wrap gap-2">
          {OPCOES_COMO_RESOLVE.map(opcao => (
            <button
              key={opcao}
              type="button"
              onClick={() => updateData("comoResolveProblemas", opcao)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                data.comoResolveProblemas === opcao
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border hover:border-primary/50"
              }`}
            >
              {opcao}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block font-medium mb-2">Já ensinou alguém a fazer algo?</label>
        <input
          type="text"
          value={data.ensinouAlgo || ""}
          onChange={(e) => updateData("ensinouAlgo", e.target.value)}
          placeholder="Ex: Ensinei um amigo a jogar futebol, ajudei minha irmã com matemática..."
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
      </div>
    </div>
  );
}