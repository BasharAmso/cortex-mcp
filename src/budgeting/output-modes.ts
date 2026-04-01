import type { ScoredFragment } from "../matching/scorer.js";
import type { OutputMode } from "../config.js";

export interface FormattedResult {
  mode: OutputMode;
  totalResults: number;
  totalTokens: number;
  fragments: unknown[];
}

/**
 * Format scored fragments according to the requested output mode.
 *
 * - index:   IDs and names only (ultra-compact)
 * - minimal: JSON metadata + resource URIs
 * - catalog: Full metadata without content
 * - full:    Complete markdown content
 */
export function formatResults(scored: ScoredFragment[], mode: OutputMode): FormattedResult {
  const totalTokens = scored.reduce((sum, sf) => sum + sf.fragment.estimatedTokens, 0);

  switch (mode) {
    case "index":
      return {
        mode,
        totalResults: scored.length,
        totalTokens,
        fragments: scored.map((sf) => ({
          id: sf.fragment.id,
          name: sf.fragment.name,
          score: sf.score,
        })),
      };

    case "minimal":
      return {
        mode,
        totalResults: scored.length,
        totalTokens,
        fragments: scored.map((sf) => ({
          id: sf.fragment.id,
          name: sf.fragment.name,
          category: sf.fragment.category,
          estimatedTokens: sf.fragment.estimatedTokens,
          score: sf.score,
          uri: `cortex://fragment/${sf.fragment.id}`,
        })),
      };

    case "catalog":
      return {
        mode,
        totalResults: scored.length,
        totalTokens,
        fragments: scored.map((sf) => ({
          id: sf.fragment.id,
          name: sf.fragment.name,
          category: sf.fragment.category,
          tags: sf.fragment.tags,
          capabilities: sf.fragment.capabilities,
          useWhen: sf.fragment.useWhen,
          estimatedTokens: sf.fragment.estimatedTokens,
          relatedFragments: sf.fragment.relatedFragments,
          owner: sf.fragment.owner,
          difficulty: sf.fragment.difficulty,
          score: sf.score,
          matchReasons: sf.matchReasons,
          uri: `cortex://fragment/${sf.fragment.id}`,
        })),
      };

    case "full":
      return {
        mode,
        totalResults: scored.length,
        totalTokens,
        fragments: scored.map((sf) => ({
          id: sf.fragment.id,
          name: sf.fragment.name,
          category: sf.fragment.category,
          tags: sf.fragment.tags,
          capabilities: sf.fragment.capabilities,
          useWhen: sf.fragment.useWhen,
          estimatedTokens: sf.fragment.estimatedTokens,
          relatedFragments: sf.fragment.relatedFragments,
          owner: sf.fragment.owner,
          difficulty: sf.fragment.difficulty,
          score: sf.score,
          matchReasons: sf.matchReasons,
          content: sf.fragment.content,
        })),
      };
  }
}
