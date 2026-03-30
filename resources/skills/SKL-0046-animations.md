---
id: SKL-0046
name: Web Animations
category: skills
tags: [animation, css, framer-motion, transitions, scroll, performance, motion]
capabilities: [css-transitions, keyframe-animations, scroll-animations, motion-library-usage, performance-optimization]
useWhen:
  - adding entrance animations or page transitions
  - building scroll-triggered reveal effects
  - implementing micro-interactions on buttons, cards, or modals
  - choosing between CSS animations and a JS animation library
estimatedTokens: 650
relatedFragments: [SKL-0005, SKL-0053, SKL-0020, SKL-0047]
dependencies: []
synonyms: ["how do I add animations to my website", "make things fade in when I scroll", "my page feels static and boring", "should I use Framer Motion or CSS", "add some motion to my UI"]
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# Web Animations

Add motion that feels intentional, not decorative. Every animation should serve a purpose: guide attention, show relationships, or confirm actions.

## When to Use What

| Technique | Best For | Complexity |
|-----------|----------|------------|
| CSS `transition` | Hover states, color changes, simple transforms | Low |
| CSS `@keyframes` | Looping animations, loading spinners, entrance effects | Low |
| Framer Motion | Layout animations, gestures, orchestrated sequences | Medium |
| GSAP | Complex timelines, SVG morphing, scroll-scrubbing | High |

**Default choice:** CSS transitions for interactions, Framer Motion for page/component animations.

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

**Rules:** Only animate `transform` and `opacity` for 60fps performance. Animating `width`, `height`, `top`, or `margin` triggers layout recalculation and causes jank.

## Scroll-Triggered Entrance

Using Framer Motion's `whileInView`:

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

For staggered lists:

```tsx
<motion.ul variants={container} initial="hidden" whileInView="visible">
  {items.map((item, i) => (
    <motion.li key={item.id} variants={child}>
      {item.name}
    </motion.li>
  ))}
</motion.ul>

const container = { visible: { transition: { staggerChildren: 0.07 } } };
const child = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
```

## Performance Rules

| Do | Do Not |
|----|--------|
| Animate `transform`, `opacity` | Animate `width`, `height`, `top`, `left`, `margin` |
| Use `will-change` sparingly on animated elements | Add `will-change` to everything |
| Set `viewport={{ once: true }}` for scroll reveals | Re-trigger animations on every scroll |
| Keep durations 150-500ms | Use durations over 1s for UI elements |

## Accessibility: Respect Reduced Motion

Every animated component must include this:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Or in Framer Motion:

```tsx
const prefersReducedMotion = useReducedMotion();
const animation = prefersReducedMotion ? {} : { y: [20, 0], opacity: [0, 1] };
```

## Easing Reference

| Easing | Feel | Use For |
|--------|------|---------|
| `ease-out` | Decelerating, natural | Entrances, reveals |
| `ease-in` | Accelerating | Exits, dismissals |
| `ease-in-out` | Smooth arc | Position changes |
| `spring` (Framer) | Bouncy, physical | Toggles, drags, playful UI |
