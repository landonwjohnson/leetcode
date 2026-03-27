import type { Metadata } from "next";
import Link from "next/link";
import type { ReactElement } from "react";
import { getAllProblems } from "@/lib/content";
import { withBasePath } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Interactive Algorithm Explanations",
  description:
    "Discover interactive algorithm walkthroughs, problem solutions, and practical engineering use cases across multiple languages.",
  alternates: {
    canonical: withBasePath("/")
  }
};

export default function HomePage(): ReactElement {
  const problems = getAllProblems();

  return (
    <>
      <section className="hero">
        <h1>LeetCode Solutions + Real-World Use Cases</h1>
        <p>
          Learn algorithm patterns with practical context. Every problem page includes solutions, complexity notes, and
          examples of where the pattern appears in real software.
        </p>
        <p style={{ marginTop: "0.85rem" }}>
          <Link href="/problems">Browse all problems</Link> | <Link href="/learning-paths">Explore learning paths</Link>
        </p>
      </section>

      <section className="section-card">
        <h2>Featured Problems</h2>
        <div className="grid">
          {problems.slice(0, 8).map((problem): ReactElement => (
            <Link key={problem.slug} href={`/problems/${problem.slug}`} className="problem-card">
              <strong>{problem.title}</strong>
              <p style={{ margin: "0.5rem 0", color: "var(--text-dim)" }}>{problem.summary}</p>
              <div className="meta-row">
                <span className="pill">{problem.difficulty}</span>
                {problem.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="pill">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
