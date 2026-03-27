import Link from "next/link";
import type { JSX } from "react";
import type { ProblemRecord } from "@/types/content";

type ProblemCardProps = {
  problem: ProblemRecord;
};

export function ProblemCard({ problem }: ProblemCardProps): JSX.Element {
  return (
    <Link href={`/problems/${problem.slug}`} className="problem-card">
      <strong>{problem.title}</strong>
      <p style={{ margin: "0.5rem 0", color: "var(--text-dim)" }}>{problem.summary}</p>
      <div className="meta-row">
        <span className="pill">{problem.difficulty}</span>
        {problem.availableLanguages.map((language) => (
          <span key={language} className="pill">
            {language}
          </span>
        ))}
      </div>
    </Link>
  );
}
