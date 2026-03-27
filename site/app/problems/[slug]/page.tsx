import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";
import { RelatedProblems } from "@/components/RelatedProblems";
import { SolutionTabs } from "@/components/SolutionTabs";
import { UseCaseExample } from "@/components/UseCaseExample";
import { VisualAlgorithmDemo } from "@/components/VisualAlgorithmDemo";
import { getAllProblems, getProblemBySlug, getRelatedProblems } from "@/lib/content";
import { absoluteUrl, withBasePath } from "@/lib/seo-config";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllProblems().map((problem): Params => ({ slug: problem.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const resolvedParams = await params;
  const problem = getProblemBySlug(resolvedParams.slug);
  if (!problem) {
    return {};
  }

  const canonicalPath = `/problems/${problem.slug}`;
  const description = `${problem.summary} Solve ${problem.title} with ${problem.languages.swift ? "Swift" : "multiple languages"} and practical usage examples.`;

  return {
    title: problem.title,
    description,
    alternates: {
      canonical: withBasePath(canonicalPath)
    },
    openGraph: {
      title: problem.title,
      description,
      url: absoluteUrl(canonicalPath),
      type: "article"
    },
    twitter: {
      card: "summary_large_image",
      title: problem.title,
      description
    }
  };
}

export default async function ProblemDetailPage({ params }: { params: Promise<Params> }): Promise<ReactElement> {
  const resolvedParams = await params;
  const problem = getProblemBySlug(resolvedParams.slug);
  if (!problem) {
    notFound();
  }

  const related = getRelatedProblems(problem.slug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: problem.title,
    description: problem.summary,
    keywords: problem.tags.join(", "),
    about: problem.tags,
    inLanguage: Object.entries(problem.languages)
      .filter(([, code]): boolean => typeof code === "string" && code.length > 0)
      .map(([language]) => language),
    url: absoluteUrl(`/problems/${problem.slug}`)
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/")
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Problems",
        item: absoluteUrl("/problems")
      },
      {
        "@type": "ListItem",
        position: 3,
        name: problem.title,
        item: absoluteUrl(`/problems/${problem.slug}`)
      }
    ]
  };

  return (
    <>
      <Script id={`problem-schema-${problem.slug}`} type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </Script>
      <Script id={`problem-breadcrumb-${problem.slug}`} type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </Script>
      <section className="hero">
        <h1>{problem.title}</h1>
        <p>{problem.summary}</p>
        <div className="meta-row">
          <span className="pill">{problem.difficulty}</span>
          <span className="pill">Time {problem.complexity.time}</span>
          <span className="pill">Space {problem.complexity.space}</span>
          {problem.tags.map((tag) => (
            <span key={tag} className="pill">
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="section-card">
        <h2>Problem Prompt</h2>
        <pre className="code-block">
          <code>{problem.prompt || "Prompt will appear when prompt.md exists for this problem."}</code>
        </pre>
      </section>

      <SolutionTabs languages={problem.languages} />
      <UseCaseExample points={problem.useCases} />
      <VisualAlgorithmDemo slug={problem.slug} />
      <RelatedProblems related={related} />
    </>
  );
}
