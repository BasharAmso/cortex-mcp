---
id: EX-0044
name: Web Scraper Pipeline
category: examples
tags: [scraper, web-scraping, rate-limit, retry, data-extraction, automation, typescript, pipeline]
capabilities: [configurable-scraping, rate-limiting, retry-backoff, structured-extraction]
useWhen:
  - building a configurable web scraper with rate limiting
  - implementing retry logic with exponential backoff for HTTP requests
  - extracting structured data from web pages
estimatedTokens: 650
relatedFragments: [SKL-0144, PAT-0067, PAT-0068]
dependencies: []
synonyms: ["web crawler", "data extraction pipeline", "page scraper with retry", "site scraper engine", "automated data collector"]
sourceUrl: "https://github.com/apify/crawlee"
lastUpdated: "2026-04-01"
difficulty: intermediate
owner: builder
pillar: "automation"
---

# Web Scraper Pipeline

Configurable web scraper with rate limiting, retry with exponential backoff, and structured data extraction.

## Implementation

```typescript
// --- Types ---
interface ScraperConfig {
  baseUrl: string;
  selectors: Record<string, string>;
  rateLimit: { requestsPerSecond: number };
  retry: { maxAttempts: number; baseDelayMs: number };
  headers?: Record<string, string>;
}

interface ScrapeResult<T> {
  url: string;
  data: T;
  scrapedAt: Date;
  status: 'success' | 'error';
  error?: string;
}

// --- Rate Limiter ---
class RateLimiter {
  private tokens: number;
  private lastRefill: number;
  private readonly maxTokens: number;
  private readonly refillRate: number;

  constructor(requestsPerSecond: number) {
    this.maxTokens = requestsPerSecond;
    this.tokens = requestsPerSecond;
    this.refillRate = requestsPerSecond;
    this.lastRefill = Date.now();
  }

  async acquire(): Promise<void> {
    this.refill();
    if (this.tokens < 1) {
      const waitMs = ((1 - this.tokens) / this.refillRate) * 1000;
      await new Promise(resolve => setTimeout(resolve, waitMs));
      this.refill();
    }
    this.tokens -= 1;
  }

  private refill(): void {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;
    this.tokens = Math.min(this.maxTokens, this.tokens + elapsed * this.refillRate);
    this.lastRefill = now;
  }
}

// --- Retry with Exponential Backoff ---
async function withRetry<T>(
  fn: () => Promise<T>,
  maxAttempts: number,
  baseDelayMs: number
): Promise<T> {
  let lastError: Error | undefined;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (attempt < maxAttempts - 1) {
        const delay = baseDelayMs * Math.pow(2, attempt) + Math.random() * 100;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  throw lastError;
}

// --- Data Extractor ---
function extractData(html: string, selectors: Record<string, string>): Record<string, string> {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const result: Record<string, string> = {};

  for (const [field, selector] of Object.entries(selectors)) {
    const el = doc.querySelector(selector);
    result[field] = el?.textContent?.trim() ?? '';
  }
  return result;
}

// --- Scraper Pipeline ---
class ScraperPipeline<T extends Record<string, string>> {
  private limiter: RateLimiter;
  private config: ScraperConfig;

  constructor(config: ScraperConfig) {
    this.config = config;
    this.limiter = new RateLimiter(config.rateLimit.requestsPerSecond);
  }

  async scrapePage(path: string): Promise<ScrapeResult<T>> {
    const url = `${this.config.baseUrl}${path}`;
    try {
      await this.limiter.acquire();
      const html = await withRetry(
        async () => {
          const res = await fetch(url, { headers: this.config.headers });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.text();
        },
        this.config.retry.maxAttempts,
        this.config.retry.baseDelayMs
      );
      const data = extractData(html, this.config.selectors) as T;
      return { url, data, scrapedAt: new Date(), status: 'success' };
    } catch (err) {
      return { url, data: {} as T, scrapedAt: new Date(), status: 'error', error: String(err) };
    }
  }

  async scrapeAll(paths: string[]): Promise<ScrapeResult<T>[]> {
    const results: ScrapeResult<T>[] = [];
    for (const path of paths) {
      results.push(await this.scrapePage(path));
    }
    return results;
  }
}
```

## Key Patterns

- **Token bucket rate limiter**: refills tokens proportionally to elapsed time, blocks when empty
- **Exponential backoff with jitter**: `baseDelay * 2^attempt + random` prevents thundering herd
- **Selector-based extraction**: configurable CSS selectors mapped to output fields
- **Pipeline pattern**: sequential scraping respects rate limits; each result includes status and timestamp
