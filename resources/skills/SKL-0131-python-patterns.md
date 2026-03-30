---
id: SKL-0131
name: Python Design Patterns & Idioms
category: skills
tags: [python, design-patterns, factory, observer, decorator, strategy, context-manager, generators, type-hints, virtual-environment]
capabilities: [pattern-selection, idiomatic-python, project-structure, type-safety]
useWhen:
  - choosing a design pattern for a Python project
  - writing idiomatic Python instead of Java-style code
  - structuring a Python package or module layout
  - adding type hints to an existing codebase
  - setting up a Python project with virtual environments
estimatedTokens: 700
relatedFragments: [SKL-0006, PAT-0006]
dependencies: []
synonyms: ["python best practices", "how to structure python code", "python factory pattern", "pythonic way to do this", "python project layout", "design patterns in python"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/faif/python-patterns"
difficulty: intermediate
owner: cortex
---

# Python Design Patterns & Idioms

Idiomatic Python patterns that leverage the language's strengths instead of porting patterns from other languages.

## Key Design Patterns

### Factory — Dynamic Object Creation

```python
class Serializer:
    def create(self, format: str):
        if format == "json":
            return JsonSerializer()
        if format == "xml":
            return XmlSerializer()
        raise ValueError(f"Unknown format: {format}")
```

### Strategy — Swappable Behavior via Functions

Python doesn't need a strategy class hierarchy. Functions are first-class:

```python
def process(data: list, strategy=sorted):
    return strategy(data)

process(items, strategy=lambda x: sorted(x, reverse=True))
```

### Observer — Event Notification

```python
class Event:
    def __init__(self):
        self._subscribers = []

    def subscribe(self, fn):
        self._subscribers.append(fn)

    def emit(self, *args):
        for fn in self._subscribers:
            fn(*args)
```

### Decorator — Wrapping Behavior

```python
import functools

def retry(max_attempts=3):
    def decorator(fn):
        @functools.wraps(fn)
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return fn(*args, **kwargs)
                except Exception:
                    if attempt == max_attempts - 1:
                        raise
        return wrapper
    return decorator
```

## Python-Specific Idioms

1. **Modules are singletons.** Don't write a Singleton class. Use module-level state.
2. **Context managers** for resource cleanup (`with open(...) as f:`). Write your own with `@contextmanager`.
3. **Generators** for lazy evaluation — prefer `yield` over building lists in memory.
4. **Comprehensions** over `map`/`filter` — `[x*2 for x in items if x > 0]` is clearer.
5. **Favor composition over inheritance** — deep class hierarchies are an anti-pattern.

## Type Hints

```python
from typing import Optional

def find_user(user_id: int) -> Optional["User"]:
    ...
```

Use `mypy` or `pyright` in CI. Type hints are documentation that the toolchain can verify.

## Project Structure

```
my_project/
  src/my_project/    # Package code
    __init__.py
    core.py
  tests/
  pyproject.toml     # Modern config (replaces setup.py)
  .venv/             # Virtual environment (never commit)
```

Always use virtual environments (`python -m venv .venv`). Pin dependencies in `requirements.txt` or use `uv` / `poetry` for lock files.
