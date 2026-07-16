import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, Plus, Pencil, Loader2 } from "lucide-react";
import ProfileBadge from "@/components/shared/ProfileBadge";
import { Skeleton } from "@/components/ui/skeleton";

const PERFIS = ["Líder", "Colaborativo", "Técnico", "Criativo", "Acadêmico"];

function MonitorForm({ monitor, onSave, onClose }) {
  const [data, setData] = useState(monitor || { nome: "", email: "", whatsapp: "", formacao: "", perfis_disponiveis: [], disponibilidade: "", status: "Ativo" });
  const [saving, setSaving] = useState(false);

  const togglePerfil = (p) => {
    const current = data.perfis_disponiveis || [];
    setData({ ...data, perfis_disponiveis: current.includes(p) ? current.filter(x => x !== p) : [...current, p] });
  };

  const handleSave = async () => {
    setSaving(true);
    await onSave(data);
    setSaving(false);
    onClose();
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div><Label>Nome</Label><Input value={data.nome} onChange={e => setData({ ...data, nome: e.target.value })} className="mt-1" /></div>
        <div><Label>Email</Label><Input value={data.email} onChange={e => setData({ ...data, email: e.target.value })} className="mt-1" /></div>
        <div><Label>WhatsApp</Label><Input value={data.whatsapp} onChange={e => setData({ ...data, whatsapp: e.target.value })} className="mt-1" /></div>
        <div><Label>Formação</Label><Input value={data.formacao} onChange={e => setData({ ...data, formacao: e.target.value })} className="mt-1" /></div>
      </div>
      <div><Label>Disponibilidade</Label><Input value={data.disponibilidade} onChange={e => setData({ ...data, disponibilidade: e.target.value })} placeholder="Ex: Segunda/Quarta 14h-16h" className="mt-1" /></div>
      <div>
        <Label className="mb-2 block">Perfis que pode atender</Label>
        <div className="flex flex-wrap gap-2">
          {PERFIS.map(p => (
            <button key={p} onClick={() => togglePerfil(p)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${data.perfis_disponiveis?.includes(p) ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
              {p}
            </button>
          ))}
        </div>
      </div>
      <Button onClick={handleSave} disabled={!data.nome || !data.email || saving} className="w-full rounded-full gap-2">
        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
        {monitor ? "Atualizar" : "Cadastrar"} monitor
      </Button>
    </div>
  );
}

export default function AdminMonitores() {
  const queryClient = useQueryClient();
  const [editMonitor, setEditMonitor] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: monitores = [], isLoading } = useQuery({ queryKey: ["all-monitores"], queryFn: () => base44.entities.Monitor.list("-created_date") });

  const handleSave = async (data) => {
    if (editMonitor?.id) await base44.entities.Monitor.update(editMonitor.id, data);
    else await base44.entities.Monitor.create(data);
    queryClient.invalidateQueries({ queryKey: ["all-monitores"] });
  };

  const handleToggleStatus = async (monitor) => {
    await base44.entities.Monitor.update(monitor.id, { status: monitor.status === "Ativo" ? "Inativo" : "Ativo" });
    queryClient.invalidateQueries({ queryKey: ["all-monitores"] });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold flex items-center gap-2"><Users className="w-6 h-6 text-primary" /> Monitores</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 rounded-full" onClick={() => { setEditMonitor(null); setDialogOpen(true); }}>
              <Plus className="w-4 h-4" /> Cadastrar
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>{editMonitor ? "Editar" : "Novo"} Monitor</DialogTitle></DialogHeader>
            <MonitorForm monitor={editMonitor} onSave={handleSave} onClose={() => setDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      {isLoading ? (
        <div className="space-y-3">{[1,2,3].map(i => <Skeleton key={i} className="h-24 rounded-xl" />)}</div>
      ) : monitores.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground"><Users className="w-12 h-12 mx-auto mb-3 opacity-30" /><p>Nenhum monitor cadastrado</p></div>
      ) : (
        <div className="space-y-3">
          {monitores.map(m => (
            <Card key={m.id} className={`border-border/50 ${m.status === "Inativo" ? "opacity-50" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{m.nome}</p>
                      <Badge variant={m.status === "Ativo" ? "default" : "secondary"} className="text-xs">{m.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">{m.email} · {m.formacao}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {m.perfis_disponiveis?.map(p => <ProfileBadge key={p} perfil={p} size="sm" />)}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => { setEditMonitor(m); setDialogOpen(true); }}><Pencil className="w-3.5 h-3.5" /></Button>
                    <Button variant="outline" size="sm" onClick={() => handleToggleStatus(m)}>{m.status === "Ativo" ? "Desativar" : "Ativar"}</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}