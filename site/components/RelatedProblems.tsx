import Link from "next/link";
import type { JSX } from "react";
import type { ProblemContent } from "@/lib/content";

type Props = {
  related: ProblemContent[];
};

export function RelatedProblems({ related }: Props): JSX.Element | null {
  if (related.length === 0) {
    return null;
  }

  return (
    <section className="section-card">
      <h2>Related Problems</h2>
      <div className="grid">
        {related.map((problem: ProblemContent): JSX.Element => (
          <Link key={problem.slug} href={`/problems/${problem.slug}`} className="problem-card">
            <strong>{problem.title}</strong>
          </Link>
        ))}
      </div>
    </section>
  );
}
