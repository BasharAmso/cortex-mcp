# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/).

## [0.5.1] - 2026-04-01

### Added
- ESLint v9 flat config with `@typescript-eslint`
- Prettier with consistent formatting across codebase
- `lint`, `format`, and `format:check` npm scripts
- CI workflow now includes lint + format check
- `search_metrics` diagnostic tool (6th MCP tool): query counts, tier resolution rates, zero-result frequency, top-10 retrieved fragments
- `SearchMetrics` interface in matching engine with per-query tier tracking
- Per-fragment retrieval counter in `get_fragment` handler
- Metrics summary logged to stderr every 100 queries
- `tests/search-metrics.test.ts` with 6 tests

### Fixed
- Scorer crash on non-string values in fragment tag arrays (`v.toLowerCase is not a function`)

## [0.5.0] - 2026-04-01

### Added
- 22 new code examples (EX-0029 through EX-0050) covering all remaining zero-coverage pillars
- All 26 pillars now have at least 1 example (12 previously uncovered pillars filled)
- 18 more skills cross-linked to examples
- Pillar coverage assertion in tests (all 26 pillars must have examples)
- Example count assertion bumped to >= 50

### Changed
- Fragment count: 706 to 728
- Example count: 28 to 50 (50 total across all 26 pillars)
- Tests: 144 to 175

## [0.4.3] - 2026-04-01

### Added
- 12 new code examples (EX-0017 through EX-0028) covering game-dev, ecommerce, architecture, product-business, sales, business-automation, education, and IoT
- Bidirectional cross-links: 20 skills now reference related examples
- Fragment quality test expanded to sample new examples (144 tests, up from 107)
- Example count assertion in tests (>= 28)

### Changed
- Fragment count: 694 to 706
- Example-to-skill ratio: 27:1 to 16:1

## [0.4.2] - 2026-04-01

### Added
- Mermaid architecture diagrams in `docs/ARCHITECTURE.md` (renders on GitHub)
- Two-Layer System Overview diagram showing Cortex + Bashi relationship
- Skill Calling Cortex integration pattern diagram
- GitHub Actions CI workflow (typecheck, test, build, build-index)
- CONTRIBUTING.md with fragment submission guide
- Pull request template with quality checklist
- This changelog

## [0.4.1] - 2026-04-01

### Added
- Routing-signal descriptions on all 5 MCP tools (agents see when to use each tool)
- Dynamic fragment count in `search_knowledge` description (self-updates)
- "For Skill Authors" section in README
- Regression test for tool descriptions (prevents silent description loss)
- Fragment quality smoke test (76 assertions across 12 sampled fragments)

### Fixed
- README skill count: 444 to 443 (actual)
- Server version: 0.1.0 to 0.4.1 (was stale since initial scaffold)

## [0.4.0] - 2026-03-31

### Added
- 430 new fragments across 26 pillars (264 to 694 total)
- 5 new pillars: coding-literacy, business-automation, sales, market-research, personal-brand
- All 26 pillars at 15-30+ fragments each
- npm v0.4.0 published

### Fixed
- `tokenize()` bug that affected index building

## [0.3.0] - 2026-03-30

### Added
- Pillar system for domain-based filtering across all tools
- 39 domain fragments (ecommerce, game-dev, automation, finance, education, IoT, health, collaboration, religious, engineering)
- Developer growth skills (reading code, debugging, shipping, marketing)
- Bashi rename across all files

## [0.2.0] - 2026-03-30

### Added
- Pillar 3: 18 architecture + language + AI pipeline fragments
- npm v0.2.0 published (220 fragments)

### Changed
- Full library rewrite: all fragments research-grounded from open-source repos
- 25 new UX/platform/polish fragments

## [0.1.0] - 2026-03-29

### Added
- Initial MCP server with 5 tools, 3 resources, 3 prompts
- Three-tier matching engine (cache, index, fuzzy)
- Token budgeter with 4 output modes
- 83 knowledge fragments across agents, skills, patterns, examples
- Synonym matching, AI-Memory reader, detect_project tool
- npm package configured as `cortex-mcp-server`
