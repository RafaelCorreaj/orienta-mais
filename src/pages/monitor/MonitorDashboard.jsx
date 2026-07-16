import React, { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { base44 } from "@/api/base44Client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Clock, CheckCircle2, Eye, UserPlus, Loader2 } from "lucide-react";
import ProfileBadge from "@/components/shared/ProfileBadge";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

export default function MonitorDashboard() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [acceptingId, setAcceptingId] = useState(null);

  const { data: monitor } = useQuery({
    queryKey: ["monitor-profile", user?.email],
    queryFn: async () => {
      const monitors = await base44.entities.Monitor.filter({ email: user?.email });
      return monitors[0];
    },
    enabled: !!user?.email,
  });

  const { data: filaPendentes = [], isLoading: loadingFila } = useQuery({
    queryKey: ["fila-pendentes"],
    queryFn: () => base44.entities.FilaMentoria.filter({ status_fila: "Aguardando" }),
  });

  const { data: mentorados = [], isLoading: loadingMentorados } = useQuery({
    queryKey: ["meus-mentorados", monitor?.id],
    queryFn: () => base44.entities.Mentorado.filter({ monitor_id: monitor?.id, status: "Ativo" }),
    enabled: !!monitor?.id,
  });

  const filaFiltrada = filaPendentes.filter(f => monitor?.perfis_disponiveis?.includes(f.perfil));

  const handleAceitar = async (fila) => {
    setAcceptingId(fila.id);
    await base44.entities.Mentorado.create({
      usuario_id: fila.usuario_id,
      usuario_nome: fila.usuario_nome,
      monitor_id: monitor.id,
      monitor_nome: monitor.nome || user.full_name,
      monitor_whatsapp: monitor.whatsapp,
      perfil_aluno: fila.perfil,
      status: "Ativo"
    });
    await base44.entities.FilaMentoria.update(fila.id, { status_fila: "Atendido" });
    queryClient.invalidateQueries();
    setAcceptingId(null);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold">Painel do Monitor</h1>
        <p className="text-muted-foreground text-sm mt-1">Olá, {user?.full_name}! Gerencie seus mentorados.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="border-border/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-heading font-bold">{filaFiltrada.length}</p>
              <p className="text-xs text-muted-foreground">Pendentes</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-heading font-bold">{mentorados.length}</p>
              <p className="text-xs text-muted-foreground">Mentorados</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pendentes">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="pendentes" className="flex-1 gap-1">
            <Clock className="w-4 h-4" /> Pendentes ({filaFiltrada.length})
          </TabsTrigger>
          <TabsTrigger value="mentorados" className="flex-1 gap-1">
            <Users className="w-4 h-4" /> Mentorados ({mentorados.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pendentes">
          {loadingFila ? (
            <div className="space-y-3">{[1,2,3].map(i => <Skeleton key={i} className="h-24 rounded-xl" />)}</div>
          ) : filaFiltrada.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <CheckCircle2 className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>Nenhum aluno pendente no momento</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filaFiltrada.map(f => (
                <Card key={f.id} className="border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div>
                        <p className="font-medium">{f.usuario_nome || "Aluno"}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <ProfileBadge perfil={f.perfil} size="sm" />
                          <span className="text-xs text-muted-foreground">{new Date(f.created_date).toLocaleDateString("pt-BR")}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link to={`/monitor/aluno/${f.usuario_id}`}>
                          <Button variant="outline" size="sm" className="gap-1"><Eye className="w-3.5 h-3.5" /> Ver perfil</Button>
                        </Link>
                        <Button size="sm" className="gap-1" disabled={acceptingId === f.id} onClick={() => handleAceitar(f)}>
                          {acceptingId === f.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <UserPlus className="w-3.5 h-3.5" />}
                          Aceitar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="mentorados">
          {loadingMentorados ? (
            <div className="space-y-3">{[1,2,3].map(i => <Skeleton key={i} className="h-24 rounded-xl" />)}</div>
          ) : mentorados.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>Nenhum mentorado ativo</p>
            </div>
          ) : (
            <div className="space-y-3">
              {mentorados.map(m => (
                <Card key={m.id} className="border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div>
                        <p className="font-medium">{m.usuario_nome || "Aluno"}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {m.perfil_aluno && <ProfileBadge perfil={m.perfil_aluno} size="sm" />}
                          <span className="text-xs text-muted-foreground">Match em {new Date(m.created_date).toLocaleDateString("pt-BR")}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link to={`/monitor/aluno/${m.usuario_id}`}>
                          <Button variant="outline" size="sm" className="gap-1"><Eye className="w-3.5 h-3.5" /> Ver perfil</Button>
                        </Link>
                        <Link to={`/monitor/encontro/${m.id}`}>
                          <Button size="sm">Registrar encontro</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}