---
id: SKL-0133
name: Rust Idioms & Patterns
category: skills
tags: [rust, ownership, borrowing, lifetimes, traits, pattern-matching, error-handling, result, option, iterators, cargo]
capabilities: [ownership-reasoning, trait-design, error-handling, idiomatic-rust]
useWhen:
  - writing Rust code and reasoning about ownership and borrowing
  - choosing between Result, Option, and panic for error handling
  - designing APIs with traits and generics
  - using iterators and pattern matching effectively
  - structuring a Rust project with cargo workspaces
estimatedTokens: 700
relatedFragments: [SKL-0006, PAT-0001]
dependencies: []
synonyms: ["rust best practices", "how does rust ownership work", "rust error handling", "rust traits and generics", "idiomatic rust code", "rust beginner patterns"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/rust-unofficial/patterns"
difficulty: advanced
owner: cortex
---

# Rust Idioms & Patterns

Ownership-aware patterns, idiomatic error handling, and trait-based design in Rust.

## Ownership & Borrowing

The core mental model: every value has one owner. When ownership moves, the original binding is invalid.

```rust
fn process(data: Vec<u8>) { /* owns data, freed on return */ }
fn inspect(data: &[u8])   { /* borrows, caller keeps ownership */ }
fn modify(data: &mut Vec<u8>) { /* exclusive mutable borrow */ }
```

**Rules of thumb:**
- Accept borrowed types for arguments (`&str` not `String`, `&[T]` not `Vec<T>`)
- Return owned types from constructors and builders
- Use `Clone` intentionally, not to silence the borrow checker

## Error Handling — Result and Option

```rust
use std::io;

fn read_config(path: &str) -> Result<Config, io::Error> {
    let content = std::fs::read_to_string(path)?;  // ? propagates error
    let config = parse(&content).map_err(|e| io::Error::new(io::ErrorKind::InvalidData, e))?;
    Ok(config)
}
```

Use `Result<T, E>` for recoverable errors and `Option<T>` for absent values. Reserve `panic!` for unrecoverable bugs. The `?` operator replaces verbose match chains. For applications, use `anyhow`; for libraries, use `thiserror`.

## Pattern Matching

```rust
match status {
    Status::Active { since } if since.year() > 2024 => handle_recent(),
    Status::Active { .. } => handle_legacy(),
    Status::Suspended(reason) => log_suspension(&reason),
    _ => handle_default(),
}
```

Pattern matching is exhaustive. The compiler ensures you handle every variant. Use destructuring to extract fields directly in the match arm.

## Traits — Behavior Contracts

```rust
trait Summary {
    fn summarize(&self) -> String;

    // Default implementation
    fn preview(&self) -> String {
        format!("{}...", &self.summarize()[..50])
    }
}

impl Summary for Article {
    fn summarize(&self) -> String {
        format!("{} by {}", self.title, self.author)
    }
}
```

Prefer small, focused traits. Use `impl Trait` in argument position for simple generics: `fn notify(item: &impl Summary)`.

## Iterators

```rust
let total: u64 = transactions
    .iter()
    .filter(|t| t.status == Status::Complete)
    .map(|t| t.amount)
    .sum();
```

Iterator chains are zero-cost abstractions, compiled to the same code as hand-written loops. Prefer `iter()` chains over index-based for loops.

## Cargo Workspace Structure

```
my_workspace/
  Cargo.toml          # [workspace] members = ["core", "cli", "api"]
  core/               # Shared library crate
  cli/                # Binary crate
  api/                # Binary crate
```

Use workspaces to share dependencies and compile times across related crates. The RAII pattern (Drop trait) handles resource cleanup automatically.
