import Link from "next/link";
import type { JSX } from "react";
import { HomeCardIconVisual } from "@/components/home/homeCardIcons";
import type { HomepageCategoryCard } from "@/types/content";

type HomeCategoryMiniCardProps = {
  card: HomepageCategoryCard;
};

export function HomeCategoryMiniCard({ card }: HomeCategoryMiniCardProps): JSX.Element {
  return (
    <Link href={card.href} className="home-mini-card" title={card.description}>
      <div className="home-mini-card-icon-slot" aria-hidden>
        <HomeCardIconVisual iconName={card.icon ?? "Code2"} accent={card.accent} />
      </div>
      <strong className="home-mini-card-title">{card.label}</strong>
      <span className="home-mini-count">
        {card.count} {card.count === 1 ? "algo" : "algos"}
      </span>
    </Link>
  );
}
