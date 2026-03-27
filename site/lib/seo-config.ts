const defaultOrigin = "https://landonjohnson.github.io";
const defaultRepoName = "LeetCodeSwift";

export const siteName = "Algorithm Snippets";
export const siteDescription =
  "Interactive algorithm snippets with visual demos, real-world use cases, and multi-language solutions.";

export const siteOrigin = (process.env.NEXT_PUBLIC_SITE_ORIGIN ?? defaultOrigin).replace(/\/+$/, "");
export const repoName = process.env.NEXT_PUBLIC_REPO_NAME ?? defaultRepoName;
export const repoBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? `/${repoName}`;
export const normalizedBasePath = repoBasePath === "/" ? "" : repoBasePath.replace(/\/+$/, "");
export const siteUrl = `${siteOrigin}${normalizedBasePath}`;

export function withBasePath(pathname: string): string {
  const cleanPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return normalizedBasePath ? `${normalizedBasePath}${cleanPath}` : cleanPath;
}

export function absoluteUrl(pathname: string): string {
  return `${siteOrigin}${withBasePath(pathname)}`;
}
