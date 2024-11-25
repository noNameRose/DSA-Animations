export class Node {
    constructor(value, next) {
        this.value = value;
        this.actualNode = null;
        if (next)
            this.next = next;
        else
            this.next = null;
    }
}