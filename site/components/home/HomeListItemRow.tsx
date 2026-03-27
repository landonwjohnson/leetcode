import Link from "next/link";
import type { JSX } from "react";

export type HomeListRowVariant = "default" | "useful" | "pattern" | "recent";

type HomeListItemRowProps = {
  href: string;
  title: string;
  subtitle: string;
  trailing?: string;
  badges?: string[];
  variant?: HomeListRowVariant;
};

export function HomeListItemRow({
  href,
  title,
  subtitle,
  trailing,
  badges = [],
  variant = "default"
}: HomeListItemRowProps): JSX.Element {
  const rowClass =
    variant === "default"
      ? "home-list-row"
      : `home-list-row home-list-row--${variant}`;

  return (
    <Link href={href} className={rowClass}>
      {variant === "recent" ? (
        <span className="home-list-row-plus" aria-hidden>
          +
        </span>
      ) : null}
      <div className="home-list-row-main">
        <strong className="home-list-row-title">{title}</strong>
        <p>{subtitle}</p>
        {badges.length > 0 ? (
          <div className="home-list-badges">
            {badges.map((badge) => (
              <span key={badge} className="pill pill--home-row">
                {badge}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      {trailing ? (
        <span
          className={`home-list-row-trailing ${
            variant === "recent" ? "home-list-time" : "home-list-mono-caps"
          }`}
        >
          {trailing}
        </span>
      ) : null}
    </Link>
  );
}
