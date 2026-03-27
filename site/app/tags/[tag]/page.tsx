import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import type { ReactElement } from "react";
import { getAllProblems } from "@/lib/content";
import { absoluteUrl, withBasePath } from "@/lib/seo-config";

type Params = { tag: string };

export function generateStaticParams(): Params[] {
  const tags = new Set<string>();
  for (const problem of getAllProblems()) {
    for (const tag of problem.tags) {
      tags.add(tag);
    }
  }

  return Array.from(tags).map((tag: string): Params => ({ tag }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: `Tag: ${resolvedParams.tag}`,
    description: `Algorithm problems related to ${resolvedParams.tag}, with solutions and visual walkthroughs.`,
    alternates: {
      canonical: withBasePath(`/tags/${resolvedParams.tag}`)
    }
  };
}

export default async function TagPage({ params }: { params: Promise<Params> }): Promise<ReactElement> {
  const resolvedParams = await params;
  const list = getAllProblems().filter((problem): boolean => problem.tags.includes(resolvedParams.tag));
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Tag: ${resolvedParams.tag}`,
    url: absoluteUrl(`/tags/${resolvedParams.tag}`),
    mainEntity: list.map((problem) => ({
      "@type": "TechArticle",
      headline: problem.title,
      url: absoluteUrl(`/problems/${problem.slug}`)
    }))
  };

  return (
    <>
      <Script id={`tag-schema-${resolvedParams.tag}`} type="application/ld+json">
        {JSON.stringify(collectionSchema)}
      </Script>
      <h1>Tag: {resolvedParams.tag}</h1>
      <ul>
        {list.map((problem): ReactElement => (
          <li key={problem.slug}>
            <Link href={`/problems/${problem.slug}`}>{problem.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
