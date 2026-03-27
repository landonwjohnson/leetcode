import type { JSX } from "react";
import { SectionHeader } from "@/components/SectionHeader";

type RecognitionCluesPanelProps = {
  clues: string[];
};

export function RecognitionCluesPanel({ clues }: RecognitionCluesPanelProps): JSX.Element {
  return (
    <section className="section-card">
      <SectionHeader title="Recognition Clues" description="Signals that this pattern likely applies." />
      <ul>
        {clues.map((clue) => (
          <li key={clue}>{clue}</li>
        ))}
      </ul>
    </section>
  );
}
