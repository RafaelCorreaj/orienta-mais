import React from "react";

const estilosTrabalho = [
  { value: "Sozinho", emoji: "🧑", desc: "Prefiro trabalhar por conta própria" },
  { value: "Dupla", emoji: "👥", desc: "Gosto de trabalhar com um parceiro" },
  { value: "Grupo", emoji: "👨‍👩‍👧‍👦", desc: "Prefiro trabalhar em equipe" },
];

const estilosGrupo = [
  { value: "Lidera", emoji: "👑", desc: "Costumo liderar o grupo" },
  { value: "Colabora", emoji: "🤝", desc: "Contribuo ativamente com todos" },
  { value: "Observa", emoji: "👀", desc: "Observo e contribuo quando necessário" },
  { value: "Reservado", emoji: "🤫", desc: "Sou mais reservado(a) em grupo" },
];

export default function StepEstilo({ data, updateData }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-heading text-xl font-bold mb-2">Como você prefere trabalhar?</h2>
        <p className="text-sm text-muted-foreground mb-4">Escolha o estilo que mais combina com você</p>
        <div className="space-y-2">
          {estilosTrabalho.map(e => (
            <button key={e.value} onClick={() => updateData("estiloTrabalho", e.value)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all ${data.estiloTrabalho === e.value ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/50"}`}>
              <span className="text-2xl">{e.emoji}</span>
              <div>
                <p className="font-medium text-sm">{e.value}</p>
                <p className={`text-xs ${data.estiloTrabalho === e.value ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{e.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div>
        <h2 className="font-heading text-lg font-bold mb-2">Em um grupo, você geralmente...</h2>
        <div className="space-y-2">
          {estilosGrupo.map(e => (
            <button key={e.value} onClick={() => updateData("estiloGrupo", e.value)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all ${data.estiloGrupo === e.value ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/50"}`}>
              <span className="text-2xl">{e.emoji}</span>
              <div>
                <p className="font-medium text-sm">{e.value}</p>
                <p className={`text-xs ${data.estiloGrupo === e.value ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{e.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}