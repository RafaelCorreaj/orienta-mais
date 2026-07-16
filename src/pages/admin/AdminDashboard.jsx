import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, ClipboardList, Clock, BarChart3 } from "lucide-react";
import StatsCard from "@/components/shared/StatsCard";
import ProfileBadge from "@/components/shared/ProfileBadge";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

const PROFILE_COLORS = {
  "Líder": "#f59e0b", "Colaborativo": "#10b981", "Técnico": "#3b82f6", "Criativo": "#a855f7", "Acadêmico": "#6366f1"
};

export default function AdminDashboard() {
  const { data: users = [], isLoading } = useQuery({ queryKey: ["all-users"], queryFn: () => base44.entities.User.list("-created_date", 500) });
  const { data: diagnosticos = [] } = useQuery({ queryKey: ["all-diags"], queryFn: () => base44.entities.Diagnostico.list("-created_date", 500) });
  const { data: fila = [] } = useQuery({ queryKey: ["all-fila"], queryFn: () => base44.entities.FilaMentoria.filter({ status_fila: "Aguardando" }) });
  const { data: monitores = [] } = useQuery({ queryKey: ["all-monitores"], queryFn: () => base44.entities.Monitor.list() });
  const { data: mentorados = [] } = useQuery({ queryKey: ["all-mentorados"], queryFn: () => base44.entities.Mentorado.list("-created_date", 500) });

  const alunos = users.filter(u => u.role === "aluno" || !u.role);
  const perfilCounts = {};
  diagnosticos.forEach(d => { if (d.perfil_classificado) perfilCounts[d.perfil_classificado] = (perfilCounts[d.perfil_classificado] || 0) + 1; });
  const chartData = Object.entries(perfilCounts).map(([name, value]) => ({ name, value }));

  if (isLoading) return <div className="space-y-4">{[1,2,3].map(i => <Skeleton key={i} className="h-32 rounded-xl" />)}</div>;

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold flex items-center gap-2">
        <BarChart3 className="w-6 h-6 text-primary" /> Painel Administrativo
      </h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Alunos" value={alunos.length} icon={Users} gradient="from-blue-500/5 to-blue-500/10" />
        <StatsCard title="Diagnósticos" value={diagnosticos.length} icon={ClipboardList} gradient="from-purple-500/5 to-purple-500/10" />
        <StatsCard title="Monitores" value={monitores.length} icon={Users} gradient="from-emerald-500/5 to-emerald-500/10" />
        <StatsCard title="Aguardando" value={fila.length} icon={Clock} gradient="from-amber-500/5 to-amber-500/10" />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-border/50">
          <CardHeader><CardTitle className="text-lg font-heading">Distribuição por perfil</CardTitle></CardHeader>
          <CardContent>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                    {chartData.map((entry, i) => <Cell key={i} fill={PROFILE_COLORS[entry.name] || "#8884d8"} />)}
                  </Pie>
                  <Tooltip /><Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : <p className="text-center text-muted-foreground py-10">Sem dados ainda</p>}
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardHeader><CardTitle className="text-lg font-heading">Mentoria</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Total de matches", val: mentorados.length },
              { label: "Mentorias ativas", val: mentorados.filter(m => m.status === "Ativo").length },
              { label: "Na fila de espera", val: fila.length },
              { label: "Monitores ativos", val: monitores.filter(m => m.status === "Ativo").length },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                <span className="text-sm">{item.label}</span>
                <span className="font-heading font-bold text-lg">{item.val}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <Card className="border-border/50">
        <CardHeader><CardTitle className="text-lg font-heading">Últimos diagnósticos</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {diagnosticos.slice(0, 10).map(d => (
              <div key={d.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 text-sm">
                <span className="font-medium">{d.usuario_nome || "Aluno"}</span>
                <div className="flex items-center gap-2">
                  {d.perfil_classificado && <ProfileBadge perfil={d.perfil_classificado} size="sm" />}
                  <span className="text-muted-foreground text-xs">{new Date(d.created_date).toLocaleDateString("pt-BR")}</span>
                </div>
              </div>
            ))}
            {diagnosticos.length === 0 && <p className="text-center text-muted-foreground py-4">Nenhum diagnóstico realizado</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}