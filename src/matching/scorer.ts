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
  synonymMatch: number;
  categoryBonus: number;
  smallResourceBonus: number;
}

const DEFAULT_WEIGHTS: ScoreWeights = {
  tagMatch: 10,
  capabilityMatch: 8,
  useWhenMatch: 5,
  synonymMatch: 8,
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

  // Synonym matches (phrase-level: check if query matches any synonym phrase)
  const synonymMatches = countSynonymMatches(fragment.synonyms, queryTokens);
  if (synonymMatches > 0) {
    score += synonymMatches * weights.synonymMatch;
    matchReasons.push(`synonyms(${synonymMatches})`);
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
function countUseWhenMatches(scenarios: string[], queryTokens: string[]): number {
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

/**
 * Count how many synonym phrases match the query.
 * Synonyms are full phrases like "iPhone app" or "how do I add logins".
 * A synonym matches if any query token appears in it OR any synonym token appears in the query.
 */
function countSynonymMatches(synonyms: string[], queryTokens: string[]): number {
  if (!synonyms || synonyms.length === 0) return 0;

  let count = 0;
  const queryJoined = queryTokens.join(" ");

  for (const synonym of synonyms) {
    const synonymLower = synonym.toLowerCase();
    // Check if query tokens appear in this synonym
    const tokenHits = queryTokens.filter((t) => synonymLower.includes(t));
    // Check if synonym words appear in the joined query
    const synonymTokens = synonymLower.split(/\s+/);
    const reverseHits = synonymTokens.filter((st) => queryJoined.includes(st));

    if (tokenHits.length > 0 || reverseHits.length > 0) {
      count++;
    }
  }

  return count;
}
