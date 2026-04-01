import { describe, it, expect, beforeAll } from "vitest";
import { resolve } from "node:path";
import { loadFragments } from "../src/loader/fragment-loader.js";
import type { Fragment } from "../src/loader/types.js";

/**
 * Stratified smoke test for fragment quality.
 *
 * Samples fragments across categories and pillars to catch structural drift
 * (e.g. missing useWhen, empty tags, no synonyms) from bulk generation.
 * Does NOT test all 694 fragments — just enough to detect systematic issues.
 */

const RESOURCES_DIR = resolve(import.meta.dirname, "../resources");

let fragments: Fragment[];
let fragmentMap: Map<string, Fragment>;

beforeAll(() => {
  fragments = loadFragments([RESOURCES_DIR]);
  fragmentMap = new Map(fragments.map((f) => [f.id, f]));
});

// Stratified sample: 2 agents, 5 skills (diverse pillars), 3 patterns, 13 examples
const SAMPLE_IDS = [
  // Agents
  "AGT-0001", // Builder (framework-core)
  "AGT-0003", // Architect (framework-core)
  // Skills — one per pillar
  "SKL-0021", // Deployment (framework-core)
  "SKL-0151", // Healthcare Data FHIR (health)
  "SKL-0270", // Product Photography (content-creation)
  "SKL-0343", // Multi-Tenancy Design (architecture)
  "SKL-0441", // Nuxt Development (platform)
  // Patterns — diverse pillars
  "PAT-0058", // Kubernetes Production (software-dev)
  "PAT-0065", // Entity Component System (game-dev)
  "PAT-0096", // Inventory Tracking (ecommerce)
  // Examples — original + Session 2 + Session 3 (all pillars)
  "EX-0001", // MCP Tool (framework-core)
  "EX-0002", // MCP Resource (framework-core)
  "EX-0017", // Phaser Game Scene (game-dev)
  "EX-0020", // Checkout Flow (ecommerce)
  "EX-0022", // Circuit Breaker (architecture)
  "EX-0025", // CRM Lead Pipeline (sales)
  "EX-0027", // Online Course Module (education)
  "EX-0028", // IoT Dashboard MQTT (iot)
  "EX-0031", // Competitor Analysis (market-research)
  "EX-0036", // Design System Tokens (ux-design)
  "EX-0040", // Prayer Time Calculator (religious)
  "EX-0043", // Go API Server (language)
  "EX-0044", // Web Scraper Pipeline (automation)
];

describe("fragment quality (stratified sample)", () => {
  it("should load all sampled fragments", () => {
    const missing = SAMPLE_IDS.filter((id) => !fragmentMap.has(id));
    expect(missing, `Missing fragments: ${missing.join(", ")}`).toEqual([]);
  });

  describe.each(SAMPLE_IDS)("fragment %s", (id) => {
    let fragment: Fragment;

    beforeAll(() => {
      fragment = fragmentMap.get(id)!;
    });

    it("has non-empty body content", () => {
      expect(fragment.content.trim().length).toBeGreaterThan(50);
    });

    it("has at least 1 useWhen entry", () => {
      expect(fragment.useWhen.length).toBeGreaterThanOrEqual(1);
    });

    it("has at least 3 tags", () => {
      expect(
        fragment.tags.length,
        `${id} has only ${fragment.tags.length} tags`,
      ).toBeGreaterThanOrEqual(3);
    });

    it("has at least 1 synonym", () => {
      expect(fragment.synonyms.length).toBeGreaterThanOrEqual(1);
    });

    it("has positive estimatedTokens", () => {
      expect(fragment.estimatedTokens).toBeGreaterThan(0);
    });

    it("has a non-empty pillar", () => {
      expect(fragment.pillar).toBeTruthy();
      expect(fragment.pillar).not.toBe("general");
    });
  });
});

describe("library-wide sanity checks", () => {
  it("has at least 600 total fragments", () => {
    expect(fragments.length).toBeGreaterThanOrEqual(600);
  });

  it("has all 4 categories represented", () => {
    const categories = new Set(fragments.map((f) => f.category));
    expect(categories).toContain("agents");
    expect(categories).toContain("skills");
    expect(categories).toContain("patterns");
    expect(categories).toContain("examples");
  });

  it("has at least 20 unique pillars", () => {
    const pillars = new Set(fragments.map((f) => f.pillar));
    expect(pillars.size).toBeGreaterThanOrEqual(20);
  });

  it("has at least 50 examples", () => {
    const examples = fragments.filter((f) => f.category === "examples");
    expect(examples.length).toBeGreaterThanOrEqual(50);
  });

  it("has examples in all 26 pillars", () => {
    const examplePillars = new Set(
      fragments.filter((f) => f.category === "examples").map((f) => f.pillar),
    );
    expect(examplePillars.size).toBeGreaterThanOrEqual(26);
  });
});
