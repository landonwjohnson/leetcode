import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(process.cwd(), "..");
const problemsRoot = path.join(repoRoot, "problems");
const generatedDir = path.join(process.cwd(), "generated");
const outFile = path.join(generatedDir, "problems.json");

const languageFileCandidates = {
  swift: ["swift/solution.swift", "languages/swift/solution.swift", "swift/Solution.swift"],
  python: ["python/solution.py", "languages/python/solution.py"],
  javascript: ["javascript/solution.js", "languages/javascript/solution.js"],
  "c++": ["c++/solution.cc", "languages/c++/solution.cc"]
};

function titleFromSlug(slug) {
  return slug
    .split("-")
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(" ");
}

function inferTags(slug, prompt) {
  const text = `${slug} ${prompt}`.toLowerCase();
  const tags = new Set(["arrays"]);
  if (text.includes("sum")) tags.add("hash-map");
  if (text.includes("concatenation")) tags.add("array-manipulation");
  return Array.from(tags);
}

function readIfExists(filePath) {
  if (!fs.existsSync(filePath)) return "";
  return fs.readFileSync(filePath, "utf8").trim();
}

function pickLanguageCode(problemDir, candidates) {
  for (const relative of candidates) {
    const target = path.join(problemDir, relative);
    if (fs.existsSync(target)) {
      return fs.readFileSync(target, "utf8").trim();
    }
  }
  return "";
}

function buildProblem(slug, allSlugs) {
  const problemDir = path.join(problemsRoot, slug);
  const prompt = readIfExists(path.join(problemDir, "prompt.md"));
  const title = prompt.split("\n")[0].replace(/^#\s*/, "") || titleFromSlug(slug);
  const tags = inferTags(slug, prompt);

  const useCases = slug === "concatenation-of-array"
    ? [
        "Build infinite-feeling carousel data by duplicating the source list.",
        "Create repeated test fixtures when exercising list-heavy UI behavior.",
        "Model wrap-around playlist buffers in media applications."
      ]
    : [
        "Resolve complementary value lookups in near real-time APIs.",
        "Detect matching pairs in transactional or telemetry streams.",
        "Use hash-map pairing logic in data validation pipelines."
      ];

  const hasInteractiveExample = fs.existsSync(path.join(problemDir, "examples", "react"));

  return {
    slug,
    title,
    summary: `Solution walkthrough for ${title.toLowerCase()} with code and real use cases.`,
    difficulty: "Easy",
    tags,
    languages: {
      swift: pickLanguageCode(problemDir, languageFileCandidates.swift),
      python: pickLanguageCode(problemDir, languageFileCandidates.python),
      javascript: pickLanguageCode(problemDir, languageFileCandidates.javascript),
      "c++": pickLanguageCode(problemDir, languageFileCandidates["c++"])
    },
    prompt,
    complexity: {
      time: slug === "two-sum" ? "O(n)" : "O(n)",
      space: slug === "two-sum" ? "O(n)" : "O(n)"
    },
    useCases,
    relatedSlugs: allSlugs.filter((candidate) => candidate !== slug).slice(0, 3),
    hasInteractiveExample
  };
}

function main() {
  const slugs = fs
    .readdirSync(problemsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  const payload = {
    generatedAt: new Date().toISOString(),
    problems: slugs.map((slug) => buildProblem(slug, slugs))
  };

  fs.mkdirSync(generatedDir, { recursive: true });
  fs.writeFileSync(outFile, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}

main();
