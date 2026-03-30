---
id: SKL-0047
name: Web Animations
category: skills
tags: [animation, css, framer-motion, transitions, scroll, performance, motion, gsap, keyframes, micro-interactions]
capabilities: [css-transitions, keyframe-animations, scroll-animations, motion-library-usage, performance-optimization]
useWhen:
  - adding entrance animations or page transitions
  - building scroll-triggered reveal effects
  - implementing micro-interactions on buttons, cards, or modals
  - choosing between CSS animations and a JS animation library
  - building loading spinners or skeleton pulse effects
estimatedTokens: 650
relatedFragments: [SKL-0005, SKL-0054, SKL-0023, SKL-0048]
dependencies: []
synonyms: ["how do I add animations to my website", "make things fade in when I scroll", "my page feels static and boring", "should I use Framer Motion or CSS", "add some motion to my UI"]
sourceUrl: "https://github.com/streamich/awesome-css-animations"
lastUpdated: "2026-03-29"
difficulty: intermediate
owner: builder
---

# Web Animations

Add motion that feels intentional, not decorative. Every animation should serve a purpose: guide attention, show relationships, or confirm actions.

## Library and Technique Selection

| Technique | Best For | Bundle Cost | Complexity |
|-----------|----------|-------------|------------|
| CSS `transition` | Hover states, color changes, simple transforms | 0kb | Low |
| CSS `@keyframes` | Looping animations, spinners, pulse effects | 0kb | Low |
| CSS Scroll-Driven Animations | Native scroll-linked effects (no JS) | 0kb | Low |
| **Framer Motion** | Layout animations, gestures, orchestrated sequences | ~30kb | Medium |
| **GSAP** | Complex timelines, SVG morphing, scroll-scrubbing | ~25kb | High |
| **Animate.css** | Drop-in entrance/exit classes | ~4kb | Low |
| **Motion One** | Lightweight Web Animations API wrapper | ~4kb | Low |

**Default choice:** CSS transitions for interactions, Framer Motion for page/component animations in React projects.

## CSS Transitions (Start Here)

```css
.card {
  transition: transform 200ms ease-out, box-shadow 200ms ease-out;
}
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}
```

**GPU rule:** Only animate `transform` and `opacity` for 60fps. Animating `width`, `height`, `top`, or `margin` triggers layout recalculation and causes jank.

## Scroll-Triggered Entrance (Framer Motion)

```tsx
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true, margin: "-100px" }}
>
  <Card />
</motion.div>
```

Staggered lists use `variants` with `staggerChildren`:

```tsx
const container = { visible: { transition: { staggerChildren: 0.07 } } };
const child = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
```

## CSS Scroll-Driven Animations (Native)

Modern browsers support scroll-linked animations without JavaScript:

```css
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.reveal {
  animation: fade-in linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}
```

## Performance Rules

| Do | Do Not |
|----|--------|
| Animate `transform`, `opacity` | Animate `width`, `height`, `top`, `left`, `margin` |
| Use `will-change` sparingly on animated elements | Add `will-change` to everything |
| Set `viewport={{ once: true }}` for scroll reveals | Re-trigger animations on every scroll |
| Keep durations 150-500ms | Use durations over 1s for UI elements |

## Easing Reference

| Easing | Feel | Use For |
|--------|------|---------|
| `ease-out` | Decelerating, natural | Entrances, reveals |
| `ease-in` | Accelerating | Exits, dismissals |
| `ease-in-out` | Smooth arc | Position changes |
| `spring` (Framer) | Bouncy, physical | Toggles, drags, playful UI |
| `cubic-bezier(0.34, 1.56, 0.64, 1)` | Overshoot | Playful entrance pops |

## Accessibility: Respect Reduced Motion

Every animated component must honor user preference:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

In Framer Motion: `const prefersReducedMotion = useReducedMotion();`
