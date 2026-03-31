---
id: SKL-0369
name: Expense Management
category: skills
tags: [expense-management, receipt-scanning, approval-workflow, expense-reports, reimbursement, business, ocr]
capabilities: [receipt-scanning, expense-categorization, approval-workflow, report-generation]
useWhen:
  - building a business expense management system
  - implementing receipt scanning with OCR
  - designing approval workflows for expense reports
  - creating expense reporting and reimbursement features
  - automating expense categorization and policy compliance
estimatedTokens: 650
relatedFragments: [SKL-0366, SKL-0370, SKL-0372, PAT-0188]
dependencies: []
synonyms: ["how to build an expense tracker for business", "receipt scanning OCR integration", "expense approval workflow design", "employee expense report system", "reimbursement app development", "business expense categorization"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/frappe/erpnext"
difficulty: beginner
owner: "cortex"
pillar: "finance"
---

# Expense Management

Expense management systems help organizations track, approve, and reimburse employee spending. ERPNext's open-source approach demonstrates patterns for receipt processing, approval chains, and reporting that scale from small teams to enterprises.

## Data Model

```typescript
interface Expense {
  id: string;
  employeeId: string;
  amount: number;
  currency: string;
  category: 'travel' | 'meals' | 'lodging' | 'transport' | 'supplies' | 'software' | 'client-entertainment' | 'other';
  description: string;
  merchantName: string;
  date: Date;
  receiptUrl?: string;            // Uploaded receipt image
  ocrData?: ReceiptOCR;
  projectCode?: string;
  costCenter?: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected' | 'reimbursed';
  policyViolations?: string[];
}

interface ExpenseReport {
  id: string;
  employeeId: string;
  title: string;                   // 'Q1 Client Visit - Chicago'
  expenses: string[];              // Expense IDs
  totalAmount: number;
  submittedAt?: Date;
  approvedAt?: Date;
  approvedBy?: string;
  status: 'draft' | 'submitted' | 'under-review' | 'approved' | 'rejected' | 'paid';
  comments: Comment[];
}

interface ReceiptOCR {
  merchantName: string;
  total: number;
  tax?: number;
  date: string;
  lineItems?: { description: string; amount: number }[];
  confidence: number;              // 0-1 OCR confidence score
}
```

## Receipt Scanning

OCR extracts key fields from receipt photos:

```typescript
async function processReceipt(imageUrl: string): Promise<ReceiptOCR> {
  // Use Google Cloud Vision, AWS Textract, or Azure Form Recognizer
  const ocrResult = await ocrService.analyzeReceipt(imageUrl);

  return {
    merchantName: ocrResult.merchant?.value || '',
    total: parseFloat(ocrResult.total?.value || '0'),
    tax: parseFloat(ocrResult.tax?.value || '0'),
    date: ocrResult.transactionDate?.value || '',
    lineItems: ocrResult.items?.map(item => ({
      description: item.description?.value || '',
      amount: parseFloat(item.totalPrice?.value || '0')
    })),
    confidence: ocrResult.confidence
  };
}

// Pre-fill expense form from OCR results; let user correct any errors
function createExpenseFromReceipt(ocr: ReceiptOCR): Partial<Expense> {
  return {
    merchantName: ocr.merchantName,
    amount: ocr.total,
    date: new Date(ocr.date),
    category: categorizeByMerchant(ocr.merchantName), // Auto-categorize
  };
}
```

## Approval Workflow

Define approval chains based on amount and employee level:

| Amount Range | Approval Required |
|-------------|-------------------|
| Under $50 | Auto-approved |
| $50 - $500 | Direct manager |
| $500 - $5,000 | Manager + department head |
| Over $5,000 | Manager + department head + finance |

```typescript
function getApprovalChain(expense: Expense, employee: Employee): Approver[] {
  const chain: Approver[] = [];

  if (expense.amount >= 50) chain.push(employee.directManager);
  if (expense.amount >= 500) chain.push(employee.departmentHead);
  if (expense.amount >= 5000) chain.push({ role: 'finance-team' });

  return chain;
}
```

## Policy Compliance

Automatically flag expenses that violate company policy:

- **Per-diem limits**: meal expense exceeds daily allowance for the travel destination
- **Category limits**: "Software" purchases over $100 require pre-approval
- **Receipt required**: all expenses over $25 must have a receipt attached
- **Timeliness**: expenses older than 60 days flagged as "late submission"
- **Duplicate detection**: same amount + merchant + date within 24 hours

Flag violations but allow submission with justification. Do not hard-block since edge cases are common.

## Reporting

Generate reports for finance teams:

- **By department**: total spend per department per month
- **By category**: spending breakdown across expense categories
- **By employee**: individual spending patterns and compliance rates
- **Budget vs. actual**: department spending against allocated budget
- **Export**: CSV and PDF for accounting system import

## Key Takeaways

- OCR receipt scanning should pre-fill forms, not replace human review (confidence varies)
- Approval chains should scale with expense amount; auto-approve small amounts
- Policy compliance flags should warn, not hard-block; edge cases need human judgment
- Duplicate detection prevents double-submission of the same receipt
- Export to CSV/PDF is essential for integration with existing accounting systems
