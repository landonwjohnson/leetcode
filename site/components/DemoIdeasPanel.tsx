import type { JSX } from "react";
import { SectionHeader } from "@/components/SectionHeader";

type DemoIdeasPanelProps = {
  demoIdeas: string[];
};

export function DemoIdeasPanel({ demoIdeas }: DemoIdeasPanelProps): JSX.Element {
  return (
    <section className="section-card">
      <SectionHeader title="Demo Ideas" description="Interactive ways to teach this algorithm." />
      <ul>
        {demoIdeas.map((idea) => (
          <li key={idea}>{idea}</li>
        ))}
      </ul>
    </section>
  );
}
