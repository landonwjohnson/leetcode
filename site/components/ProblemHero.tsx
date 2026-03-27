import type { JSX } from "react";
import type { ProblemRecord } from "@/types/content";
import { TagList } from "@/components/TagList";

type ProblemHeroProps = {
  problem: ProblemRecord;
  questionTypes: string[];
  patterns: string[];
};

export function ProblemHero({ problem, questionTypes, patterns }: ProblemHeroProps): JSX.Element {
  return (
    <section className="hero">
      <h1>{problem.title}</h1>
      <p>{problem.summary}</p>
      <div className="meta-row">
        <span className="pill">{problem.difficulty}</span>
        <span className="pill">{problem.readingTimeMinutes} min read</span>
      </div>
      <TagList items={[...questionTypes, ...patterns]} />
    </section>
  );
}
