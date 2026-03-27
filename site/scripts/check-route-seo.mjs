import fs from "node:fs";
import path from "node:path";

const files = [
  "app/layout.tsx",
  "app/page.tsx",
  "app/problems/page.tsx",
  "app/problems/[slug]/page.tsx",
  "app/tags/[tag]/page.tsx",
  "app/languages/[language]/page.tsx",
  "app/learning-paths/page.tsx",
  "app/sitemap.ts",
  "app/robots.ts",
  "app/llms.txt/route.ts"
];

for (const relativePath of files) {
  const filePath = path.join(process.cwd(), relativePath);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing required SEO route/config file: ${relativePath}`);
  }
}

const layout = fs.readFileSync(path.join(process.cwd(), "app/layout.tsx"), "utf8");
if (!layout.includes("metadataBase") || !layout.includes("withBasePath")) {
  throw new Error("Layout metadata must include metadataBase and canonical withBasePath usage.");
}

const sitemap = fs.readFileSync(path.join(process.cwd(), "app/sitemap.ts"), "utf8");
if (!sitemap.includes("getAllTags") || !sitemap.includes("getAllLanguages")) {
  throw new Error("Sitemap must include tag and language routes.");
}

const problemPage = fs.readFileSync(path.join(process.cwd(), "app/problems/[slug]/page.tsx"), "utf8");
if (!problemPage.includes("BreadcrumbList") || !problemPage.includes("TechArticle")) {
  throw new Error("Problem page must include TechArticle and BreadcrumbList schemas.");
}

console.log("Route SEO checks passed.");
