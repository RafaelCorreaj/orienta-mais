import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BookOpen, Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import ProfileBadge from "@/components/shared/ProfileBadge";
import { Skeleton } from "@/components/ui/skeleton";

const PERFIS = ["Líder", "Colaborativo", "Técnico", "Criativo", "Acadêmico"];

function CursoForm({ curso, onSave, onClose }) {
  const [data, setData] = useState(curso || { nome: "", area: "", perfis_recomendados: [], carga_horaria: "", plataforma: "", link: "", certificado: false, nivel_dificuldade: "Iniciante" });
  const [saving, setSaving] = useState(false);

  const togglePerfil = (p) => {
    const current = data.perfis_recomendados || [];
    setData({ ...data, perfis_recomendados: current.includes(p) ? current.filter(x => x !== p) : [...current, p] });
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
        <div><Label>Nome do curso</Label><Input value={data.nome} onChange={e => setData({ ...data, nome: e.target.value })} className="mt-1" /></div>
        <div><Label>Área</Label><Input value={data.area} onChange={e => setData({ ...data, area: e.target.value })} placeholder="Ex: Tecnologia" className="mt-1" /></div>
        <div><Label>Plataforma</Label><Input value={data.plataforma} onChange={e => setData({ ...data, plataforma: e.target.value })} className="mt-1" /></div>
        <div><Label>Carga horária</Label><Input value={data.carga_horaria} onChange={e => setData({ ...data, carga_horaria: e.target.value })} placeholder="Ex: 40 horas" className="mt-1" /></div>
      </div>
      <div><Label>Link do curso</Label><Input value={data.link} onChange={e => setData({ ...data, link: e.target.value })} placeholder="https://..." className="mt-1" /></div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Dificuldade</Label>
          <Select value={data.nivel_dificuldade} onValueChange={v => setData({ ...data, nivel_dificuldade: v })}>
            <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Iniciante">Iniciante</SelectItem>
              <SelectItem value="Intermediário">Intermediário</SelectItem>
              <SelectItem value="Avançado">Avançado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-3 pt-6">
          <Switch checked={data.certificado} onCheckedChange={v => setData({ ...data, certificado: v })} />
          <Label>Certificado gratuito</Label>
        </div>
      </div>
      <div>
        <Label className="mb-2 block">Perfis recomendados</Label>
        <div className="flex flex-wrap gap-2">
          {PERFIS.map(p => (
            <button key={p} onClick={() => togglePerfil(p)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${data.perfis_recomendados?.includes(p) ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
              {p}
            </button>
          ))}
        </div>
      </div>
      <Button onClick={handleSave} disabled={!data.nome || !data.plataforma || saving} className="w-full rounded-full gap-2">
        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
        {curso ? "Atualizar" : "Adicionar"} curso
      </Button>
    </div>
  );
}

export default function AdminCursos() {
  const queryClient = useQueryClient();
  const [editCurso, setEditCurso] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: cursos = [], isLoading } = useQuery({ queryKey: ["cursos"], queryFn: () => base44.entities.Curso.list("-created_date") });

  const handleSave = async (data) => {
    if (editCurso?.id) await base44.entities.Curso.update(editCurso.id, data);
    else await base44.entities.Curso.create(data);
    queryClient.invalidateQueries({ queryKey: ["cursos"] });
  };

  const handleDelete = async (curso) => {
    if (!confirm("Tem certeza que deseja remover este curso?")) return;
    await base44.entities.Curso.delete(curso.id);
    queryClient.invalidateQueries({ queryKey: ["cursos"] });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold flex items-center gap-2"><BookOpen className="w-6 h-6 text-primary" /> Cursos</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 rounded-full" onClick={() => { setEditCurso(null); setDialogOpen(true); }}><Plus className="w-4 h-4" /> Adicionar</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>{editCurso ? "Editar" : "Novo"} Curso</DialogTitle></DialogHeader>
            <CursoForm curso={editCurso} onSave={handleSave} onClose={() => setDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      {isLoading ? (
        <div className="space-y-3">{[1,2,3].map(i => <Skeleton key={i} className="h-24 rounded-xl" />)}</div>
      ) : cursos.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground"><BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" /><p>Nenhum curso cadastrado</p></div>
      ) : (
        <div className="space-y-3">
          {cursos.map(c => (
            <Card key={c.id} className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <p className="font-medium">{c.nome}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{c.plataforma} · {c.area} · {c.nivel_dificuldade}{c.certificado && " · Certificado"}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {c.perfis_recomendados?.map(p => <ProfileBadge key={p} perfil={p} size="sm" />)}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => { setEditCurso(c); setDialogOpen(true); }}><Pencil className="w-3.5 h-3.5" /></Button>
                    <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDelete(c)}><Trash2 className="w-3.5 h-3.5" /></Button>
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