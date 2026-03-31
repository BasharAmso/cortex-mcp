---
id: SKL-0349
name: Print Stylesheet
category: skills
tags: [print, css, media-print, page-break, invoice, stylesheet, pdf, paper]
capabilities: [print-styling, page-break-control, print-layout, invoice-printing]
useWhen:
  - adding print support to a web application
  - creating printable invoices, receipts, or reports
  - controlling page breaks and headers in print output
  - hiding navigation and interactive elements in print view
  - generating PDF-like output from HTML
estimatedTokens: 550
relatedFragments: [SKL-0005, SKL-0019, PAT-0048]
dependencies: []
synonyms: ["how to make a page printable", "print CSS stylesheet", "hide nav when printing", "printable invoice template", "page break in CSS", "print-friendly version"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: beginner
owner: "cortex"
pillar: "app-polish"
---

# Print Stylesheet

Print stylesheets ensure that when users hit Ctrl+P, they get a clean, readable document instead of a mess of navigation bars, sidebars, and broken layouts. This is essential for invoices, reports, receipts, and any content users might want on paper.

## Base Print Reset

```css
@media print {
  /* Hide non-content elements */
  nav, footer, .sidebar, .toolbar, .toast-container,
  .modal-backdrop, .chat-widget, [role="banner"],
  button:not(.print-visible), .no-print {
    display: none !important;
  }

  /* Reset backgrounds and colors for ink savings */
  body {
    background: white !important;
    color: black !important;
    font-size: 12pt;
    line-height: 1.5;
  }

  /* Make links visible as text */
  a[href]::after {
    content: " (" attr(href) ")";
    font-size: 0.8em;
    color: #666;
  }
  a[href^="#"]::after,
  a[href^="javascript"]::after {
    content: none;
  }

  /* Full width layout */
  .container, main {
    width: 100% !important;
    max-width: none !important;
    margin: 0 !important;
    padding: 0 !important;
  }
}
```

## Page Break Control

```css
@media print {
  /* Avoid breaking inside these elements */
  table, figure, blockquote, pre, .card {
    break-inside: avoid;
  }

  /* Start new page before major sections */
  h1 {
    break-before: page;
  }

  /* Keep headings with their content */
  h2, h3, h4 {
    break-after: avoid;
  }

  /* Minimum lines before/after page break */
  p {
    orphans: 3;
    widows: 3;
  }
}
```

## Invoice / Receipt Template

```css
@media print {
  @page {
    size: A4;
    margin: 2cm;
  }

  .invoice-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2cm;
  }

  .invoice-table {
    width: 100%;
    border-collapse: collapse;
  }
  .invoice-table th,
  .invoice-table td {
    border-bottom: 1px solid #ccc;
    padding: 8pt 4pt;
    text-align: left;
  }
  .invoice-table .amount {
    text-align: right;
    font-variant-numeric: tabular-nums;
  }

  .invoice-total {
    margin-top: 1cm;
    text-align: right;
    font-size: 14pt;
    font-weight: bold;
  }
}
```

## Print-Specific JavaScript

```jsx
function PrintButton({ contentRef }) {
  const handlePrint = () => {
    // Add print class for any JS-dependent styling
    document.body.classList.add('printing');
    window.print();
    document.body.classList.remove('printing');
  };

  return (
    <button onClick={handlePrint} className="no-print">
      Print / Save as PDF
    </button>
  );
}
```

## Print Checklist

- [ ] All navigation, footers, and interactive elements hidden
- [ ] Content uses full page width
- [ ] Background colors removed (or explicitly kept for branded headers)
- [ ] Links show their URLs in parentheses
- [ ] Tables don't break across pages awkwardly
- [ ] Images have explicit dimensions to prevent reflow
- [ ] Font size is 12pt minimum for readability
- [ ] Page margins set via `@page` rule

## Key Takeaways

- Always include `@media print` styles, even if just to hide nav and sidebar
- Use `break-inside: avoid` on cards, tables, and figures to prevent ugly splits
- Set `orphans: 3` and `widows: 3` to avoid single-line paragraphs at page boundaries
- Test with the browser's print preview, not just by reading the CSS
- For invoices and reports, use `@page` to set proper paper size and margins
