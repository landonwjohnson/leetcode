import type { JSX } from "react";

type SectionHeaderProps = {
  title: string;
  description?: string;
};

export function SectionHeader({ title, description }: SectionHeaderProps): JSX.Element {
  return (
    <div style={{ marginBottom: "0.75rem" }}>
      <h2 style={{ margin: 0 }}>{title}</h2>
      {description ? <p style={{ margin: "0.35rem 0 0", color: "var(--text-dim)" }}>{description}</p> : null}
    </div>
  );
}
