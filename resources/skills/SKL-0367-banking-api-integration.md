---
id: SKL-0367
name: Banking API Integration
category: skills
tags: [banking-api, plaid, open-banking, account-aggregation, transaction-sync, financial-data, psd2]
capabilities: [plaid-integration, account-aggregation, transaction-sync, balance-retrieval]
useWhen:
  - connecting a finance app to bank accounts via Plaid or Open Banking
  - implementing account aggregation from multiple financial institutions
  - syncing bank transactions into an application
  - building real-time balance checking features
  - integrating with financial data providers
estimatedTokens: 650
relatedFragments: [SKL-0366, SKL-0368, PAT-0188, PAT-0190]
dependencies: []
synonyms: ["how to connect to bank accounts with Plaid", "Open Banking API integration", "transaction sync from bank accounts", "account aggregation across banks", "Plaid Link implementation guide", "financial data API connection"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/maybe-finance/maybe"
difficulty: intermediate
owner: "cortex"
pillar: "finance"
---

# Banking API Integration

Banking API integration lets apps connect to users' bank accounts to read balances, transactions, and account details. Plaid is the dominant US provider; Open Banking (PSD2) is the EU standard. Maybe Finance's open-source personal finance app demonstrates clean Plaid integration patterns.

## Provider Landscape

| Provider | Region | Model | Key Features |
|----------|--------|-------|-------------|
| **Plaid** | US, CA, UK, EU | Aggregator | Transactions, balances, identity, investments |
| **Teller** | US | Direct API | Real-time transactions, no screen scraping |
| **TrueLayer** | UK, EU | Open Banking | PSD2 compliant, account info and payments |
| **MX** | US | Aggregator | Data enrichment, categorization built-in |
| **Yodlee** | Global | Aggregator | Wide institutional coverage |

## Plaid Integration Flow

```
User clicks "Link Account"
    → Plaid Link opens (client-side modal)
    → User selects bank, enters credentials
    → Plaid returns public_token
    → Your server exchanges public_token for access_token
    → Store access_token (encrypted) for ongoing data access
```

```typescript
// Server: Exchange public token for access token
import { PlaidApi, Configuration, PlaidEnvironments } from 'plaid';

const plaidClient = new PlaidApi(new Configuration({
  basePath: PlaidEnvironments.production,
  baseOptions: { headers: { 'PLAID-CLIENT-ID': clientId, 'PLAID-SECRET': secret } }
}));

// Exchange token (called once after Link completes)
async function exchangeToken(publicToken: string, userId: string) {
  const response = await plaidClient.itemPublicTokenExchange({ public_token: publicToken });
  const accessToken = response.data.access_token;
  const itemId = response.data.item_id;

  // Store encrypted; never log or expose access tokens
  await db.plaidItems.create({
    userId, itemId, accessToken: encrypt(accessToken), status: 'active'
  });
}

// Fetch transactions (paginated)
async function syncTransactions(accessToken: string, cursor?: string) {
  const response = await plaidClient.transactionsSync({
    access_token: accessToken,
    cursor: cursor || undefined
  });

  // transactionsSync returns added, modified, and removed transactions
  return {
    added: response.data.added,
    modified: response.data.modified,
    removed: response.data.removed,
    nextCursor: response.data.next_cursor,
    hasMore: response.data.has_more
  };
}
```

## Transaction Sync Strategy

Plaid's `transactionsSync` endpoint uses a cursor-based approach:

1. **Initial sync**: call with no cursor to get all available transactions (up to 2 years)
2. **Incremental sync**: store the cursor; call with it to get only changes since last sync
3. **Handle all three arrays**: `added` (new transactions), `modified` (updated), `removed` (deleted/reversed)
4. **Webhook-driven**: register for `TRANSACTIONS` webhooks to sync on-demand rather than polling

```typescript
// Webhook handler for real-time transaction updates
app.post('/plaid-webhooks', async (req, res) => {
  const { webhook_type, webhook_code, item_id } = req.body;

  if (webhook_type === 'TRANSACTIONS') {
    if (webhook_code === 'SYNC_UPDATES_AVAILABLE') {
      // Trigger incremental sync for this item
      await syncTransactionsForItem(item_id);
    }
  }

  if (webhook_type === 'ITEM') {
    if (webhook_code === 'ERROR') {
      // Credential rotation needed; prompt user to re-link
      await markItemForRelink(item_id);
    }
  }

  res.sendStatus(200);
});
```

## Error Handling

| Error | Cause | Resolution |
|-------|-------|-----------|
| `ITEM_LOGIN_REQUIRED` | Credentials expired or MFA changed | Prompt user to re-authenticate via Plaid Link update mode |
| `INSTITUTION_DOWN` | Bank's systems are unavailable | Retry with backoff; show "syncing" indicator to user |
| `RATE_LIMIT_EXCEEDED` | Too many API calls | Queue requests with exponential backoff |
| `NO_ACCOUNTS` | User linked but has no eligible accounts | Guide user to try a different account or institution |

## Security Considerations

- **Never store Plaid access tokens in plaintext.** Encrypt with AES-256 and store the encryption key separately.
- **Never send access tokens to the client.** All Plaid API calls happen server-side.
- **Use Plaid webhooks verification** to confirm webhook authenticity.
- **Implement token rotation** when Plaid requires credential updates.
- **PCI compliance is not required** for read-only Plaid access (you never handle card numbers).

## Key Takeaways

- Use Plaid Link for client-side bank selection; exchange tokens server-side and encrypt them
- `transactionsSync` with cursors is the modern approach; avoid deprecated `transactionsGet`
- Register for webhooks to get real-time transaction updates instead of polling
- Handle `ITEM_LOGIN_REQUIRED` gracefully since bank credentials expire regularly
- Never store or log access tokens in plaintext; encrypt at rest with keys stored separately
