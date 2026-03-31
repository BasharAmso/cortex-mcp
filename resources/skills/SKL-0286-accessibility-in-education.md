---
id: SKL-0286
name: Accessibility in Education
category: skills
tags: [accessibility, wcag, screen-readers, captions, alt-text, aria, inclusive-design]
capabilities: [accessible-lms-design, screen-reader-optimization, caption-systems, inclusive-content-delivery]
useWhen:
  - making a learning platform WCAG 2.1 AA compliant
  - adding screen reader support to course content
  - implementing closed captions for educational video
  - ensuring assessments are keyboard-navigable
  - designing accessible document and PDF viewers
estimatedTokens: 650
relatedFragments: [SKL-0147, SKL-0148, PAT-0150]
dependencies: []
synonyms: ["how to make my LMS accessible", "WCAG for education platforms", "screen reader support for courses", "accessible quiz design", "how to add captions to course videos", "ADA compliance for e-learning"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/overhangio/tutor"
difficulty: beginner
owner: "cortex"
pillar: "education"
---

# Skill: Accessibility in Education

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0286 |
| **Name** | Accessibility in Education |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Educational platforms serve diverse learners including those with visual, auditory, motor, and cognitive disabilities. Accessibility is not an afterthought — it shapes architecture from day one.

### WCAG 2.1 AA Baseline for LMS

Every page must meet four principles: **Perceivable**, **Operable**, **Understandable**, **Robust**. For education, the highest-impact requirements are:

1. **Semantic HTML for course content.** Lessons rendered as `<article>` with proper heading hierarchy (`h1` for title, `h2` for sections). Never use `<div>` soup for content that screen readers must navigate. Use `role="region"` with `aria-label` on distinct course sections (syllabus, content area, discussion).

2. **Video and audio captions.** Every video needs synchronized closed captions (WebVTT format). Provide transcripts as downloadable alternatives. Auto-generated captions are a starting point — always allow instructor correction. Store captions as a separate asset linked to the video record, not embedded.

3. **Alt text strategy.** Informational images get descriptive alt text. Decorative images get `alt=""`. Diagrams and charts need long descriptions via `aria-describedby` pointing to a hidden text block, or a visible "Description" toggle. Instructors need an alt-text field in the content editor — make it required, not optional.

4. **Keyboard navigation for assessments.** Quizzes must be fully operable via keyboard. Radio buttons and checkboxes use native HTML elements (not custom divs). Drag-and-drop questions need a keyboard alternative (e.g., a select dropdown). Focus trapping inside modals must include an escape route. Tab order follows visual order.

5. **Color and contrast.** Grade indicators (pass/fail, score ranges) must not rely on color alone — add icons or text labels. Minimum 4.5:1 contrast for body text, 3:1 for large headings. Progress bars need a numeric percentage alongside the visual fill.

6. **Timed assessment accommodations.** Provide configurable time extensions (1.5x, 2x, unlimited) as an accessibility setting per learner. The timer component announces remaining time to screen readers via `aria-live="polite"` at intervals, switching to `aria-live="assertive"` under one minute.

### Content Authoring Accessibility

The course editor itself must guide instructors toward accessible content:
- Heading level enforcement (warn if h3 follows h1)
- Required alt text prompt on image upload
- Color contrast checker for custom-styled text
- Caption upload requirement before video publish

### Testing Checklist

- Run axe-core or Lighthouse on every page template
- Test full quiz flow with NVDA or VoiceOver
- Verify all interactive elements have visible focus indicators
- Confirm `prefers-reduced-motion` disables animations

## Key Takeaways

- Semantic HTML and native form elements solve 60% of accessibility issues before any ARIA is needed
- Captions, alt text, and keyboard navigation are the three highest-impact areas for education
- Build accessibility into the content editor so instructors produce accessible content by default
- Timed assessments need configurable accommodations as a first-class feature, not an admin hack
- Automated tools catch ~30% of issues — manual screen reader testing is essential
