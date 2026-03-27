import fs from "node:fs";
import path from "node:path";

const file = path.join(process.cwd(), "generated", "problems.json");
const payload = JSON.parse(fs.readFileSync(file, "utf8"));

const requiredKeys = ["slug", "title", "summary", "difficulty", "tags", "prompt", "complexity", "useCases"];
const requiredComplexityKeys = ["time", "space"];

for (const problem of payload.problems) {
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
  if (!Array.isArray(problem.tags) || problem.tags.length === 0) {
    throw new Error(`At least one tag is required for slug '${problem.slug}'.`);
  }
  if (!Array.isArray(problem.useCases) || problem.useCases.length === 0) {
    throw new Error(`At least one use case is required for slug '${problem.slug}'.`);
  }

  for (const key of requiredComplexityKeys) {
    if (typeof problem.complexity[key] !== "string" || problem.complexity[key].length === 0) {
      throw new Error(`Complexity '${key}' missing for slug '${problem.slug}'.`);
    }
  }
}

console.log(`Metadata check passed for ${payload.problems.length} problem pages.`);
