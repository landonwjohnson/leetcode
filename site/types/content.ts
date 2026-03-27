export type ProblemDifficulty = "Easy" | "Medium" | "Hard";

export type SnippetLanguage = "swift" | "cpp" | "typescript";

export type TaxonomyKind =
  | "careerPath"
  | "questionType"
  | "feature"
  | "pattern"
  | "company"
  | "role"
  | "industry"
  | "tag";

export type TaxonomyEntry = {
  id: string;
  slug: string;
  label: string;
  description: string;
  aliases?: string[];
  relatedIds?: string[];
  icon?: string;
};

export type ProblemMeta = {
  id: string;
  slug: string;
  title: string;
  status: "draft" | "published";
  difficulty: ProblemDifficulty;
  questionTypeIds: string[];
  patternIds: string[];
  featureIds: string[];
  careerPathIds: string[];
  industryIds: string[];
  companyIds: string[];
  roleIds: string[];
  tagIds: string[];
  summary: string;
  whatItAsks: string;
  recognitionClues: string[];
  whyPatternFits: string;
  dailyUsefulness: string;
  interviewUsefulness: string;
  realWorldRelevance: string;
  useCases: string[];
  demoIdeas: string[];
  reusableHelpers: string[];
  relatedProblemSlugs: string[];
};

export type ProblemRecord = ProblemMeta & {
  prompt: string;
  content: string;
  snippetByLanguage: Partial<Record<SnippetLanguage, string>>;
  availableLanguages: SnippetLanguage[];
  readingTimeMinutes: number;
  updatedAt: string;
  searchText: string;
};

export type GeneratedProblemsPayload = {
  generatedAt: string;
  problems: ProblemRecord[];
};

export type TaxonomyIndexEntry = {
  id: string;
  slug: string;
  label: string;
  description: string;
  problemSlugs: string[];
};

export type GeneratedIndexesPayload = {
  byCareerPath: TaxonomyIndexEntry[];
  byQuestionType: TaxonomyIndexEntry[];
  byFeature: TaxonomyIndexEntry[];
  byPattern: TaxonomyIndexEntry[];
  byCompany: TaxonomyIndexEntry[];
  byRole: TaxonomyIndexEntry[];
  byIndustry: TaxonomyIndexEntry[];
  byTag: TaxonomyIndexEntry[];
};

export type SearchDocument = {
  slug: string;
  title: string;
  summary: string;
  questionTypes: string[];
  patterns: string[];
  features: string[];
  careerPaths: string[];
  companies: string[];
  roles: string[];
  industries: string[];
  tags: string[];
  useCases: string[];
  recognitionClues: string[];
  searchableText: string;
};

export type SnippetType = "solution" | "reusable_helper" | "demo_example" | "pattern_template" | "utility";

export type SnippetIntentKind = "problem" | "pattern" | "feature" | "career_path" | "snippet";

export type SnippetItem = {
  id: string;
  slug: string;
  problemSlug: string;
  problemTitle: string;
  title: string;
  questionType: string[];
  pattern: string[];
  snippetType: SnippetType;
  summary: string;
  description: string;
  keywords: string[];
  aliases: string[];
  searchPhrases: string[];
  featureMappings: string[];
  careerPaths: string[];
  industries: string[];
  jobRoles: string[];
  dailyUsefulness: number;
  interviewUsefulness: number;
  priority: number;
  language: SnippetLanguage;
  code: string;
  relatedProblemSlugs: string[];
  relatedSnippetIds: string[];
  sourcePath?: string;
  updatedAt: string;
  intentTokens: string[];
  searchText: string;
};

export type SnippetSuggestionItem = {
  id: string;
  label: string;
  kind: SnippetIntentKind;
  matchReason: string;
  target: string;
  badge?: string;
  score: number;
};

export type SnippetSuggestionGroups = {
  patterns: SnippetSuggestionItem[];
  features: SnippetSuggestionItem[];
  problems: SnippetSuggestionItem[];
  snippets: SnippetSuggestionItem[];
};

export type SnippetIndexLookup = {
  byId: Record<string, SnippetItem>;
  bySlug: Record<string, SnippetItem[]>;
  byProblemSlug: Record<string, SnippetItem[]>;
  byPattern: Record<string, SnippetItem[]>;
  byFeature: Record<string, SnippetItem[]>;
  byCareerPath: Record<string, SnippetItem[]>;
  bySnippetType: Record<SnippetType, SnippetItem[]>;
  byLanguage: Record<SnippetLanguage, SnippetItem[]>;
};

export type NormalizedTokenMap = Record<string, string[]>;

export type SnippetIndex = {
  generatedAt: string;
  snippets: SnippetItem[];
  lookups: SnippetIndexLookup;
  tokenMap: NormalizedTokenMap;
};

export type HomepageStatBadge = {
  algorithmsCount: number;
  patternsCount: number;
  focusLabel: string;
};

export type HomepageQuickTag = {
  id: string;
  label: string;
  href: string;
};

export type HomepageCategorySectionId = "career" | "questionType" | "feature";

export type HomepageCardAccent = "purple" | "emerald" | "amber" | "cyan" | "ruby";

export type HomepageCategoryCard = {
  id: string;
  label: string;
  description: string;
  href: string;
  count: number;
  /** Lucide icon component name (see homeCardIconMap). */
  icon?: string;
  accent?: HomepageCardAccent;
};

export type HomepageCategorySection = {
  id: HomepageCategorySectionId;
  title: string;
  subtitle: string;
  viewAllHref: string;
  cards: HomepageCategoryCard[];
};

export type HomepageUsefulProblemItem = {
  id: string;
  title: string;
  href: string;
  subtitle: string;
  badges: string[];
};

export type HomepageCommonPatternItem = {
  id: string;
  title: string;
  href: string;
  subtitle: string;
  count: number;
};

export type HomepageRecentAdditionItem = {
  id: string;
  title: string;
  href: string;
  subtitle: string;
  ageLabel: string;
};

export type HomepageListSections = {
  usefulProblems: HomepageUsefulProblemItem[];
  commonPatterns: HomepageCommonPatternItem[];
  recentAdditions: HomepageRecentAdditionItem[];
};

export type HomepageViewModel = {
  hero: {
    title: string;
    subtitle: string;
    statBadge: HomepageStatBadge;
    quickTags: HomepageQuickTag[];
  };
  browseSections: HomepageCategorySection[];
  lists: HomepageListSections;
};
