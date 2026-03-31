---
id: PAT-0190
name: Financial Data Security
category: patterns
tags: [financial-security, encryption, pci, audit-logging, tokenization, compliance, data-protection, fraud]
capabilities: [encryption-at-rest, pci-compliance, audit-logging, data-tokenization]
useWhen:
  - securing financial data in a banking or fintech application
  - implementing encryption for sensitive financial records
  - designing PCI DSS compliance for payment card handling
  - building audit logging for financial transactions
  - implementing tokenization to reduce sensitive data exposure
estimatedTokens: 650
relatedFragments: [SKL-0367, SKL-0371, SKL-0363, PAT-0188]
dependencies: []
synonyms: ["how to secure financial data in an app", "PCI compliance for payment processing", "encryption for banking applications", "audit logging for financial transactions", "tokenization vs encryption for card data", "fintech security best practices"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: intermediate
owner: "cortex"
pillar: "finance"
---

# Financial Data Security

Financial data requires defense-in-depth: encryption, access control, audit logging, and compliance with standards like PCI DSS. A breach of financial data has immediate, material consequences for users.

## Data Classification

| Classification | Examples | Protection Level |
|---------------|---------|-----------------|
| **Card Data (PCI)** | Card number, CVV, expiration | Highest: PCI DSS scope, tokenize immediately |
| **Account Credentials** | Banking login, API keys, tokens | Highest: encrypt, never log, rotate regularly |
| **Account Numbers** | Bank account, routing numbers | High: encrypt at rest, mask in display |
| **Transaction Data** | Purchase history, amounts, merchants | Medium: encrypt at rest, access-controlled |
| **Aggregated Data** | Monthly totals, category summaries | Standard: access-controlled, not individually sensitive |

## Encryption Strategy

```typescript
// Encryption at rest: AES-256-GCM for all sensitive fields
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

class FieldEncryption {
  private algorithm = 'aes-256-gcm';

  encrypt(plaintext: string, key: Buffer): EncryptedField {
    const iv = randomBytes(12);
    const cipher = createCipheriv(this.algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
    const authTag = cipher.getAuthTag();
    return { encrypted: encrypted.toString('base64'), iv: iv.toString('base64'), authTag: authTag.toString('base64') };
  }

  decrypt(field: EncryptedField, key: Buffer): string {
    const decipher = createDecipheriv(this.algorithm, Buffer.from(field.iv, 'base64'));
    decipher.setAuthTag(Buffer.from(field.authTag, 'base64'));
    return decipher.update(Buffer.from(field.encrypted, 'base64')) + decipher.final('utf8');
  }
}

// Key management: never hardcode keys
// Use AWS KMS, GCP Cloud KMS, or Azure Key Vault for key storage
// Implement key rotation on a quarterly schedule
```

## Tokenization

Replace sensitive values with non-reversible tokens to reduce PCI scope:

```typescript
// Tokenization flow for card data
// Card number enters your system → immediately tokenize → store only the token

interface TokenizedCard {
  token: string;              // 'tok_1234567890abcdef' (not reversible without vault)
  last4: string;              // '4242' (for display only)
  brand: string;              // 'visa'
  expiryMonth: number;
  expiryYear: number;
}

// Use Stripe, Braintree, or Adyen for tokenization
// Card numbers NEVER touch your servers if using their client-side SDKs (Stripe.js, etc.)
// This keeps your entire backend out of PCI scope
```

## PCI DSS Requirements (Simplified)

If you handle card data, PCI DSS applies. Key requirements:

| Requirement | Implementation |
|-------------|---------------|
| **1. Network segmentation** | Isolate payment systems in a separate network/VPC |
| **2. No default passwords** | Change all vendor defaults before deployment |
| **3. Protect stored data** | Encrypt cardholder data at rest; never store CVV |
| **4. Encrypt transmission** | TLS 1.2+ for all data in transit |
| **5. Anti-malware** | Maintain updated antivirus on all systems |
| **6. Secure development** | Code review, vulnerability scanning, dependency audits |
| **7. Access control** | Need-to-know basis; no shared accounts |
| **8. Unique IDs** | Every person has a unique system identifier |
| **9. Physical security** | Restrict physical access to cardholder data systems |
| **10. Logging** | Log all access to cardholder data; retain 1 year |
| **11. Testing** | Quarterly vulnerability scans, annual penetration tests |
| **12. Policy** | Maintain a security policy document |

The easiest path: **never let card numbers touch your servers.** Use Stripe.js or similar to tokenize client-side.

## Audit Logging

```typescript
interface FinancialAuditEntry {
  timestamp: Date;
  userId: string;
  action: 'view' | 'create' | 'update' | 'delete' | 'export' | 'transfer';
  resourceType: 'account' | 'transaction' | 'payment' | 'card' | 'report';
  resourceId: string;
  ipAddress: string;
  userAgent: string;
  details: string;                 // 'Viewed account ending 4242'
  sensitiveFieldsAccessed?: string[];
}

// Audit logs are append-only (immutable)
// Ship to a separate log store that application code cannot modify
// Retain for 7 years (regulatory requirement in many jurisdictions)
// Alert on anomalies: bulk exports, off-hours access, new IP addresses
```

## Display Masking

Never show full sensitive values in the UI:

- Account numbers: `****4242`
- Card numbers: `**** **** **** 4242`
- SSN/Tax ID: `***-**-6789`
- Routing numbers: `****5678`

## Key Takeaways

- Tokenize card data client-side (Stripe.js) to keep your entire backend out of PCI scope
- Encrypt sensitive fields at rest with AES-256-GCM and manage keys via cloud KMS
- Audit log every access to financial data; make logs immutable and retain for 7 years
- Mask all sensitive numbers in the UI; never display full account or card numbers
- The easiest security win is reducing scope: handle less sensitive data, not more
