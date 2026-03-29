import type { Fragment } from "../loader/types.js";
import type { IndexData } from "../indexing/types.js";
import type { ScoredFragment } from "./scorer.js";
import { QuickCache } from "./quick-cache.js";
import { indexLookup } from "./index-lookup.js";
import { fuzzySearch, initFuzzySearch } from "./fuzzy-search.js";

const INDEX_CONFIDENCE_THRESHOLD = 3;

export interface MatchingEngine {
  search(
    query: string,
    categoryFilter?: string,
    maxResults?: number,
  ): ScoredFragment[];
  invalidateCache(): void;
}

/**
 * Create a three-tier matching engine.
 *
 * Tier 1: Quick cache (LRU, ~2ms)
 * Tier 2: Pre-built index lookup (~5-10ms)
 * Tier 3: Fuzzy fallback via Fuse.js (~15-20ms)
 */
export function createMatchingEngine(
  fragments: Fragment[],
  fragmentMap: Map<string, Fragment>,
  indexData: IndexData | null,
  options: {
    cacheMaxSize?: number;
    cacheTtl?: number;
    fuzzyThreshold?: number;
    maxResults?: number;
  } = {},
): MatchingEngine {
  const cache = new QuickCache(
    options.cacheMaxSize ?? 100,
    options.cacheTtl ?? 900_000,
  );

  // Initialize Fuse.js for Tier 3
  initFuzzySearch(fragments, options.fuzzyThreshold ?? 0.3);

  return {
    search(
      query: string,
      categoryFilter?: string,
      maxResults?: number,
    ): ScoredFragment[] {
      const limit = maxResults ?? options.maxResults ?? 10;
      const cacheKey = `${query}|${categoryFilter ?? ""}|${limit}`;

      // Tier 1: Quick cache
      const cached = cache.get(cacheKey);
      if (cached) {
        return cached;
      }

      const queryTokens = tokenizeQuery(query);

      // Tier 2: Index lookup (if indexes are available)
      let results: ScoredFragment[] = [];
      if (indexData) {
        results = indexLookup(
          queryTokens,
          indexData,
          fragmentMap,
          categoryFilter,
        );
      }

      // Tier 3: Fuzzy fallback (if index results are insufficient)
      if (results.length < INDEX_CONFIDENCE_THRESHOLD) {
        const fuzzyResults = fuzzySearch(
          query,
          queryTokens,
          categoryFilter,
          limit,
        );

        // Merge: deduplicate by fragment ID, keep higher score
        const seen = new Map<string, ScoredFragment>();
        for (const r of results) seen.set(r.fragment.id, r);
        for (const r of fuzzyResults) {
          const existing = seen.get(r.fragment.id);
          if (!existing || r.score > existing.score) {
            seen.set(r.fragment.id, r);
          }
        }

        results = [...seen.values()].sort((a, b) => b.score - a.score);
      }

      // Trim to limit
      results = results.slice(0, limit);

      // Cache the results
      cache.set(cacheKey, results);

      return results;
    },

    invalidateCache(): void {
      cache.clear();
    },
  };
}

/**
 * Tokenize a query string into search tokens.
 */
function tokenizeQuery(query: string): string[] {
  return query
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .split(/[\s-]+/)
    .filter((w) => w.length > 1);
}
