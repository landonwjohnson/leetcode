import fs from "node:fs";
import path from "node:path";
import careerPaths from "@/content/reference/career-paths.json";
import companies from "@/content/reference/companies.json";
import features from "@/content/reference/features.json";
import industries from "@/content/reference/industries.json";
import patterns from "@/content/reference/patterns.json";
import questionTypes from "@/content/reference/question-types.json";
import roles from "@/content/reference/roles.json";
import tags from "@/content/reference/tags.json";
import type {
  GeneratedIndexesPayload,
  GeneratedProblemsPayload,
  ProblemRecord,
  SearchDocument,
  SnippetIndex,
  SnippetItem,
  TaxonomyEntry,
  TaxonomyIndexEntry
} from "@/types/content";

const generatedPath = path.join(process.cwd(), "generated", "problems.json");
const generatedIndexesPath = path.join(process.cwd(), "generated", "indexes", "all.json");
const generatedSearchIndexPath = path.join(process.cwd(), "generated", "search-index.json");
const generatedSnippetsPath = path.join(process.cwd(), "generated", "snippets.json");
const generatedSnippetIndexPath = path.join(process.cwd(), "generated", "snippet-index.json");
const emptyIndexes: GeneratedIndexesPayload = {
  byCareerPath: [],
  byQuestionType: [],
  byFeature: [],
  byPattern: [],
  byCompany: [],
  byRole: [],
  byIndustry: [],
  byTag: []
};

const referenceMaps = {
  careerPath: new Map((careerPaths as TaxonomyEntry[]).map((entry) => [entry.id, entry])),
  questionType: new Map((questionTypes as TaxonomyEntry[]).map((entry) => [entry.id, entry])),
  feature: new Map((features as TaxonomyEntry[]).map((entry) => [entry.id, entry])),
  pattern: new Map((patterns as TaxonomyEntry[]).map((entry) => [entry.id, entry])),
  company: new Map((companies as TaxonomyEntry[]).map((entry) => [entry.id, entry])),
  role: new Map((roles as TaxonomyEntry[]).map((entry) => [entry.id, entry])),
  industry: new Map((industries as TaxonomyEntry[]).map((entry) => [entry.id, entry])),
  tag: new Map((tags as TaxonomyEntry[]).map((entry) => [entry.id, entry]))
};

export function loadProblemsPayload(): GeneratedProblemsPayload {
  if (!fs.existsSync(generatedPath)) {
    return { generatedAt: new Date(0).toISOString(), problems: [] };
  }

  const file = fs.readFileSync(generatedPath, "utf8");
  return JSON.parse(file) as GeneratedProblemsPayload;
}

export function getAllProblems(): ProblemRecord[] {
  return loadProblemsPayload().problems;
}

export function getProblemBySlug(slug: string): ProblemRecord | undefined {
  return getAllProblems().find((problem: ProblemRecord): boolean => problem.slug === slug);
}

export function getRelatedProblems(slug: string): ProblemRecord[] {
  const source = getProblemBySlug(slug);
  if (!source) {
    return [];
  }

  const all = getAllProblems();
  const relatedSlugs = source.relatedProblemSlugs ?? [];
  return all.filter((problem: ProblemRecord): boolean => relatedSlugs.includes(problem.slug));
}

export function loadIndexes(): GeneratedIndexesPayload {
  if (!fs.existsSync(generatedIndexesPath)) {
    return emptyIndexes;
  }

  const file = fs.readFileSync(generatedIndexesPath, "utf8");
  return JSON.parse(file) as GeneratedIndexesPayload;
}

export function loadSearchDocs(): SearchDocument[] {
  if (!fs.existsSync(generatedSearchIndexPath)) {
    return [];
  }

  const file = fs.readFileSync(generatedSearchIndexPath, "utf8");
  return JSON.parse(file) as SearchDocument[];
}

export function loadSnippets(): SnippetItem[] {
  if (!fs.existsSync(generatedSnippetsPath)) {
    return [];
  }

  const file = fs.readFileSync(generatedSnippetsPath, "utf8");
  return JSON.parse(file) as SnippetItem[];
}

export function loadSnippetIndex(): SnippetIndex {
  if (!fs.existsSync(generatedSnippetIndexPath)) {
    return {
      generatedAt: new Date(0).toISOString(),
      snippets: [],
      lookups: {
        byId: {},
        bySlug: {},
        byProblemSlug: {},
        byPattern: {},
        byFeature: {},
        byCareerPath: {},
        bySnippetType: { solution: [], reusable_helper: [], demo_example: [], pattern_template: [], utility: [] },
        byLanguage: { swift: [], cpp: [], typescript: [] }
      },
      tokenMap: {}
    };
  }

  const file = fs.readFileSync(generatedSnippetIndexPath, "utf8");
  return JSON.parse(file) as SnippetIndex;
}

export function resolveLabels(ids: string[], kind: keyof typeof referenceMaps): string[] {
  const map = referenceMaps[kind];
  return ids.map((id) => map.get(id)?.label || id);
}

export function getAllTags(): string[] {
  const values = new Set<string>();
  for (const problem of getAllProblems()) {
    for (const tag of problem.tagIds) {
      values.add(tag);
    }
  }
  return Array.from(values).sort();
}

export function getAllLanguages(): string[] {
  const values = new Set<string>();
  for (const problem of getAllProblems()) {
    for (const language of problem.availableLanguages) {
      values.add(language);
    }
  }
  return Array.from(values).sort();
}

export function getProblemsBySlugs(slugs: string[]): ProblemRecord[] {
  const all = getAllProblems();
  const slugSet = new Set(slugs);
  return all.filter((problem) => slugSet.has(problem.slug));
}

export function getIndexEntries(kind: keyof GeneratedIndexesPayload) {
  return loadIndexes()[kind];
}

export function getIndexEntryBySlug(kind: keyof GeneratedIndexesPayload, slug: string) {
  return getIndexEntries(kind).find((entry) => entry.slug === slug);
}

/** Every reference feature slug must pre-render with `output: export`, even when the build index has no problems yet. */
export function getFeatureStaticParams(): { slug: string }[] {
  const slugs = new Set<string>();
  for (const entry of loadIndexes().byFeature) {
    slugs.add(entry.slug);
  }
  for (const entry of features as TaxonomyEntry[]) {
    slugs.add(entry.slug);
  }
  return Array.from(slugs)
    .sort()
    .map((slug) => ({ slug }));
}

export function resolveFeaturePageEntry(slug: string): TaxonomyIndexEntry | null {
  const indexed = getIndexEntryBySlug("byFeature", slug);
  if (indexed) {
    return indexed;
  }
  const ref = (features as TaxonomyEntry[]).find((entry) => entry.slug === slug);
  if (!ref) {
    return null;
  }
  return {
    id: ref.id,
    slug: ref.slug,
    label: ref.label,
    description: ref.description,
    problemSlugs: []
  };
}
