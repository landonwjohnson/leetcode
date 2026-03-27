import Link from "next/link";
import type { JSX } from "react";

type CategoryCardProps = {
  href: string;
  label: string;
  description: string;
  count: number;
};

export function CategoryCard({ href, label, description, count }: CategoryCardProps): JSX.Element {
  return (
    <Link href={href} className="problem-card">
      <strong>{label}</strong>
      <p style={{ margin: "0.5rem 0", color: "var(--text-dim)" }}>{description}</p>
      <span className="pill">{count} problems</span>
    </Link>
  );
}
