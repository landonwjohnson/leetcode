import nextra from "nextra";

const repoName = process.env.NEXT_PUBLIC_REPO_NAME ?? "LeetCodeSwift";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? `/${repoName}`;
const normalizedBasePath = basePath === "/" ? "" : basePath;

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
  basePath: normalizedBasePath,
  assetPrefix: normalizedBasePath || undefined,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default withNextra(nextConfig);
