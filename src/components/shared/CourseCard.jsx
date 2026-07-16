import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Clock, Award, BarChart3 } from "lucide-react";

export default function CourseCard({ curso }) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="font-heading font-semibold text-base group-hover:text-primary transition-colors">{curso.nome}</h3>
            <p className="text-sm text-muted-foreground mt-0.5">{curso.plataforma}</p>
          </div>
          {curso.certificado && (
            <Badge variant="secondary" className="shrink-0 text-xs gap-1">
              <Award className="w-3 h-3" />Certificado
            </Badge>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline" className="text-xs gap-1">
            <BarChart3 className="w-3 h-3" />{curso.nivelDificuldade || "Iniciante"}
          </Badge>
          {curso.cargaHoraria && (
            <Badge variant="outline" className="text-xs gap-1">
              <Clock className="w-3 h-3" />{curso.cargaHoraria}
            </Badge>
          )}
          <Badge variant="outline" className="text-xs">{curso.area}</Badge>
        </div>
        {curso.link && (
          <Button variant="outline" size="sm" className="w-full mt-2 gap-2" onClick={() => window.open(curso.link, "_blank")}>
            <ExternalLink className="w-3.5 h-3.5" />Acessar curso
          </Button>
        )}
      </CardContent>
    </Card>
  );
}