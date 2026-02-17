import Link from "next/link";
import { DollarSign, Clock, TrendingUp, CircleDot, Cross, Grid2x2, Layers, Sparkles, Bone, Zap } from "lucide-react";
import type { Procedure } from "@/data/procedures";
import type { ComponentType } from "react";

// Map icon name strings to actual Lucide components
const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Tooth: Cross,
  Grid2x2: Grid2x2,
  Layers: Layers,
  Sparkles: Sparkles,
  Bone: Bone,
  Zap: Zap,
};

function getIcon(iconName: string) {
  return iconMap[iconName] || CircleDot;
}

export default function ProcedureCard({ procedure }: { procedure: Procedure }) {
  const Icon = getIcon(procedure.icon);

  return (
    <Link
      href={`/procedures/${procedure.slug}`}
      className="group card-hover rounded-xl border border-border bg-white p-5 block"
    >
      {/* Icon */}
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-light/30 text-primary mb-3">
        <Icon className="h-5 w-5" />
      </div>

      <h3 className="text-base font-heading font-bold text-secondary group-hover:text-primary transition-colors">
        {procedure.name}
      </h3>
      <p className="mt-1.5 text-sm text-gray-600 line-clamp-2">{procedure.shortDescription}</p>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-3 gap-2 pt-3 border-t border-border">
        <div className="flex flex-col items-center text-center">
          <DollarSign className="h-3.5 w-3.5 text-gray-400 mb-0.5" />
          <span className="text-xs font-medium text-gray-900">{procedure.priceRange}</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <Clock className="h-3.5 w-3.5 text-gray-400 mb-0.5" />
          <span className="text-xs font-medium text-gray-900">{procedure.recoveryTime}</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <TrendingUp className="h-3.5 w-3.5 text-success mb-0.5" />
          <span className="text-xs font-medium text-success">{procedure.successRate}</span>
        </div>
      </div>
    </Link>
  );
}
