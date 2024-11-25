import { Node } from "./Node.jsx";

export default class BinarySearchTree {
    constructor() {
        this._root = null;
        this._height = 7;
    }

    set height(h) {
        this._height = h;
    }

    get height() {
        return this._height;
    }
    isEmpty() {
        return this._root === null;
    }

    set root(r) {
        this._root = r;
    }

    get root() {
        return this._root;
    }

    insert(val) {
        const newNode = new Node(val);
        let current = this.root;
        let parent = this.root;
        let isLeftChild = false;
        if (this.isEmpty()) {
            this.root = newNode;
            return;
        }
        while (current !== null) {
            parent = current;
            const curVal = current.value;
            if (curVal > val) {
                current = current.left;
                isLeftChild = true;
            }
            else {
                current = current.right;
                isLeftChild = false;
            }
        }
        newNode.level = parent.level + 1;
        let gap = Math.pow(2, this.height - newNode.level);
        if (isLeftChild) {
            parent.left = newNode;
        }
        else {
            parent.right = newNode;
        }
        let px = parent.position.x + (isLeftChild ? - gap/2 : gap/2);
        let py = parent.position.y + 10;
        newNode.position = {x: px, y: py};
        let nextLevel = newNode.level + 1;
        let nextGap = Math.pow(2, this.height - nextLevel);
        // Null left position
        let nlpx = px - nextGap/2;
        // Null right position
        let nrpx = px + nextGap/2;
        newNode.nullLeftPos = {x: nlpx, y: py + 10};
        newNode.nullRightPos = {x: nrpx, y: py + 10};
    }


    clone() {
        const list = [];
        this.flattentPosOrder(this.root, list);
        const newTree = new BinarySearchTree();
        list.forEach(val => newTree.insert(val));
        return newTree;
    }

    flattentPosOrder(node, list) {
        if (node) {
            list.push(node.value);
            this.flattentPosOrder(node.left, list);
            this.flattentPosOrder(node.right, list);
        }
    }

    inOrder(node) {
        if (node) {
            this.inOrder(node.left);
            console.log(node.value);
            this.inOrder(node.right);
        }
    }

    search(target) {
        const visited = [];
        let isFound = false;
        let current = this.root;
        while (current !== null) {
            visited.push(current);
            if (current.value === target) {
                isFound = true;
                break;
            }
            else if (current.value > target) {
                current = current.left;
            }
            else 
                current = current.right;
        }
        return {found: isFound, visitedNodes: visited}
    }
}