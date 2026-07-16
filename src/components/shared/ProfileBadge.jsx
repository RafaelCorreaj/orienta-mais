import React from "react";
import { PERFIL_DESCRICOES } from "@/lib/diagnosticUtils";

export default function ProfileBadge({ perfil, size = "md" }) {
  const info = PERFIL_DESCRICOES[perfil];
  if (!info) return null;

  const sizes = { sm: "text-xs px-2 py-0.5", md: "text-sm px-3 py-1", lg: "text-base px-4 py-1.5" };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium ${info.corBg} ${info.corText} ${info.corBorder} border ${sizes[size]}`}>
      <span>{info.emoji}</span>{perfil}
    </span>
  );
}