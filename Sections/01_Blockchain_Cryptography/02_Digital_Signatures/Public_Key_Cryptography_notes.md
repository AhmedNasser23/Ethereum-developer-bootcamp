# Public Key Cryptography

## Cryptography Historically

To understand digital signatures and blockchain security, it is helpful to look at the historical evolution of cryptography.

### Early Cryptography (Pre-1970s)

Historically, cryptography focused on **encrypting messages** so they could not be understood if intercepted.

It was primarily used for:

- Military communication
- Government secrets
- Secure diplomatic messaging

Early techniques were simple transformations. For example:
"abc" → "bcd"

This kind of substitution cipher was easy to break once the method was known.

---

## The Rise of Symmetric-Key Cryptography

As cryptography advanced, systems became more complex. A major breakthrough was the idea of a **shared secret key**.

If two parties met beforehand, they could:

- Agree on a secret key
- Use that key to encrypt and decrypt messages

This model is known as:

> **Symmetric-key cryptography**

### Core Property

- The same key is used for both encryption and decryption.

### Limitation

It requires secure key exchange before communication.

This does not scale well for open, global communication networks.

---

# Personal Computing and the Key Exchange Problem

With the rise of personal computing, a new challenge emerged:

> How can two people communicate securely without first meeting to exchange a secret key?

This was considered extremely difficult.

If encryption requires a secret key, how can communication begin securely without one?

---

# The Breakthrough: Public Key Cryptography (1976)

In 1976, **Whitfield Diffie** proposed a revolutionary idea:

> What if there was a public key?

Many experts initially dismissed this concept because encryption keys were traditionally meant to remain secret.

However, the idea introduced a fundamentally new model.

---

# Asymmetric Cryptography

Public key cryptography is also known as:

> **Asymmetric cryptography**

Unlike symmetric encryption, it uses two keys:

- **Public Key** → Shared openly
- **Private Key** → Kept secret

These keys are mathematically linked.

---

## Thought Experiment

Imagine:

- A public key and a private key are mathematically paired.
- Each key can reverse operations performed by the other.

### Scenario 1: Digital Signatures

Bob publishes his public key.

- Bob encrypts (or signs) a message using his private key.
- Anyone can verify it using Bob’s public key.
- Only Bob could have created that message.

This creates:

> An unforgeable digital signature.

### Scenario 2: Confidential Messaging

If someone encrypts a message using Bob’s public key:

- Only Bob’s private key can decrypt it.
- The message is secure even if transmitted publicly.

This solves both:

- Authentication
- Confidentiality

---

# Concept Before Mathematics

The remarkable aspect of this discovery:

The **concept** came before the mathematical implementation.

Diffie, along with Martin Hellman and Ralph Merkle, later worked toward finding practical mathematical systems that satisfied these properties.

---

# RSA and ECDSA

Today, two major public key algorithms dominate cryptography:

## RSA

RSA is based on the mathematical principle that:

- Multiplying two large prime numbers is easy.
- Factoring their product back into primes is extremely difficult.

Security assumption:

> Factoring large numbers is computationally infeasible.

The difficulty of RSA ties into one of computer science’s biggest open questions:

- The P vs NP problem.

### Characteristics

- Large key sizes
- Strong historical adoption
- Computationally heavier than elliptic curve methods

---

## ECDSA (Elliptic Curve Digital Signature Algorithm)

ECDSA is based on:

> The elliptic curve discrete logarithm problem.

It provides:

- Equivalent security to RSA
- Much smaller key sizes
- Greater efficiency

Because of these advantages, ECDSA became widely adopted in blockchain systems.

It is the digital signature algorithm used in:

- Bitcoin (secp256k1 curve)
- Ethereum (also secp256k1)

---

# Why This Matters for Ethereum

Ethereum accounts are built on public key cryptography.

Each account consists of:

- A private key (kept secret)
- A public key (derived mathematically)
- An address (derived from the public key)

When sending a transaction:

1. The transaction is signed using the private key.
2. The network verifies the signature using the public key.
3. The sender’s identity is cryptographically proven.

No password.
No username.
No central authentication server.

Ownership = possession of the private key.

---

# Developer Perspective

From an Ethereum engineering standpoint:

- Public key cryptography enables decentralized identity.
- Digital signatures authorize state transitions.
- Nodes verify signatures before executing transactions.
- Private key security is equivalent to asset security.

Every Ethereum transaction depends on:

- Hashing
- ECDSA signatures
- Public key recovery
- Deterministic verification

Without asymmetric cryptography, blockchains would not function.

---

# Key Mental Models

- Symmetric cryptography requires shared secrets.
- Asymmetric cryptography eliminates secure key exchange requirements.
- Private key = authority.
- Public key = verification mechanism.
- Digital signatures = cryptographic proof of authorship.

This foundation supports:

- Wallets
- Transaction signing
- Smart contract authorization
- Message verification
- Address derivation
- `ecrecover` in the EVM