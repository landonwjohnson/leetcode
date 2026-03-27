import type { Metadata } from "next";
import { Suspense } from "react";
import type { ReactElement } from "react";
import { SearchResultsClient } from "@/components/SearchResultsClient";
import { getAllProblems, loadSearchDocs, loadSnippetIndex } from "@/lib/content";
import { withBasePath } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Search",
  description: "Search across titles, patterns, career paths, features, companies, roles, and use cases.",
  alternates: { canonical: withBasePath("/search") }
};

export default function SearchPage(): ReactElement {
  const docs = loadSearchDocs();
  const problems = getAllProblems();
  const snippetIndex = loadSnippetIndex();
  return (
    <Suspense fallback={<section className="section-card">Loading search...</section>}>
      <SearchResultsClient documents={docs} problems={problems} snippetIndex={snippetIndex} />
    </Suspense>
  );
}
