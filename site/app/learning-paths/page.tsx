import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import type { ReactElement } from "react";
import { getAllProblems } from "@/lib/content";
import { absoluteUrl, withBasePath } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Learning Paths",
  description: "Follow beginner and intermediate algorithm learning paths with linked interactive problem pages.",
  alternates: {
    canonical: withBasePath("/learning-paths")
  }
};

export default function LearningPathsPage(): ReactElement {
  const problems = getAllProblems();
  const beginner = problems.filter((problem): boolean => problem.difficulty === "Easy");
  const intermediate = problems.filter((problem): boolean => problem.difficulty !== "Easy");
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Algorithm Learning Paths",
    url: absoluteUrl("/learning-paths"),
    hasPart: [
      {
        "@type": "ItemList",
        name: "Beginner Path",
        numberOfItems: beginner.length
      },
      {
        "@type": "ItemList",
        name: "Intermediate Path",
        numberOfItems: intermediate.length
      }
    ]
  };

  return (
    <>
      <Script id="learning-paths-collection-schema" type="application/ld+json">
        {JSON.stringify(collectionSchema)}
      </Script>
      <h1>Learning Paths</h1>
      <p>Use these tracks to move from core fundamentals to pattern-heavy interview prep.</p>

      <h2>Beginner Path</h2>
      <ul>
        {beginner.map((problem): ReactElement => (
          <li key={problem.slug}>
            <Link href={`/problems/${problem.slug}`}>{problem.title}</Link>
          </li>
        ))}
      </ul>

      <h2>Intermediate Path</h2>
      <ul>
        {intermediate.map((problem): ReactElement => (
          <li key={problem.slug}>
            <Link href={`/problems/${problem.slug}`}>{problem.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
