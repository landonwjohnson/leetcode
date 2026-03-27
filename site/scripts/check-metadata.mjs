import fs from "node:fs";
import path from "node:path";

const file = path.join(process.cwd(), "generated", "problems.json");
const payload = JSON.parse(fs.readFileSync(file, "utf8"));

const requiredKeys = ["slug", "title", "summary", "difficulty", "tagIds", "prompt", "useCases"];

const seenSlugs = new Set();
for (const problem of payload.problems) {
  if (seenSlugs.has(problem.slug)) {
    throw new Error(`Duplicate problem slug '${problem.slug}' in generated output.`);
  }
  seenSlugs.add(problem.slug);

  for (const key of requiredKeys) {
    if (!(key in problem)) {
      throw new Error(`Missing required metadata '${key}' for slug '${problem.slug}'.`);
    }
  }

  if (typeof problem.slug !== "string" || problem.slug.length === 0) {
    throw new Error(`Invalid slug for problem '${problem.title}'.`);
  }
  if (typeof problem.title !== "string" || problem.title.length < 3) {
    throw new Error(`Invalid title for slug '${problem.slug}'.`);
  }
  if (typeof problem.summary !== "string" || problem.summary.length < 20) {
    throw new Error(`Summary too short for slug '${problem.slug}'.`);
  }
  if (!Array.isArray(problem.tagIds) || problem.tagIds.length === 0) {
    throw new Error(`At least one tag id is required for slug '${problem.slug}'.`);
  }
  if (!Array.isArray(problem.useCases) || problem.useCases.length === 0) {
    throw new Error(`At least one use case is required for slug '${problem.slug}'.`);
  }
  if (typeof problem.prompt !== "string" || problem.prompt.trim().length === 0) {
    throw new Error(
      `Problem '${problem.slug}' must have a non-empty prompt (add problems/<slug>/prompt.md and regenerate).`
    );
  }
}

console.log(`Metadata check passed for ${payload.problems.length} problem pages.`);
