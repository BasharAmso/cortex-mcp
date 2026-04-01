---
id: EX-0021
name: API Gateway with Rate Limiting
category: examples
tags: [api-gateway, rate-limiting, middleware, express, proxy, architecture, typescript]
capabilities: [rate-limiting, request-routing, api-gateway-setup]
useWhen:
  - building an API gateway that routes to backend services
  - implementing rate limiting per client or API key
  - adding a reverse proxy layer in front of microservices
estimatedTokens: 600
relatedFragments: [SKL-0331, PAT-0172, SKL-0126, EX-0022]
dependencies: []
synonyms: ["api gateway example", "rate limiter implementation", "request throttling", "api proxy with rate limit", "gateway middleware"]
sourceUrl: "https://github.com/express-rate-limit/express-rate-limit"
lastUpdated: "2026-04-01"
difficulty: advanced
owner: builder
pillar: "architecture"
---

# API Gateway with Rate Limiting

An Express-based API gateway with token bucket rate limiting and service routing.

## Implementation

```typescript
import express from 'express';
import httpProxy from 'http-proxy-middleware';

const app = express();

// --- Token Bucket Rate Limiter ---
interface Bucket {
  tokens: number;
  lastRefill: number;
}

class RateLimiter {
  private buckets = new Map<string, Bucket>();
  constructor(
    private maxTokens: number,
    private refillRate: number, // tokens per second
  ) {}

  consume(key: string): boolean {
    const now = Date.now();
    let bucket = this.buckets.get(key);

    if (!bucket) {
      bucket = { tokens: this.maxTokens, lastRefill: now };
      this.buckets.set(key, bucket);
    }

    // Refill tokens based on elapsed time
    const elapsed = (now - bucket.lastRefill) / 1000;
    bucket.tokens = Math.min(this.maxTokens, bucket.tokens + elapsed * this.refillRate);
    bucket.lastRefill = now;

    if (bucket.tokens >= 1) {
      bucket.tokens -= 1;
      return true;
    }
    return false;
  }
}

// 100 requests per minute per API key
const limiter = new RateLimiter(100, 100 / 60);

// --- Rate Limit Middleware ---
function rateLimitMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  const apiKey = req.headers['x-api-key'] as string ?? req.ip;
  if (!limiter.consume(apiKey)) {
    res.status(429).json({
      error: 'Too Many Requests',
      retryAfter: Math.ceil(60 / limiter['refillRate']),
    });
    return;
  }
  next();
}

app.use(rateLimitMiddleware);

// --- Service Routing ---
const serviceRoutes: Record<string, string> = {
  '/api/users': 'http://user-service:3001',
  '/api/products': 'http://product-service:3002',
  '/api/orders': 'http://order-service:3003',
};

for (const [path, target] of Object.entries(serviceRoutes)) {
  app.use(path, httpProxy.createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: { [`^${path}`]: '' },
  }));
}

// --- Health Check ---
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', services: Object.keys(serviceRoutes) });
});

app.listen(3000, () => console.log('Gateway listening on :3000'));
```

## Key Patterns

- **Token bucket algorithm**: smooth rate limiting that allows short bursts while enforcing long-term limits
- **Per-key limiting**: API key or IP-based, so one abusive client doesn't affect others
- **Path-based routing**: each prefix maps to a downstream microservice
- **429 with retryAfter**: tells clients exactly when to retry
