import { ListNode } from "./Node.jsx";

export default class DoublyLinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this._size = 0;
        this._actualList = null;
        this._actualHead = null;
        this._actualTail = null;
        this._headLine = null;
        this._shortTailLine = null;
        this._tailLine = null;
        this._tailLineLeft = null;
        this._tailLineBottom= null;
        this._tailLineRight = null;
        this._headNull = null;
        this._tailNull = null;
        this._virtualTailLineLeft = null;
        this._virtualTailLineBottom = null;
        this._virtualTailLineRight = null;
        this._currentNode = null;
        this._currentWrapper = null;
        this._currentLine = null;
        this._headVirtualLine = null;
        this._newHeadRef = null;
        this._newHeadWrapper = null;
        this._newHeadRefLine = null;
    }


    get newHeadWrapper() {
        return this._newHeadWrapper;
    }

    set newHeadWrapper(wrapper) {
        this._newHeadWrapper = wrapper;
    }

    get newHeadRefLine() {
        return this._newHeadRefLine;
    }

    set newHeadRefLine(line) {
        return this._newHeadRefLine = line;
    }


    get newHeadRef() {
        return this._newHeadRef;
    }

    set newHeadRef(ref) {
        this._newHeadRef = ref;
    }

    get headVirtualLine() {
        return this._headVirtualLine;
    }
    
    set headVirtualLine(line) {
        this._headVirtualLine = line; 
    }

    get currentLine() {
        return this._currentLine;
    }

    set currentLine(line) {
        this._currentLine = line;
    }

    get currentWrapper() {
        return this._currentWrapper;
    }

    set currentWrapper(wrapper) {
        this._currentWrapper = wrapper;
    }

    get currentNode() {
        return this._currentNode;
    }

    set currentNode(node) {
        this._currentNode = node;
    }

    get virtualTailLineLeft() {
        return this._virtualTailLineLeft;
    }

    set virtualTailLineLeft(line) {
        this._virtualTailLineLeft = line;
    }

    get virtualTailLineBottom() {
        return this._virtualTailLineBottom;
    }

    set virtualTailLineBottom(line) {
        this._virtualTailLineBottom = line;
    }

    get virtualTailLineRight() {
        return this._virtualTailLineRight;
    }

    set virtualTailLineRight(line) {
        this._virtualTailLineRight = line;
    }

    get tailNull() {
        return this._tailNull;
    }

    set tailNull(nl) {
        this._tailNull = nl;
    }

    get headNull() {
        return this._headNull;
    }

    set headNull(nl) {
        this._headNull = nl;
    }

    get tailLineLeft() {
        return this._tailLineLeft;
    }

    set tailLineLeft(line) {
        this._tailLineLeft = line;
    }


    get shortTailLine() {
        return this._shortTailLine;
    }

    set shortTailLine(line) {
        this._shortTailLine = line;
    }

    get tailLineBottom() {
        return this._tailLineBottom;
    }

    set tailLineBottom(line) {
        this._tailLineBottom = line;
    }

    get tailLineRight() {
        return this._tailLineRight;
    }

    set tailLineRight(line) {
        this._tailLineRight = line;
    }

    get tailLine() {
        return this._tailLine;
    }

    set tailLine(line) {
        this._tailLine = line;
    }

    get headLine() {
        return this._headLine;
    }

    set headLine(line) {
        this._headLine = line;
    }

    get actualHead() {
        return this._actualHead;
    }

    set actualHead(head) {
        this._actualHead = head;
    }

    get actualTail() {
        return this._actualTail;
    }

    set actualTail(tail) {
        this._actualTail = tail;
    }

    set actualList(list) {
        this._actualList = list;
    }

    get actualList() {
        return this._actualList;
    }

    get size() {
        return this._size;
    }

    set size(amount) {
        this._size = amount;
    }

    set head(head) {
        this._head = head;
    }

    get head() {
        return this._head;
    }

    get tail() {
        return this._tail;
    }

    set tail(tail) {
        this._tail = tail;
    }

    isEmpty() {
        return this._head === null;
    }

    clone() {
        const newList = new DoublyLinkedList();
        let current = this.head;
        while (current !== null) {
            const val = current.value;
            newList.insert(val, newList.size);
            current = current.next;
        }
        return newList;
    }

    insert(val, index) {
        const newNode = new ListNode(val);
        if (index > this.size)
            throw new Error("Index out bound for insertion");
        // Insert at the beginning
        if (index === 0) {
            // The list is Empty
            if (this.isEmpty()) {
                this.head = newNode;
                this.tail = newNode;
            }
            else { // The list is not empty
                newNode.next = this.head;
                this.head.prev = newNode;
                this.head = newNode;
            }
        }  // Insert at the end of the list
        else if (index === this.size) {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }   // Insert before the last node
        else if (index === this.size - 1) {
            let beforeLastNode = this.tail.prev;
            beforeLastNode.next = newNode;
            newNode.prev = beforeLastNode;
            newNode.next = this.tail;
            this.tail.prev = newNode;
        }
        else { // Insert somewhere between the list
            let i = 0;
            let current = this.head;
            while (i < index) {
                current = current.next;
                i++;
            }
            newNode.next = current;
            newNode.prev = current.prev;
            current.prev.next = newNode;
            current.prev = newNode;
        }
        this.size = this.size + 1;
    }

    remove(index) {
        if (this.size === 0)
            throw new Error("The list is empty");
        if (index < 0 || index >= this.size)
            throw new Error("Index out of bound for the size of the list");
        let current = this.head;
        // Remove at the beginning of the list
        if (index === 0) {
            this.head = current.next;
            if (this.size > 1) {
                const newHead = current.next;
                newHead.prev = null;
            }
            else {
                this.tail = null;
            }
        }   // Remove at the end of the list
        else if (index = this.size - 1) {
            this.tail.prev.next = null;
            this.tail = this.tail.prev;
        }   // Remove somewhere between the list
        else {
            let i = 0;
            while (i < index) {
                i++;
                current = current.next;
            }
            current.prev.next = current.next;
            current.next.prev = current.prev;
        }
        this.size = this.size - 1;
    }
    

    iterate(func) {
        let current = this.head;
        while (current !== null) {
           func(current);
           current = current.next; 
        }
    }
}

