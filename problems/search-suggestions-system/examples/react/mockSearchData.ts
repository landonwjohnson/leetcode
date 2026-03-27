export type SearchItem = {
  id: number;
  title: string;
  category: string;
  tags: string[];
};

const categories: readonly string[] = ["array", "string", "graph", "tree", "dp"];
const words: readonly string[] = [
  "alpha",
  "beta",
  "gamma",
  "delta",
  "omega",
  "search",
  "match",
  "fuzzy",
];

export function generateMockSearchItems(count: number = 10_000): SearchItem[] {
  return Array.from({ length: count }, (_, index: number): SearchItem => {
    const id: number = index + 1;

    return {
      id,
      title: `${words[index % words.length]} problem ${id}`,
      category: categories[index % categories.length],
      tags: [words[(index + 1) % words.length], categories[(index + 2) % categories.length]],
    };
  });
}
