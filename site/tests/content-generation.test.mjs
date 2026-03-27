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

  for (const problem of payload.problems) {
    assert.equal(typeof problem.slug, "string");
    assert.equal(typeof problem.title, "string");
    assert.ok(Array.isArray(problem.useCases), "useCases should be an array");
  }
});
