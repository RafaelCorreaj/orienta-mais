import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User } from "lucide-react";
import { PERFIL_DESCRICOES } from "@/lib/diagnosticUtils";
import ProfileBadge from "@/components/shared/ProfileBadge";
import CourseCard from "@/components/shared/CourseCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function StudentDetailPage() {
  const { userId } = useParams();

  const { data: diagnosticos = [], isLoading } = useQuery({
    queryKey: ["diag-aluno", userId],
    queryFn: () => base44.entities.Diagnostico.filter({ usuario_id: userId }, "-created_date", 1),
    enabled: !!userId,
  });

  const { data: cursos = [] } = useQuery({
    queryKey: ["cursos"],
    queryFn: () => base44.entities.Curso.list(),
  });

  const diag = diagnosticos[0];
  const perfil = diag?.perfil_classificado;
  const info = perfil ? PERFIL_DESCRICOES[perfil] : null;
  const cursosRec = perfil ? cursos.filter(c => c.perfis_recomendados?.includes(perfil)) : [];

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto space-y-4">
        <Skeleton className="h-64 rounded-xl" />
        <Skeleton className="h-40 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link to="/monitor" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> Voltar ao painel
      </Link>

      {!diag ? (
        <div className="text-center py-10 text-muted-foreground">
          <p>Diagnóstico do aluno não encontrado.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <Card className="border-border/50 overflow-hidden">
            <div className={`h-2 bg-gradient-to-r ${info?.cor || "from-primary to-primary"}`} />
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
                  <User className="w-7 h-7 text-muted-foreground" />
                </div>
                <div>
                  <h2 className="font-heading text-xl font-bold">{diag.usuario_nome}</h2>
                  <ProfileBadge perfil={perfil} size="sm" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{info?.descricao}</p>
              <p className="text-sm mt-2">Pontuação total: <strong>{diag.pontuacao_total}</strong></p>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-heading font-semibold">Detalhes do diagnóstico</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Habilidades</p>
                  <div className="flex flex-wrap gap-1">
                    {diag.habilidades?.map(h => <Badge key={h} variant="outline" className="text-xs">{h}</Badge>)}
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Interesses</p>
                  <div className="flex flex-wrap gap-1">
                    {diag.interesses?.map(i => <Badge key={i} variant="outline" className="text-xs">{i}</Badge>)}
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Estilo de trabalho</p>
                  <p className="font-medium">{diag.estilo_trabalho}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Em grupo</p>
                  <p className="font-medium">{diag.estilo_grupo}</p>
                </div>
              </div>

              <div>
                <p className="text-muted-foreground text-sm mb-2">Autoavaliação</p>
                <div className="grid grid-cols-5 gap-2 text-center text-xs">
                  {[
                    { label: "Org.", val: diag.autoavaliacao_organizacao },
                    { label: "Com.", val: diag.autoavaliacao_comunicacao },
                    { label: "Equipe", val: diag.autoavaliacao_equipe },
                    { label: "Resp.", val: diag.autoavaliacao_responsabilidade },
                    { label: "Criat.", val: diag.autoavaliacao_criatividade },
                  ].map(a => (
                    <div key={a.label} className="bg-secondary rounded-lg p-2">
                      <p className="text-lg font-bold">{a.val || "-"}</p>
                      <p className="text-muted-foreground">{a.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {diag.sonho && (
                <div className="text-sm">
                  <p className="text-muted-foreground mb-1">Sonho profissional</p>
                  <p className="bg-secondary/50 rounded-lg p-3">{diag.sonho}</p>
                </div>
              )}
              {diag.quer_aprender && (
                <div className="text-sm">
                  <p className="text-muted-foreground mb-1">Quer aprender</p>
                  <p className="bg-secondary/50 rounded-lg p-3">{diag.quer_aprender}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {cursosRec.length > 0 && (
            <div>
              <h3 className="font-heading font-semibold mb-3">Cursos recomendados</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {cursosRec.map(c => <CourseCard key={c.id} curso={c} />)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}