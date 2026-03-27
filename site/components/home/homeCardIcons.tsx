import type { LucideIcon } from "lucide-react";
import {
  Binary,
  Box,
  Brackets,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Globe,
  Hash,
  Layers,
  LayoutGrid,
  Network,
  Package,
  Radar,
  Shapes,
  Sparkles,
  Workflow,
  Zap
} from "lucide-react";
import type { CSSProperties, JSX } from "react";
import type { HomepageCardAccent } from "@/types/content";

const homeCardIconMap: Record<string, LucideIcon> = {
  Code2,
  Layers,
  Zap,
  GitBranch,
  Box,
  LayoutGrid,
  Cpu,
  Database,
  Globe,
  Sparkles,
  Network,
  Workflow,
  Brackets,
  Package,
  Binary,
  Radar,
  Hash,
  Shapes
};

const ACCENT_CSS: Record<HomepageCardAccent, { fg: string; bg: string; glow: string }> = {
  purple: { fg: "#a78bfa", bg: "rgba(139, 92, 246, 0.18)", glow: "rgba(139, 92, 246, 0.35)" },
  emerald: { fg: "#34d399", bg: "rgba(52, 211, 153, 0.14)", glow: "rgba(52, 211, 153, 0.32)" },
  amber: { fg: "#fbbf24", bg: "rgba(251, 191, 36, 0.14)", glow: "rgba(251, 191, 36, 0.28)" },
  cyan: { fg: "#22d3ee", bg: "rgba(34, 211, 238, 0.14)", glow: "rgba(34, 211, 238, 0.3)" },
  ruby: { fg: "#fb7185", bg: "rgba(251, 113, 133, 0.14)", glow: "rgba(251, 113, 133, 0.28)" }
};

export function HomeCardIconVisual({
  iconName,
  accent = "purple",
  size = 22
}: {
  iconName: string;
  accent?: HomepageCardAccent;
  size?: number;
}): JSX.Element {
  const Icon = homeCardIconMap[iconName] ?? Code2;
  const c = ACCENT_CSS[accent] ?? ACCENT_CSS.purple;
  return (
    <span
      className="home-card-icon-wrap"
      style={
        {
          "--icon-fg": c.fg,
          "--icon-bg": c.bg,
          "--icon-glow": c.glow
        } as CSSProperties
      }
    >
      <Icon size={size} strokeWidth={1.65} color="var(--icon-fg)" aria-hidden />
    </span>
  );
}

export function featureKeywordsFromText(description: string, label: string): string[] {
  const clauses = description
    .split(/[,;.]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 2 && s.length < 48);
  if (clauses.length >= 2) {
    return clauses.slice(0, 5);
  }
  const words = label
    .split(/[\s/]+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 1);
  return words.slice(0, 5);
}
