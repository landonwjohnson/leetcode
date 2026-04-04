const defaultOrigin =
  process.env.VERCEL && process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://landonjohnson.github.io";
const defaultRepoName = "LeetCodeSwift";

export const siteName = "AlgoRef";
export const siteDescription =
  "Interactive algorithm reference: patterns, real-world features, and multi-language solutions.";

export const siteOrigin = (process.env.NEXT_PUBLIC_SITE_ORIGIN ?? defaultOrigin).replace(/\/+$/, "");
export const repoName = process.env.NEXT_PUBLIC_REPO_NAME ?? defaultRepoName;
export const githubRepoOwner = process.env.NEXT_PUBLIC_GITHUB_OWNER ?? "landonjohnson";
export const repoGithubUrl = `https://github.com/${githubRepoOwner}/${repoName}`;
const isVercel = Boolean(process.env.VERCEL);
export const repoBasePath =
  process.env.NEXT_PUBLIC_BASE_PATH ?? (isVercel ? "/" : `/${repoName}`);
const shouldUseBasePath = process.env.NODE_ENV === "production";
export const normalizedBasePath = shouldUseBasePath
  ? repoBasePath === "/"
    ? ""
    : repoBasePath.replace(/\/+$/, "")
  : "";
export const siteUrl = `${siteOrigin}${normalizedBasePath}`;

export function withBasePath(pathname: string): string {
  const cleanPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return normalizedBasePath ? `${normalizedBasePath}${cleanPath}` : cleanPath;
}

export function absoluteUrl(pathname: string): string {
  return `${siteOrigin}${withBasePath(pathname)}`;
}
