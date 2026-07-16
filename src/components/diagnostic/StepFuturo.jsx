import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function StepFuturo({ data, updateData }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-xl font-bold mb-2">Seus sonhos ✨</h2>
        <p className="text-sm text-muted-foreground">Conte um pouco sobre o que você sonha para o futuro (opcional)</p>
      </div>
      <div>
        <Label htmlFor="sonho" className="font-medium">Qual é o seu sonho profissional?</Label>
        <Textarea id="sonho" placeholder="Ex: Quero abrir meu próprio negócio, trabalhar com tecnologia..." value={data.sonho || ""} onChange={e => updateData("sonho", e.target.value)} className="mt-2 h-28 resize-none" />
      </div>
      <div>
        <Label htmlFor="aprender" className="font-medium">O que você gostaria de aprender?</Label>
        <Textarea id="aprender" placeholder="Ex: Programação, marketing digital, design..." value={data.quer_aprender || ""} onChange={e => updateData("quer_aprender", e.target.value)} className="mt-2 h-28 resize-none" />
      </div>
    </div>
  );
}