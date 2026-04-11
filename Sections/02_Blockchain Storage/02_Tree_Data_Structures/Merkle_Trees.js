class MerkleTree {

    constructor(leaves, concat) {
        this.leaves = leaves;
        this.concat = concat
    }

    getRoot() {
        let leavesSize = this.leaves.length;

        if (leavesSize == 0)
            return null;

        if (leavesSize == 1)
            return this.leaves[0];

        let newLeaves = [];

        for (let i=0; i<leavesSize; i+=2) {
            const left = this.leaves[i];

            if (i+1 >= leavesSize) {
                newLeaves.push(left);
                continue
            }

            const right = this.leaves[i+1];
            newLeaves.push(this.concat(left, right));
        }

        const subTree = new MerkleTree(newLeaves, this.concat);
        return subTree.getRoot();
    }

    getProof(index) {
        let proof = [];
        let leaves = this.leaves.slice(); // copy
        let idx = index;
    
        while (leaves.length > 1) {
            let newLeaves = [];
    
            for (let i = 0; i < leaves.length; i += 2) {
                const left = leaves[i];
                const isRightNode = (i + 1 < leaves.length);
                const right = isRightNode ? leaves[i + 1] : null;
    
                // If current index is in this pair
                if (i === idx || i + 1 === idx) {
                    if (isRightNode) {
                        if (idx === i) {
                            // current is left → sibling is right
                            proof.push({ data: right, left: false });
                        } else {
                            // current is right → sibling is left
                            proof.push({ data: left, left: true });
                        }
                    }
                    // if no right node → promoted → no proof added
    
                    // update index for next level
                    idx = Math.floor(i / 2);
                }

                // build next level
                if (isRightNode) {
                    newLeaves.push(this.concat(left, right));
                } else {
                    // promote odd leaf
                    newLeaves.push(left);
                }
            }

            leaves = newLeaves;
        }

        return proof;
    }

    verifyProof(proof, node, root, concat) {
      let curr = node;
      
      for (let i=0; i<proof.length; ++i) {
          const {data, left} = proof[i];
    
          if (left) {
              curr = concat(data, curr);
          }
          else {
              curr = concat(curr, data);
          }
      }
      return curr == root;
    }
}

// Example usage
function hash(data) {
    // Simple hash function for demonstration (not secure)
    return 'hash(' + data + ')';
}
const leaves = ['a', 'b', 'c', 'd'].map(hash);
const merkleTree = new MerkleTree(leaves, (left, right) => hash(left + right));
console.log(merkleTree.getRoot()); // Output: hash(hash(hash(a) + hash(b)) + hash(hash(c) + hash(d)))