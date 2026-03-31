---
id: SKL-0410
name: Web Scraping
category: skills
tags: [web-scraping, selectors, pagination, rate-limiting, data-extraction, ethics]
capabilities: [html-parsing, selector-targeting, pagination-handling, scraping-ethics]
useWhen:
  - extracting data from websites that lack an API
  - building automated data collection pipelines
  - scraping paginated content across multiple pages
  - handling rate limiting and anti-scraping measures
  - ensuring ethical and legal compliance in scraping
estimatedTokens: 650
relatedFragments: [SKL-0412, SKL-0414, PAT-0211, PAT-0210]
dependencies: []
synonyms: ["how to scrape a website", "web data extraction", "HTML parsing tutorial", "handling pagination in scraping", "ethical web scraping", "how to avoid getting blocked while scraping"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: intermediate
owner: "cortex"
pillar: "automation"
---

# Skill: Web Scraping

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0410 |
| **Name** | Web Scraping |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Web scraping extracts structured data from websites. It bridges the gap when APIs are unavailable, but requires careful attention to ethics, rate limiting, and site structure changes.

### Tool Selection

| Tool | Language | Best For |
|------|----------|----------|
| **BeautifulSoup** | Python | Simple HTML parsing, static pages |
| **Scrapy** | Python | Large-scale crawling, pipelines |
| **Cheerio** | Node.js | Server-side HTML parsing |
| **Playwright/Puppeteer** | JS/Python | JavaScript-rendered pages |

Use static parsers (BeautifulSoup, Cheerio) when the data is in the initial HTML. Use browser automation (Playwright) when content loads dynamically via JavaScript.

### Selector Strategy

Target elements with CSS selectors or XPath. Prefer specific selectors: `data-testid` attributes are most stable, followed by semantic selectors (`article > h2`), then class names. Avoid positional selectors (`div:nth-child(3)`) as they break when layout changes. Test selectors in browser DevTools before coding.

### Pagination Handling

Three common patterns: page-number URLs (`?page=2`), next-page links (follow the "Next" button), and infinite scroll (intercept API calls the page makes). For infinite scroll, use browser automation to scroll and wait for new content, or reverse-engineer the underlying API endpoint.

### Rate Limiting and Resilience

Respect `robots.txt` and rate limits. Add delays between requests (1-3 seconds minimum). Implement exponential backoff on failures. Rotate user agents. Cache responses to avoid re-fetching. Use a request queue to control concurrency.

```python
import time
import random

def polite_fetch(url, session):
    time.sleep(random.uniform(1, 3))
    response = session.get(url, headers={'User-Agent': 'MyBot/1.0'})
    response.raise_for_status()
    return response
```

### Ethics and Legality

Check `robots.txt` before scraping. Respect `Crawl-delay` directives. Do not scrape personal data without consent. Check the site's Terms of Service. Prefer official APIs when available. Cache aggressively to minimize load on the target server.

## Key Takeaways

- Use static parsers for server-rendered pages, browser automation for JavaScript-heavy sites
- Target stable selectors like `data-testid` over fragile class names
- Always respect `robots.txt`, rate limits, and Terms of Service
- Implement delays, retries, and caching for resilient scraping
- Reverse-engineer underlying APIs before resorting to full browser automation
