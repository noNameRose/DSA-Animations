class StackNode {
    constructor(value) {
        this.data = value;
        this.actualNode = value;
    }
}

export class Stack {
    constructor(size, st) {
        this.maxSize = size;
        if (st === undefined)
            this.stack = [];
        else    
            this.stack = st;
    }

    push(value) {
        if (this.stack.length === this.maxSize) {
            throw new Error("The Stack is Full");
        }
        const newTop = new StackNode(value);
        this.stack.push(newTop);
    }

    isEmpty() {
        return (this.stack.length === 0);
    }

    pop() {
        if (this.isEmpty())
            throw new Error("The Stack is Empty");
        return this.stack.pop();
    }

    clone() {
        let newStack = [...this.stack];
        return new Stack(this.size, newStack);
    }

    peek() {
        if (this.isEmpty())
            throw new Error("The Stack is empty");
        return this.stack[this.stack.length - 1];
    }

    toString() {
        let str = "";
        for (let i = this.stack.length - 1; i >= 0; i--)
            str += this.stack[i] + "\n";
        return str;
    }
}