---
id: SKL-0310
name: Component Library Building
category: skills
tags: [design-system, storybook, component-library, documentation, versioning, ui-kit]
capabilities: [component-design, storybook-setup, design-token-management, library-publishing]
useWhen:
  - building a reusable component library or design system
  - setting up Storybook for component documentation
  - establishing design tokens for consistent theming
  - publishing a shared UI package across projects
  - standardizing UI components across a team
estimatedTokens: 650
relatedFragments: [SKL-0005, SKL-0309, PAT-0163]
dependencies: []
synonyms: ["how to build a design system", "how to set up Storybook", "how to create a reusable component library", "how to share UI components across projects", "how to document components", "how to version a component library"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/storybookjs/storybook"
difficulty: intermediate
owner: "cortex"
pillar: "frontend"
---

# Skill: Component Library Building

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0310 |
| **Name** | Component Library Building |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

A component library is a collection of reusable UI primitives with consistent styling, behavior, and documentation. The goal is to build once, use everywhere, and ship UI faster with fewer inconsistencies.

### Library Architecture

Organize components into layers of increasing complexity:

| Layer | Examples | Characteristics |
|-------|----------|----------------|
| **Tokens** | Colors, spacing, typography, shadows | Raw design values, no JSX |
| **Primitives** | Button, Input, Badge, Avatar | Single-purpose, highly reusable |
| **Composites** | Card, FormField, Dropdown, Modal | Combine primitives into patterns |
| **Templates** | PageHeader, Sidebar, DashboardLayout | Page-level composition |

### Design Tokens

Tokens are the single source of truth for visual consistency:

```typescript
// tokens.ts
export const tokens = {
  color: {
    primary: { 50: '#eff6ff', 500: '#3b82f6', 900: '#1e3a8a' },
    neutral: { 50: '#f9fafb', 500: '#6b7280', 900: '#111827' },
  },
  spacing: { xs: '0.25rem', sm: '0.5rem', md: '1rem', lg: '1.5rem', xl: '2rem' },
  radius: { sm: '0.25rem', md: '0.5rem', lg: '0.75rem', full: '9999px' },
  shadow: { sm: '0 1px 2px rgba(0,0,0,0.05)', md: '0 4px 6px rgba(0,0,0,0.07)' },
};
```

Map tokens to CSS custom properties or Tailwind theme config. Never use raw hex values in components.

### Storybook Setup

Storybook provides an isolated environment for developing, testing, and documenting components:

```typescript
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { variant: 'primary', children: 'Click me' } };
export const Secondary: Story = { args: { variant: 'secondary', children: 'Click me' } };
export const Disabled: Story = { args: { variant: 'primary', disabled: true, children: 'Disabled' } };
```

### Component API Design Principles

1. **Consistent prop naming** — use `variant`, `size`, `disabled`, `className` across all components.
2. **Composable over configurable** — prefer `<Card><CardHeader /><CardBody /></Card>` over `<Card header="..." body="..." />`.
3. **Forward refs** — always use `forwardRef` so parent components can access DOM nodes.
4. **Spread remaining props** — pass `...rest` to the root element for flexibility.
5. **Default to accessible** — include ARIA attributes, keyboard handling, and focus management by default.

### Versioning and Publishing

For shared libraries consumed by multiple projects:

- Use **semantic versioning**: breaking changes bump major, new features bump minor, fixes bump patch.
- Publish to a private npm registry or use a monorepo with workspace references.
- Include a **CHANGELOG.md** that describes what changed in each version.
- Ship both ESM and CJS builds using a tool like tsup or Rollup.
- Include TypeScript type definitions in the published package.

## Anti-Patterns

- Building a component library before you have three or more consumers
- Designing components in isolation without real use cases from the product
- Exposing internal implementation details in the component API
- Skipping Storybook stories (undocumented components get reinvented)
- Using raw color values instead of design tokens

## Key Takeaways

- Start with tokens, build primitives on top, compose into patterns
- Every component gets a Storybook story with all variants documented
- Consistent prop naming and composable APIs make the library intuitive
- Design tokens are non-negotiable for visual consistency
- Only build a shared library when you have real consumers and repeated patterns
