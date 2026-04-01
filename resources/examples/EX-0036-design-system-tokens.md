---
id: EX-0036
name: Design System Tokens
category: examples
tags: [design-tokens, design-system, css, typography, spacing, colors, theming, typescript]
capabilities: [token-definition, css-variable-generation, theme-management]
useWhen:
  - defining a design token system with colors, spacing, and typography
  - generating CSS custom properties from TypeScript token definitions
  - building a multi-theme design system with light and dark modes
estimatedTokens: 650
relatedFragments: [SKL-0056, SKL-0057, PAT-0043]
dependencies: []
synonyms: ["design tokens example", "design system variables", "css custom properties generator", "theme tokens", "style dictionary"]
sourceUrl: "https://github.com/amzn/style-dictionary"
lastUpdated: "2026-04-01"
difficulty: intermediate
owner: builder
pillar: "ux-design"
---

# Design System Tokens

Design token system with color scales, spacing, typography, and CSS variable generator.

## Implementation

```typescript
// --- Token Types ---
interface ColorScale {
  50: string; 100: string; 200: string; 300: string;
  400: string; 500: string; 600: string; 700: string;
  800: string; 900: string;
}

interface TypographyToken {
  fontFamily: string;
  fontSize: string;
  fontWeight: number;
  lineHeight: string;
  letterSpacing: string;
}

interface SpacingScale {
  xs: string; sm: string; md: string; lg: string;
  xl: string; '2xl': string; '3xl': string;
}

interface BreakpointScale {
  sm: string; md: string; lg: string; xl: string; '2xl': string;
}

interface DesignTokens {
  colors: Record<string, ColorScale | string>;
  typography: Record<string, TypographyToken>;
  spacing: SpacingScale;
  borderRadius: Record<string, string>;
  breakpoints: BreakpointScale;
  shadows: Record<string, string>;
}

// --- Token Definitions ---
const tokens: DesignTokens = {
  colors: {
    primary: {
      50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd',
      400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8',
      800: '#1e40af', 900: '#1e3a8a',
    },
    neutral: {
      50: '#fafafa', 100: '#f5f5f5', 200: '#e5e5e5', 300: '#d4d4d4',
      400: '#a3a3a3', 500: '#737373', 600: '#525252', 700: '#404040',
      800: '#262626', 900: '#171717',
    },
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  typography: {
    h1: { fontFamily: 'Inter, sans-serif', fontSize: '2.25rem', fontWeight: 700, lineHeight: '1.2', letterSpacing: '-0.02em' },
    h2: { fontFamily: 'Inter, sans-serif', fontSize: '1.875rem', fontWeight: 600, lineHeight: '1.25', letterSpacing: '-0.01em' },
    h3: { fontFamily: 'Inter, sans-serif', fontSize: '1.5rem', fontWeight: 600, lineHeight: '1.3', letterSpacing: '0' },
    body: { fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: 400, lineHeight: '1.5', letterSpacing: '0' },
    caption: { fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 400, lineHeight: '1.4', letterSpacing: '0.01em' },
  },
  spacing: { xs: '0.25rem', sm: '0.5rem', md: '1rem', lg: '1.5rem', xl: '2rem', '2xl': '3rem', '3xl': '4rem' },
  borderRadius: { none: '0', sm: '0.25rem', md: '0.5rem', lg: '1rem', full: '9999px' },
  breakpoints: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 6px rgba(0,0,0,0.07)',
    lg: '0 10px 15px rgba(0,0,0,0.1)',
  },
};

// --- CSS Variable Generator ---
function tokensToCSSVariables(tokens: DesignTokens): string {
  const lines: string[] = [':root {'];

  // Colors
  for (const [name, value] of Object.entries(tokens.colors)) {
    if (typeof value === 'string') {
      lines.push(`  --color-${name}: ${value};`);
    } else {
      for (const [shade, hex] of Object.entries(value)) {
        lines.push(`  --color-${name}-${shade}: ${hex};`);
      }
    }
  }

  // Spacing
  for (const [size, val] of Object.entries(tokens.spacing)) {
    lines.push(`  --spacing-${size}: ${val};`);
  }

  // Typography
  for (const [name, typo] of Object.entries(tokens.typography)) {
    lines.push(`  --font-size-${name}: ${typo.fontSize};`);
    lines.push(`  --font-weight-${name}: ${typo.fontWeight};`);
    lines.push(`  --line-height-${name}: ${typo.lineHeight};`);
  }

  // Border radius
  for (const [name, val] of Object.entries(tokens.borderRadius)) {
    lines.push(`  --radius-${name}: ${val};`);
  }

  // Shadows
  for (const [name, val] of Object.entries(tokens.shadows)) {
    lines.push(`  --shadow-${name}: ${val};`);
  }

  lines.push('}');
  return lines.join('\n');
}

// --- Theme Override ---
interface ThemeOverride {
  name: string;
  selector: string; // e.g., '[data-theme="dark"]'
  overrides: Record<string, string>; // variable name -> new value
}

function generateThemeCSS(theme: ThemeOverride): string {
  const lines = [`${theme.selector} {`];
  for (const [varName, value] of Object.entries(theme.overrides)) {
    lines.push(`  --${varName}: ${value};`);
  }
  lines.push('}');
  return lines.join('\n');
}

// --- Contrast Checker (WCAG) ---
function hexToLuminance(hex: string): number {
  const rgb = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255);
  const linear = rgb.map(c => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrastRatio(hex1: string, hex2: string): number {
  const l1 = hexToLuminance(hex1);
  const l2 = hexToLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// --- Usage ---
const css = tokensToCSSVariables(tokens);
console.log(css);

const ratio = contrastRatio('#1e3a8a', '#ffffff');
console.log(`Contrast ratio: ${ratio.toFixed(2)}:1 (${ratio >= 4.5 ? 'PASSES' : 'FAILS'} WCAG AA)`);
```

## Key Patterns

- **Tokens as TypeScript**: type-safe token definitions catch typos at compile time, not in production
- **CSS variable generation**: single source of truth compiled to CSS custom properties for runtime theming
- **10-shade color scales**: consistent ramp from 50 (lightest) to 900 (darkest) for flexible UI composition
- **WCAG contrast checker**: validates color pairs meet 4.5:1 AA minimum before shipping
