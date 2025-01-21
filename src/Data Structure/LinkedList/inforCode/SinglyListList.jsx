import {Node} from "./Node.jsx"

export class SinglyLinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this._actualHead = null;
        this._actualTail = null;
        this._actualList = null;
        this._size = 0;
        this._headLine = null;
        this._virtualHeadLine = null;
        this._tailLine = null;
        this._tailLineLeft = null;
        this._tailLineRight = null;
        this._tailLineBottom = null;
        this._virtualTailLineLeft = null;
        this._virtualTailLineRight = null;
        this._virtualTailLineBottom= null;
        this._currentNode = null;
        this._currentNodeWrapper = null;
        this._currentLine = null;
        this._prevNode = null;
        this._prevNodeWrapper = null;
        this._prevLine = null;
        this._headNull = null;
        this._tailNull = null;
        this._shortTailLine = null;
    }

    get headNull() {
        return this._headNull;
    }

    set headNull(node) {
        this._headNull = node;
    }

    get tailNull() {
        return this._tailNull;
    }

    set tailNull(node) {
        this._tailNull = node;
    }

    get shortTailLine() {
        return this._shortTailLine;
    }

    set shortTailLine(line) {
        this._shortTailLine = line;
    }

    get previousNode() {
        return this._prevNode;
    }

    set previousNode(node) {
        this._prevNode = node;
    }

    get prevNodeWrapper() {
        return this._prevNodeWrapper;
    }

    set prevNodeWrapper(node) {
        this._prevNodeWrapper = node;
    }


    get prevLine() {
        return this._prevLine;
    }

    set prevLine(line) {
        this._prevLine = line;
    }


    get currentNode() {
        return this._currentNode;
    }

    set currentNode(node) {
        this._currentNode = node;
    }

    get currentLine() {
        return this._currentLine;
    }

    set currentLine(line) {
        this._currentLine = line;
    }

    get currentNodeWrapper() {
        return this._currentNodeWrapper;
    }

    set currentNodeWrapper(node) {
        this._currentNodeWrapper = node;
    }

    get actualList() {
        return this._actualList;
    }

    set actualList(node) {
        this._actualList = node;
    }

    get head() {
        return this._head;
    }

    set head(node) {
        this._head = node;
    }

    get tail() {
        return this._tail;
    }

    set tail(node) {
        this._tail = node;
    }

    get size() {
        return this._size;
    }

    set size(amount) {
        this._size = amount;
    }

    get actualHead() {
        return this._actualHead;
    }

    set actualHead(node) {
        this._actualHead = node;
    }

    get headLine() {
        return this._headLine;
    }

    set headLine(line) {
        this._headLine = line;
    }

    get tailLineRight() {
        return this._tailLineRight;
    }

    set tailLineRight(line) {
        this._tailLineRight = line;
    }


    get tailLineLeft() {
        return this._tailLineLeft;
    }


    set tailLineLeft(line) {
        this._tailLineLeft = line;
    }

    get tailLine() {
        return this._tailLine;
    }

    set tailLine(line) {
        this._tailLine = line;
    }

    get virtualTailLineLeft() {
        return this._virtualTailLineLeft;
    }

    set virtualTailLineLeft(line) {
        this._virtualTailLineLeft = line;
    }

    get virtualTailLineRight() {
        return this._virtualTailLineRight;
    }

    set virtualTailLineRight(line) {
        this._virtualTailLineRight = line;
    }

    get virtualTailLineBottom() {
        return this._virtualTailLineBottom;
    }

    set virtualTailLineBottom(line) {
        this._virtualTailLineBottom = line;
    }

    get virtualHeadLine() {
        return this._virtualHeadLine;
    }

    set virtualHeadLine(line) {
        this._virtualHeadLine = line;
    }

    isEmpty() {
        return this._head === null;
    }


    insert(val, index) {
        if (index < 0 || index > this.size)
            throw new Error("Index out of bound");
        const newNode = new Node(val);
        let visitedNodes = [];
        if (index === 0) {
            // Insert when list is empty
            if (this.isEmpty()) {
                this.tail = newNode;
            }   // Insert when list is not empty
            else {
                visitedNodes.push(this.head);
                newNode.next = this.head;
            }
            this.head = newNode;
        }
        else if (index === this.size) {
            visitedNodes.push(this.tail);
            this.tail.next = newNode;
            this.tail = newNode;
        }
        else {
            let current = this._head;
            let previous = this._head;
            let i = 0;
            while (i < index) {
                visitedNodes.push(current);
                previous = current;
                current = current.next;
                i++;
            }
            newNode.next = current;
            previous.next = newNode;
        }
        this.size = this.size + 1; 
        return visitedNodes;
    }

    remove(key) {
        let prev = this.head;
        let current = this.head;
        const visitedNodes = [];
        while (current !== null && current.value !== key) {
            visitedNodes.push(current);
            prev = current;
            current = current.next;
        }
        // Remove happens at the beginning of the list
        if (current === this.head) {
            visitedNodes.push(this.head);
            this.head = this.head.next;
            // If after removal, the list is empty
            if (this.head === null) {
                this.tail = null;
            }
            this.size = this.size - 1;
        }
        else if (current !== this.head && current !== null) {
            prev.next = current.next;
            // remove last node
            if (current.next === null) {
                this.tail = prev;
            }
            this.size = this.size - 1;
        }
        return visitedNodes;
    }


    search(key) {
        let current = this.head;
        let visitedNodes = [];
        let found = false;
        while (current !== null) {
            visitedNodes.push(current);
            if (current.value === key) {
                found = true;
                break;
            }
            current = current.next;
        }
        return {visitedNodes, found};

    }

    clone() {
        const newList = new SinglyLinkedList();
        let current = this.head;
        let prev = null;

        newList.size = this.size;
        while (current !== null) {
            const val = current.value;
            const id = current.id;
            const newNode = new Node(val, null, id);
            // First node in the list
            if (prev === null) {
                newList.head = newNode;
            }   // Not the first node
            else {
                prev.next = newNode;
            }
            prev = newNode;
            current = current.next;
        }
        newList.tail = prev;

        return newList;
    }


    iterate(func) {
        let current = this.head;
        while (current !== null) {
            func(current);
            current = current.next;
        }
    }

    toString() {
        const lst = [];
        let current = this.head;
        while (current !== null) {
            lst.push(current.value);
            current = current.next;
        }
        return lst;
    }
}

