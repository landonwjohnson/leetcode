import fs from "node:fs";
import path from "node:path";

const file = path.join(process.cwd(), "generated", "problems.json");
const payload = JSON.parse(fs.readFileSync(file, "utf8"));
const slugs = new Set(payload.problems.map((problem) => problem.slug));
const origin = (process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "https://landonjohnson.github.io").replace(/\/+$/, "");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/LeetCodeSwift";
const normalizedBasePath = basePath === "/" ? "" : basePath.replace(/\/+$/, "");

for (const problem of payload.problems) {
  for (const related of problem.relatedSlugs) {
    if (!slugs.has(related)) {
      throw new Error(`Related slug '${related}' on '${problem.slug}' does not exist.`);
    }
  }
}

const uniqueTags = new Set();
const uniqueLanguages = new Set();
for (const problem of payload.problems) {
  problem.tags.forEach((tag) => uniqueTags.add(tag));
  Object.entries(problem.languages).forEach(([language, code]) => {
    if (typeof code === "string" && code.length > 0) {
      uniqueLanguages.add(language);
    }
  });
}

if (!origin.startsWith("https://")) {
  throw new Error("NEXT_PUBLIC_SITE_ORIGIN must be https for production SEO.");
}
if (!normalizedBasePath.startsWith("/") && normalizedBasePath.length > 0) {
  throw new Error("NEXT_PUBLIC_BASE_PATH must start with '/'.");
}
if (uniqueTags.size === 0 || uniqueLanguages.size === 0) {
  throw new Error("Expected at least one tag and one language index route.");
}

console.log(
  `Internal links check passed for ${payload.problems.length} problem pages, ${uniqueTags.size} tags, ${uniqueLanguages.size} languages.`
);
