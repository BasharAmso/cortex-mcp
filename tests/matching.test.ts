import { describe, it, expect } from "vitest";
import { scoreFragment, rankFragments } from "../src/matching/scorer.js";
import { QuickCache } from "../src/matching/quick-cache.js";
import type { Fragment } from "../src/loader/types.js";

const makeFragment = (overrides: Partial<Fragment> = {}): Fragment => ({
  id: "TEST-001",
  name: "Test Fragment",
  category: "skills",
  tags: ["testing", "example"],
  capabilities: ["test-execution"],
  useWhen: ["writing tests for a module"],
  estimatedTokens: 200,
  relatedFragments: [],
  dependencies: [],
  synonyms: [],
  lastUpdated: "",
  sourceUrl: "",
  difficulty: "",
  content: "Test content",
  filePath: "/test.md",
  ...overrides,
});

describe("scoreFragment", () => {
  it("scores tag matches", () => {
    const fragment = makeFragment({ tags: ["testing", "example"] });
    const result = scoreFragment(fragment, ["testing"]);
    expect(result.score).toBeGreaterThan(0);
    expect(result.matchReasons).toContain("tags(1)");
  });

  it("scores capability matches", () => {
    const fragment = makeFragment({ capabilities: ["test-execution"] });
    const result = scoreFragment(fragment, ["test"]);
    expect(result.score).toBeGreaterThan(0);
  });

  it("scores useWhen matches", () => {
    const fragment = makeFragment({
      useWhen: ["writing tests for a module"],
    });
    const result = scoreFragment(fragment, ["tests", "module"]);
    expect(result.matchReasons.some((r) => r.startsWith("useWhen"))).toBe(
      true,
    );
  });

  it("applies category bonus", () => {
    const fragment = makeFragment({ category: "skills" });
    const withBonus = scoreFragment(fragment, ["testing"], "skills");
    const without = scoreFragment(fragment, ["testing"]);
    expect(withBonus.score).toBeGreaterThan(without.score);
  });

  it("applies small resource bonus", () => {
    const small = makeFragment({ estimatedTokens: 100 });
    const large = makeFragment({ estimatedTokens: 1000 });
    const smallScore = scoreFragment(small, ["testing"]);
    const largeScore = scoreFragment(large, ["testing"]);
    expect(smallScore.score).toBeGreaterThan(largeScore.score);
  });

  it("returns only small-resource bonus for no keyword matches", () => {
    const fragment = makeFragment({ estimatedTokens: 200 });
    const result = scoreFragment(fragment, ["completely", "unrelated"]);
    // Only the small resource bonus applies (no tag/capability/useWhen hits)
    expect(result.score).toBe(5);
    expect(result.matchReasons).toEqual(["small"]);
  });

  it("scores synonym matches", () => {
    const fragment = makeFragment({
      synonyms: ["how do I add logins to my app", "set up authentication"],
    });
    const result = scoreFragment(fragment, ["logins", "app"]);
    expect(result.matchReasons.some((r) => r.startsWith("synonyms"))).toBe(true);
    expect(result.score).toBeGreaterThan(5); // More than just small bonus
  });

  it("scores zero for empty synonyms", () => {
    const fragment = makeFragment({ synonyms: [], estimatedTokens: 1000 });
    const result = scoreFragment(fragment, ["logins"]);
    // No tag/capability/useWhen/synonym/name match, no small bonus
    expect(result.score).toBe(0);
  });

  it("matches synonym phrases bidirectionally", () => {
    const fragment = makeFragment({
      synonyms: ["add login to my app"],
    });
    // Query token "login" appears in synonym "add login to my app"
    const result = scoreFragment(fragment, ["login"]);
    expect(result.matchReasons.some((r) => r.startsWith("synonyms"))).toBe(true);
  });
});

describe("rankFragments", () => {
  it("ranks by score descending", () => {
    const fragments = [
      makeFragment({
        id: "A",
        tags: ["unrelated"],
        capabilities: [],
        useWhen: [],
        name: "Unrelated",
      }),
      makeFragment({
        id: "B",
        tags: ["testing", "example", "unit"],
        capabilities: ["test-execution"],
        name: "Test Expert",
      }),
    ];
    const ranked = rankFragments(fragments, ["testing"]);
    expect(ranked[0].fragment.id).toBe("B");
  });

  it("filters out zero-score fragments", () => {
    const fragments = [
      makeFragment({
        id: "X",
        tags: ["xyz"],
        capabilities: [],
        useWhen: [],
        name: "XYZ",
        estimatedTokens: 1000, // No small resource bonus
      }),
    ];
    const ranked = rankFragments(fragments, ["testing"]);
    expect(ranked).toHaveLength(0);
  });
});

describe("QuickCache", () => {
  it("stores and retrieves results", () => {
    const cache = new QuickCache(10, 60_000);
    const results = [
      { fragment: makeFragment(), score: 10, matchReasons: ["test"] },
    ];
    cache.set("query1", results);
    expect(cache.get("query1")).toEqual(results);
  });

  it("returns null for cache miss", () => {
    const cache = new QuickCache();
    expect(cache.get("nonexistent")).toBeNull();
  });

  it("evicts oldest entry when full", () => {
    const cache = new QuickCache(2, 60_000);
    cache.set("a", []);
    cache.set("b", []);
    cache.set("c", []);
    expect(cache.get("a")).toBeNull();
    expect(cache.get("b")).not.toBeNull();
    expect(cache.get("c")).not.toBeNull();
  });

  it("clears all entries", () => {
    const cache = new QuickCache();
    cache.set("a", []);
    cache.set("b", []);
    cache.clear();
    expect(cache.size).toBe(0);
  });
});
