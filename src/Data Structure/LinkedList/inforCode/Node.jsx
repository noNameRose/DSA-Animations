export class Node {
    constructor(value, next) {
        this.value = value;
        this.actualNode = null;
        this.position = {
            x: 0,
            y: 0,
        };
        if (next)
            this.next = next;
        else
            this.next = null;
    }
}