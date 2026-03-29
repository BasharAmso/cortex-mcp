import type { IndexData } from "../indexing/types.js";
import type { Fragment } from "../loader/types.js";
import { scoreFragment, type ScoredFragment } from "./scorer.js";

/**
 * Tier 2: Look up fragments using pre-built indexes.
 * Returns scored fragments that match query keywords in the indexes.
 */
export function indexLookup(
  queryTokens: string[],
  indexData: IndexData,
  fragmentMap: Map<string, Fragment>,
  categoryFilter?: string,
): ScoredFragment[] {
  const candidateIds = new Set<string>();

  // Check quick-lookup first (pre-computed common queries)
  for (const token of queryTokens) {
    const quickHits = indexData.quickLookup[token];
    if (quickHits) {
      for (const id of quickHits) candidateIds.add(id);
    }
  }

  // Search keyword index
  for (const token of queryTokens) {
    const keywordHits = indexData.keywordIndex[token];
    if (keywordHits) {
      for (const id of keywordHits) candidateIds.add(id);
    }
  }

  // Search useWhen index
  for (const token of queryTokens) {
    const useWhenHits = indexData.useWhenIndex[token];
    if (useWhenHits) {
      for (const entry of useWhenHits) {
        candidateIds.add(entry.fragmentId);
      }
    }
  }

  // Score all candidates
  const scored: ScoredFragment[] = [];
  for (const id of candidateIds) {
    const fragment = fragmentMap.get(id);
    if (!fragment) continue;

    const result = scoreFragment(fragment, queryTokens, categoryFilter);
    if (result.score > 0) {
      scored.push({
        ...result,
        matchReasons: [...result.matchReasons, "index"],
      });
    }
  }

  return scored.sort((a, b) => b.score - a.score);
}
