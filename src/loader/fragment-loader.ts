import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { resolve, extname, relative } from "node:path";
import { parse as parseYaml } from "yaml";
import type { Fragment, FragmentFrontmatter } from "./types.js";

const FRONTMATTER_REGEX = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;

/**
 * Load all markdown fragments from the given directories.
 * Scans recursively. Skips files without valid YAML frontmatter.
 */
export function loadFragments(directories: string[]): Fragment[] {
  const fragments: Fragment[] = [];

  for (const dir of directories) {
    if (!existsSync(dir)) {
      console.error(`[cortex-mcp] Warning: directory not found: ${dir}`);
      continue;
    }
    scanDirectory(dir, fragments);
  }

  return fragments;
}

function scanDirectory(dir: string, fragments: Fragment[]): void {
  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = resolve(dir, entry.name);

    if (entry.isDirectory()) {
      scanDirectory(fullPath, fragments);
      continue;
    }

    if (entry.isFile() && extname(entry.name) === ".md") {
      const fragment = parseFragment(fullPath);
      if (fragment) {
        fragments.push(fragment);
      }
    }
  }
}

function parseFragment(filePath: string): Fragment | null {
  try {
    const raw = readFileSync(filePath, "utf-8");
    const match = raw.match(FRONTMATTER_REGEX);

    if (!match) {
      // No frontmatter — skip silently per architecture decision
      return null;
    }

    const [, yamlStr, content] = match;
    const frontmatter = parseYaml(yamlStr) as Partial<FragmentFrontmatter>;

    if (!frontmatter.id || !frontmatter.name) {
      console.error(`[cortex-mcp] Warning: missing id or name in ${filePath}, skipping`);
      return null;
    }

    // Coerce all array fields to string[] — YAML parses unquoted numbers
    // (e.g. tags: [404, 500]) as integers, which crashes downstream consumers
    // like Fuse.js that call .toLowerCase() on array values.
    const toStrings = (arr: unknown[] | undefined): string[] => (arr ?? []).map((v) => String(v));

    return {
      id: frontmatter.id,
      name: frontmatter.name,
      category: frontmatter.category ?? "patterns",
      tags: toStrings(frontmatter.tags),
      capabilities: toStrings(frontmatter.capabilities),
      useWhen: toStrings(frontmatter.useWhen),
      estimatedTokens: frontmatter.estimatedTokens ?? estimateTokens(content),
      relatedFragments: toStrings(frontmatter.relatedFragments),
      dependencies: toStrings(frontmatter.dependencies),
      synonyms: toStrings(frontmatter.synonyms),
      lastUpdated: frontmatter.lastUpdated ?? "",
      sourceUrl: frontmatter.sourceUrl ?? "",
      difficulty: frontmatter.difficulty ?? "",
      owner: frontmatter.owner ?? "",
      pillar: frontmatter.pillar ?? "general",
      content: content.trim(),
      filePath,
    };
  } catch (err) {
    console.error(`[cortex-mcp] Warning: could not parse ${filePath}: ${err}`);
    return null;
  }
}

/**
 * Rough token estimate: ~4 characters per token.
 */
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

/**
 * Build a lookup map from fragment ID to Fragment for fast retrieval.
 */
export function buildFragmentMap(fragments: Fragment[]): Map<string, Fragment> {
  const map = new Map<string, Fragment>();
  for (const f of fragments) {
    map.set(f.id, f);
  }
  return map;
}
