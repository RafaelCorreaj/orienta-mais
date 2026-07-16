import React from "react";
import { ITENS_AUTOAVALIACAO } from "@/lib/diagnosticUtils";

export default function StepAutoavaliacao({ data, updateData }) {
  const getValue = (key) => {
    return data.autoavaliacao?.[key] || 3;
  };

  const setValue = (key, value) => {
    updateData("autoavaliacao", { ...(data.autoavaliacao || {}), [key]: value });
  };

  return (
    <div>
      <h2 className="font-heading text-xl font-bold mb-2">Como você se avalia em cada aspecto?</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Para cada item abaixo, escolha uma nota de 1 a 5, onde 1 é "muito ruim" e 5 é "excelente".
      </p>

      <div className="divide-y divide-border">
        {ITENS_AUTOAVALIACAO.map(item => (
          <div key={item.key} className="py-5">
            <div className="mb-3">
              <p className="font-medium text-sm">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.descricao}</p>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(nota => (
                <button
                  key={nota}
                  type="button"
                  onClick={() => setValue(item.key, nota)}
                  className={`flex-1 py-3 rounded-xl border text-center font-medium transition-all ${
                    getValue(item.key) === nota
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-card border-border hover:border-primary/50 hover:bg-primary/5"
                  }`}
                >
                  <div className="text-lg font-bold">{nota}</div>
                  <div className={`text-[10px] ${getValue(item.key) === nota ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {nota === 1 ? "Muito ruim" : nota === 2 ? "Ruim" : nota === 3 ? "Regular" : nota === 4 ? "Bom" : "Excelente"}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Mini resumo visual */}
      <div className="mt-4 p-4 bg-secondary/30 rounded-xl">
        <p className="text-sm text-muted-foreground text-center">
          Sua autoavaliação total: <strong className="text-foreground">
            {Object.values(data.autoavaliacao || {}).reduce((a, b) => a + b, 0)}/25
          </strong> pontos
        </p>
      </div>
    </div>
  );
}