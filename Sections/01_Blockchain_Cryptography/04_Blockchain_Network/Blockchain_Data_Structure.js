const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(data, previousHash = '') {
        this.data = data;
        this.previousHash = previousHash;
    }

    toHash() {
        return SHA256(this.data + this.previousHash);
    }
}

class Blockchain {
    constructor() {
        this.chain = [new Block("Genesis Block")];
    }

    addBlock(block) {
        const previousBlock = this.chain[this.chain.length - 1];

        block.previousHash = previousBlock.toHash();

        this.chain.push(block);
    }
    
    isValid() {
        for (let i=1; i<this.chain.length; ++i) {
            if (this.chain[i].previousHash.toString() !== this.chain[i-1].toHash().toString()) {
                return false;
            }
        }
        return true
    }
}