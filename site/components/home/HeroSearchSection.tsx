import type { JSX } from "react";
import Link from "next/link";
import { HeroSearchForm } from "@/components/home/HeroSearchForm";
import type { HomepageViewModel } from "@/types/content";

type HeroSearchSectionProps = {
  hero: HomepageViewModel["hero"];
};

export function HeroSearchSection({ hero }: HeroSearchSectionProps): JSX.Element {
  return (
    <section className="hero hero-search-shell">
      <div className="hero-stat-badge">
        {hero.statBadge.algorithmsCount}+ algorithms - {hero.statBadge.patternsCount}+ patterns - {hero.statBadge.focusLabel}
      </div>
      <h1>{hero.title}</h1>
      <p>{hero.subtitle}</p>
      <div className="hero-search-row">
        <HeroSearchForm />
      </div>
      <div className="quick-chip-row">
        {hero.quickTags.map((tag) => (
          <Link key={tag.id} href={tag.href} className="quick-chip">
            {tag.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
