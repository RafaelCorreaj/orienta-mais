import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Search, ArrowRight, Loader2 } from "lucide-react";

export default function MentoradosPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const { data: monitor } = useQuery({
    queryKey: ["monitor", user?.email],
    queryFn: () => base44.entities.Monitor.filter({ email: user?.email }),
    enabled: !!user?.email,
  });

  const monitorId = monitor?.[0]?.id;

  const { data: mentorados = [], isLoading } = useQuery({
    queryKey: ["mentorados", monitorId],
    queryFn: () => base44.entities.Mentorado.filter({ monitor_id: monitorId, status: "Ativo" }),
    enabled: !!monitorId,
  });

  const filtered = mentorados.filter(m =>
    !search || m.usuario_nome?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold flex items-center gap-2">
          <Users className="w-6 h-6 text-primary" /> Mentorados
        </h1>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar mentorado..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9 rounded-xl"
        />
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-20 rounded-xl" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>Nenhum mentorado encontrado</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(m => (
            <Card key={m.id} className="border-border/50 cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4" onClick={() => navigate(`/monitor/aluno/${m.usuario_id}`)}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{m.usuario_nome || "Sem nome"}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {m.curso || "Curso não informado"}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}