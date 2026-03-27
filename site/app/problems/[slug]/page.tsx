import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";
import { DemoIdeasPanel } from "@/components/DemoIdeasPanel";
import { InteractiveConcatenationDemo } from "@/components/InteractiveConcatenationDemo";
import { MetadataSidebar } from "@/components/MetadataSidebar";
import { ProblemHero } from "@/components/ProblemHero";
import { ProblemPromptBody } from "@/components/ProblemPromptBody";
import { RecognitionCluesPanel } from "@/components/RecognitionCluesPanel";
import { RelatedProblems } from "@/components/RelatedProblems";
import { SnippetTabs } from "@/components/SnippetTabs";
import { UseCaseExample } from "@/components/UseCaseExample";
import { getAllProblems, getProblemBySlug, getRelatedProblems, resolveLabels } from "@/lib/content";
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
  const description = `${problem.summary} Solve ${problem.title} with code snippets and practical engineering context.`;

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
  const questionTypes = resolveLabels(problem.questionTypeIds, "questionType");
  const patterns = resolveLabels(problem.patternIds, "pattern");
  const features = resolveLabels(problem.featureIds, "feature");
  const careerPaths = resolveLabels(problem.careerPathIds, "careerPath");
  const companies = resolveLabels(problem.companyIds, "company");
  const roles = resolveLabels(problem.roleIds, "role");
  const industries = resolveLabels(problem.industryIds, "industry");

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: problem.title,
    description: problem.summary,
    keywords: [...questionTypes, ...patterns].join(", "),
    about: [...questionTypes, ...patterns],
    inLanguage: problem.availableLanguages,
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
      <ProblemHero problem={problem} questionTypes={questionTypes} patterns={patterns} />

      <section className="section-card problem-asking-section">
        <h2>What This Problem Is Asking</h2>
        <p className="problem-asking-label">In one sentence</p>
        <p className="problem-asking-summary">{problem.whatItAsks}</p>
        <p className="problem-asking-label">Full problem statement</p>
        <ProblemPromptBody
          prompt={problem.prompt}
          fallback="Prompt will appear when prompt.md exists for this problem."
        />
      </section>

      <RecognitionCluesPanel clues={problem.recognitionClues} />
      <section className="section-card">
        <h2>Why This Pattern Fits</h2>
        <p>{problem.whyPatternFits}</p>
        <p>
          <strong>Daily usefulness:</strong> {problem.dailyUsefulness}
        </p>
        <p>
          <strong>Interview usefulness:</strong> {problem.interviewUsefulness}
        </p>
        <p>
          <strong>Real-world relevance:</strong> {problem.realWorldRelevance}
        </p>
      </section>
      <SnippetTabs problem={problem} />
      {problem.slug === "concatenation-of-array" ? <InteractiveConcatenationDemo /> : null}
      <UseCaseExample points={problem.useCases} />
      <DemoIdeasPanel demoIdeas={problem.demoIdeas} />
      <MetadataSidebar
        features={features}
        careerPaths={careerPaths}
        companies={companies}
        roles={roles}
        industries={industries}
        reusableHelpers={problem.reusableHelpers}
      />
      <RelatedProblems related={related} />
    </>
  );
}
