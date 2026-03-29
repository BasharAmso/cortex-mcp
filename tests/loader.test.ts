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

  return () => {
    rmSync(TEST_DIR, { recursive: true, force: true });
  };
});

describe("loadFragments", () => {
  it("loads fragments with valid frontmatter", () => {
    const fragments = loadFragments([TEST_DIR]);
    expect(fragments).toHaveLength(1);
    expect(fragments[0].id).toBe("SKL-TEST-001");
    expect(fragments[0].name).toBe("Test Skill");
    expect(fragments[0].category).toBe("skills");
    expect(fragments[0].tags).toEqual(["testing", "example"]);
  });

  it("skips files without frontmatter", () => {
    const fragments = loadFragments([TEST_DIR]);
    const ids = fragments.map((f) => f.id);
    expect(ids).not.toContain(undefined);
    expect(fragments).toHaveLength(1);
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
    expect(map.size).toBe(1);
    expect(map.get("SKL-TEST-001")?.name).toBe("Test Skill");
  });
});
