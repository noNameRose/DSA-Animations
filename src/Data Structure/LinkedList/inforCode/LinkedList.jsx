import { Node } from "./Node.jsx";

export default class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }


    isEmpty() {
        return this.head === null;
    }

    insert(val, index) {
        const node = new Node(val);
        if (index === 0) {
            if (this.isEmpty()) {
                this.head = node;
                this.tail = node;
            }
            else {
                node.next = this.head;
                this.head = node;
            }
        }
        else if (index === this.size){
            this.tail.next = node;
            this.tail = node;
        }
        else {
            let i = 0;
            let current = this.head;
            let previous = this.head;
            while (i < index) {
                previous = current;
                current = current.next;
                i++;
            }
            previous.next = node;
            node.next = current;
        }
        this.size++;
    }

    remove(index) {
        if (this.isEmpty() || index >= this.size || index < 0)
            throw new Error("Illegal index");
        if (!index) {   // remove at the beginning of the list
            if (!this.head.next) {  // only one node left
                this.head = null;
                this.tail = null;
            }
            else {
                this.head = this.head.next;
            }
        }
        else {
            let i = 0;
            let prev = this.head;
            let cur = this.head;
            while (i != index) {
                i++;
                prev = cur;
                cur = cur.next;
            }
            prev.next = cur.next;
            if (index = this.size - 1)
                this.tail = prev;
        }
        this.size--;
    }

    search(val) {
        if (this.isEmpty())
            return;
        let current = this.head;
        let i = 0;
        while (current !== null) {
            if (current.value === val) {
                return i;
            }
            current = current.next;
            i++;
        }
        return -1;
    }


    /**
     * This function create a clone version of this list and return it
     * 
     * @returns clone version of this list
     */
    clone() {
        let list = new LinkedList();
        let current = this.head;
        while (current) {
            list.insert(current.value, list.size);
            current = current.next;
        }
        return list;
    }
}



