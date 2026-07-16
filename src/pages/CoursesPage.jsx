import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Search, BookOpen } from "lucide-react";
import CourseCard from "@/components/shared/CourseCard";
import { Skeleton } from "@/components/ui/skeleton";

const PERFIS = ["Todos", "Líder", "Colaborativo", "Técnico", "Criativo", "Acadêmico"];

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [filterPerfil, setFilterPerfil] = useState("Todos");

  const { data: cursos = [], isLoading } = useQuery({
    queryKey: ["cursos"],
    queryFn: () => base44.entities.Curso.list(),
  });

  const filtered = cursos.filter(c => {
    const matchSearch = !search || c.nome?.toLowerCase().includes(search.toLowerCase()) ||
      c.area?.toLowerCase().includes(search.toLowerCase()) ||
      c.plataforma?.toLowerCase().includes(search.toLowerCase());
    const matchPerfil = filterPerfil === "Todos" || c.perfisRecomendados?.includes(filterPerfil);
    return matchSearch && matchPerfil;
  });

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="w-6 h-6 text-primary" />
        <h1 className="font-heading text-2xl font-bold">Cursos Gratuitos</h1>
      </div>
      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar cursos..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
        <div className="flex flex-wrap gap-2">
          {PERFIS.map(p => (
            <button key={p} onClick={() => setFilterPerfil(p)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${filterPerfil === p ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>
              {p}
            </button>
          ))}
        </div>
      </div>
      {isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map(i => <Skeleton key={i} className="h-48 rounded-xl" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>Nenhum curso encontrado</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(c => <CourseCard key={c.id} curso={c} />)}
        </div>
      )}
    </div>
  );
}