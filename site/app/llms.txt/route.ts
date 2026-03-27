import { getAllProblems } from "@/lib/content";
import { absoluteUrl, siteDescription, siteName } from "@/lib/seo-config";

export const dynamic = "force-static";

export function GET(): Response {
  const problems = getAllProblems();
  const lines: string[] = [
    `# ${siteName}`,
    "",
    siteDescription,
    "",
    "## Key Routes",
    `- Home: ${absoluteUrl("/")}`,
    `- Problems: ${absoluteUrl("/problems")}`,
    `- Learning Paths: ${absoluteUrl("/learning-paths")}`,
    "",
    "## Problem Pages"
  ];

  for (const problem of problems) {
    lines.push(`- ${problem.title}: ${absoluteUrl(`/problems/${problem.slug}`)}`);
  }

  return new Response(`${lines.join("\n")}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}
