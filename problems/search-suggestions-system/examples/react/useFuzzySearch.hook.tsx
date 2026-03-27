import { useMemo } from "react";
import type { SearchItem } from "./mockSearchData";

type RankedResult = {
  item: SearchItem;
  score: number;
};

function fuzzyScore(haystack: string, needle: string): number {
  if (needle.length === 0) {
    return 0;
  }

  let score: number = 0;
  let hayIndex: number = 0;

  for (const char of needle) {
    const foundIndex: number = haystack.indexOf(char, hayIndex);
    if (foundIndex === -1) {
      return Number.NEGATIVE_INFINITY;
    }

    score += foundIndex === hayIndex ? 3 : 1;
    hayIndex = foundIndex + 1;
  }

  score -= haystack.length * 0.01;
  return score;
}

export function useFuzzySearch(items: SearchItem[], query: string, limit: number = 10): SearchItem[] {
  return useMemo((): SearchItem[] => {
    const normalizedQuery: string = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return items.slice(0, limit);
    }

    const rankedResults: RankedResult[] = items
      .map((item: SearchItem): RankedResult => {
        const searchableText: string = [item.title, item.category, item.tags.join(" ")].join(" ").toLowerCase();
        return { item, score: fuzzyScore(searchableText, normalizedQuery) };
      })
      .filter((entry: RankedResult): boolean => entry.score > Number.NEGATIVE_INFINITY)
      .sort((left: RankedResult, right: RankedResult): number => right.score - left.score);

    return rankedResults.slice(0, limit).map((entry: RankedResult): SearchItem => entry.item);
  }, [items, limit, query]);
}
