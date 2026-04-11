class TXO {
    constructor(owner, amount) {
        this.owner = owner;
        this.amount = amount;
        this.spent = false;
    }
    spend() {
        this.spent = true
    }
}

class Transaction {
    constructor(inputUTXOs, outputUTXOs) {
        this.inputUTXOs = inputUTXOs;
        this.outputUTXOs = outputUTXOs;
        this.fee = 0;
    }

    execute() {
        let inputTotal = 0;
        let outputTotal = 0;

        for (let i = 0; i < this.inputUTXOs.length; ++i) {
            const utxo = this.inputUTXOs[i];

            if (utxo.spent) {
                throw new Error("UTXO already spent");
            }

            inputTotal += utxo.amount
        }

        for (let i = 0; i < this.outputUTXOs.length; ++i) {
            outputTotal += this.outputUTXOs[i].amount;
        }

        if (inputTotal < outputTotal) {
            throw new Error("Insufficient input value")
        }
        
        for (let i = 0; i < this.inputUTXOs.length; ++i) {
            this.inputUTXOs[i].spent = true;
        }

        this.fee = inputTotal - outputTotal;
    }
}