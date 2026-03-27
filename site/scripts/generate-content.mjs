import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const repoRoot = path.resolve(process.cwd(), "..");
const problemsRoot = path.join(repoRoot, "problems");
const generatedDir = path.join(process.cwd(), "generated");
const outFile = path.join(generatedDir, "problems.json");
const indexesDir = path.join(generatedDir, "indexes");
const searchIndexFile = path.join(generatedDir, "search-index.json");
const snippetsFile = path.join(generatedDir, "snippets.json");
const snippetIndexFile = path.join(generatedDir, "snippet-index.json");
const referenceDir = path.join(process.cwd(), "content", "reference");

const languageFileCandidates = {
  swift: ["snippets/swift.swift", "swift/solution.swift", "languages/swift/solution.swift", "swift/Solution.swift"],
  cpp: ["snippets/cpp.cpp", "c++/solution.cc", "languages/c++/solution.cc"],
  typescript: ["snippets/typescript.ts", "javascript/solution.js", "languages/javascript/solution.js"]
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

function slugify(value) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function readIfExists(filePath) {
  if (!fs.existsSync(filePath)) return "";
  return fs.readFileSync(filePath, "utf8").trim();
}

function readJsonFile(filePath) {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
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

function clampScore(value, fallback) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(0, Math.min(100, Math.round(parsed)));
}

function normalizeSnippetType(value) {
  const allowed = new Set(["solution", "reusable_helper", "demo_example", "pattern_template", "utility"]);
  const normalized = String(value || "solution").trim().toLowerCase();
  return allowed.has(normalized) ? normalized : "solution";
}

function normalizeStringList(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => String(item).trim())
    .filter(Boolean);
}

function buildTokenMap() {
  return {
    "search autocomplete": ["trie", "prefix search", "typeahead", "search suggestions"],
    leaderboard: ["top k", "heap", "ranking", "priority queue"],
    "calendar overlap": ["merge intervals", "interval overlap", "scheduling", "time window overlap"],
    "graph traversal": ["bfs", "dfs", "adjacency list", "topological sort"],
    "recommendation system": ["ranking", "similarity search", "top k", "heap"],
    frontend: ["ui", "browser", "react", "typescript"]
  };
}

function buildSnippetSearchText(snippet) {
  return [
    snippet.title,
    snippet.problemTitle,
    snippet.summary,
    snippet.description,
    snippet.keywords.join(" "),
    snippet.aliases.join(" "),
    snippet.searchPhrases.join(" "),
    snippet.featureMappings.join(" "),
    snippet.careerPaths.join(" "),
    snippet.industries.join(" "),
    snippet.jobRoles.join(" "),
    snippet.pattern.join(" "),
    snippet.questionType.join(" ")
  ]
    .join(" ")
    .toLowerCase();
}

function parseSnippetMeta(snippetMetaPath) {
  if (!fs.existsSync(snippetMetaPath)) {
    return {};
  }
  const source = fs.readFileSync(snippetMetaPath, "utf8");
  const parsed = matter(`---\n${source}\n---`);
  return parsed.data ?? {};
}

function buildSnippetFromCode(problem, language, code, sourcePath, snippetMeta = {}, snippetKey = language) {
  const baseId = `${problem.slug}-${snippetKey}-${language}`;
  const title = snippetMeta.title || `${problem.title} (${language})`;
  const snippetType = normalizeSnippetType(snippetMeta.snippetType || (snippetKey === language ? "solution" : "reusable_helper"));
  const keywords = normalizeStringList(snippetMeta.keywords);
  const aliases = normalizeStringList(snippetMeta.aliases);
  const searchPhrases = normalizeStringList(snippetMeta.searchPhrases);
  const featureMappings = normalizeStringList(snippetMeta.featureMappings);
  const careerPaths = normalizeStringList(snippetMeta.careerPaths);
  const industries = normalizeStringList(snippetMeta.industries);
  const jobRoles = normalizeStringList(snippetMeta.jobRoles);
  const relatedSnippetIds = normalizeStringList(snippetMeta.relatedSnippetIds);
  const summary = snippetMeta.summary || problem.summary;
  const description = snippetMeta.description || problem.whatItAsks;
  const snippet = {
    id: snippetMeta.id || baseId,
    slug: snippetMeta.slug || slugify(baseId),
    problemSlug: problem.slug,
    problemTitle: problem.title,
    title,
    questionType: [...problem.questionTypeIds],
    pattern: [...problem.patternIds],
    snippetType,
    summary,
    description,
    keywords: keywords.length > 0 ? keywords : [...problem.tagIds],
    aliases,
    searchPhrases: searchPhrases.length > 0 ? searchPhrases : [...problem.useCases],
    featureMappings: featureMappings.length > 0 ? featureMappings : [...problem.featureIds],
    careerPaths: careerPaths.length > 0 ? careerPaths : [...problem.careerPathIds],
    industries: industries.length > 0 ? industries : [...problem.industryIds],
    jobRoles: jobRoles.length > 0 ? jobRoles : [...problem.roleIds],
    dailyUsefulness: clampScore(snippetMeta.dailyUsefulness, 70),
    interviewUsefulness: clampScore(snippetMeta.interviewUsefulness, 70),
    priority: clampScore(snippetMeta.priority, 50),
    language,
    code,
    relatedProblemSlugs: [...problem.relatedProblemSlugs],
    relatedSnippetIds,
    sourcePath,
    updatedAt: new Date().toISOString(),
    intentTokens: [],
    searchText: ""
  };
  snippet.intentTokens = Array.from(new Set([snippet.title, ...snippet.aliases, ...snippet.searchPhrases].map((item) => item.toLowerCase())));
  snippet.searchText = buildSnippetSearchText(snippet);
  return snippet;
}

function extractSnippetsForProblem(problem, problemDir) {
  const snippets = [];
  const snippetsDir = path.join(problemDir, "snippets");
  const languages = ["swift", "cpp", "typescript"];
  if (!fs.existsSync(snippetsDir)) {
    return snippets;
  }

  const entries = fs.readdirSync(snippetsDir, { withFileTypes: true });
  const hasNestedSnippets = entries.some((entry) => entry.isDirectory());
  if (hasNestedSnippets) {
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const snippetId = entry.name;
      const snippetDir = path.join(snippetsDir, snippetId);
      const snippetMeta = parseSnippetMeta(path.join(snippetDir, "meta.yaml"));
      for (const language of languages) {
        const fileName = language === "cpp" ? "cpp.cpp" : language === "swift" ? "swift.swift" : "typescript.ts";
        const sourcePath = path.join(snippetDir, fileName);
        const code = readIfExists(sourcePath);
        if (!code) continue;
        snippets.push(buildSnippetFromCode(problem, language, code, sourcePath, snippetMeta, snippetId));
      }
    }
    return snippets;
  }

  for (const language of languages) {
    const fileName = language === "cpp" ? "cpp.cpp" : language === "swift" ? "swift.swift" : "typescript.ts";
    const sourcePath = path.join(snippetsDir, fileName);
    const code = readIfExists(sourcePath);
    if (!code) continue;
    snippets.push(buildSnippetFromCode(problem, language, code, sourcePath, {}, language));
  }

  return snippets;
}

function addToLookup(lookup, key, snippet) {
  if (!lookup[key]) lookup[key] = [];
  lookup[key].push(snippet);
}

function buildSnippetIndex(snippets) {
  const byId = {};
  const bySlug = {};
  const byProblemSlug = {};
  const byPattern = {};
  const byFeature = {};
  const byCareerPath = {};
  const bySnippetType = {
    solution: [],
    reusable_helper: [],
    demo_example: [],
    pattern_template: [],
    utility: []
  };
  const byLanguage = { swift: [], cpp: [], typescript: [] };

  for (const snippet of snippets) {
    byId[snippet.id] = snippet;
    addToLookup(bySlug, snippet.slug, snippet);
    addToLookup(byProblemSlug, snippet.problemSlug, snippet);
    addToLookup(bySnippetType, snippet.snippetType, snippet);
    addToLookup(byLanguage, snippet.language, snippet);
    for (const pattern of snippet.pattern) addToLookup(byPattern, pattern, snippet);
    for (const feature of snippet.featureMappings) addToLookup(byFeature, feature, snippet);
    for (const careerPath of snippet.careerPaths) addToLookup(byCareerPath, careerPath, snippet);
  }

  return {
    generatedAt: new Date().toISOString(),
    snippets,
    lookups: { byId, bySlug, byProblemSlug, byPattern, byFeature, byCareerPath, bySnippetType, byLanguage },
    tokenMap: buildTokenMap()
  };
}

function loadReferenceMap(fileName) {
  const entries = readJsonFile(path.join(referenceDir, fileName));
  const map = new Map();
  for (const entry of entries) {
    map.set(entry.id, entry);
    if (entry.slug) {
      map.set(entry.slug, entry);
    }
  }
  return map;
}

function readMetaFromYaml(problemDir) {
  const metaPath = path.join(problemDir, "meta.yaml");
  if (!fs.existsSync(metaPath)) return null;
  const metaSource = fs.readFileSync(metaPath, "utf8");
  const parsed = matter(`---\n${metaSource}\n---`);
  return parsed.data;
}

function resolveIds(meta, key) {
  const value = meta[key];
  if (!value) return [];
  if (Array.isArray(value)) return value.map(String);
  return [];
}

function estimateReadingTimeMinutes(content) {
  const words = content.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

function assertReferences(problem, maps) {
  const checks = [
    ["careerPathIds", maps.careerPaths],
    ["questionTypeIds", maps.questionTypes],
    ["featureIds", maps.features],
    ["patternIds", maps.patterns],
    ["companyIds", maps.companies],
    ["roleIds", maps.roles],
    ["industryIds", maps.industries],
    ["tagIds", maps.tags]
  ];

  for (const [key, map] of checks) {
    for (const id of problem[key]) {
      if (!map.has(id)) {
        throw new Error(`Problem ${problem.slug} has invalid ${key} entry: ${id}`);
      }
    }
  }
}

function normalizeMeta(meta, slug, title, prompt) {
  const questionTypeIds = resolveIds(meta, "questionTypeIds");
  const patternIds = resolveIds(meta, "patternIds");
  const featureIds = resolveIds(meta, "featureIds");
  const careerPathIds = resolveIds(meta, "careerPathIds");
  const industryIds = resolveIds(meta, "industryIds");
  const companyIds = resolveIds(meta, "companyIds");
  const roleIds = resolveIds(meta, "roleIds");
  const tagIds = resolveIds(meta, "tagIds");

  const inferredTags = inferTags(slug, prompt);
  return {
    id: meta.id || slug,
    slug: meta.slug || slug,
    title: meta.title || title,
    status: meta.status || "published",
    difficulty: meta.difficulty || "Easy",
    questionTypeIds: questionTypeIds.length > 0 ? questionTypeIds : ["lookup-frequency-matching"],
    patternIds: patternIds.length > 0 ? patternIds : ["hash-map"],
    featureIds: featureIds.length > 0 ? featureIds : ["search-suggestions"],
    careerPathIds: careerPathIds.length > 0 ? careerPathIds : ["frontend-engineer", "backend-engineer"],
    industryIds: industryIds.length > 0 ? industryIds : ["developer-tools"],
    companyIds: companyIds.length > 0 ? companyIds : ["google"],
    roleIds: roleIds.length > 0 ? roleIds : ["frontend-engineer", "backend-engineer"],
    tagIds: tagIds.length > 0 ? tagIds : inferredTags,
    summary: meta.summary || `Solution walkthrough for ${title.toLowerCase()} with code and practical use cases.`,
    whatItAsks: meta.whatItAsks || "Identify the core operation required by the prompt and produce the expected output efficiently.",
    recognitionClues: Array.isArray(meta.recognitionClues)
      ? meta.recognitionClues
      : ["You need fast lookup while iterating once.", "You are asked for indices, pairs, or direct matches."],
    whyPatternFits:
      meta.whyPatternFits || "This pattern minimizes repeated scanning and keeps lookup decisions close to the traversal.",
    dailyUsefulness:
      meta.dailyUsefulness || "Useful in data validation, filtering, and UI state transformations encountered in daily product work.",
    interviewUsefulness:
      meta.interviewUsefulness || "This pattern appears frequently in screening rounds due to its clarity and optimization tradeoffs.",
    realWorldRelevance:
      meta.realWorldRelevance || "Maps to production concerns like deduplication, lookup acceleration, and ranking support.",
    useCases: Array.isArray(meta.useCases)
      ? meta.useCases
      : [
          "Resolve complementary value lookups in near real-time APIs.",
          "Detect matching pairs in transactional or telemetry streams.",
          "Use hash-map pairing logic in data validation pipelines."
        ],
    demoIdeas: Array.isArray(meta.demoIdeas)
      ? meta.demoIdeas
      : ["Animate lookup table growth while scanning inputs.", "Visualize when candidate matches become valid outputs."],
    reusableHelpers: Array.isArray(meta.reusableHelpers)
      ? meta.reusableHelpers
      : ["buildFrequencyMap", "findComplementIndex"],
    relatedProblemSlugs: Array.isArray(meta.relatedProblemSlugs) ? meta.relatedProblemSlugs : []
  };
}

function buildProblem(slug, allSlugs, maps) {
  const problemDir = path.join(problemsRoot, slug);
  const prompt = readIfExists(path.join(problemDir, "prompt.md"));
  const content = readIfExists(path.join(problemDir, "content.mdx"));
  const meta = readMetaFromYaml(problemDir) ?? {};
  const title = prompt.split("\n")[0].replace(/^#\s*/, "") || titleFromSlug(slug);
  const normalizedRaw = normalizeMeta(meta, slug, title, prompt);
  const normalized = {
    ...normalizedRaw,
    questionTypeIds: normalizedRaw.questionTypeIds.filter((id) => maps.questionTypes.has(id)),
    patternIds: normalizedRaw.patternIds.filter((id) => maps.patterns.has(id)),
    featureIds: normalizedRaw.featureIds.filter((id) => maps.features.has(id)),
    careerPathIds: normalizedRaw.careerPathIds.filter((id) => maps.careerPaths.has(id)),
    industryIds: normalizedRaw.industryIds.filter((id) => maps.industries.has(id)),
    companyIds: normalizedRaw.companyIds.filter((id) => maps.companies.has(id)),
    roleIds: normalizedRaw.roleIds.filter((id) => maps.roles.has(id)),
    tagIds: normalizedRaw.tagIds.filter((id) => maps.tags.has(id))
  };
  if (normalized.questionTypeIds.length === 0) normalized.questionTypeIds = ["lookup-frequency-matching"];
  if (normalized.patternIds.length === 0) normalized.patternIds = ["hash-map"];
  if (normalized.featureIds.length === 0) normalized.featureIds = ["search-suggestions"];
  if (normalized.careerPathIds.length === 0) normalized.careerPathIds = ["frontend-engineer", "backend-engineer"];
  if (normalized.industryIds.length === 0) normalized.industryIds = ["developer-tools"];
  if (normalized.companyIds.length === 0) normalized.companyIds = ["google"];
  if (normalized.roleIds.length === 0) normalized.roleIds = ["frontend-engineer", "backend-engineer"];
  if (normalized.tagIds.length === 0) normalized.tagIds = inferTags(slug, prompt);
  const relatedProblemSlugs =
    normalized.relatedProblemSlugs.length > 0
      ? normalized.relatedProblemSlugs
      : allSlugs.filter((candidate) => candidate !== slug).slice(0, 4);

  const snippetByLanguage = {
    swift: pickLanguageCode(problemDir, languageFileCandidates.swift),
    cpp: pickLanguageCode(problemDir, languageFileCandidates.cpp),
    typescript: pickLanguageCode(problemDir, languageFileCandidates.typescript)
  };

  const availableLanguages = Object.entries(snippetByLanguage)
    .filter(([, code]) => Boolean(code))
    .map(([language]) => language);

  const searchText = [
    normalized.title,
    normalized.summary,
    normalized.whatItAsks,
    normalized.recognitionClues.join(" "),
    normalized.useCases.join(" "),
    normalized.demoIdeas.join(" "),
    normalized.reusableHelpers.join(" "),
    normalized.tagIds.join(" "),
    normalized.patternIds.join(" "),
    normalized.questionTypeIds.join(" ")
  ]
    .join(" ")
    .toLowerCase();

  const problem = {
    ...normalized,
    prompt,
    content,
    snippetByLanguage,
    availableLanguages,
    readingTimeMinutes: estimateReadingTimeMinutes(content || prompt),
    updatedAt: new Date().toISOString(),
    relatedProblemSlugs,
    searchText
  };

  assertReferences(problem, maps);
  return problem;
}

function buildTaxonomyIndex(kind, idsKey, problems, map) {
  return Array.from(map.values())
    .map((entry) => {
      const problemSlugs = problems
        .filter((problem) => problem[idsKey].includes(entry.id))
        .map((problem) => problem.slug);

      return {
        id: entry.id,
        slug: entry.slug || slugify(entry.label),
        label: entry.label,
        description: entry.description,
        problemSlugs
      };
    })
    .filter((entry) => entry.problemSlugs.length > 0)
    .sort((a, b) => b.problemSlugs.length - a.problemSlugs.length || a.label.localeCompare(b.label));
}

function mapLabels(ids, map) {
  return ids.map((id) => map.get(id)?.label || id);
}

function buildSearchDocs(problems, maps) {
  return problems.map((problem) => {
    const questionTypes = mapLabels(problem.questionTypeIds, maps.questionTypes);
    const patterns = mapLabels(problem.patternIds, maps.patterns);
    const features = mapLabels(problem.featureIds, maps.features);
    const careerPaths = mapLabels(problem.careerPathIds, maps.careerPaths);
    const companies = mapLabels(problem.companyIds, maps.companies);
    const roles = mapLabels(problem.roleIds, maps.roles);
    const industries = mapLabels(problem.industryIds, maps.industries);
    const tags = mapLabels(problem.tagIds, maps.tags);

    const searchableText = [
      problem.title,
      problem.summary,
      questionTypes.join(" "),
      patterns.join(" "),
      features.join(" "),
      careerPaths.join(" "),
      companies.join(" "),
      roles.join(" "),
      industries.join(" "),
      tags.join(" "),
      problem.useCases.join(" "),
      problem.recognitionClues.join(" ")
    ]
      .join(" ")
      .toLowerCase();

    return {
      slug: problem.slug,
      title: problem.title,
      summary: problem.summary,
      questionTypes,
      patterns,
      features,
      careerPaths,
      companies,
      roles,
      industries,
      tags,
      useCases: problem.useCases,
      recognitionClues: problem.recognitionClues,
      searchableText
    };
  });
}

function main() {
  const slugs = fs
    .readdirSync(problemsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  const maps = {
    careerPaths: loadReferenceMap("career-paths.json"),
    questionTypes: loadReferenceMap("question-types.json"),
    features: loadReferenceMap("features.json"),
    patterns: loadReferenceMap("patterns.json"),
    companies: loadReferenceMap("companies.json"),
    roles: loadReferenceMap("roles.json"),
    industries: loadReferenceMap("industries.json"),
    tags: loadReferenceMap("tags.json")
  };

  const problems = slugs.map((slug) => buildProblem(slug, slugs, maps));
  const snippets = problems.flatMap((problem) => {
    const problemDir = path.join(problemsRoot, problem.slug);
    return extractSnippetsForProblem(problem, problemDir);
  });

  const payload = {
    generatedAt: new Date().toISOString(),
    problems
  };

  const indexes = {
    byCareerPath: buildTaxonomyIndex("careerPath", "careerPathIds", problems, maps.careerPaths),
    byQuestionType: buildTaxonomyIndex("questionType", "questionTypeIds", problems, maps.questionTypes),
    byFeature: buildTaxonomyIndex("feature", "featureIds", problems, maps.features),
    byPattern: buildTaxonomyIndex("pattern", "patternIds", problems, maps.patterns),
    byCompany: buildTaxonomyIndex("company", "companyIds", problems, maps.companies),
    byRole: buildTaxonomyIndex("role", "roleIds", problems, maps.roles),
    byIndustry: buildTaxonomyIndex("industry", "industryIds", problems, maps.industries),
    byTag: buildTaxonomyIndex("tag", "tagIds", problems, maps.tags)
  };

  const searchIndex = buildSearchDocs(problems, maps);
  const snippetIndex = buildSnippetIndex(snippets);

  fs.mkdirSync(generatedDir, { recursive: true });
  fs.mkdirSync(indexesDir, { recursive: true });
  fs.writeFileSync(outFile, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(path.join(indexesDir, "all.json"), `${JSON.stringify(indexes, null, 2)}\n`, "utf8");
  fs.writeFileSync(searchIndexFile, `${JSON.stringify(searchIndex, null, 2)}\n`, "utf8");
  fs.writeFileSync(snippetsFile, `${JSON.stringify(snippets, null, 2)}\n`, "utf8");
  fs.writeFileSync(snippetIndexFile, `${JSON.stringify(snippetIndex, null, 2)}\n`, "utf8");
}

main();
