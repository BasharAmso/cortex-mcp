---
id: PAT-0213
name: Document Generation Pattern
category: patterns
tags: [document-generation, templates, merge-fields, pdf-generation, batch-output, reporting]
capabilities: [template-based-generation, merge-field-processing, pdf-output, batch-document-creation]
useWhen:
  - generating documents from templates with dynamic data
  - creating PDFs from HTML templates or data sources
  - building batch document generation workflows
  - implementing mail merge or form letter generation
  - producing invoices, contracts, or reports programmatically
estimatedTokens: 650
relatedFragments: [SKL-0413, SKL-0416, SKL-0419, PAT-0215]
dependencies: []
synonyms: ["how to generate PDFs from templates", "document template engine", "mail merge automation", "how to create invoices programmatically", "batch document generation", "how to generate contracts from data"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/pandoc/pandoc"
difficulty: intermediate
owner: "cortex"
pillar: "domain-specific"
---

# Document Generation Pattern

Strategies for generating documents from templates, from simple mail merge to complex multi-format output pipelines.

## Generation Approaches

| Approach | Input | Output | Best For |
|----------|-------|--------|----------|
| **HTML to PDF** | HTML + CSS template | PDF | Invoices, reports, certificates |
| **Template Engine** | Markdown/DOCX + data | Multiple formats | Contracts, letters, proposals |
| **Spreadsheet** | Data + template | XLSX/CSV | Financial reports, data exports |
| **Pandoc Pipeline** | Markdown + metadata | PDF, DOCX, HTML | Technical docs, publications |

## HTML-to-PDF Pipeline

The most flexible approach for styled documents. Design templates in HTML/CSS, inject data, render to PDF. Tools: WeasyPrint (Python, CSS Paged Media), Puppeteer/Playwright (headless Chrome), Prince (commercial, best CSS support).

```python
from weasyprint import HTML
from jinja2 import Template

template = Template(open('invoice.html').read())
html = template.render(
    invoice_number='INV-2024-001',
    line_items=items,
    total=total
)
HTML(string=html).write_pdf('invoice.pdf')
```

## Template Design Principles

1. **Separate template from data.** Templates define layout and styling. Data comes from a JSON/database source. Never hardcode content in templates.
2. **Use merge fields consistently.** `{{field_name}}` for simple values, `{% for item in items %}` for loops, `{% if condition %}` for conditionals.
3. **Handle missing data gracefully.** Default values for optional fields. Never render "undefined" or "null" in output.
4. **Version templates.** Store templates in version control. Changes to templates affect all future documents.
5. **Preview before generation.** Provide a preview endpoint that renders the template with sample data.

## Batch Generation

For bulk document creation (hundreds of invoices, certificates, letters):

1. **Queue-based processing.** Submit a batch job, process documents asynchronously.
2. **Parallel rendering.** Generate multiple documents concurrently with worker pools.
3. **Progress tracking.** Report completion percentage and ETA.
4. **Error handling.** Log failures per document, continue processing the batch. Generate an error report.
5. **Output packaging.** Zip individual files or merge into a single multi-page PDF.

## Pandoc for Multi-Format Output

Pandoc converts between dozens of document formats. Write content once in Markdown, output to PDF (via LaTeX), DOCX, HTML, or EPUB. Use YAML front matter for metadata. Custom templates control formatting per output format. This is ideal for technical documentation that needs to exist in multiple formats.

## Anti-Patterns

- Generating documents synchronously in the request/response cycle (use async)
- Storing generated documents permanently without a cleanup policy
- Using string concatenation instead of a proper template engine
- Ignoring character encoding (always use UTF-8)
- Not testing templates with edge cases (empty lists, long text, special characters)
