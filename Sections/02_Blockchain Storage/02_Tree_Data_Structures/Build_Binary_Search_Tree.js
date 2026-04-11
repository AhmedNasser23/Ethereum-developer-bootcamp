class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor() {
        this.root = null;
    }

    addNode(node){
        if (this.root == null) {
            this.root = node;
            return;
        }

        let current = this.root;
        while (true) {
            if (node.data < current.data) {
                if (!current.left) {
                    current.left = node;
                    return;
                }
                current = current.left;
            }

            else {
                if (!current.right) {
                    current.right = node;
                    return;
                }
                current = current.right;
            }
        }
    }

    hasNode(number) {
        let curr = this.root;

        while(curr != null) {
            if (number == curr.data) {
                return true;
            }
            if (number > curr.data) {
                curr = curr.right;
            }
            else {
                curr = curr.left;
            }
        }

        return false;
    }
} 

let tree = new Tree();
tree.addNode(new Node(5));
tree.addNode(new Node(3));
tree.addNode(new Node(7));
console.log(tree.hasNode(3)); // true
console.log(tree.hasNode(4)); // false

// To run this program in a terminal, save it to a file called "binarySearchTree.js" and run the command "node .\Build_Binary_Search_Tree.js".