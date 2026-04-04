import path from "node:path";
import { fileURLToPath } from "node:url";
import nextra from "nextra";

/** Lock this package as the tracing/root when parent dirs have other lockfiles (avoids wrong module resolution). */
const packageDir = path.dirname(fileURLToPath(import.meta.url));

const repoName = process.env.NEXT_PUBLIC_REPO_NAME ?? "LeetCodeSwift";
/** GitHub Pages project sites use /<repo>; Vercel serves from /. */
const isVercel = Boolean(process.env.VERCEL);
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ?? (isVercel ? "/" : `/${repoName}`);
const normalizedBasePath = basePath === "/" ? "" : basePath;
const shouldUseBasePath = process.env.NODE_ENV === "production";
const effectiveBasePath = shouldUseBasePath ? normalizedBasePath : "";

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
  search: {
    codeblocks: false
  }
});

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  basePath: effectiveBasePath,
  assetPrefix: effectiveBasePath || undefined,
  output: "export",
  trailingSlash: true,
  outputFileTracingRoot: packageDir,
  images: {
    unoptimized: true
  }
};

export default withNextra(nextConfig);
