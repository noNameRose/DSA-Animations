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


    isEmpty() {
        return this._head === null;
    }


    insert(val, index) {
        const newNode = new Node(val);
        if (index === 0) {
            if (this.isEmpty()) {
                this.tail = newNode;
            }
            else {
                newNode.next = this.head;
            }
            this.head = newNode;
        }
        else if (index === this.size) {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        else {
            let current = this._head;
            let previous = this._head;
            let i = 0;
            while (i < index) {
                previous = current;
                current = current.next;
                i++;
            }
            newNode.next = current;
            previous.next = newNode;
        }
        this.size = this.size + 1; 
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