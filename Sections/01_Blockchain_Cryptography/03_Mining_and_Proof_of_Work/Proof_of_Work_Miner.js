const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
    // TODO: add transaction to mempool
    mempool.push(transaction);
}

function mine() {
    // TODO: mine a block
    const block = {
        id: blocks.length,
        transactions: [],
        nonce: 0
    };

    const txCount = Math.min(MAX_TRANSACTIONS, mempool.length);

    for (let i = 0; i < txCount; ++i) {
        block.transactions.push(mempool.shift());
    }

    let hash;
    let int;

    while (true) {
        const blockString = JSON.stringify(block);
        hash = SHA256(blockString).toString();
        int = BigInt(`0x${hash}`);

        if (int < TARGET_DIFFICULTY) {
            break;
        }

        block.nonce++;
    }

    block.hash = hash;    
    blocks.push(block)
}