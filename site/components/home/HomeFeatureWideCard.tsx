import Link from "next/link";
import type { JSX } from "react";
import { HomeCardIconVisual, featureKeywordsFromText } from "@/components/home/homeCardIcons";
import type { HomepageCategoryCard } from "@/types/content";

type HomeFeatureWideCardProps = {
  card: HomepageCategoryCard;
};

export function HomeFeatureWideCard({ card }: HomeFeatureWideCardProps): JSX.Element {
  const keywords = featureKeywordsFromText(card.description, card.label);
  return (
    <Link href={card.href} className="home-feature-wide-card">
      <div className="home-feature-wide-top">
        <span className="home-feature-wide-icon">
          <HomeCardIconVisual iconName={card.icon ?? "Code2"} accent={card.accent} size={24} />
        </span>
        <span className="home-feature-wide-count">
          {card.count} {card.count === 1 ? "ALGO" : "ALGOS"}
        </span>
      </div>
      <strong className="home-feature-wide-title">{card.label}</strong>
      <p className="home-feature-wide-desc">{card.description}</p>
      <div className="home-feature-wide-kw">
        {keywords.map((kw, i) => (
          <span key={`${card.id}-kw-${i}`} className="home-feature-wide-kw-item">
            {kw}
          </span>
        ))}
      </div>
    </Link>
  );
}
