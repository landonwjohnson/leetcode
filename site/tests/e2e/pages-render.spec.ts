import { expect, test } from "@playwright/test";

test.describe("Page render smoke tests", () => {
  test("home page renders key heading and featured section", async ({ page }): Promise<void> => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1, name: /LeetCode Solutions \+ Real-World Use Cases/i })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: /Featured Problems/i })).toBeVisible();
  });

  test("concatenation problem page renders core sections", async ({ page }): Promise<void> => {
    await page.goto("/problems/concatenation-of-array");

    await expect(page.getByRole("heading", { level: 1, name: /Concatenation of Array/i })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: /Problem Prompt/i })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: /Visual Demo/i })).toBeVisible();
  });

  test("problems index page renders list heading", async ({ page }): Promise<void> => {
    await page.goto("/problems");

    await expect(page.getByRole("heading", { level: 1, name: /All Problems/i })).toBeVisible();
  });
});
