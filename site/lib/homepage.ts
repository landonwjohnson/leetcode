import { getAllProblems, loadIndexes } from "@/lib/content";
import type {
  HomepageCardAccent,
  HomepageCategoryCard,
  HomepageCategorySection,
  HomepageCommonPatternItem,
  HomepageRecentAdditionItem,
  HomepageUsefulProblemItem,
  HomepageViewModel,
  ProblemRecord,
  TaxonomyIndexEntry
} from "@/types/content";

const HERO_TITLE = "Find the Right Algorithm for Real-World Problems";
const HERO_SUBTITLE = "Reference algorithms by career path, problem type, or the feature you're building - not just by name.";
const MAX_BROWSE_CARDS = 7;
const MAX_QUICK_TAGS = 8;
const MAX_USEFUL_PROBLEMS = 6;
const MAX_COMMON_PATTERNS = 6;
const MAX_RECENT_ADDITIONS = 6;

const CARD_ICON_NAMES = [
  "Code2",
  "Layers",
  "Zap",
  "GitBranch",
  "Box",
  "LayoutGrid",
  "Cpu",
  "Database",
  "Globe",
  "Sparkles",
  "Network",
  "Workflow",
  "Brackets",
  "Package",
  "Binary",
  "Radar",
  "Hash",
  "Shapes"
] as const;

const CARD_ACCENTS: HomepageCardAccent[] = ["purple", "emerald", "amber", "cyan", "ruby"];

function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (Math.imul(31, h) + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function cardVisualsForSlug(slug: string): { icon: string; accent: HomepageCardAccent } {
  const h = hashSlug(slug);
  return {
    icon: CARD_ICON_NAMES[h % CARD_ICON_NAMES.length] ?? "Code2",
    accent: CARD_ACCENTS[h % CARD_ACCENTS.length] ?? "purple"
  };
}

function toCategoryCards(entries: TaxonomyIndexEntry[], routePrefix: string, max: number): HomepageCategoryCard[] {
  return entries.slice(0, max).map((entry) => {
    const { icon, accent } = cardVisualsForSlug(entry.slug);
    return {
      id: entry.id,
      label: entry.label,
      description: entry.description,
      href: `/${routePrefix}/${entry.slug}`,
      count: entry.problemSlugs.length,
      icon,
      accent
    };
  });
}

function buildBrowseSections(): HomepageCategorySection[] {
  const indexes = loadIndexes();
  return [
    {
      id: "career",
      title: "Browse by Career Path",
      subtitle: "Algorithms most relevant to your role.",
      viewAllHref: "/problems",
      cards: toCategoryCards(indexes.byCareerPath, "career", MAX_BROWSE_CARDS)
    },
    {
      id: "questionType",
      title: "Problem Types",
      subtitle: "Classic patterns with real-world context.",
      viewAllHref: "/problems",
      cards: toCategoryCards(indexes.byQuestionType, "question-type", MAX_BROWSE_CARDS)
    },
    {
      id: "feature",
      title: "Real-World Features",
      subtitle: "Find algorithms by the product feature you're building.",
      viewAllHref: "/problems",
      cards: toCategoryCards(indexes.byFeature, "feature", MAX_BROWSE_CARDS)
    }
  ];
}

function buildQuickTags(): HomepageViewModel["hero"]["quickTags"] {
  const indexes = loadIndexes();
  return indexes.byPattern.slice(0, MAX_QUICK_TAGS).map((entry) => ({
    id: entry.id,
    label: entry.label,
    href: `/pattern/${entry.slug}`
  }));
}

function buildUsefulProblems(problems: ProblemRecord[]): HomepageUsefulProblemItem[] {
  const scored = problems
    .map((problem) => {
      const score =
        problem.patternIds.length * 3 +
        problem.featureIds.length * 3 +
        problem.useCases.length * 2 +
        problem.tagIds.length +
        problem.availableLanguages.length;
      return { problem, score };
    })
    .sort((left, right) => right.score - left.score || left.problem.title.localeCompare(right.problem.title));

  return scored.slice(0, MAX_USEFUL_PROBLEMS).map(({ problem }) => ({
    id: problem.id,
    title: problem.title,
    href: `/problems/${problem.slug}`,
    subtitle: problem.summary,
    badges: [problem.difficulty, ...problem.availableLanguages.map((language) => language.toUpperCase())].slice(0, 3)
  }));
}

function buildCommonPatterns(): HomepageCommonPatternItem[] {
  const indexes = loadIndexes();
  return indexes.byPattern.slice(0, MAX_COMMON_PATTERNS).map((entry) => ({
    id: entry.id,
    title: entry.label,
    href: `/pattern/${entry.slug}`,
    subtitle: entry.description,
    count: entry.problemSlugs.length
  }));
}

function toAgeLabel(updatedAt: string): string {
  const deltaMs = Date.now() - new Date(updatedAt).getTime();
  const deltaDays = Math.max(0, Math.floor(deltaMs / (24 * 60 * 60 * 1000)));
  if (deltaDays === 0) {
    return "today";
  }
  if (deltaDays === 1) {
    return "1 day ago";
  }
  return `${deltaDays} days ago`;
}

function buildRecentAdditions(problems: ProblemRecord[]): HomepageRecentAdditionItem[] {
  return [...problems]
    .sort((left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime())
    .slice(0, MAX_RECENT_ADDITIONS)
    .map((problem) => ({
      id: problem.id,
      title: problem.title,
      href: `/problems/${problem.slug}`,
      subtitle: problem.summary,
      ageLabel: toAgeLabel(problem.updatedAt)
    }));
}

export function buildHomepageViewModel(): HomepageViewModel {
  const problems = getAllProblems();
  const indexes = loadIndexes();
  return {
    hero: {
      title: HERO_TITLE,
      subtitle: HERO_SUBTITLE,
      statBadge: {
        algorithmsCount: problems.length,
        patternsCount: indexes.byPattern.length,
        focusLabel: "real-world mapped"
      },
      quickTags: buildQuickTags()
    },
    browseSections: buildBrowseSections(),
    lists: {
      usefulProblems: buildUsefulProblems(problems),
      commonPatterns: buildCommonPatterns(),
      recentAdditions: buildRecentAdditions(problems)
    }
  };
}
