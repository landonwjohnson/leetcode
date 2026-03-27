import type { JSX } from "react";
import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { loadIndexes } from "@/lib/content";
import { repoGithubUrl, siteName, withBasePath } from "@/lib/seo-config";

export function SiteFooter(): JSX.Element {
  const indexes = loadIndexes();
  const firstPattern = indexes.byPattern[0];
  const patternsHref = firstPattern ? withBasePath(`/pattern/${firstPattern.slug}`) : withBasePath("/search");

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <Link href={withBasePath("/")} className="site-footer-brand">
          <BrandMark />
          <span>{siteName}</span>
        </Link>
        <nav className="site-footer-nav" aria-label="Footer">
          <Link href={withBasePath("/problems")}>Algorithms</Link>
          <Link href={patternsHref}>Patterns</Link>
          <a href={repoGithubUrl} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={`${repoGithubUrl}/pulls`} target="_blank" rel="noreferrer">
            Contribute
          </a>
        </nav>
      </div>
    </footer>
  );
}
