import { describe, it, expect } from "vitest";
import { selectWithinBudget } from "../src/budgeting/token-budgeter.js";
import { formatResults } from "../src/budgeting/output-modes.js";
import type { ScoredFragment } from "../src/matching/scorer.js";
import type { Fragment } from "../src/loader/types.js";

const makeScored = (
  id: string,
  score: number,
  tokens: number,
): ScoredFragment => ({
  fragment: {
    id,
    name: `Fragment ${id}`,
    category: "skills",
    tags: [],
    capabilities: [],
    useWhen: [],
    estimatedTokens: tokens,
    relatedFragments: [],
    dependencies: [],
    content: "content",
    filePath: "/test.md",
  },
  score,
  matchReasons: ["test"],
});

describe("selectWithinBudget", () => {
  it("always includes top 3", () => {
    const scored = [
      makeScored("A", 50, 2000),
      makeScored("B", 40, 2000),
      makeScored("C", 30, 2000),
      makeScored("D", 20, 200),
    ];
    // Budget is small but top 3 are guaranteed
    const selected = selectWithinBudget(scored, 100);
    expect(selected).toHaveLength(3);
    expect(selected.map((s) => s.fragment.id)).toEqual(["A", "B", "C"]);
  });

  it("stops at 80% budget after top 3", () => {
    const scored = [
      makeScored("A", 50, 100),
      makeScored("B", 40, 100),
      makeScored("C", 30, 100),
      makeScored("D", 20, 100),
      makeScored("E", 10, 100),
    ];
    // Budget 500, 80% = 400. Top 3 = 300 tokens. D (400) fits. E (500) doesn't.
    const selected = selectWithinBudget(scored, 500);
    expect(selected).toHaveLength(4);
  });

  it("returns empty for empty input", () => {
    expect(selectWithinBudget([], 1000)).toEqual([]);
  });
});

describe("formatResults", () => {
  const scored = [makeScored("SKL-001", 50, 200)];

  it("formats index mode (compact)", () => {
    const result = formatResults(scored, "index");
    expect(result.mode).toBe("index");
    const frag = result.fragments[0] as { id: string; name: string };
    expect(frag.id).toBe("SKL-001");
    expect(frag).not.toHaveProperty("content");
    expect(frag).not.toHaveProperty("tags");
  });

  it("formats minimal mode (JSON + URI)", () => {
    const result = formatResults(scored, "minimal");
    const frag = result.fragments[0] as { uri: string };
    expect(frag.uri).toBe("cortex://fragment/SKL-001");
    expect(frag).not.toHaveProperty("content");
  });

  it("formats catalog mode (full metadata, no content)", () => {
    const result = formatResults(scored, "catalog");
    const frag = result.fragments[0] as { tags: string[]; content?: string };
    expect(frag.tags).toBeDefined();
    expect(frag).not.toHaveProperty("content");
  });

  it("formats full mode (includes content)", () => {
    const result = formatResults(scored, "full");
    const frag = result.fragments[0] as { content: string };
    expect(frag.content).toBe("content");
  });

  it("reports total tokens", () => {
    const result = formatResults(scored, "index");
    expect(result.totalTokens).toBe(200);
  });
});
