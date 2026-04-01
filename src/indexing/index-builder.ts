import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Fragment } from "../loader/types.js";
import type { KeywordIndex, UseWhenIndex, UseWhenEntry, QuickLookup, IndexData } from "./types.js";

/**
 * Build all three indexes from a list of fragments.
 */
export function buildIndexes(fragments: Fragment[]): IndexData {
  const keywordIndex = buildKeywordIndex(fragments);
  const useWhenIndex = buildUseWhenIndex(fragments);
  const quickLookup = buildQuickLookup(fragments, keywordIndex);

  return { keywordIndex, useWhenIndex, quickLookup };
}

/**
 * Write indexes to disk as JSON files.
 */
export function writeIndexes(indexData: IndexData, indexPath: string): void {
  if (!existsSync(indexPath)) {
    mkdirSync(indexPath, { recursive: true });
  }

  writeFileSync(
    resolve(indexPath, "keyword-index.json"),
    JSON.stringify(indexData.keywordIndex, null, 2),
  );
  writeFileSync(
    resolve(indexPath, "usewhen-index.json"),
    JSON.stringify(indexData.useWhenIndex, null, 2),
  );
  writeFileSync(
    resolve(indexPath, "quick-lookup.json"),
    JSON.stringify(indexData.quickLookup, null, 2),
  );
}

/**
 * Load indexes from disk. Returns null if any index file is missing.
 */
export function loadIndexes(indexPath: string): IndexData | null {
  const files = ["keyword-index.json", "usewhen-index.json", "quick-lookup.json"];

  for (const file of files) {
    if (!existsSync(resolve(indexPath, file))) {
      return null;
    }
  }

  try {
    const keywordIndex: KeywordIndex = JSON.parse(
      readFileSync(resolve(indexPath, "keyword-index.json"), "utf-8"),
    );
    const useWhenIndex: UseWhenIndex = JSON.parse(
      readFileSync(resolve(indexPath, "usewhen-index.json"), "utf-8"),
    );
    const quickLookup: QuickLookup = JSON.parse(
      readFileSync(resolve(indexPath, "quick-lookup.json"), "utf-8"),
    );

    return { keywordIndex, useWhenIndex, quickLookup };
  } catch {
    return null;
  }
}

/**
 * Inverted index: keyword → [fragmentId, ...]
 * Sources: fragment name, tags, capabilities.
 */
function buildKeywordIndex(fragments: Fragment[]): KeywordIndex {
  const index: KeywordIndex = {};

  for (const fragment of fragments) {
    const keywords = extractKeywords(fragment);

    for (const keyword of keywords) {
      if (!index[keyword]) {
        index[keyword] = [];
      }
      if (!index[keyword].includes(fragment.id)) {
        index[keyword].push(fragment.id);
      }
    }
  }

  return index;
}

/**
 * Inverted index: keyword → [{ fragmentId, scenario }, ...]
 * Sources: useWhen scenarios.
 */
function buildUseWhenIndex(fragments: Fragment[]): UseWhenIndex {
  const index: UseWhenIndex = {};

  for (const fragment of fragments) {
    for (const scenario of fragment.useWhen) {
      const words = tokenize(scenario);

      for (const word of words) {
        if (!index[word]) {
          index[word] = [];
        }
        index[word].push({
          fragmentId: fragment.id,
          scenario,
        });
      }
    }
  }

  return index;
}

/**
 * Pre-computed results for common queries.
 * Uses the top keywords from the keyword index (most connected fragments).
 */
function buildQuickLookup(fragments: Fragment[], keywordIndex: KeywordIndex): QuickLookup {
  const lookup: QuickLookup = {};

  // Category lookups
  const categories = ["agents", "skills", "patterns", "examples"] as const;
  for (const cat of categories) {
    const ids = fragments.filter((f) => f.category === cat).map((f) => f.id);
    if (ids.length > 0) {
      lookup[cat] = ids;
    }
  }

  // Top keywords (connected to 3+ fragments) become quick lookups
  for (const [keyword, fragmentIds] of Object.entries(keywordIndex)) {
    if (fragmentIds.length >= 3 && keyword.length > 3) {
      lookup[keyword] = fragmentIds.slice(0, 10);
    }
  }

  return lookup;
}

/**
 * Extract keywords from a fragment's metadata.
 */
function extractKeywords(fragment: Fragment): string[] {
  const words = new Set<string>();

  // From name
  for (const w of tokenize(fragment.name)) words.add(w);

  // From tags
  for (const tag of fragment.tags) {
    for (const w of tokenize(tag)) words.add(w);
  }

  // From capabilities
  for (const cap of fragment.capabilities) {
    for (const w of tokenize(cap)) words.add(w);
  }

  // From synonyms
  for (const synonym of fragment.synonyms) {
    for (const w of tokenize(synonym)) words.add(w);
  }

  // Category as keyword
  words.add(fragment.category);

  return [...words];
}

/**
 * Tokenize a string into lowercase words, filtering stopwords and short tokens.
 */
const STOP_WORDS = new Set([
  "a",
  "an",
  "the",
  "is",
  "it",
  "to",
  "in",
  "of",
  "and",
  "or",
  "for",
  "on",
  "at",
  "by",
  "with",
  "from",
  "as",
  "be",
  "was",
  "are",
  "that",
  "this",
  "has",
  "have",
  "had",
  "not",
  "but",
  "can",
  "do",
  "does",
  "did",
  "will",
  "would",
  "should",
  "could",
  "when",
  "you",
  "your",
  "they",
  "them",
  "their",
  "what",
  "how",
]);

function tokenize(text: string): string[] {
  return String(text ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .split(/[\s-]+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}
