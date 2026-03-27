"use client";

import { useMemo, type JSX } from "react";
import { useSearchParams } from "next/navigation";
import { ProblemCard } from "@/components/ProblemCard";
import { SearchBar } from "@/components/SearchBar";
import { searchDocuments, searchSnippets, suggestSnippets } from "@/lib/search";
import type { ProblemRecord, SearchDocument, SnippetIndex } from "@/types/content";

type SearchResultsClientProps = {
  documents: SearchDocument[];
  problems: ProblemRecord[];
  snippetIndex: SnippetIndex;
};

export function SearchResultsClient({ documents, problems, snippetIndex }: SearchResultsClientProps): JSX.Element {
  const params = useSearchParams();
  const query = params?.get("q") ?? "";

  const filteredProblems = useMemo(() => {
    const matches = searchDocuments(documents, { query });
    const matchSlugSet = new Set(matches.map((match) => match.slug));
    return problems.filter((problem) => matchSlugSet.has(problem.slug));
  }, [documents, problems, query]);

  const snippetMatches = useMemo(() => {
    return searchSnippets(snippetIndex, { query, limit: 12 });
  }, [query, snippetIndex]);

  const suggestionGroups = useMemo(() => suggestSnippets(snippetIndex, query), [query, snippetIndex]);

  return (
    <>
      <section className="hero">
        <h1>Search</h1>
        <p>Search across problems, categories, and practical engineering mappings.</p>
        <SearchBar defaultValue={query} />
      </section>
      <section className="section-card">
        <p className="demo-note">
          {filteredProblems.length} problems, {snippetMatches.length} snippets
        </p>
        <h3>Intent Suggestions</h3>
        <div className="snippet-grid">
          {suggestionGroups.patterns.map((item) => (
            <a key={item.id} href={item.target} className="section-card">
              <p className="problem-meta">{item.badge}</p>
              <p>{item.label}</p>
            </a>
          ))}
          {suggestionGroups.features.map((item) => (
            <a key={item.id} href={item.target} className="section-card">
              <p className="problem-meta">{item.badge}</p>
              <p>{item.label}</p>
            </a>
          ))}
          {suggestionGroups.problems.map((item) => (
            <a key={item.id} href={item.target} className="section-card">
              <p className="problem-meta">{item.badge}</p>
              <p>{item.label}</p>
            </a>
          ))}
          {suggestionGroups.snippets.map((item) => (
            <a key={item.id} href={item.target} className="section-card">
              <p className="problem-meta">{item.badge}</p>
              <p>{item.label}</p>
            </a>
          ))}
        </div>
        <h3>Snippet Results</h3>
        <div className="snippet-grid">
          {snippetMatches.map((snippet) => (
            <article key={snippet.id} className="section-card">
              <p className="problem-meta">
                {snippet.snippetType} - {snippet.language.toUpperCase()}
              </p>
              <h4>{snippet.title}</h4>
              <p>{snippet.summary}</p>
              <p className="demo-note">
                Pattern: {snippet.pattern.join(", ")} | Features: {snippet.featureMappings.join(", ")}
              </p>
              <a href={`/problems/${snippet.problemSlug}`}>View problem</a>
            </article>
          ))}
        </div>
        <h3>Problem Results</h3>
        <div className="grid">
          {filteredProblems.map((problem) => (
            <ProblemCard key={problem.slug} problem={problem} />
          ))}
        </div>
      </section>
    </>
  );
}
