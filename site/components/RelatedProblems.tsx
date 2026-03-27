import Link from "next/link";
import type { JSX } from "react";
import type { ProblemRecord } from "@/types/content";

type Props = {
  related: ProblemRecord[];
};

export function RelatedProblems({ related }: Props): JSX.Element | null {
  if (related.length === 0) {
    return null;
  }

  return (
    <section className="section-card">
      <h2>Related Problems</h2>
      <div className="grid">
        {related.map((problem: ProblemRecord): JSX.Element => (
          <Link key={problem.slug} href={`/problems/${problem.slug}`} className="problem-card">
            <strong>{problem.title}</strong>
          </Link>
        ))}
      </div>
    </section>
  );
}
