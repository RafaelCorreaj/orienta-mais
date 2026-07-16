import React from "react";
import { useAuth } from "@/lib/AuthContext";
import { apiClient } from "@/api/client";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Compass, BookOpen, Heart, Star, ArrowRight, MessageCircle, Clock } from "lucide-react";
import ProfileBadge from "@/components/shared/ProfileBadge";
import CourseCard from "@/components/shared/CourseCard";
import { PERFIL_DESCRICOES } from "@/lib/diagnosticUtils";
import { Skeleton } from "@/components/ui/skeleton";

export default function StudentDashboard() {
  const { user } = useAuth();

  const { data: diagnostico, isLoading: loadingDiag } = useQuery({
    queryKey: ["meu-diagnostico"],
    queryFn: () => apiClient.get('/diagnostico').catch(() => null),
  });

  const { data: cursos = [], isLoading: loadingCursos } = useQuery({
    queryKey: ["cursos"],
    queryFn: () => base44.entities.Curso.list(),
  });

  const { data: filaEntries = [] } = useQuery({
    queryKey: ["fila", user?.id],
    queryFn: () => base44.entities.FilaMentoria.filter({ usuario_id: user?.id }, "-created_date"),
    enabled: !!user?.id,
  });

  const { data: mentorados = [] } = useQuery({
    queryKey: ["mentorados", user?.id],
    queryFn: () => base44.entities.Mentorado.filter({ usuario_id: user?.id, status: "Ativo" }),
    enabled: !!user?.id,
  });

  const perfil = diagnostico?.perfilClassificado;
  const perfilInfo = perfil ? PERFIL_DESCRICOES[perfil] : null;
  const cursosRecomendados = perfil ? cursos.filter(c => c.perfisRecomendados?.includes(perfil)).slice(0, 4) : [];
  const filaAtiva = filaEntries.find(f => f.status_fila === "Aguardando");
  const mentoradoAtivo = mentorados[0];
  const isLoading = loadingDiag || loadingCursos;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold">
          Olá, {user?.nome?.split(" ")[0] || "estudante"} 👋
        </h1>
        <p className="text-muted-foreground mt-1">Bem-vindo(a) à sua plataforma de orientação profissional</p>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 gap-6">
          {[1,2,3,4].map(i => <Skeleton key={i} className="h-40 rounded-xl" />)}
        </div>
      ) : (
        <>
          {/* Profile Card */}
          <Card className="border-border/50 overflow-hidden">
            {perfil ? (
              <>
                <div className={`h-2 bg-gradient-to-r ${perfilInfo?.cor}`} />
                <CardContent className="p-6">
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Seu perfil profissional</p>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-4xl">{perfilInfo?.emoji}</span>
                        <div>
                          <h2 className="font-heading text-2xl font-bold">{perfil}</h2>
                      <p className="text-sm text-muted-foreground">Pontuação: {diagnostico.pontuacaoTotal} pontos</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">{perfilInfo?.descricao}</p>
                    </div>
                    <Link to={`/resultado/${diagnostico.id}`}>
                      <Button variant="outline" size="sm" className="gap-1">
                        Ver detalhes <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Compass className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-heading font-semibold text-lg">Descubra seu perfil</h2>
                    <p className="text-sm text-muted-foreground">Faça o diagnóstico e descubra qual é o seu perfil profissional</p>
                  </div>
                  <Link to="/diagnostico">
                    <Button className="gap-2 rounded-full">Fazer diagnóstico <ArrowRight className="w-4 h-4" /></Button>
                  </Link>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Mentorship */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-heading flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" /> Mentoria
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mentoradoAtivo ? (
                <div className="flex items-center gap-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-emerald-900">Em acompanhamento</p>
                    <p className="text-sm text-emerald-700">Monitor: {mentoradoAtivo.monitor_nome}</p>
                    {mentoradoAtivo.monitor_whatsapp && (
                      <a href={`https://wa.me/${mentoradoAtivo.monitor_whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
                        className="text-sm text-emerald-600 underline mt-1 inline-block">Falar no WhatsApp</a>
                    )}
                  </div>
                </div>
              ) : filaAtiva ? (
                <div className="flex items-center gap-4 p-4 rounded-xl bg-amber-50 border border-amber-200">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-amber-900">Aguardando monitor</p>
                    <p className="text-sm text-amber-700">Em breve um monitor voluntário entrará em contato</p>
                  </div>
                </div>
              ) : perfil ? (
                <div className="flex items-center gap-4">
                  <p className="text-sm text-muted-foreground flex-1">Você ainda não solicitou mentoria. Conecte-se com um monitor voluntário!</p>
                  <Link to="/mentoria">
                    <Button variant="outline" size="sm" className="gap-1">Solicitar <ArrowRight className="w-3.5 h-3.5" /></Button>
                  </Link>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Faça o diagnóstico primeiro para solicitar mentoria.</p>
              )}
            </CardContent>
          </Card>

          {/* Courses */}
          {cursosRecomendados.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading font-semibold text-lg flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" /> Cursos recomendados
                </h2>
                <Link to="/cursos">
                  <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
                    Ver todos <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {cursosRecomendados.map(c => <CourseCard key={c.id} curso={c} />)}
              </div>
            </div>
          )}

          {/* Evaluate */}
          <Card className="border-border/50 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardContent className="p-5 flex items-center gap-4">
              <Star className="w-8 h-8 text-primary shrink-0" />
              <div className="flex-1">
                <p className="font-medium">Avalie a plataforma</p>
                <p className="text-sm text-muted-foreground">Sua opinião nos ajuda a melhorar!</p>
              </div>
              <Link to="/avaliar"><Button variant="outline" size="sm">Avaliar</Button></Link>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}