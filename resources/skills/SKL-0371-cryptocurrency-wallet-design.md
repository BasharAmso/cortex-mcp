---
id: SKL-0371
name: Cryptocurrency Wallet Design
category: skills
tags: [cryptocurrency, wallet, blockchain, key-management, transaction-signing, multi-chain, web3, defi]
capabilities: [wallet-architecture, key-management, transaction-signing, multi-chain-support]
useWhen:
  - building a cryptocurrency wallet application
  - implementing private key management and security
  - designing transaction signing and broadcasting
  - supporting multiple blockchain networks in one wallet
  - creating a secure key storage architecture
estimatedTokens: 650
relatedFragments: [SKL-0368, PAT-0190, PAT-0188, SKL-0367]
dependencies: []
synonyms: ["how to build a crypto wallet", "private key management for blockchain", "multi-chain wallet design", "transaction signing implementation", "HD wallet derivation paths", "web3 wallet architecture"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: advanced
owner: "cortex"
pillar: "finance"
---

# Cryptocurrency Wallet Design

A cryptocurrency wallet manages private keys and signs transactions. It does not "store" cryptocurrency; it stores the keys that prove ownership of assets on the blockchain. Security architecture is paramount since compromised keys mean irreversible loss.

## Wallet Types

| Type | Security | Convenience | Best For |
|------|----------|-------------|----------|
| **Hot wallet** (software) | Medium | High | Daily transactions, small amounts |
| **Cold wallet** (hardware) | Very high | Low | Long-term storage, large amounts |
| **Custodial** | Provider-dependent | Highest | Beginners, exchange trading |
| **Multi-sig** | Very high | Low | Team treasuries, high-value accounts |

## HD Wallet Architecture

Hierarchical Deterministic (HD) wallets derive unlimited addresses from a single seed phrase (BIP-39/BIP-44):

```typescript
// BIP-44 derivation path: m / purpose' / coin_type' / account' / change / address_index
// Ethereum: m/44'/60'/0'/0/0
// Bitcoin:  m/44'/0'/0'/0/0

interface HDWallet {
  mnemonic: string;              // 12 or 24 word seed phrase (NEVER store on server)
  masterKey: Buffer;             // Derived from mnemonic + optional passphrase
  derivationPath: string;
}

interface DerivedAccount {
  path: string;                  // "m/44'/60'/0'/0/0"
  address: string;               // '0x742d35Cc6634C0532925a3b844...'
  publicKey: string;
  privateKey: string;            // NEVER transmit; keep in secure enclave
  chain: 'ethereum' | 'bitcoin' | 'solana' | 'polygon';
}

// Generate addresses for multiple chains from one seed
function deriveAccounts(mnemonic: string): DerivedAccount[] {
  const seed = mnemonicToSeed(mnemonic);
  return [
    deriveAccount(seed, "m/44'/60'/0'/0/0", 'ethereum'),
    deriveAccount(seed, "m/44'/0'/0'/0/0", 'bitcoin'),
    deriveAccount(seed, "m/44'/501'/0'/0'", 'solana'),
  ];
}
```

## Key Management Security

The most critical aspect of wallet design:

1. **Seed phrase generation** must use cryptographically secure randomness (`crypto.getRandomValues`)
2. **Never store seed phrases or private keys on a server.** Keep them on-device only.
3. **Encrypt keys at rest** with a user-chosen password using Argon2 or PBKDF2 key derivation
4. **Use platform secure storage**: iOS Keychain, Android Keystore, or hardware security modules
5. **Biometric unlock** for convenience with encrypted key still backing it

```typescript
// Key encryption for local storage
async function encryptPrivateKey(privateKey: string, password: string): Promise<EncryptedKey> {
  const salt = crypto.getRandomValues(new Uint8Array(32));
  const key = await deriveEncryptionKey(password, salt); // Argon2id preferred
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encode(privateKey));
  return { encrypted: new Uint8Array(encrypted), iv, salt };
}
```

## Transaction Signing

Transactions are signed locally and broadcast to the network:

```typescript
async function signAndSendTransaction(params: {
  to: string;
  value: bigint;
  chain: string;
  privateKey: string;
}): Promise<string> {
  // 1. Estimate gas / fees
  const gasEstimate = await provider.estimateGas({ to: params.to, value: params.value });

  // 2. Build transaction object
  const tx = {
    to: params.to,
    value: params.value,
    gasLimit: gasEstimate,
    maxFeePerGas: await provider.getFeeData().then(f => f.maxFeePerGas),
    nonce: await provider.getTransactionCount(address),
    chainId: getChainId(params.chain)
  };

  // 3. Sign locally (private key never leaves the device)
  const signedTx = await wallet.signTransaction(tx);

  // 4. Broadcast to network
  const txHash = await provider.sendTransaction(signedTx);
  return txHash;
}
```

## Multi-Chain Support

| Chain | Token Standard | Fee Model | Confirmation Time |
|-------|---------------|-----------|-------------------|
| **Ethereum** | ERC-20, ERC-721 | Gas (Gwei) | ~15 seconds |
| **Bitcoin** | UTXO | Sat/vByte | ~10 minutes |
| **Solana** | SPL | Flat (low) | ~400ms |
| **Polygon** | ERC-20 (bridged) | Gas (low) | ~2 seconds |

## Key Takeaways

- Private keys and seed phrases must never leave the device or be transmitted to any server
- HD wallets derive all addresses from one seed, supporting multiple chains from a single backup
- Encrypt keys at rest using Argon2id key derivation with a user-chosen password
- Sign transactions locally and broadcast only the signed result to the network
- Multi-sig wallets add security for high-value accounts by requiring multiple approvals
