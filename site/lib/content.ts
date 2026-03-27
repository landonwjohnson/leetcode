import fs from "node:fs";
import path from "node:path";

export type ProblemLanguage = "swift" | "python" | "javascript" | "c++";

export type ProblemContent = {
  slug: string;
  title: string;
  summary: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  languages: Partial<Record<ProblemLanguage, string>>;
  prompt: string;
  complexity: {
    time: string;
    space: string;
  };
  useCases: string[];
  relatedSlugs: string[];
  hasInteractiveExample: boolean;
};

export type ProblemsPayload = {
  generatedAt: string;
  problems: ProblemContent[];
};

const generatedPath = path.join(process.cwd(), "generated", "problems.json");

export function loadProblemsPayload(): ProblemsPayload {
  const file = fs.readFileSync(generatedPath, "utf8");
  return JSON.parse(file) as ProblemsPayload;
}

export function getAllProblems(): ProblemContent[] {
  return loadProblemsPayload().problems;
}

export function getProblemBySlug(slug: string): ProblemContent | undefined {
  return getAllProblems().find((problem: ProblemContent): boolean => problem.slug === slug);
}

export function getRelatedProblems(slug: string): ProblemContent[] {
  const source = getProblemBySlug(slug);
  if (!source) {
    return [];
  }

  const all = getAllProblems();
  return all.filter((problem: ProblemContent): boolean => source.relatedSlugs.includes(problem.slug));
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const problem of getAllProblems()) {
    for (const tag of problem.tags) {
      tags.add(tag);
    }
  }

  return Array.from(tags).sort();
}

export function getAllLanguages(): string[] {
  const languages = new Set<string>();
  for (const problem of getAllProblems()) {
    for (const [language, code] of Object.entries(problem.languages)) {
      if (typeof code === "string" && code.length > 0) {
        languages.add(language);
      }
    }
  }

  return Array.from(languages).sort();
}
