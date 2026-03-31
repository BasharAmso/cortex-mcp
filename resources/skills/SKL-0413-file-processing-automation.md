---
id: SKL-0413
name: File Processing Automation
category: skills
tags: [file-processing, csv, pdf, batch-processing, watch-folders, image-processing]
capabilities: [csv-parsing, pdf-generation, batch-file-operations, file-watching]
useWhen:
  - processing CSV, Excel, or JSON files in bulk
  - generating or manipulating PDF documents
  - automating image resizing or conversion
  - setting up watch folders for automatic processing
  - building batch file transformation pipelines
estimatedTokens: 650
relatedFragments: [SKL-0411, SKL-0414, PAT-0212, PAT-0213]
dependencies: []
synonyms: ["how to process CSV files automatically", "batch file processing", "PDF generation automation", "watch folder automation", "how to resize images in bulk", "how to automate file conversions"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/n8n-io/n8n"
difficulty: beginner
owner: "cortex"
pillar: "automation"
---

# Skill: File Processing Automation

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0413 |
| **Name** | File Processing Automation |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

File processing automation handles the repetitive work of reading, transforming, and writing files at scale. From CSV imports to PDF generation to image resizing, automation eliminates manual effort and reduces errors.

### CSV and Tabular Data

| Tool | Language | Strengths |
|------|----------|-----------|
| **pandas** | Python | Data analysis, large datasets |
| **csv module** | Python | Lightweight, no dependencies |
| **Papa Parse** | JavaScript | Browser + Node.js, streaming |
| **SheetJS** | JavaScript | Excel/XLSX read/write |

For CSV processing: stream large files instead of loading everything into memory. Validate headers before processing rows. Handle encoding issues (UTF-8 BOM, Latin-1). Use typed parsing to convert strings to numbers and dates during import.

```python
import pandas as pd

df = pd.read_csv('input.csv', dtype={'zipcode': str})
df = df.dropna(subset=['email'])
df['name'] = df['name'].str.strip().str.title()
df.to_csv('cleaned.csv', index=False)
```

### PDF Processing

Generate PDFs with templates using libraries like WeasyPrint (HTML to PDF), ReportLab (Python), or PDFKit (Node.js). Extract text from PDFs with pdfplumber or PyMuPDF. For form-filling, use pdf-lib (JavaScript) or PyPDF2. Merge and split PDFs with PyPDF2 or pdf-lib.

### Image Processing

Use Sharp (Node.js) or Pillow (Python) for resizing, cropping, format conversion, and optimization. Process images in parallel for throughput. Set quality parameters to balance file size and visual quality. Generate thumbnails at standard sizes (150x150, 300x300, 600x600).

### Watch Folders

Monitor directories for new files and process them automatically. Use `chokidar` (Node.js) or `watchdog` (Python). Process files atomically: write to a temp location, then move to the output folder. Handle partial uploads by waiting for file size to stabilize before processing.

### Batch Processing Patterns

1. **Queue-based.** Drop files into an input folder, workers pull from the queue.
2. **Pipeline.** Chain processing steps: validate, transform, output.
3. **Scheduled.** Cron job processes all files in a folder at a set interval.

Track processed files (database, rename, or move to "done" folder) to prevent reprocessing.

## Key Takeaways

- Stream large files instead of loading entirely into memory
- Validate file structure and encoding before processing
- Use watch folders with atomic writes for reliable automation
- Track processed files to prevent duplicate processing
- Process images and PDFs in parallel for throughput
