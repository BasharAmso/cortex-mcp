import type { Fragment } from "../loader/types.js";

export interface ScoredFragment {
  fragment: Fragment;
  score: number;
  matchReasons: string[];
}

export interface ScoreWeights {
  tagMatch: number;
  capabilityMatch: number;
  useWhenMatch: number;
  categoryBonus: number;
  smallResourceBonus: number;
}

const DEFAULT_WEIGHTS: ScoreWeights = {
  tagMatch: 10,
  capabilityMatch: 8,
  useWhenMatch: 5,
  categoryBonus: 15,
  smallResourceBonus: 5,
};

const SMALL_RESOURCE_THRESHOLD = 500;

/**
 * Score a fragment against a query. Higher = better match.
 */
export function scoreFragment(
  fragment: Fragment,
  queryTokens: string[],
  categoryFilter?: string,
  weights: ScoreWeights = DEFAULT_WEIGHTS,
): ScoredFragment {
  let score = 0;
  const matchReasons: string[] = [];

  // Tag matches
  const tagMatches = countMatches(fragment.tags, queryTokens);
  if (tagMatches > 0) {
    score += tagMatches * weights.tagMatch;
    matchReasons.push(`tags(${tagMatches})`);
  }

  // Capability matches
  const capMatches = countMatches(fragment.capabilities, queryTokens);
  if (capMatches > 0) {
    score += capMatches * weights.capabilityMatch;
    matchReasons.push(`capabilities(${capMatches})`);
  }

  // useWhen matches
  const useWhenMatches = countUseWhenMatches(fragment.useWhen, queryTokens);
  if (useWhenMatches > 0) {
    score += useWhenMatches * weights.useWhenMatch;
    matchReasons.push(`useWhen(${useWhenMatches})`);
  }

  // Name match (bonus for direct name hit)
  const nameTokens = fragment.name.toLowerCase().split(/\s+/);
  const nameMatches = countMatches(nameTokens, queryTokens);
  if (nameMatches > 0) {
    score += nameMatches * weights.tagMatch;
    matchReasons.push(`name(${nameMatches})`);
  }

  // Category bonus
  if (categoryFilter && fragment.category === categoryFilter) {
    score += weights.categoryBonus;
    matchReasons.push("category");
  }

  // Small resource bonus (fewer tokens = cheaper to include)
  if (fragment.estimatedTokens < SMALL_RESOURCE_THRESHOLD) {
    score += weights.smallResourceBonus;
    matchReasons.push("small");
  }

  return { fragment, score, matchReasons };
}

/**
 * Score and rank multiple fragments. Returns sorted by score descending.
 */
export function rankFragments(
  fragments: Fragment[],
  queryTokens: string[],
  categoryFilter?: string,
): ScoredFragment[] {
  return fragments
    .map((f) => scoreFragment(f, queryTokens, categoryFilter))
    .filter((sf) => sf.score > 0)
    .sort((a, b) => b.score - a.score);
}

/**
 * Count how many query tokens appear in a list of values.
 */
function countMatches(values: string[], queryTokens: string[]): number {
  let count = 0;
  const lowerValues = values.map((v) => v.toLowerCase());

  for (const token of queryTokens) {
    for (const value of lowerValues) {
      if (value.includes(token) || token.includes(value)) {
        count++;
        break;
      }
    }
  }

  return count;
}

/**
 * Count how many useWhen scenarios match the query tokens.
 */
function countUseWhenMatches(
  scenarios: string[],
  queryTokens: string[],
): number {
  let count = 0;

  for (const scenario of scenarios) {
    const scenarioLower = scenario.toLowerCase();
    const hits = queryTokens.filter((t) => scenarioLower.includes(t));
    if (hits.length > 0) {
      count++;
    }
  }

  return count;
}
