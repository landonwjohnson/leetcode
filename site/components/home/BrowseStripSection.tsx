import Link from "next/link";
import type { JSX } from "react";
import { HomeCategoryMiniCard } from "@/components/home/HomeCategoryMiniCard";
import { HomeFeatureWideCard } from "@/components/home/HomeFeatureWideCard";
import type { HomepageCategorySection } from "@/types/content";

type BrowseStripSectionProps = {
  section: HomepageCategorySection;
};

export function BrowseStripSection({ section }: BrowseStripSectionProps): JSX.Element {
  return (
    <section className="section-card browse-strip">
      <div className="browse-strip-head">
        <div>
          <h2>{section.title}</h2>
          <p>{section.subtitle}</p>
        </div>
        <Link href={section.viewAllHref} className="browse-view-all">
          View all
        </Link>
      </div>
      <div className={section.id === "feature" ? "mini-card-grid mini-card-grid--feature" : "mini-card-grid"}>
        {section.cards.map((card) =>
          section.id === "feature" ? (
            <HomeFeatureWideCard key={card.id} card={card} />
          ) : (
            <HomeCategoryMiniCard key={card.id} card={card} />
          )
        )}
      </div>
    </section>
  );
}
