import Fuse from "fuse.js";
import type { Fragment } from "../loader/types.js";
import { scoreFragment, type ScoredFragment } from "./scorer.js";

let fuseInstance: Fuse<Fragment> | null = null;

/**
 * Initialize the Fuse.js instance with fragment data.
 * Call once after loading fragments.
 */
export function initFuzzySearch(fragments: Fragment[], threshold: number = 0.3): void {
  fuseInstance = new Fuse(fragments, {
    keys: [
      { name: "name", weight: 0.3 },
      { name: "tags", weight: 0.25 },
      { name: "capabilities", weight: 0.2 },
      { name: "useWhen", weight: 0.25 },
    ],
    threshold,
    includeScore: true,
    shouldSort: true,
  });
}

/**
 * Fuzzy search fragments using Fuse.js, then apply scoring weights.
 */
export function fuzzySearch(
  query: string,
  queryTokens: string[],
  categoryFilter?: string,
  maxResults: number = 10,
): ScoredFragment[] {
  if (!fuseInstance) {
    return [];
  }

  const fuseResults = fuseInstance.search(query, { limit: maxResults * 2 });

  return fuseResults
    .map((result) => {
      const scored = scoreFragment(result.item, queryTokens, categoryFilter);
      // Boost score based on Fuse relevance (lower fuse score = better match)
      const fuseBoost = result.score != null ? (1 - result.score) * 10 : 0;
      return {
        ...scored,
        score: scored.score + fuseBoost,
        matchReasons: [...scored.matchReasons, "fuzzy"],
      };
    })
    .filter((sf) => sf.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);
}
