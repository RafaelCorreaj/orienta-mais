import React from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import { Link, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, BookOpen } from "lucide-react";
import { PERFIL_DESCRICOES } from "@/lib/diagnosticUtils";
import CourseCard from "@/components/shared/CourseCard";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function DiagnosticResult() {
  const { id } = useParams();

  const { data: diag, isLoading } = useQuery({
    queryKey: ["diagnostico", id],
    queryFn: async () => {
      const result = await apiClient.get('/entities/Diagnostico/' + id);
      return result;
    },
    enabled: !!id,
  });

  const { data: cursos = [] } = useQuery({
    queryKey: ["cursos"],
    queryFn: () => apiClient.get('/entities/Curso'),
  });

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto space-y-4">
        <Skeleton className="h-64 rounded-xl" />
        <Skeleton className="h-40 rounded-xl" />
      </div>
    );
  }

  if (!diag) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Diagnóstico não encontrado</p>
        <Link to="/dashboard"><Button variant="link">Voltar ao início</Button></Link>
      </div>
    );
  }

  const perfil = diag.perfilClassificado;
  const info = PERFIL_DESCRICOES[perfil];
  const cursosRecomendados = cursos.filter(c => c.perfisRecomendados?.includes(perfil));

  return (
    <div className="max-w-2xl mx-auto">
      <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> Voltar ao dashboard
      </Link>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <Card className="overflow-hidden border-border/50 mb-6">
          <div className={`h-32 bg-gradient-to-r ${info?.cor} flex items-center justify-center`}>
            <span className="text-6xl">{info?.emoji}</span>
          </div>
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Seu perfil profissional é</p>
            <h1 className="font-heading text-3xl font-bold mb-2">{perfil}</h1>
            <p className="text-sm text-muted-foreground mb-4">
              Pontuação total: <span className="font-semibold">{diag.pontuacaoTotal} pontos</span>
            </p>
            <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">{info?.descricao}</p>
            {info?.carreiras && (
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {info.carreiras.map(c => (
                  <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <Card className="border-border/50 mb-6">
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
              <p className="font-medium">{diag.estiloTrabalho}</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Em grupo</p>
              <p className="font-medium">{diag.estiloGrupo}</p>
            </div>
          </div>
          {diag.autoavaliacao && (
            <div>
              <p className="text-muted-foreground text-sm mb-2">Autoavaliação</p>
              <div className="grid grid-cols-5 gap-2 text-center text-xs">
                {[
                  { label: "Org.", val: diag.autoavaliacao.organizacao },
                  { label: "Com.", val: diag.autoavaliacao.comunicacao },
                  { label: "Equipe", val: diag.autoavaliacao.equipe },
                  { label: "Resp.", val: diag.autoavaliacao.responsabilidade },
                  { label: "Criat.", val: diag.autoavaliacao.criatividade },
                ].map(a => (
                  <div key={a.label} className="bg-secondary rounded-lg p-2">
                    <p className="text-lg font-bold">{a.val || "-"}</p>
                    <p className="text-muted-foreground">{a.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {diag.sonho && (
            <div className="text-sm">
              <p className="text-muted-foreground mb-1">Sonho profissional</p>
              <p className="bg-secondary/50 rounded-lg p-3">{diag.sonho}</p>
            </div>
          )}
          {diag.querAprender && (
            <div className="text-sm">
              <p className="text-muted-foreground mb-1">Quer aprender</p>
              <p className="bg-secondary/50 rounded-lg p-3">{diag.querAprender}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {cursosRecomendados.length > 0 && (
        <div className="mb-6">
          <h3 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" /> Cursos recomendados para você
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {cursosRecomendados.map(c => <CourseCard key={c.id} curso={c} />)}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <Link to="/mentoria" className="flex-1">
          <Button className="w-full gap-2 rounded-full">
            <Heart className="w-4 h-4" /> Solicitar mentoria
          </Button>
        </Link>
        <Link to="/dashboard" className="flex-1">
          <Button variant="outline" className="w-full gap-2 rounded-full">
            Voltar ao dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}