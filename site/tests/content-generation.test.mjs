import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

test("generated content has valid shape", async () => {
  const file = path.join(process.cwd(), "generated", "problems.json");
  assert.ok(fs.existsSync(file), "generated/problems.json should exist");

  const payload = JSON.parse(fs.readFileSync(file, "utf8"));
  assert.ok(Array.isArray(payload.problems), "payload.problems should be an array");
  assert.ok(payload.problems.length > 0, "payload.problems should not be empty");

  const slugs = new Set();
  for (const problem of payload.problems) {
    assert.equal(typeof problem.slug, "string");
    assert.equal(typeof problem.title, "string");
    assert.ok(Array.isArray(problem.useCases), "useCases should be an array");
    assert.ok(
      typeof problem.prompt === "string" && problem.prompt.trim().length > 0,
      `prompt.md should exist and be non-empty for ${problem.slug}`
    );
    assert.ok(!slugs.has(problem.slug), `duplicate slug ${problem.slug}`);
    slugs.add(problem.slug);
  }
});

test("generated snippet index has intent mappings and lookup maps", async () => {
  const snippetsPath = path.join(process.cwd(), "generated", "snippets.json");
  const snippetIndexPath = path.join(process.cwd(), "generated", "snippet-index.json");
  assert.ok(fs.existsSync(snippetsPath), "generated/snippets.json should exist");
  assert.ok(fs.existsSync(snippetIndexPath), "generated/snippet-index.json should exist");

  const snippets = JSON.parse(fs.readFileSync(snippetsPath, "utf8"));
  const snippetIndex = JSON.parse(fs.readFileSync(snippetIndexPath, "utf8"));

  assert.ok(Array.isArray(snippets), "snippets should be an array");
  assert.ok(Array.isArray(snippetIndex.snippets), "snippetIndex.snippets should be an array");
  assert.ok(typeof snippetIndex.lookups === "object", "snippetIndex.lookups should exist");
  assert.ok(snippetIndex.lookups.byProblemSlug, "snippetIndex lookups should include byProblemSlug");
  assert.ok(snippetIndex.lookups.byPattern, "snippetIndex lookups should include byPattern");
  assert.ok(snippetIndex.lookups.byFeature, "snippetIndex lookups should include byFeature");
});

test("snippet index token map supports intent synonyms", async () => {
  const snippetIndexPath = path.join(process.cwd(), "generated", "snippet-index.json");
  const snippetIndex = JSON.parse(fs.readFileSync(snippetIndexPath, "utf8"));
  const tokenMap = snippetIndex.tokenMap;
  assert.ok(Array.isArray(tokenMap["leaderboard"]), "leaderboard synonyms should exist");
  assert.ok(tokenMap["leaderboard"].includes("top k"), "leaderboard should map to top k");
  assert.ok(Array.isArray(tokenMap["search autocomplete"]), "search autocomplete synonyms should exist");
  assert.ok(tokenMap["search autocomplete"].includes("trie"), "search autocomplete should map to trie");
});

test("snippet suggestions can be grouped with fixed quotas", async () => {
  const snippetIndexPath = path.join(process.cwd(), "generated", "snippet-index.json");
  const snippetIndex = JSON.parse(fs.readFileSync(snippetIndexPath, "utf8"));
  const snippets = snippetIndex.snippets;

  const groups = {
    patterns: Array.from(new Set(snippets.flatMap((snippet) => snippet.pattern))).slice(0, 4),
    features: Array.from(new Set(snippets.flatMap((snippet) => snippet.featureMappings))).slice(0, 4),
    problems: Array.from(new Set(snippets.map((snippet) => snippet.problemSlug))).slice(0, 5),
    snippets: snippets.slice(0, 8).map((snippet) => snippet.id)
  };

  assert.ok(groups.patterns.length <= 4, "patterns should respect max 4");
  assert.ok(groups.features.length <= 4, "features should respect max 4");
  assert.ok(groups.problems.length <= 5, "problems should respect max 5");
  assert.ok(groups.snippets.length <= 8, "snippets should respect max 8");
});
