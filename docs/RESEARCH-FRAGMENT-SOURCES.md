# Fragment Source Research — Repos That Could Power Cortex MCP

> Researched: 2026-03-29
> Purpose: Identify repos with teachable knowledge convertible to Cortex MCP fragments

## The Big Finds

### claude-code-plugins-plus-skills (2,811 skills)
- URL: https://github.com/jeremylongshore/claude-code-plugins-plus-skills
- 415 plugins, 154 agents, 22 categories
- Markdown-based skills directly convertible to fragments

### book-genesis (21 writing skills + research-backed knowledge)
- URL: https://github.com/PhilipStark/book-genesis
- 5 knowledge files based on academic ML studies (20K+ novels analyzed)
- Data-driven: emotional arcs, dialogue ratios, readability targets, title patterns
- 21 skills: narrative-foundation, prose-craft, dialogue-polish, hook-craft, voice-fingerprint, continuity-guardian, beta-reader, editorial-package, series-architect, and more

### Prompt Engineering Guide (55k+ stars)
- URL: https://github.com/dair-ai/prompt-engineering-guide
- Prompt patterns, chain-of-thought, few-shot, RAG techniques

### Product Manager Skills (agent-ready business frameworks)
- URL: https://github.com/deanpeters/Product-Manager-Skills
- Ansoff, BCG, Porter's 5 Forces, Blue Ocean, SWOT in structured format

---

## By Domain

### AI / LLM / Prompt Engineering
| Repo | Stars | Fragments |
|------|-------|-----------|
| dair-ai/prompt-engineering-guide | 55k+ | 20-30 prompt patterns |
| Meirtz/Awesome-Context-Engineering | New | Context engineering frameworks |
| Eric-LLMs/Awesome-AI-Engineering | Growing | Agent + RAG architecture patterns |
| vinnybellack/PromptWeaver-RAG-Edition | New | RAG prompt templates |

### DevOps / Deployment
| Repo | Stars | Fragments |
|------|-------|-----------|
| mehdihadeli/awesome-software-architecture | Large | K8s deployment strategies, microservices patterns |
| cogniolab/multi-cloud-agent-deployment | New | AI agent deployment on AWS/GCP/Azure |

### Business / Product
| Repo | Stars | Fragments |
|------|-------|-----------|
| deanpeters/Product-Manager-Skills | New | Strategy frameworks in agent-ready format |
| dend/awesome-product-management | 1k+ | Product strategy, prioritization |
| LisaDziuba/Awesome-Product-Marketing | — | Marketing campaigns, launch playbooks |

### Book Writing / Creative
| Repo | Stars | Fragments |
|------|-------|-----------|
| PhilipStark/book-genesis | 50 | 30-50 (21 skills + 5 knowledge files) |
| olivierkes/manuskript | 2,235 | Character sheets, Snowflake Method, worldbuilding |
| raestrada/storycraftr | 121 | AI writing workflow, RAG continuity |
| indentlabs/notebook | 399 | Worldbuilding templates (characters, magic, languages) |
| owlchester/kanka | 324 | RPG/worldbuilding management |
| jenniferlynparsons/awesome-writing | 693 | Writing resource index |
| btford/write-good | 5,066 | Prose quality rules (linting patterns) |

### Construction / Engineering
| Repo | Stars | Fragments |
|------|-------|-----------|
| IfcOpenShell/IfcOpenShell | 2,425 | BIM standards, building element classifications |
| datadrivenconstruction/OpenConstructionEstimate | — | 55K work items, cost estimation workflows |
| mitevpi/awesome-bim | 172 | AEC technology landscape |
| QuantumNovice/awesome-civil-engineering | — | Civil engineering resource catalog |
| dicktracey909/awesome-construction-calculators | 9 | Material estimation formulas for every trade |

### Restaurant / Hospitality
| Repo | Stars | Fragments |
|------|-------|-----------|
| Qloapps/QloApps | 12,737 | Hotel PMS, booking, revenue management |
| ury-erp/ury | 240 | Table management, KOT flow, bill splitting |
| tastyigniter/TastyIgniter | — | Online ordering, reservations |
| openfoodfacts/openfoodfacts-server | 966 | Food labeling, allergen tracking |

### Healthcare
| Repo | Stars | Fragments |
|------|-------|-----------|
| openemr/openemr | 5,053 | Clinical workflows, HIPAA compliance, billing codes |
| kakoni/awesome-healthcare | 3,709 | Healthcare standards (HL7, FHIR, DICOM) |
| hapifhir/hapi-fhir | 2,298 | FHIR resource types, clinical data exchange |
| openmrs/openmrs-core | 1,802 | Patient workflows, medical terminology |
| synthetichealth/synthea | 3,057 | Disease progression models, care plans |

### Real Estate
| Repo | Stars | Fragments |
|------|-------|-----------|
| etewiah/awesome-real-estate | 298 | RE technology landscape, valuation methods |
| open-condo-software/condo | 325 | Property management, maintenance workflows |
| crankstorn/real-estate-analysis | 24 | Cap rate, ROI, rental yield formulas |

### Education
| Repo | Stars | Fragments |
|------|-------|-----------|
| openedx/openedx-platform | 8,053 | Course design, grading, assessment types |
| moodle/moodle | 6,943 | Learning activities, rubrics, competency frameworks |
| classroomio/classroomio | 1,487 | Modern course creation workflows |
| Zc0812/Edu_Planner | — | AI lesson planning |

### Legal
| Repo | Stars | Fragments |
|------|-------|-----------|
| jhpyle/docassemble | 929 | Legal document assembly, interview flows |
| SuffolkLITLab/docassemble-AssemblyLine | 57 | Court form templates, jurisdiction rules |
| SuffolkLITLab/legal-tech-class | 29 | Legal tech curriculum |

### Finance / Accounting
| Repo | Stars | Fragments |
|------|-------|-----------|
| frappe/erpnext | 32,550 | Accounting, invoicing, tax, procurement, HR |
| Gnucash/gnucash | 4,149 | Double-entry bookkeeping, reconciliation |
| LongOnly/Quantitative-Notebooks | 1,320 | DCF, Monte Carlo, portfolio optimization |
| actualbudget/actual | 25,699 | Envelope budgeting methodology |

### Trades (HVAC, Plumbing, Electrical)
| Repo | Stars | Fragments |
|------|-------|-----------|
| OCA/field-service | 179 | Work orders, dispatch, preventive maintenance |
| simeononsecurity/Manual-J-Load-Calculator | 6 | HVAC load calculations (Manual J standard) |
| TunaLobster/pyduct | 16 | Duct sizing, pressure drop, airflow calcs |

---

## Fragment Potential Summary

| Domain | Estimated Fragments | Best Source |
|--------|-------------------|-------------|
| Dev methodology (OMC) | 28 | oh-my-claudecode |
| Dev skills (marketplace) | 200-300 | claude-code-plugins-plus-skills |
| AI/LLM patterns | 20-30 | Prompt Engineering Guide |
| Business/Product | 15-20 | Product Manager Skills |
| Book writing | 30-50 | book-genesis |
| Construction | 10-15 | OpenConstructionEstimate |
| Restaurant/Hospitality | 10-15 | QloApps + URY |
| Healthcare | 15-20 | OpenEMR + awesome-healthcare |
| Real Estate | 10-15 | awesome-real-estate + Condo |
| Education | 10-15 | Open edX + Moodle |
| Legal | 10-15 | Docassemble |
| Finance/Accounting | 15-20 | ERPNext + GnuCash |
| Trades (HVAC etc.) | 5-10 | Field Service + Manual J |

**Total potential: 400-550+ fragments across 13 domains**
