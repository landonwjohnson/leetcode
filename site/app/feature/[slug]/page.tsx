import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";
import { CategoryPageView } from "@/components/CategoryPageView";
import { getProblemsBySlugs, getFeatureStaticParams, resolveFeaturePageEntry } from "@/lib/content";
import { withBasePath } from "@/lib/seo-config";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getFeatureStaticParams();
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const resolved = await params;
  const entry = resolveFeaturePageEntry(resolved.slug);
  if (!entry) return {};
  return {
    title: entry.label,
    description: entry.description,
    alternates: { canonical: withBasePath(`/feature/${entry.slug}`) }
  };
}

export default async function FeaturePage({ params }: { params: Promise<Params> }): Promise<ReactElement> {
  const resolved = await params;
  const entry = resolveFeaturePageEntry(resolved.slug);
  if (!entry) notFound();
  const problems = getProblemsBySlugs(entry.problemSlugs);
  return <CategoryPageView title={entry.label} description={entry.description} problems={problems} />;
}
