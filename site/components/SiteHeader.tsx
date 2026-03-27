import type { JSX } from "react";
import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { SiteHeaderRight } from "@/components/SiteHeaderRight";
import { loadIndexes } from "@/lib/content";
import { siteName, withBasePath } from "@/lib/seo-config";

export function SiteHeader(): JSX.Element {
  const indexes = loadIndexes();
  const firstPattern = indexes.byPattern[0];
  const firstFeature = indexes.byFeature[0];
  const patternsHref = firstPattern ? withBasePath(`/pattern/${firstPattern.slug}`) : withBasePath("/search");
  const featureHref = firstFeature ? withBasePath(`/feature/${firstFeature.slug}`) : withBasePath("/search");
  const searchPath = withBasePath("/search");

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href={withBasePath("/")} className="site-brand-cluster">
          <BrandMark />
          <span className="site-brand-wordmark">{siteName}</span>
        </Link>
        <nav className="site-header-nav-center" aria-label="Primary">
          <Link href={withBasePath("/problems")}>Algorithms</Link>
          <Link href={patternsHref}>Patterns</Link>
          <Link href={featureHref}>By Feature</Link>
          <Link href={withBasePath("/search?q=complexity")}>Complexity</Link>
        </nav>
        <SiteHeaderRight searchPath={searchPath} />
      </div>
    </header>
  );
}
