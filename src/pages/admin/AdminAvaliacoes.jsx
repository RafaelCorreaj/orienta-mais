import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Heart } from "lucide-react";
import StatsCard from "@/components/shared/StatsCard";
import { Skeleton } from "@/components/ui/skeleton";

function StarDisplay({ value }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(n => <Star key={n} className={`w-4 h-4 ${n <= value ? "text-amber-400 fill-amber-400" : "text-border"}`} />)}
    </div>
  );
}

export default function AdminAvaliacoes() {
  const { data: avaliacoes = [], isLoading } = useQuery({
    queryKey: ["all-avaliacoes"],
    queryFn: () => base44.entities.AvaliacaoPlataforma.list("-created_date", 200),
  });

  const avg = (field) => {
    if (avaliacoes.length === 0) return 0;
    return (avaliacoes.reduce((sum, a) => sum + (a[field] || 0), 0) / avaliacoes.length).toFixed(1);
  };

  if (isLoading) return <div className="space-y-4">{[1,2,3].map(i => <Skeleton key={i} className="h-32 rounded-xl" />)}</div>;

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold flex items-center gap-2 mb-6"><Heart className="w-6 h-6 text-primary" /> Avaliações</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard title="Total" value={avaliacoes.length} icon={Star} />
        <StatsCard title="Utilidade" value={avg("nota_utilidade")} icon={Star} gradient="from-amber-500/5 to-amber-500/10" />
        <StatsCard title="Clareza" value={avg("clareza_diagnostico")} icon={Star} gradient="from-purple-500/5 to-purple-500/10" />
        <StatsCard title="Cursos" value={avg("relevancia_cursos")} icon={Star} gradient="from-blue-500/5 to-blue-500/10" />
      </div>
      <Card className="border-border/50">
        <CardHeader><CardTitle className="text-lg font-heading">Avaliações recentes</CardTitle></CardHeader>
        <CardContent>
          {avaliacoes.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Nenhuma avaliação ainda</p>
          ) : (
            <div className="space-y-4">
              {avaliacoes.map(a => (
                <div key={a.id} className="p-4 rounded-xl bg-secondary/30 space-y-2">
                  <span className="text-sm text-muted-foreground">{new Date(a.created_date).toLocaleDateString("pt-BR")}</span>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div><p className="text-muted-foreground text-xs">Utilidade</p><StarDisplay value={a.nota_utilidade} /></div>
                    <div><p className="text-muted-foreground text-xs">Clareza</p><StarDisplay value={a.clareza_diagnostico} /></div>
                    <div><p className="text-muted-foreground text-xs">Cursos</p><StarDisplay value={a.relevancia_cursos} /></div>
                  </div>
                  {a.comentario && <p className="text-sm bg-card p-3 rounded-lg">{a.comentario}</p>}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}