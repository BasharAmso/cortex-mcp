---
id: SKL-0151
name: Healthcare Data with FHIR
category: skills
tags: [fhir, healthcare, hl7, interoperability, patient-data, clinical, ehr, medical-api, rest-api, bundles]
capabilities: [fhir-resource-modeling, clinical-data-exchange, patient-record-management, search-parameter-design, profile-validation]
useWhen:
  - building a healthcare app that exchanges clinical data
  - integrating with electronic health record (EHR) systems
  - modeling patient, observation, or encounter resources
  - implementing FHIR RESTful APIs or search parameters
  - ensuring interoperability between health systems
estimatedTokens: 700
relatedFragments: [SKL-0152, PAT-0077, SKL-0010, PAT-0002]
dependencies: []
synonyms: ["how to work with medical data APIs", "how to build a health records app", "what is FHIR and how to use it", "how to exchange patient data between systems", "how to connect to hospital systems", "how to model clinical data"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/hapifhir/hapi-fhir"
difficulty: intermediate
owner: "cortex"
pillar: "health"
---

# Skill: Healthcare Data with FHIR

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0151 |
| **Version** | 1.0 |
| **Owner** | cortex |
| **Inputs** | Clinical data requirements, target EHR systems, compliance constraints |
| **Outputs** | FHIR resource definitions, API endpoints, search parameters, validation profiles |
| **Triggers** | `HEALTHCARE_INTEGRATION_REQUESTED` |

---

## Purpose

Build healthcare applications that exchange clinical data using the FHIR (Fast Healthcare Interoperability Resources) standard. FHIR is the modern standard for health data exchange, backed by HL7 and adopted by major EHR vendors. HAPI FHIR is the reference Java implementation with a rich ecosystem.

---

## Core FHIR Resources

| Resource | Purpose | Example |
|----------|---------|---------|
| **Patient** | Demographics and identifiers | Name, DOB, address, MRN |
| **Observation** | Clinical measurements | Blood pressure, lab results, vitals |
| **Encounter** | Visit or admission record | ER visit, inpatient stay |
| **Condition** | Diagnoses and problems | Diabetes, hypertension |
| **MedicationRequest** | Prescriptions | Drug, dosage, frequency |
| **DiagnosticReport** | Lab or imaging results | CBC panel, X-ray report |

---

## RESTful API Pattern

FHIR uses standard HTTP verbs on typed resource endpoints:

- `GET /Patient/123` -- read a single patient
- `GET /Patient?name=Smith` -- search by parameter
- `POST /Patient` -- create a new patient
- `PUT /Patient/123` -- update an existing patient
- `DELETE /Patient/123` -- remove a patient

**Bundles** group multiple resources into a single request. Use `transaction` bundles for atomic writes and `searchset` bundles for query results.

---

## Key Concepts

1. **Profiles** constrain base resources for a use case (e.g., US Core profiles mandate specific fields for US healthcare).
2. **Search parameters** let clients query by date, code, reference, or token. Chain parameters for cross-resource queries: `Observation?patient.name=Smith`.
3. **Terminology binding** links coded fields to standard vocabularies (SNOMED CT, LOINC, ICD-10).
4. **Validation** ensures resources conform to profiles before storage. Reject non-conforming data at the API boundary.

---

## Constraints

- Never store unencrypted protected health information (PHI)
- Always validate resources against required profiles before persisting
- Never expose patient data without proper authentication and authorization
- Always use HTTPS for FHIR API endpoints
- Always include audit logging for data access (required for HIPAA)
- Never hardcode patient identifiers in application code

---

## Definition of Done

- [ ] FHIR resources modeled for the use case
- [ ] RESTful endpoints implemented with proper HTTP verbs
- [ ] Search parameters defined and tested
- [ ] Profiles applied and validation enabled
- [ ] Authentication and authorization enforced
- [ ] Audit logging in place for PHI access
- [ ] Bundle operations tested for atomicity
