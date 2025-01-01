export class ListNode {
    constructor(value, next, prev) {
        this._value = value;
        this._next = null;
        this._prev = null;
        this._actualNode = null;
        this._nextRefLine = null;
        this._prevRefLine = null;
        this._nextRef = null;
        this._prevRef = null;
        this._prevNull = null;
        this._nextNull = null;
        this._valBut = null;
        this._nextVirtualLine = null;
        this._prevVirtualLine = null;
        if (next !== undefined)
            this._next = next;
        if (prev !== undefined)
            this._prev = prev;
    }

    get nextVirtualLine() {
        return this._nextVirtualLine;
    }

    set nextVirtualLine(line) {
        this._nextVirtualLine = line;
    }

    get prevVirtualLine() {
        return this._prevVirtualLine;
    }

    set prevVirtualLine(line) {
        this._prevVirtualLine = line;
    }

    get valBut() {
        return this._valBut;
    }

    set valBut(but) {
        this._valBut = but;
    }


    get nextNull() {
        return this._nextNull;
    }

    set nextNull(nl) {
        this._nextNull = nl;
    }

    get prevNull() {
        return this._prevNull;
    }

    set prevNull(nl) {
        this._prevNull = nl;
    }


    get nextRef() {
        return this._nextRef;
    }

    set nextRef(ref) {
        this._nextRef = ref;
    }

    get prevRef() {
        return this._prevRef;
    }

    set prevRef(ref) {
        this._prevRef = ref;
    }

    get nextRefLine() {
        return this._nextRefLine;
    }

    set nextRefLine(line) {
        this._nextRefLine = line;
    }

    get prevRefLine() {
        return this._prevRefLine;
    }

    set prevRefLine(line) {
        this._prevRefLine = line;
    }
    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
    }

    get actualNode() {
        return this._actualNode;
    }

    set actualNode(node) {
        this._actualNode = node;
    }

    get next() {
        return this._next;
    }

    set next(next) {
        this._next = next;
    }

    get prev() {
        return this._prev;
    }

    set prev(prev) {
        this._prev = prev;
    }
}