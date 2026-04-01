import { describe, it, expect, beforeAll } from "vitest";
import { resolve } from "node:path";
import { loadFragments, buildFragmentMap } from "../src/loader/fragment-loader.js";
import { loadIndexes } from "../src/indexing/index-builder.js";
import { createMatchingEngine } from "../src/matching/engine.js";

const RESOURCES_DIR = resolve(import.meta.dirname, "../resources");
const INDEX_DIR = resolve(import.meta.dirname, "../.cortex");

describe("search metrics", () => {
  let engine: ReturnType<typeof createMatchingEngine>;

  beforeAll(() => {
    const fragments = loadFragments([RESOURCES_DIR]);
    const fragmentMap = buildFragmentMap(fragments);
    const indexData = loadIndexes(INDEX_DIR);
    engine = createMatchingEngine(fragments, fragmentMap, indexData, {
      cacheMaxSize: 100,
      cacheTtl: 900_000,
      fuzzyThreshold: 0.3,
      maxResults: 10,
    });
  });

  it("starts with zero metrics", () => {
    const m = engine.getMetrics();
    expect(m.totalQueries).toBe(0);
    expect(m.tier1Hits).toBe(0);
    expect(m.tier2Hits).toBe(0);
    expect(m.tier3Hits).toBe(0);
    expect(m.zeroResultQueries).toBe(0);
    expect(m.fragmentRetrievals.size).toBe(0);
  });

  it("increments totalQueries on search", () => {
    engine.search("error handling");
    const m = engine.getMetrics();
    expect(m.totalQueries).toBe(1);
  });

  it("records tier1 cache hit on repeated query", () => {
    engine.search("error handling"); // second time = cache hit
    const m = engine.getMetrics();
    expect(m.totalQueries).toBe(2);
    expect(m.tier1Hits).toBeGreaterThanOrEqual(1);
  });

  it("records tier2 or tier3 on first query", () => {
    engine.search("authentication patterns");
    const m = engine.getMetrics();
    expect(m.tier2Hits + m.tier3Hits).toBeGreaterThanOrEqual(1);
  });

  it("tracks zero-result queries", () => {
    engine.search("xyznonexistentqueryzyx");
    const m = engine.getMetrics();
    expect(m.zeroResultQueries).toBeGreaterThanOrEqual(1);
  });

  it("tracks fragment retrievals", () => {
    engine.recordFragmentRetrieval("SKL-0001");
    engine.recordFragmentRetrieval("SKL-0001");
    engine.recordFragmentRetrieval("PAT-0001");
    const m = engine.getMetrics();
    expect(m.fragmentRetrievals.get("SKL-0001")).toBe(2);
    expect(m.fragmentRetrievals.get("PAT-0001")).toBe(1);
    expect(m.fragmentRetrievals.size).toBe(2);
  });
});
