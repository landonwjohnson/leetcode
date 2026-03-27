import type {
  NormalizedTokenMap,
  SearchDocument,
  SnippetIndex,
  SnippetItem,
  SnippetSuggestionGroups,
  SnippetSuggestionItem
} from "@/types/content";

export type SearchFilters = {
  query: string;
  careerPath?: string;
  questionType?: string;
  feature?: string;
  pattern?: string;
};

export type SnippetSearchFilters = {
  query: string;
  language?: string;
  limit?: number;
};

const DEFAULT_TOKEN_MAP: NormalizedTokenMap = {
  "search autocomplete": ["trie", "prefix search", "typeahead", "search suggestions"],
  leaderboard: ["top k", "heap", "ranking", "priority queue"],
  "calendar overlap": ["merge intervals", "interval overlap", "scheduling", "time window overlap"],
  "graph traversal": ["bfs", "dfs", "adjacency list", "topological sort"],
  "recommendation system": ["ranking", "similarity search", "top k", "heap"],
  frontend: ["ui", "browser", "react", "typescript"]
};

function includesLabel(items: string[], value: string | undefined): boolean {
  if (!value) return true;
  return items.some((item) => item.toLowerCase() === value.toLowerCase());
}

function scoreDocument(document: SearchDocument, query: string): number {
  if (!query) return 1;
  const normalizedQuery = query.toLowerCase();
  let score = 0;
  if (document.title.toLowerCase().includes(normalizedQuery)) score += 8;
  if (document.questionTypes.join(" ").toLowerCase().includes(normalizedQuery)) score += 6;
  if (document.patterns.join(" ").toLowerCase().includes(normalizedQuery)) score += 6;
  if (document.features.join(" ").toLowerCase().includes(normalizedQuery)) score += 4;
  if (document.careerPaths.join(" ").toLowerCase().includes(normalizedQuery)) score += 4;
  if (document.tags.join(" ").toLowerCase().includes(normalizedQuery)) score += 3;
  if (document.summary.toLowerCase().includes(normalizedQuery)) score += 2;
  if (document.searchableText.includes(normalizedQuery)) score += 1;
  return score;
}

export function searchDocuments(documents: SearchDocument[], filters: SearchFilters): SearchDocument[] {
  const filtered = documents.filter((document) => {
    return (
      includesLabel(document.careerPaths, filters.careerPath) &&
      includesLabel(document.questionTypes, filters.questionType) &&
      includesLabel(document.features, filters.feature) &&
      includesLabel(document.patterns, filters.pattern)
    );
  });

  return filtered
    .map((document) => ({ document, score: scoreDocument(document, filters.query) }))
    .filter((entry) => (filters.query ? entry.score > 0 : true))
    .sort((a, b) => b.score - a.score || a.document.title.localeCompare(b.document.title))
    .map((entry) => entry.document);
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function tokenize(value: string): string[] {
  return normalize(value)
    .split(/[^a-z0-9+]+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function uniqueValues(values: string[]): string[] {
  return Array.from(new Set(values.map((value) => normalize(value)).filter(Boolean)));
}

function expandQuery(query: string, tokenMap: NormalizedTokenMap): string[] {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return [];
  const expansions = tokenMap[normalizedQuery] ?? [];
  return uniqueValues([normalizedQuery, ...tokenize(normalizedQuery), ...expansions, ...expansions.flatMap(tokenize)]);
}

function hasExact(values: string[], expandedQuery: string[]): boolean {
  const lookup = new Set(values.map(normalize));
  return expandedQuery.some((query) => lookup.has(query));
}

function overlapCount(values: string[], expandedQuery: string[]): number {
  const valueTokens = new Set(values.flatMap((value) => tokenize(value)));
  return expandedQuery.reduce((count, query) => (valueTokens.has(query) ? count + 1 : count), 0);
}

type ScoredSnippet = { snippet: SnippetItem; score: number; reason: string };

function scoreSnippet(snippet: SnippetItem, expandedQuery: string[], language?: string): ScoredSnippet {
  if (expandedQuery.length === 0) {
    return { snippet, score: snippet.priority, reason: "editorial priority" };
  }

  let score = 0;
  const reasons: string[] = [];
  if (hasExact(snippet.searchPhrases, expandedQuery) || hasExact(snippet.aliases, expandedQuery)) {
    score += 40;
    reasons.push("search phrase");
  }
  if (hasExact(snippet.pattern, expandedQuery) || overlapCount(snippet.pattern, expandedQuery) > 0) {
    score += 30;
    reasons.push("pattern");
  }
  if (hasExact(snippet.featureMappings, expandedQuery) || overlapCount(snippet.featureMappings, expandedQuery) > 0) {
    score += 25;
    reasons.push("feature");
  }
  const titleOverlap = overlapCount([snippet.title], expandedQuery);
  if (titleOverlap > 0) {
    score += 20 + titleOverlap;
    reasons.push("title");
  }
  const problemOverlap = overlapCount([snippet.problemTitle], expandedQuery);
  if (problemOverlap > 0) {
    score += 12 + problemOverlap;
    reasons.push("problem");
  }
  const keywordOverlap = overlapCount(snippet.keywords, expandedQuery);
  if (keywordOverlap > 0) {
    score += 10 + keywordOverlap;
    reasons.push("keywords");
  }
  const summaryOverlap = overlapCount([snippet.summary], expandedQuery);
  if (summaryOverlap > 0) {
    score += 8 + summaryOverlap;
    reasons.push("summary");
  }
  if (language && snippet.language === language) {
    score += 6;
  }
  score += Math.round((snippet.interviewUsefulness + snippet.dailyUsefulness) / 40);
  score += Math.round(snippet.priority / 10);

  const hasIntentMatch = reasons.some((reason) => reason !== "summary");
  if (!hasIntentMatch && summaryOverlap > 0) {
    score -= 10;
  }

  return {
    snippet,
    score,
    reason: reasons.length > 0 ? reasons[0] : "description"
  };
}

function sortScored(a: ScoredSnippet, b: ScoredSnippet): number {
  if (b.score !== a.score) return b.score - a.score;
  if (b.snippet.priority !== a.snippet.priority) return b.snippet.priority - a.snippet.priority;
  return b.snippet.updatedAt.localeCompare(a.snippet.updatedAt);
}

function buildSuggestion(id: string, label: string, kind: SnippetSuggestionItem["kind"], target: string, score: number, matchReason: string, badge?: string): SnippetSuggestionItem {
  return { id, label, kind, target, score, matchReason, badge };
}

function dedupeSuggestions(items: SnippetSuggestionItem[], max: number): SnippetSuggestionItem[] {
  const seen = new Set<string>();
  const output: SnippetSuggestionItem[] = [];
  for (const item of items.sort((a, b) => b.score - a.score)) {
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    output.push(item);
    if (output.length >= max) break;
  }
  return output;
}

export function buildSnippetIndex(snippets: SnippetItem[], tokenMap: NormalizedTokenMap = DEFAULT_TOKEN_MAP): SnippetIndex {
  const byId: SnippetIndex["lookups"]["byId"] = {};
  const bySlug: SnippetIndex["lookups"]["bySlug"] = {};
  const byProblemSlug: SnippetIndex["lookups"]["byProblemSlug"] = {};
  const byPattern: SnippetIndex["lookups"]["byPattern"] = {};
  const byFeature: SnippetIndex["lookups"]["byFeature"] = {};
  const byCareerPath: SnippetIndex["lookups"]["byCareerPath"] = {};
  const bySnippetType: SnippetIndex["lookups"]["bySnippetType"] = {
    solution: [],
    reusable_helper: [],
    demo_example: [],
    pattern_template: [],
    utility: []
  };
  const byLanguage: SnippetIndex["lookups"]["byLanguage"] = { swift: [], cpp: [], typescript: [] };

  for (const snippet of snippets) {
    byId[snippet.id] = snippet;
    bySlug[snippet.slug] = [...(bySlug[snippet.slug] ?? []), snippet];
    byProblemSlug[snippet.problemSlug] = [...(byProblemSlug[snippet.problemSlug] ?? []), snippet];
    bySnippetType[snippet.snippetType] = [...bySnippetType[snippet.snippetType], snippet];
    byLanguage[snippet.language] = [...byLanguage[snippet.language], snippet];
    for (const pattern of snippet.pattern) {
      byPattern[pattern] = [...(byPattern[pattern] ?? []), snippet];
    }
    for (const feature of snippet.featureMappings) {
      byFeature[feature] = [...(byFeature[feature] ?? []), snippet];
    }
    for (const careerPath of snippet.careerPaths) {
      byCareerPath[careerPath] = [...(byCareerPath[careerPath] ?? []), snippet];
    }
  }

  return {
    generatedAt: new Date().toISOString(),
    snippets,
    lookups: { byId, bySlug, byProblemSlug, byPattern, byFeature, byCareerPath, bySnippetType, byLanguage },
    tokenMap
  };
}

export function searchSnippets(index: SnippetIndex, filters: SnippetSearchFilters): SnippetItem[] {
  const expandedQuery = expandQuery(filters.query, index.tokenMap);
  const scored = index.snippets
    .map((snippet) => scoreSnippet(snippet, expandedQuery, filters.language))
    .filter((entry) => (filters.query ? entry.score > 0 : true))
    .sort(sortScored);
  const limit = filters.limit ?? 24;
  return scored.slice(0, limit).map((entry) => entry.snippet);
}

export function suggestSnippets(index: SnippetIndex, query: string): SnippetSuggestionGroups {
  const expandedQuery = expandQuery(query, index.tokenMap);
  const scored = index.snippets
    .map((snippet) => scoreSnippet(snippet, expandedQuery))
    .filter((entry) => (query ? entry.score > 0 : true))
    .sort(sortScored)
    .slice(0, 50);

  const patternSuggestions = scored.flatMap(({ snippet, score, reason }) =>
    snippet.pattern.map((pattern) =>
      buildSuggestion(`pattern:${pattern}`, pattern, "pattern", `/patterns/${pattern}`, score + 5, reason, "Pattern")
    )
  );
  const featureSuggestions = scored.flatMap(({ snippet, score, reason }) =>
    snippet.featureMappings.map((feature) =>
      buildSuggestion(`feature:${feature}`, feature, "feature", `/features/${feature}`, score + 3, reason, "Feature")
    )
  );
  const problemSuggestions = scored.map(({ snippet, score, reason }) =>
    buildSuggestion(`problem:${snippet.problemSlug}`, snippet.problemTitle, "problem", `/problems/${snippet.problemSlug}`, score + 2, reason, "Problem")
  );
  const snippetSuggestions = scored.map(({ snippet, score, reason }) =>
    buildSuggestion(`snippet:${snippet.id}`, snippet.title, "snippet", `/problems/${snippet.problemSlug}#${snippet.slug}`, score, reason, snippet.language.toUpperCase())
  );

  return {
    patterns: dedupeSuggestions(patternSuggestions, 4),
    features: dedupeSuggestions(featureSuggestions, 4),
    problems: dedupeSuggestions(problemSuggestions, 5),
    snippets: dedupeSuggestions(snippetSuggestions, 8)
  };
}
