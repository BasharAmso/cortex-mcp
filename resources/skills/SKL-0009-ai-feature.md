---
id: SKL-0009
name: AI Feature Implementation
category: skills
tags: [ai, llm, rag, prompts, machine-learning, embeddings, agents]
capabilities: [llm-integration, rag-pipelines, prompt-engineering, guardrails, cost-control]
useWhen:
  - building an AI-powered feature with LLM calls
  - implementing RAG (retrieval augmented generation) pipelines
  - designing prompt templates or agentic workflows
  - adding guardrails, fallbacks, or evaluation to AI features
estimatedTokens: 650
relatedFragments: [SKL-0006, SKL-0010, SKL-0012]
dependencies: []
synonyms: ["add AI to my app", "use ChatGPT in my project", "build a RAG pipeline", "I need prompt engineering help", "make my app smarter with AI"]
lastUpdated: "2026-03-29"
difficulty: advanced
---

# AI Feature Implementation

Build AI-powered features (LLM integrations, RAG pipelines, prompt engineering, agentic workflows) with production-grade reliability, cost control, and quality evaluation.

## Architecture Selection

| Use Case | Architecture |
|----------|-------------|
| Q&A over documents | RAG (Retrieval Augmented Generation) |
| Structured data extraction | Prompt engineering with JSON output mode |
| Multi-step automation | Agentic with tool use |
| Classification / routing | Classifier prompt or fine-tuned model |
| Chat / conversation | Stateful conversation with system prompt |
| Content generation | Prompt engineering with temperature control |

## Procedure

### 1. Define Requirements

Extract from the PRD: what the AI does, model selection, performance thresholds, guardrails, and cost model.

### 2. Build AI Service Layer

Organize in `src/services/ai/`:
- `client.js` — model client setup, auth, retry config
- `prompts/[feature].js` — all prompt templates (never inline prompts)
- `[feature]-service.js` — feature-specific AI logic
- `guardrails.js` — input/output validation

### 3. Non-Negotiables

- **Pin model versions** (e.g., `claude-sonnet-4-6`, not `claude-sonnet`)
- **Set explicit parameters:** temperature, max_tokens, top_p
- **Handle all failures:** rate limit (backoff), timeout, low confidence, model error
- **Log token usage** per request and set max_tokens to minimum needed
- **Cache identical requests** for cost reduction

### 4. Implement Guardrails

**Input:** Validate length, check injection patterns, redact PII

**Output:** Check confidence, validate schema, flag unsourced claims

**Fallback hierarchy:** Retry simplified prompt, then rule-based fallback, then "I'm not sure" message — never return empty

### 5. RAG Pipeline (If Applicable)

- Chunk documents: 800-1200 tokens with 10-15% overlap
- Embed and retrieve top-K results
- Instruct model to cite sources and say "I don't know" when context is insufficient

### 6. Evaluation

Write a golden set of at least 10 test cases with expected outputs and must-not-contain rules.

## Key Constraints

- Never use floating model aliases — always pin versions
- Never put prompts inline — always in dedicated files
- Never ship without a fallback for model failure
- Never send PII to external models without authorization
- Never set max_tokens to unlimited
