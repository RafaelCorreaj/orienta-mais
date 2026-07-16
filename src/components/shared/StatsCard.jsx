import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function StatsCard({ title, value, icon: Icon, gradient }) {
  return (
    <Card className="relative overflow-hidden border-border/50">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient || "from-primary/5 to-primary/10"} opacity-50`} />
      <CardContent className="relative p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <p className="text-3xl font-heading font-bold mt-1">{value}</p>
          </div>
          {Icon && (
            <div className="w-12 h-12 rounded-2xl bg-card flex items-center justify-center shadow-sm">
              <Icon className="w-6 h-6 text-primary" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}