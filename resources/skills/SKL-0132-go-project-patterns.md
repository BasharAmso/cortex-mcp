---
id: SKL-0132
name: Go Project Patterns
category: skills
tags: [go, golang, project-layout, interfaces, error-handling, concurrency, goroutines, channels, testing, modules]
capabilities: [go-project-structure, concurrent-programming, interface-design, error-handling]
useWhen:
  - starting a new Go project and choosing directory structure
  - designing interfaces or error handling in Go
  - writing concurrent code with goroutines and channels
  - setting up Go modules and dependency management
  - writing idiomatic Go tests
estimatedTokens: 700
relatedFragments: [SKL-0006, PAT-0006]
dependencies: []
synonyms: ["go project structure", "golang best practices", "how to organize go code", "go error handling patterns", "golang concurrency", "go directory layout"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/golang-standards/project-layout"
difficulty: intermediate
owner: cortex
pillar: "language"
---

# Go Project Patterns

Idiomatic Go project structure, interfaces, error handling, and concurrency patterns.

## Project Layout

```
myapp/
  cmd/myapp/          # main.go — minimal, imports from internal/
  internal/           # Private code (compiler-enforced, cannot be imported externally)
    app/              # Application logic
    pkg/              # Shared internal libraries
  pkg/                # Public library code safe for external import
  api/                # OpenAPI specs, protobuf definitions
  configs/            # Config templates
  scripts/            # Build and automation scripts
  test/               # Integration test data and helpers
  go.mod              # Module definition
```

**Key rules:** Start simple (single `main.go` + `go.mod`). Add structure as complexity grows. Never use a top-level `/src` directory — that's a Java convention, not Go.

## Interfaces — Accept Interfaces, Return Structs

```go
// Define small, focused interfaces at the consumer site
type Reader interface {
    Read(p []byte) (n int, err error)
}

func Process(r Reader) error {
    buf := make([]byte, 1024)
    n, err := r.Read(buf)
    // ...
}
```

Keep interfaces small (1-3 methods). Define them where they're used, not where they're implemented.

## Error Handling

```go
// Wrap errors with context
if err != nil {
    return fmt.Errorf("failed to open config: %w", err)
}

// Check specific errors
if errors.Is(err, os.ErrNotExist) {
    // handle missing file
}
```

Never ignore errors. Use `%w` for wrapping so callers can unwrap with `errors.Is` and `errors.As`. Define sentinel errors for your package's known failure modes.

## Concurrency — Goroutines and Channels

```go
func fetchAll(urls []string) []Result {
    ch := make(chan Result, len(urls))

    for _, url := range urls {
        go func(u string) {
            ch <- fetch(u)
        }(url)
    }

    results := make([]Result, 0, len(urls))
    for range urls {
        results = append(results, <-ch)
    }
    return results
}
```

**Rules:** Don't start goroutines you can't stop. Use `context.Context` for cancellation. Use `sync.WaitGroup` when you need to wait for a group of goroutines. Channels are for communication; mutexes are for state protection.

## Testing

```go
func TestAdd(t *testing.T) {
    tests := []struct {
        name     string
        a, b     int
        expected int
    }{
        {"positive", 2, 3, 5},
        {"zero", 0, 0, 0},
        {"negative", -1, 1, 0},
    }
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            if got := Add(tt.a, tt.b); got != tt.expected {
                t.Errorf("Add(%d, %d) = %d, want %d", tt.a, tt.b, got, tt.expected)
            }
        })
    }
}
```

Table-driven tests are the Go standard. Use `t.Run` for subtests. Place test files next to the code they test (`foo_test.go` alongside `foo.go`).
