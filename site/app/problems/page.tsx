import type { Metadata } from "next";
import Script from "next/script";
import type { ReactElement } from "react";
import { ProblemCard } from "@/components/ProblemCard";
import { SearchBar } from "@/components/SearchBar";
import { getAllProblems } from "@/lib/content";
import { absoluteUrl, withBasePath } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "All Algorithm Problems",
  description: "Browse algorithm problems with code solutions, complexity notes, and interactive visual demos.",
  alternates: {
    canonical: withBasePath("/problems")
  }
};

type ProblemsIndexPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default function ProblemsIndexPage({}: ProblemsIndexPageProps): ReactElement {
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
      keywords: problem.tagIds.join(", ")
    }))
  };

  return (
    <>
      <Script id="problems-collection-schema" type="application/ld+json">
        {JSON.stringify(collectionSchema)}
      </Script>
      <h1>Problem Explorer</h1>
      <p>Scan all published problems with practical mapping metadata.</p>
      <SearchBar action="/search" />
      <div className="grid" style={{ marginTop: "1rem" }}>
        {problems.map((problem): ReactElement => (
          <ProblemCard key={problem.slug} problem={problem} />
        ))}
      </div>
    </>
  );
}
