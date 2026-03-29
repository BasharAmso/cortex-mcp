import type { ScoredFragment } from "./scorer.js";

interface CacheEntry {
  results: ScoredFragment[];
  timestamp: number;
}

/**
 * Simple LRU cache for query results.
 * Tier 1 in the three-tier matching pipeline.
 */
export class QuickCache {
  private cache = new Map<string, CacheEntry>();
  private maxSize: number;
  private ttl: number;

  constructor(maxSize: number = 100, ttl: number = 900_000) {
    this.maxSize = maxSize;
    this.ttl = ttl; // default 15 minutes
  }

  get(key: string): ScoredFragment[] | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    // Move to end (most recently used)
    this.cache.delete(key);
    this.cache.set(key, entry);
    return entry.results;
  }

  set(key: string, results: ScoredFragment[]): void {
    // Evict oldest if at capacity
    if (this.cache.size >= this.maxSize) {
      const oldest = this.cache.keys().next().value;
      if (oldest !== undefined) {
        this.cache.delete(oldest);
      }
    }

    this.cache.set(key, { results, timestamp: Date.now() });
  }

  clear(): void {
    this.cache.clear();
  }

  get size(): number {
    return this.cache.size;
  }
}
