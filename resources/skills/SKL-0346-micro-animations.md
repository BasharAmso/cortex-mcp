---
id: SKL-0346
name: Micro-Animations
category: skills
tags: [animation, micro-interaction, transition, framer-motion, spring-physics, hover, feedback, motion]
capabilities: [button-feedback, page-transitions, hover-effects, spring-animation, motion-design]
useWhen:
  - adding subtle feedback animations to buttons and controls
  - building page or route transitions
  - implementing hover and focus effects
  - choosing animation timing and easing curves
  - respecting reduced motion preferences
estimatedTokens: 650
relatedFragments: [SKL-0075, SKL-0005, SKL-0344, PAT-0178]
dependencies: []
synonyms: ["how to add animations to my app", "button press animation", "page transition effect", "spring animation in React", "hover effect best practices", "framer motion examples"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/framer/motion"
difficulty: intermediate
owner: "cortex"
pillar: "app-polish"
---

# Micro-Animations

Micro-animations give users instant feedback that their actions registered. They make interfaces feel responsive and alive without drawing attention to themselves. The best animation is one users feel but don't notice.

## Animation Purpose Categories

| Purpose | Example | Duration |
|---------|---------|----------|
| **Feedback** | Button press scale, checkbox tick | 100-200ms |
| **Transition** | Page change, modal open/close | 200-400ms |
| **Attention** | Notification badge pulse, error shake | 300-600ms |
| **Orientation** | Slide-in sidebar, accordion expand | 200-350ms |
| **Delight** | Confetti on success, like animation | 400-800ms |

## Button Feedback with Framer Motion

```jsx
import { motion } from 'framer-motion';

function AnimatedButton({ children, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
```

Spring physics feels more natural than linear or ease-in-out because it overshoots slightly and settles, mimicking real-world objects.

## Page Transitions

```jsx
import { AnimatePresence, motion } from 'framer-motion';

function PageWrapper({ children, key }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={key}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

- `mode="wait"` ensures the old page exits before the new one enters
- Keep transitions under 300ms; users perceive longer transitions as slow
- Vertical movement (y) suggests navigation depth; horizontal (x) suggests lateral navigation

## CSS-Only Micro-Animations

For simple effects, CSS is lighter than a library:

```css
.btn {
  transition: transform 150ms ease, box-shadow 150ms ease;
}
.btn:hover { transform: translateY(-1px); box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.btn:active { transform: translateY(0); box-shadow: none; }

.card {
  transition: transform 200ms ease, box-shadow 200ms ease;
}
.card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.08); }

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-4px); }
  40%, 80% { transform: translateX(4px); }
}
.error-shake { animation: shake 400ms ease-in-out; }
```

## Reduced Motion

Always respect the user's OS preference:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

```jsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const transition = prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 400 };
```

## Animation Timing Cheat Sheet

| Easing | Use For |
|--------|---------|
| `ease-out` | Elements entering (feels fast then settles) |
| `ease-in` | Elements exiting (accelerates away) |
| `ease-in-out` | Elements moving across screen |
| `spring` | Interactive elements (buttons, toggles, drags) |
| `linear` | Progress bars, continuous animations |

## Key Takeaways

- Use spring physics for interactive elements; they feel more natural than cubic-bezier curves
- Keep feedback animations under 200ms and transitions under 400ms
- Always provide a `prefers-reduced-motion` fallback
- CSS transitions are sufficient for hover/focus effects; use a library only for orchestrated sequences
- Animate transform and opacity only; animating layout properties (width, height, top) causes jank
