# UTXO & Account Models

---

# 1️⃣ Lesson Overview

This lesson explains **how blockchains track user balances**, which is fundamentally different from traditional centralized systems. In decentralized networks, there is no single database maintaining account balances, so blockchains must rely on specific **state models** to represent ownership and value.

Two major models exist:

- **UTXO Model** — used by Bitcoin
- **Account Model** — used by Ethereum and EVM chains

Understanding these models is critical for smart contract engineers because they determine **how transactions change state**, how balances are computed, and how systems scale and maintain security.

---

# 2️⃣ Core Concepts

---

## Peer-to-Peer Networks Recap

Traditional Web2 systems typically rely on **server-based architecture**.

| Server-Based Systems | Peer-to-Peer Blockchain Networks |
|---|---|
| Centralized server manages data | Every node maintains a copy of the ledger |
| Server decides what data is valid | Consensus rules determine validity |
| Platform owners can manipulate data | Data integrity enforced by cryptography |
| Risk of de-platforming | Permissionless participation |

Blockchain networks like Bitcoin and Ethereum operate as **peer-to-peer systems**, where nodes collaborate to maintain a shared ledger.

### Node Types

**Full Node**

- Stores the entire blockchain
- Verifies every transaction and block

**Light Node**

- Stores minimal data
- Queries full nodes for blockchain information
- Used by wallets and lightweight clients

---

# Transactions

Before understanding balance models, we must understand **transactions**.

A blockchain transaction requires four elements:

### Transaction Components

**Amount**

The value being transferred.

**Payer**

The sender initiating the transaction.

**Payee**

The receiver of the funds.

**Authorization**

Proof that the payer approved the transaction.

This authorization is provided by a **digital signature**, generated using the sender’s **private key**.

Without the private key, the transaction cannot be authorized.

---

## Purpose of Transactions

Transactions are responsible for **changing system state**.

Example:


Alice sends Bob 5 DAI


State transition:


Alice balance -= 5
Bob balance += 5


This change in balances represents a **state update**.

Blockchains are fundamentally **state machines** driven by transactions.

---

# Account-Based Model

The **account model** tracks balances directly through account state.

This model is used by:

- Ethereum
- Most modern smart contract platforms

### How It Works

The ledger stores balances directly:


Account: Alice
Balance: 60 ETH


When a transaction occurs:


Bob sends Alice 5 ETH


State update:


Bob balance -= 5
Alice balance += 5


The system simply updates account balances.

---

## Characteristics of the Account Model

- Easy to understand
- Similar to traditional banking systems
- Direct balance updates
- Well suited for smart contract systems

Example ledger entry:


Account #12345
Owner: Rick Sanchez
Balance: $142.62


The system does not track **how the balance was composed**.

Only the total balance matters.

---

# UTXO-Based Model

Bitcoin uses the **UTXO model**.

UTXO stands for:

**Unspent Transaction Output**

Instead of tracking balances directly, Bitcoin tracks **individual pieces of spendable value**.

---

## What is a UTXO?

A UTXO represents **spendable output from a previous transaction**.

Example:

Alice sends Bob **5 BTC**.

Once the transaction is confirmed:

Bob receives a **UTXO worth 5 BTC**.

This UTXO can later be used as input for a future transaction.

Important insight:

> You don’t technically “own bitcoins”.  
> You own **UTXOs that allow you to spend bitcoins**.

---

## Key Properties of UTXOs

### 1️⃣ UTXOs Are Individual Coins

Each UTXO is a separate piece of value.

Example wallet:


UTXO1 = 0.5 BTC
UTXO2 = 1.2 BTC
UTXO3 = 0.3 BTC


Total balance = **2 BTC**

---

### 2️⃣ UTXOs Can Only Be Spent Once

When used in a transaction:

- The UTXO is **consumed**
- It no longer exists

This prevents **double spending**.

---

### 3️⃣ Change Creates New UTXOs

Example:

Alice has a **10 BTC UTXO**.

She sends Bob **3 BTC**.

Transaction result:


Bob receives UTXO → 3 BTC
Alice receives change UTXO → 7 BTC


The original **10 BTC UTXO is destroyed**.

Two new UTXOs are created.

---

### 4️⃣ UTXOs Are Associated with Scripts

Each UTXO includes a **locking script** defining spending conditions.

Typically:


Require signature from public key X


To spend the UTXO:

- The owner must provide the correct digital signature.

This script system is called **Bitcoin Script**.

---

# Account Model vs UTXO Model

| Feature | Account Model | UTXO Model |
|---|---|---|
| Balance tracking | Direct balance per account | Set of spendable outputs |
| Example | Alice has 4 ETH | Alice owns UTXOs totaling 4 BTC |
| Complexity | Simpler mental model | More complex |
| Privacy | Lower privacy | Higher privacy if new addresses used |
| State handling | Supports complex state | Stateless design |

---

# 3️⃣ Technical Deep Dive

---

## Why Ethereum Uses the Account Model

Ethereum supports:

- Smart contracts
- Persistent storage
- Complex state transitions

The account model allows:


Account → balance + storage + code


This makes it easier to manage **state-heavy applications**.

---

## Why Bitcoin Uses UTXO

Bitcoin was designed to be:

- Simple
- Stateless
- Secure

UTXO design provides:

- Strong double-spend protection
- Parallel transaction validation
- Improved privacy

---

## UTXO Parallelization Advantage

Because UTXOs are independent:

Nodes can validate transactions **in parallel**.

Account-based systems require sequential updates.

---

# 4️⃣ Practical Insight

---

## How Developers Should Think About These Models

Ethereum developers primarily interact with:

- **Account balances**
- **Smart contract state**

But understanding UTXOs helps you:

- Understand Bitcoin transactions
- Understand privacy tradeoffs
- Design better financial systems

---

## Common Developer Misunderstandings

1. Thinking Bitcoin tracks balances directly.
2. Believing UTXOs behave like accounts.
3. Not understanding how change outputs work.
4. Assuming all blockchains use the same balance model.
5. Ignoring how state complexity affects blockchain design.

---

## Best Practices

- Understand blockchain systems as **state transition systems**.
- Recognize that transaction models affect scalability and design.
- Know the difference between **value representation** and **state storage**.

---

# 5️⃣ Quick Revision Checklist

- Blockchains require models to track balances.
- Bitcoin uses the **UTXO model**.
- Ethereum uses the **account model**.
- Transactions change blockchain state.
- UTXOs represent spendable outputs from previous transactions.
- UTXOs can only be spent once.
- Spending a UTXO creates new UTXOs.
- Account models store balances directly.
- UTXO systems track value pieces rather than balances.
- Model choice depends on system design goals.

---