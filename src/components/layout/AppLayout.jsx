import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { Home, BookOpen, Users, BarChart3, Menu, X, LogOut, User, Compass, Heart, Shield, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const alunoLinks = [
  { path: "/dashboard", label: "Início", icon: Home },
  { path: "/diagnostico", label: "Diagnóstico", icon: Compass },
  { path: "/cursos", label: "Cursos", icon: BookOpen },
  { path: "/mentoria", label: "Mentoria", icon: Heart },
];

const monitorLinks = [
  { path: "/monitor", label: "Painel", icon: Home },
  { path: "/monitor/mentorados", label: "Mentorados", icon: Users },
];

const adminLinks = [
  { path: "/admin", label: "Painel", icon: BarChart3 },
  { path: "/admin/monitores", label: "Monitores", icon: Users },
  { path: "/admin/cursos", label: "Cursos", icon: BookOpen },
  { path: "/admin/avaliacoes", label: "Avaliações", icon: Heart },
];

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  const role = user?.role || "aluno";
  const links = role === "admin" ? adminLinks : role === "monitor" ? monitorLinks : alunoLinks;
  const roleLabel = role === "admin" ? "Administrador" : role === "monitor" ? "Monitor" : "Aluno";
  const RoleIcon = role === "admin" ? Shield : role === "monitor" ? GraduationCap : User;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <Link to={links[0].path} className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-lg hidden sm:block">Orienta+</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {links.map(link => {
              const Icon = link.icon;
              const active = location.pathname === link.path;
              return (
                <Link key={link.path} to={link.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}>
                  <Icon className="w-4 h-4" />{link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-xs font-medium">
              <RoleIcon className="w-3.5 h-3.5" />{roleLabel}
            </div>
            <Button variant="ghost" size="icon" onClick={() => base44.auth.logout("/")} title="Sair">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-16 bottom-0 w-64 bg-card border-r border-border p-4 space-y-1">
            {links.map(link => {
              const Icon = link.icon;
              const active = location.pathname === link.path;
              return (
                <Link key={link.path} to={link.path} onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}>
                  <Icon className="w-4 h-4" />{link.label}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-border mt-4">
              <div className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />{user?.full_name || "Usuário"}
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}