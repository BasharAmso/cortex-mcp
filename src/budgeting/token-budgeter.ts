import type { ScoredFragment } from "../matching/scorer.js";

const MIN_GUARANTEED = 3;
const BUDGET_CAP_RATIO = 0.8;

/**
 * Select fragments that fit within a token budget.
 *
 * Strategy: Greedy selection by score.
 * - Always includes the top 3 results (guaranteed minimum).
 * - Stops adding when cumulative tokens reach 80% of budget.
 */
export function selectWithinBudget(
  scored: ScoredFragment[],
  tokenBudget: number,
): ScoredFragment[] {
  if (scored.length === 0) return [];

  const effectiveBudget = tokenBudget * BUDGET_CAP_RATIO;
  const selected: ScoredFragment[] = [];
  let usedTokens = 0;

  for (let i = 0; i < scored.length; i++) {
    const candidate = scored[i];
    const candidateTokens = candidate.fragment.estimatedTokens;

    // Always include top 3 regardless of budget
    if (i < MIN_GUARANTEED) {
      selected.push(candidate);
      usedTokens += candidateTokens;
      continue;
    }

    // Stop if adding this fragment would exceed budget
    if (usedTokens + candidateTokens > effectiveBudget) {
      break;
    }

    selected.push(candidate);
    usedTokens += candidateTokens;
  }

  return selected;
}
