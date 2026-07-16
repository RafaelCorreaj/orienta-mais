import React, { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { base44 } from "@/api/base44Client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Clock, CheckCircle2, Loader2, ArrowLeft, MessageCircle } from "lucide-react";
import ProfileBadge from "@/components/shared/ProfileBadge";

export default function MentorshipPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [whatsapp, setWhatsapp] = useState(user?.telefone || "");
  const [submitting, setSubmitting] = useState(false);

  const { data: diagnosticos = [] } = useQuery({
    queryKey: ["diagnosticos", user?.id],
    queryFn: () => base44.entities.Diagnostico.filter({ usuario_id: user?.id }, "-created_date", 1),
    enabled: !!user?.id,
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

  const lastDiag = diagnosticos[0];
  const perfil = lastDiag?.perfil_classificado;
  const filaAtiva = filaEntries.find(f => f.status_fila === "Aguardando");
  const mentoradoAtivo = mentorados[0];

  const handleSolicitar = async () => {
    if (!perfil || !whatsapp) return;
    setSubmitting(true);
    await base44.entities.FilaMentoria.create({
      usuario_id: user.id,
      usuario_nome: user.full_name,
      perfil,
      whatsapp_aluno: whatsapp,
      status_fila: "Aguardando"
    });
    if (whatsapp !== user.telefone) {
      await base44.auth.updateMe({ telefone: whatsapp });
    }
    queryClient.invalidateQueries();
    setSubmitting(false);
  };

  if (mentoradoAtivo) {
    return (
      <div className="max-w-lg mx-auto">
        <Card className="border-border/50 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500" />
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="font-heading text-xl font-bold mb-2">Você tem um mentor!</h2>
            <p className="text-muted-foreground mb-4">Seu monitor é <strong>{mentoradoAtivo.monitor_nome}</strong></p>
            {mentoradoAtivo.monitor_whatsapp && (
              <a href={`https://wa.me/${mentoradoAtivo.monitor_whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">
                <Button className="gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700">
                  <MessageCircle className="w-4 h-4" /> Falar no WhatsApp
                </Button>
              </a>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (filaAtiva) {
    return (
      <div className="max-w-lg mx-auto">
        <Card className="border-border/50 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-amber-400 to-orange-400" />
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-amber-600" />
            </div>
            <h2 className="font-heading text-xl font-bold mb-2">Aguardando monitor</h2>
            <p className="text-muted-foreground mb-2">Seu pedido foi enviado com sucesso!</p>
            <p className="text-sm text-muted-foreground mb-4">Em breve um monitor voluntário entrará em contato pelo WhatsApp.</p>
            <ProfileBadge perfil={filaAtiva.perfil} />
            <div className="mt-6">
              <Button variant="outline" onClick={() => navigate("/dashboard")} className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Voltar ao dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!perfil) {
    return (
      <div className="max-w-lg mx-auto text-center py-10">
        <Heart className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
        <h2 className="font-heading text-xl font-bold mb-2">Diagnóstico necessário</h2>
        <p className="text-muted-foreground mb-4">Para solicitar mentoria, você precisa primeiro fazer o diagnóstico de perfil.</p>
        <Button onClick={() => navigate("/diagnostico")} className="rounded-full gap-2">Fazer diagnóstico</Button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <Card className="border-border/50">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <Heart className="w-10 h-10 text-primary mx-auto mb-3" />
            <h2 className="font-heading text-xl font-bold">Solicitar mentoria</h2>
            <p className="text-sm text-muted-foreground mt-1">Conecte-se com um monitor voluntário para te acompanhar</p>
          </div>
          <div className="space-y-4">
            <div>
              <Label className="text-sm">Seu perfil</Label>
              <div className="mt-1"><ProfileBadge perfil={perfil} size="lg" /></div>
            </div>
            <div>
              <Label htmlFor="whatsapp" className="text-sm">Seu WhatsApp</Label>
              <Input id="whatsapp" placeholder="(11) 99999-9999" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} className="mt-1" />
              <p className="text-xs text-muted-foreground mt-1">O monitor entrará em contato por este número</p>
            </div>
            <Button onClick={handleSolicitar} disabled={!whatsapp || submitting} className="w-full rounded-full gap-2">
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Heart className="w-4 h-4" />}
              Solicitar acompanhamento
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}