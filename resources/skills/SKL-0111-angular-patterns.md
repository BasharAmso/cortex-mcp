---
id: SKL-0111
name: Angular Patterns
category: skills
tags: [angular, typescript, components, services, dependency-injection, rxjs, signals, standalone, reactive-forms]
capabilities: [angular-components, dependency-injection, rxjs-patterns, signals-reactivity, standalone-components]
useWhen:
  - building Angular components and services
  - implementing dependency injection and service architecture
  - using RxJS observables or Angular signals for reactivity
  - migrating to standalone components from NgModules
  - building reactive forms with validation
estimatedTokens: 700
relatedFragments: [SKL-0005, SKL-0006, PAT-0002]
dependencies: []
synonyms: ["how to build Angular components", "Angular dependency injection", "Angular signals tutorial", "RxJS best practices Angular", "standalone components Angular", "Angular service architecture"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/angular/angular"
difficulty: intermediate
---

# Angular Patterns

Build structured web applications with Angular's opinionated component-service architecture. Angular provides dependency injection, reactivity (RxJS + signals), routing, forms, and HTTP out of the box.

## Standalone Components (Default since Angular 17)

All new components should be standalone. No `NgModule` required. Import dependencies directly in the component decorator.

```typescript
@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `<div class="card"><h3>{{ user().name }}</h3></div>`,
})
export class UserCardComponent {
  user = input.required<User>();
}
```

## Signals (Angular 16+)

Signals provide synchronous, fine-grained reactivity without RxJS. Use for component state and template bindings.

| API | Purpose |
|-----|---------|
| `signal()` | Writable reactive value |
| `computed()` | Derived value, auto-tracks dependencies |
| `effect()` | Side effect that runs when dependencies change |
| `input()` | Signal-based component input |
| `output()` | Component output emitter |
| `model()` | Two-way binding signal |

## When Signals vs RxJS

- **Signals:** Synchronous state, template bindings, simple derived values, component inputs/outputs.
- **RxJS:** Async streams, HTTP requests, WebSocket data, complex event composition (debounce, merge, switchMap).

They interop: `toSignal()` converts Observable to Signal, `toObservable()` converts Signal to Observable.

## Service Architecture

Services are injectable singletons by default (`providedIn: 'root'`). Layer them:

1. **Data services** — HTTP calls, WebSocket connections. Return Observables.
2. **State services** — Hold application state as signals or BehaviorSubjects.
3. **Facade services** — Orchestrate multiple data/state services. Components inject facades, not raw data services.

## Dependency Injection

Use constructor injection or the `inject()` function. Prefer `inject()` in standalone components for cleaner code. Provide services at the appropriate level: root (singleton), route (per-route), or component (per-instance).

## Reactive Forms

Use `FormBuilder` with `FormGroup` and `FormControl` for complex forms. Apply validators declaratively. Access form state through signals or value changes observable.

```typescript
form = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(8)]],
});
```

## Project Structure

```
src/app/
  core/         # singleton services, guards, interceptors
  shared/       # reusable components, pipes, directives
  features/
    users/
      user-list.component.ts
      user-detail.component.ts
      user.service.ts
      user.routes.ts
```

Use lazy-loaded routes per feature. Define route configs in feature-level `*.routes.ts` files.
