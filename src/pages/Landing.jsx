import React from "react";
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";
import { Compass, Sparkles, Users, BookOpen, ArrowRight, Star, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Compass, title: "Descubra seu perfil", desc: "Faça o diagnóstico e descubra qual é o seu perfil profissional entre 5 tipos." },
  { icon: BookOpen, title: "Cursos gratuitos", desc: "Receba recomendações de cursos gratuitos com certificado, feitos para você." },
  { icon: Users, title: "Mentoria voluntária", desc: "Conecte-se com um monitor voluntário para te acompanhar na sua jornada." }
];

const steps = [
  "Cadastre-se gratuitamente",
  "Faça o diagnóstico de perfil",
  "Receba cursos recomendados",
  "Solicite um mentor voluntário"
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-20 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 pt-12 pb-20 md:pt-24 md:pb-32">
          <nav className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <span className="font-heading font-bold text-xl">Orienta+</span>
            </div>
            <Button onClick={() => base44.auth.redirectToLogin("/dashboard")} variant="outline" className="rounded-full">
              Entrar
            </Button>
          </nav>

          <div className="text-center max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" /> 100% gratuito
              </div>
              <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight mb-6">
                Descubra seu{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  caminho profissional
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
                Plataforma gratuita de orientação de carreira para jovens. Faça seu diagnóstico,
                descubra cursos e conecte-se com mentores voluntários.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button size="lg" className="rounded-full px-8 gap-2 bg-gradient-to-r from-primary to-primary/90 shadow-lg shadow-primary/25" onClick={() => base44.auth.redirectToLogin("/dashboard")}>
                  Começar agora <ArrowRight className="w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8" onClick={() => document.getElementById("como-funciona")?.scrollIntoView({ behavior: "smooth" })}>
                  Como funciona?
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Como funciona</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">Em poucos passos, você descobre seu perfil e recebe orientação personalizada</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} viewport={{ once: true }}
                  className="bg-card rounded-2xl p-6 border border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-card/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-center mb-12">Passo a passo</h2>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="flex items-center gap-4 bg-card rounded-xl p-4 border border-border/50">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-heading font-bold shrink-0">{i + 1}</div>
                <p className="font-medium">{step}</p>
                <CheckCircle2 className="w-5 h-5 text-muted-foreground/30 ml-auto shrink-0" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 text-amber-400 fill-amber-400" />)}
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Pronto para descobrir seu futuro?</h2>
          <p className="text-muted-foreground text-lg mb-8">Descubra seu potencial e dê o primeiro passo rumo ao seu futuro profissional!</p>
          <Button size="lg" className="rounded-full px-10 gap-2 bg-gradient-to-r from-primary to-primary/90 shadow-lg shadow-primary/25" onClick={() => base44.auth.redirectToLogin("/dashboard")}>
            Criar minha conta <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>

      <footer className="border-t border-border py-8 px-4 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Compass className="w-4 h-4" />
          <span className="font-heading font-semibold">Orienta+</span>
        </div>
        <p>Plataforma social de orientação de carreira para jovens</p>
      </footer>
    </div>
  );
}