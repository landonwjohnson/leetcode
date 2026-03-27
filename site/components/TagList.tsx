import type { JSX } from "react";

type TagListProps = {
  items: string[];
};

export function TagList({ items }: TagListProps): JSX.Element | null {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="meta-row">
      {items.map((item) => (
        <span key={item} className="pill">
          {item}
        </span>
      ))}
    </div>
  );
}
