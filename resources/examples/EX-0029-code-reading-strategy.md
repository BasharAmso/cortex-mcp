---
id: EX-0029
name: Code Reading Strategy
category: examples
tags: [code-reading, codebase, imports, exports, dependency-graph, static-analysis, typescript]
capabilities: [entry-point-discovery, data-flow-tracing, dependency-mapping]
useWhen:
  - onboarding onto an unfamiliar codebase
  - tracing data flow through modules to understand behavior
  - mapping dependency graphs before a refactor
estimatedTokens: 620
relatedFragments: [SKL-0157, SKL-0158, PAT-0085]
dependencies: []
synonyms: ["code reading example", "codebase navigation", "source exploration", "code comprehension strategy", "module tracing"]
sourceUrl: "https://github.com/ts-morph/ts-morph"
lastUpdated: "2026-04-01"
difficulty: intermediate
owner: builder
pillar: "coding-literacy"
---

# Code Reading Strategy

A systematic approach to reading unfamiliar codebases by finding entry points, tracing data flow, and mapping dependencies.

## Implementation

```typescript
import * as fs from 'fs';
import * as path from 'path';

// --- Types ---
interface ModuleSummary {
  filePath: string;
  exports: string[];
  imports: ImportRef[];
  lineCount: number;
  hasDefaultExport: boolean;
}

interface ImportRef {
  name: string;
  source: string;
  isRelative: boolean;
}

interface DependencyNode {
  filePath: string;
  dependsOn: string[];
  dependedOnBy: string[];
}

// --- Entry Point Discovery ---
function findEntryPoints(packageJsonPath: string): string[] {
  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  const entries: string[] = [];

  if (pkg.main) entries.push(pkg.main);
  if (pkg.module) entries.push(pkg.module);
  if (pkg.exports) {
    const flat = typeof pkg.exports === 'string' ? [pkg.exports] : Object.values(pkg.exports);
    entries.push(...flat.filter((e): e is string => typeof e === 'string'));
  }
  if (pkg.bin) {
    const bins = typeof pkg.bin === 'string' ? [pkg.bin] : Object.values(pkg.bin);
    entries.push(...(bins as string[]));
  }

  return [...new Set(entries)];
}

// --- Import Extraction (regex-based, fast) ---
const IMPORT_RE = /import\s+(?:(?:\{[^}]*\}|[\w*]+)\s+from\s+)?['"]([^'"]+)['"]/g;

function extractImports(source: string): ImportRef[] {
  const imports: ImportRef[] = [];
  let match: RegExpExecArray | null;

  while ((match = IMPORT_RE.exec(source)) !== null) {
    const specifier = match[1];
    imports.push({
      name: specifier,
      source: specifier,
      isRelative: specifier.startsWith('.'),
    });
  }
  return imports;
}

// --- Export Extraction ---
const EXPORT_RE = /export\s+(?:default\s+)?(?:function|class|const|let|var|interface|type|enum)\s+(\w+)/g;

function extractExports(source: string): { names: string[]; hasDefault: boolean } {
  const names: string[] = [];
  let hasDefault = false;
  let match: RegExpExecArray | null;

  while ((match = EXPORT_RE.exec(source)) !== null) {
    names.push(match[1]);
  }
  if (source.includes('export default')) hasDefault = true;

  return { names, hasDefault };
}

// --- Module Summarizer ---
function summarizeModule(filePath: string): ModuleSummary {
  const source = fs.readFileSync(filePath, 'utf-8');
  const imports = extractImports(source);
  const { names, hasDefault } = extractExports(source);

  return {
    filePath,
    exports: names,
    imports,
    lineCount: source.split('\n').length,
    hasDefaultExport: hasDefault,
  };
}

// --- Dependency Graph Builder ---
function buildDependencyGraph(filePaths: string[]): Map<string, DependencyNode> {
  const graph = new Map<string, DependencyNode>();

  for (const fp of filePaths) {
    const summary = summarizeModule(fp);
    const node: DependencyNode = { filePath: fp, dependsOn: [], dependedOnBy: [] };

    for (const imp of summary.imports) {
      if (imp.isRelative) {
        const resolved = path.resolve(path.dirname(fp), imp.source) + '.ts';
        node.dependsOn.push(resolved);
      }
    }
    graph.set(fp, node);
  }

  // Back-fill reverse edges
  for (const [fp, node] of graph) {
    for (const dep of node.dependsOn) {
      graph.get(dep)?.dependedOnBy.push(fp);
    }
  }

  return graph;
}

// --- Usage ---
const entries = findEntryPoints('./package.json');
console.log('Entry points:', entries);

const summary = summarizeModule('./src/index.ts');
console.log(`${summary.filePath}: ${summary.exports.length} exports, ${summary.lineCount} lines`);
```

## Key Patterns

- **Entry point discovery**: reads `package.json` fields (main, module, exports, bin) to find where to start reading
- **Regex-based extraction**: fast import/export scanning without a full AST parser for quick orientation
- **Dependency graph**: builds forward and reverse edges so you can ask "who depends on this module?"
- **Module summary**: line count + export count helps prioritize which files to read first (high-export, low-line-count files are good starting points)
