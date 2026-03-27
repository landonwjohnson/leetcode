import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import type { ReactElement } from "react";
import { getAllProblems } from "@/lib/content";
import { absoluteUrl, withBasePath } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "All Algorithm Problems",
  description: "Browse algorithm problems with code solutions, complexity notes, and interactive visual demos.",
  alternates: {
    canonical: withBasePath("/problems")
  }
};

export default function ProblemsIndexPage(): ReactElement {
  const problems = getAllProblems();
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Algorithm Problems",
    url: absoluteUrl("/problems"),
    mainEntity: problems.map((problem) => ({
      "@type": "TechArticle",
      headline: problem.title,
      url: absoluteUrl(`/problems/${problem.slug}`),
      keywords: problem.tags.join(", ")
    }))
  };

  return (
    <>
      <Script id="problems-collection-schema" type="application/ld+json">
        {JSON.stringify(collectionSchema)}
      </Script>
      <h1>All Problems</h1>
      <p>Each problem includes solutions, complexity notes, and practical use cases.</p>
      <ul>
        {problems.map((problem): ReactElement => (
          <li key={problem.slug}>
            <Link href={`/problems/${problem.slug}`}>{problem.title}</Link> ({problem.difficulty}) - tags:{" "}
            {problem.tags.join(", ")}
          </li>
        ))}
      </ul>
    </>
  );
}
