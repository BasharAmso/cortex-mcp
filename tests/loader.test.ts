import { describe, it, expect, beforeAll } from "vitest";
import { resolve } from "node:path";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { loadFragments, buildFragmentMap } from "../src/loader/fragment-loader.js";

const TEST_DIR = resolve(import.meta.dirname, "__test_fragments__");

beforeAll(() => {
  // Create test fragment directory
  rmSync(TEST_DIR, { recursive: true, force: true });
  mkdirSync(resolve(TEST_DIR, "skills"), { recursive: true });

  writeFileSync(
    resolve(TEST_DIR, "skills", "test-skill.md"),
    `---
id: SKL-TEST-001
name: Test Skill
category: skills
tags: [testing, example]
capabilities: [test-execution]
useWhen:
  - writing tests for a module
estimatedTokens: 200
relatedFragments: []
dependencies: []
synonyms: ["how to write tests", "add unit tests to my code"]
lastUpdated: "2026-03-29"
sourceUrl: ""
difficulty: beginner
---

# Test Skill

This is a test skill fragment.
`,
  );

  writeFileSync(
    resolve(TEST_DIR, "no-frontmatter.md"),
    "# Just markdown\n\nNo YAML frontmatter here.",
  );

  writeFileSync(
    resolve(TEST_DIR, "bad-frontmatter.md"),
    `---
name: Missing ID
---

# Bad Fragment
`,
  );

  // Fragment with numeric YAML values in tags (e.g. 404, 500 parse as integers)
  writeFileSync(
    resolve(TEST_DIR, "skills", "numeric-tags.md"),
    `---
id: SKL-TEST-NUMERIC
name: Numeric Tag Fragment
category: skills
tags: [error-page, 404, 500]
capabilities: [error-handling]
useWhen:
  - designing error pages
estimatedTokens: 200
relatedFragments: []
dependencies: []
synonyms: []
lastUpdated: "2026-03-29"
sourceUrl: ""
difficulty: beginner
---

# Numeric Tags

Fragment with numeric values in YAML arrays.
`,
  );

  return () => {
    rmSync(TEST_DIR, { recursive: true, force: true });
  };
});

describe("loadFragments", () => {
  it("loads fragments with valid frontmatter", () => {
    const fragments = loadFragments([TEST_DIR]);
    expect(fragments.length).toBeGreaterThanOrEqual(2);
    const skill = fragments.find((f) => f.id === "SKL-TEST-001");
    expect(skill).toBeDefined();
    expect(skill!.name).toBe("Test Skill");
    expect(skill!.category).toBe("skills");
    expect(skill!.tags).toEqual(["testing", "example"]);
  });

  it("parses synonym fields from frontmatter", () => {
    const fragments = loadFragments([TEST_DIR]);
    const skill = fragments.find((f) => f.id === "SKL-TEST-001")!;
    expect(skill.synonyms).toEqual(["how to write tests", "add unit tests to my code"]);
    expect(skill.lastUpdated).toBe("2026-03-29");
    expect(skill.difficulty).toBe("beginner");
  });

  it("coerces numeric YAML values in arrays to strings", () => {
    const fragments = loadFragments([TEST_DIR]);
    const numeric = fragments.find((f) => f.id === "SKL-TEST-NUMERIC");
    expect(numeric).toBeDefined();
    expect(numeric!.tags).toEqual(["error-page", "404", "500"]);
    // Every value must be a string — this is what crashed Fuse.js
    for (const tag of numeric!.tags) {
      expect(typeof tag).toBe("string");
    }
  });

  it("skips files without frontmatter", () => {
    const fragments = loadFragments([TEST_DIR]);
    const ids = fragments.map((f) => f.id);
    expect(ids).not.toContain(undefined);
    expect(fragments.length).toBeGreaterThanOrEqual(2);
  });

  it("skips files with missing required fields", () => {
    const fragments = loadFragments([TEST_DIR]);
    expect(fragments.find((f) => f.name === "Missing ID")).toBeUndefined();
  });

  it("returns empty array for nonexistent directory", () => {
    const fragments = loadFragments(["/nonexistent/path"]);
    expect(fragments).toEqual([]);
  });
});

describe("buildFragmentMap", () => {
  it("creates a map from fragment ID to fragment", () => {
    const fragments = loadFragments([TEST_DIR]);
    const map = buildFragmentMap(fragments);
    expect(map.size).toBe(2);
    expect(map.get("SKL-TEST-001")?.name).toBe("Test Skill");
    expect(map.get("SKL-TEST-NUMERIC")?.name).toBe("Numeric Tag Fragment");
  });
});
