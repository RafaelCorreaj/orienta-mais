import React, { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { apiClient } from "@/api/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { calcularPerfil } from "@/lib/diagnosticUtils";
import StepHabilidades from "@/components/diagnostic/StepHabilidades";
import StepInteresses from "@/components/diagnostic/StepInteresses";
import StepEstilo from "@/components/diagnostic/StepEstilo";
import StepAutoavaliacao from "@/components/diagnostic/StepAutoavaliacao";
import StepFuturo from "@/components/diagnostic/StepFuturo";

const TOTAL_STEPS = 5;

const INITIAL_DATA = {
  // Step 1 - Habilidades
  habilidades: [],
  comoResolveProblemas: "",
  ensinouAlgo: "",
  // Step 2 - Interesses
  interesses: [],
  tempoLivre: "",
  profissaoEmMente: "",
  preferenciaAprendizado: "",
  // Step 3 - Estilo
  estiloTrabalho: "",
  estiloGrupo: "",
  // Step 4 - Autoavaliacao
  autoavaliacao: {
    organizacao: 3,
    comunicacao: 3,
    equipe: 3,
    responsabilidade: 3,
    criatividade: 3
  },
  // Step 5 - Futuro
  sonho: "",
  querAprender: ""
};

export default function DiagnosticPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(INITIAL_DATA);

  const updateData = (field, value) => setData(prev => ({ ...prev, [field]: value }));

  const canAdvance = () => {
    if (step === 1) return data.habilidades.length > 0;
    if (step === 2) return data.interesses.length > 0;
    if (step === 3) return data.estiloTrabalho && data.estiloGrupo;
    return true;
  };

  const handleSubmit = async () => {
    setSaving(true);
    setError("");
    try {
      const { perfil, pontuacaoTotal } = calcularPerfil(data);

      const body = {
        habilidades: data.habilidades,
        interesses: data.interesses,
        estiloTrabalho: data.estiloTrabalho,
        estiloGrupo: data.estiloGrupo,
        autoavaliacao: data.autoavaliacao,
        sonho: data.sonho,
        querAprender: data.querAprender,
        comoResolveProblemas: data.comoResolveProblemas,
        ensinouAlgo: data.ensinouAlgo,
        tempoLivre: data.tempoLivre,
        profissaoEmMente: data.profissaoEmMente,
        preferenciaAprendizado: data.preferenciaAprendizado
      };

      const result = await apiClient.post('/diagnostico', body);
      
      localStorage.setItem('userPerfil', result.perfil);
      queryClient.invalidateQueries();
      navigate(`/resultado/${result.diagnostico.id}`, {
        state: { perfil: result.perfil, pontuacao: result.pontuacaoTotal }
      });
    } catch (err) {
      console.error('Erro ao salvar diagnóstico:', err);
      setError(err.message || 'Erro ao salvar diagnóstico. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  const stepTitles = ["Suas habilidades", "Seus interesses", "Estilo de trabalho", "Autoavaliação", "Seus sonhos"];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground">Etapa {step} de {TOTAL_STEPS}</p>
          <p className="text-sm font-medium">{stepTitles[step - 1]}</p>
        </div>
        <Progress value={(step / TOTAL_STEPS) * 100} className="h-2" />
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm mb-4">
          {error}
        </div>
      )}
      
      <Card className="border-border/50 mb-6">
        <CardContent className="p-6">
          {step === 1 && <StepHabilidades data={data} updateData={updateData} />}
          {step === 2 && <StepInteresses data={data} updateData={updateData} />}
          {step === 3 && <StepEstilo data={data} updateData={updateData} />}
          {step === 4 && <StepAutoavaliacao data={data} updateData={updateData} />}
          {step === 5 && <StepFuturo data={data} updateData={updateData} />}
        </CardContent>
      </Card>
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => step > 1 ? setStep(step - 1) : navigate("/dashboard")} className="gap-2">
          <ArrowLeft className="w-4 h-4" />{step > 1 ? "Voltar" : "Dashboard"}
        </Button>
        {step < TOTAL_STEPS ? (
          <Button onClick={() => setStep(step + 1)} disabled={!canAdvance()} className="gap-2 rounded-full">
            Próximo <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={saving} className="gap-2 rounded-full bg-gradient-to-r from-primary to-primary/90">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Ver meu resultado
          </Button>
        )}
      </div>
    </div>
  );
}