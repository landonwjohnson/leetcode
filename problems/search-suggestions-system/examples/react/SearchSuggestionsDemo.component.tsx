import { useMemo, useState } from "react";
import type { JSX } from "react";
import { generateMockSearchItems } from "./mockSearchData";
import { useFuzzySearch } from "./useFuzzySearch.hook";

export default function SearchSuggestionsDemo(): JSX.Element {
  const [query, setQuery] = useState<string>("");
  const items = useMemo(() => generateMockSearchItems(), []);
  const results = useFuzzySearch(items, query, 12);

  return (
    <section
      style={{
        width: "100%",
        maxWidth: 800,
        border: "1px solid #ddd",
        borderRadius: 10,
        padding: 16,
        fontFamily: "sans-serif",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Search Suggestions Demo (10,000 mocked objects)</h3>
      <p style={{ color: "#666" }}>
        Try queries like <code>srch</code>, <code>fzy</code>, or <code>alp</code>.
      </p>

      <input
        value={query}
        onChange={(event): void => setQuery(event.target.value)}
        placeholder="Search title, category, tags..."
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 8,
          border: "1px solid #bbb",
          marginBottom: 14,
        }}
      />

      <div style={{ marginBottom: 10, color: "#555" }}>
        Showing top {results.length} matches from {items.length.toLocaleString()} items
      </div>

      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 8 }}>
        {results.map((item) => (
          <li
            key={item.id}
            style={{
              border: "1px solid #eee",
              borderRadius: 8,
              padding: "10px 12px",
              background: "#fafafa",
            }}
          >
            <strong>{item.title}</strong>
            <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>
              category: {item.category} | tags: {item.tags.join(", ")}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
