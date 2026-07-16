import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";

export default function RegisterMeetingPage() {
  const navigate = useNavigate();
  const { mentoradoId } = useParams();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState({
    tipo: "",
    observacoes: "",
    proximo_passo: "",
    data_encontro: new Date().toISOString().slice(0, 16)
  });

  const { data: mentorado } = useQuery({
    queryKey: ["mentorado", mentoradoId],
    queryFn: async () => {
      const res = await base44.entities.Mentorado.filter({ id: mentoradoId });
      return res[0];
    },
    enabled: !!mentoradoId,
  });

  const handleSubmit = async () => {
    if (!data.tipo || !data.observacoes) return;
    setSubmitting(true);
    await base44.entities.EncontroMentoria.create({
      mentorado_id: mentoradoId,
      usuario_nome: mentorado?.usuario_nome,
      monitor_id: mentorado?.monitor_id,
      data_encontro: data.data_encontro,
      tipo: data.tipo,
      observacoes: data.observacoes,
      proximo_passo: data.proximo_passo
    });
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto text-center py-10">
        <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto mb-4" />
        <h2 className="font-heading text-xl font-bold mb-2">Encontro registrado!</h2>
        <p className="text-muted-foreground mb-4">O registro foi salvo com sucesso.</p>
        <Button onClick={() => navigate("/monitor")} variant="outline" className="rounded-full">
          Voltar ao painel
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <button onClick={() => navigate("/monitor")} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> Voltar
      </button>

      <Card className="border-border/50">
        <CardContent className="p-6">
          <h2 className="font-heading text-xl font-bold mb-1">Registrar encontro</h2>
          {mentorado && (
            <p className="text-sm text-muted-foreground mb-6">Aluno: {mentorado.usuario_nome}</p>
          )}

          <div className="space-y-4">
            <div>
              <Label>Data e horário</Label>
              <Input
                type="datetime-local"
                value={data.data_encontro}
                onChange={e => setData(prev => ({ ...prev, data_encontro: e.target.value }))}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Tipo do encontro</Label>
              <Select value={data.tipo} onValueChange={v => setData(prev => ({ ...prev, tipo: v }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Presencial">Presencial</SelectItem>
                  <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                  <SelectItem value="Videochamada">Videochamada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Observações</Label>
              <Textarea
                placeholder="O que foi discutido neste encontro..."
                value={data.observacoes}
                onChange={e => setData(prev => ({ ...prev, observacoes: e.target.value }))}
                className="mt-1 h-28 resize-none"
              />
            </div>

            <div>
              <Label>Próximo passo (opcional)</Label>
              <Textarea
                placeholder="Qual a próxima ação definida..."
                value={data.proximo_passo}
                onChange={e => setData(prev => ({ ...prev, proximo_passo: e.target.value }))}
                className="mt-1 h-20 resize-none"
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!data.tipo || !data.observacoes || submitting}
              className="w-full rounded-full gap-2"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Salvar encontro
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}