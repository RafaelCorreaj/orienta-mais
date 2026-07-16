import React, { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { base44 } from "@/api/base44Client";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, Loader2, CheckCircle2 } from "lucide-react";

function StarRating({ value, onChange, label }) {
  return (
    <div>
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex gap-1 mt-1.5">
        {[1, 2, 3, 4, 5].map(n => (
          <button key={n} onClick={() => onChange(n)} className="p-0.5">
            <Star
              className={`w-7 h-7 transition-colors ${
                n <= value ? "text-amber-400 fill-amber-400" : "text-border"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function EvaluatePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState({
    nota_utilidade: 0,
    clareza_diagnostico: 0,
    relevancia_cursos: 0,
    comentario: ""
  });

  const handleSubmit = async () => {
    if (!data.nota_utilidade || !data.clareza_diagnostico || !data.relevancia_cursos) return;
    setSubmitting(true);
    await base44.entities.AvaliacaoPlataforma.create({
      ...data,
      usuario_id: user.id
    });
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto text-center py-10">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
        </div>
        <h2 className="font-heading text-xl font-bold mb-2">Obrigado pela avaliação!</h2>
        <p className="text-muted-foreground mb-6">Sua opinião nos ajuda a melhorar a plataforma.</p>
        <Button onClick={() => navigate("/dashboard")} variant="outline" className="rounded-full">
          Voltar ao dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <Card className="border-border/50">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <Star className="w-10 h-10 text-primary mx-auto mb-3" />
            <h2 className="font-heading text-xl font-bold">Avalie a plataforma</h2>
            <p className="text-sm text-muted-foreground mt-1">Sua opinião é muito importante</p>
          </div>

          <div className="space-y-5">
            <StarRating
              label="Utilidade da plataforma"
              value={data.nota_utilidade}
              onChange={v => setData(prev => ({ ...prev, nota_utilidade: v }))}
            />
            <StarRating
              label="Clareza do diagnóstico"
              value={data.clareza_diagnostico}
              onChange={v => setData(prev => ({ ...prev, clareza_diagnostico: v }))}
            />
            <StarRating
              label="Relevância dos cursos"
              value={data.relevancia_cursos}
              onChange={v => setData(prev => ({ ...prev, relevancia_cursos: v }))}
            />

            <div>
              <Label htmlFor="comment" className="text-sm font-medium">Comentário (opcional)</Label>
              <Textarea
                id="comment"
                placeholder="Conte-nos o que achou..."
                value={data.comentario}
                onChange={e => setData(prev => ({ ...prev, comentario: e.target.value }))}
                className="mt-1.5 h-24 resize-none"
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!data.nota_utilidade || !data.clareza_diagnostico || !data.relevancia_cursos || submitting}
              className="w-full rounded-full gap-2"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Enviar avaliação
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}