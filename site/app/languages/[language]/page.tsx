import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import type { ReactElement } from "react";
import { getAllProblems } from "@/lib/content";
import { absoluteUrl, withBasePath } from "@/lib/seo-config";

type Params = { language: string };

export function generateStaticParams(): Params[] {
  const languages = new Set<string>();
  for (const problem of getAllProblems()) {
    for (const [language, code] of Object.entries(problem.languages)) {
      if (code) {
        languages.add(language);
      }
    }
  }

  return Array.from(languages).map((language: string): Params => ({ language }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: `Language: ${resolvedParams.language}`,
    description: `Algorithm solutions available in ${resolvedParams.language}.`,
    alternates: {
      canonical: withBasePath(`/languages/${resolvedParams.language}`)
    }
  };
}

export default async function LanguagePage({ params }: { params: Promise<Params> }): Promise<ReactElement> {
  const resolvedParams = await params;
  const list = getAllProblems().filter(
    (problem): boolean => typeof problem.languages[resolvedParams.language as keyof typeof problem.languages] === "string"
  );
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Language: ${resolvedParams.language}`,
    url: absoluteUrl(`/languages/${resolvedParams.language}`),
    inLanguage: resolvedParams.language,
    mainEntity: list.map((problem) => ({
      "@type": "TechArticle",
      headline: problem.title,
      url: absoluteUrl(`/problems/${problem.slug}`)
    }))
  };

  return (
    <>
      <Script id={`language-schema-${resolvedParams.language}`} type="application/ld+json">
        {JSON.stringify(collectionSchema)}
      </Script>
      <h1>Language: {resolvedParams.language}</h1>
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
