import type { JSX } from "react";
import { ProblemCard } from "@/components/ProblemCard";
import { SectionHeader } from "@/components/SectionHeader";
import type { ProblemRecord } from "@/types/content";

type CategoryPageViewProps = {
  title: string;
  description: string;
  problems: ProblemRecord[];
};

export function CategoryPageView({ title, description, problems }: CategoryPageViewProps): JSX.Element {
  return (
    <>
      <section className="hero">
        <h1>{title}</h1>
        <p>{description}</p>
        <p className="demo-note">{problems.length} linked problems</p>
      </section>
      <section className="section-card">
        <SectionHeader title="Problems" />
        <div className="grid">
          {problems.map((problem) => (
            <ProblemCard key={problem.slug} problem={problem} />
          ))}
        </div>
      </section>
    </>
  );
}
