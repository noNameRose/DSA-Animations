export class Node {
    constructor(val, next) {
        this._value = val;
        this._next = null;
        this._actualNode = null;
        this._nextRefLine = null;
        this._nextRef = null;
        this._valBut = null;
        this._leftDis = 0;
        this._nextNuLL = null;
        this._nextVirtualRefLine = null;
        if (next !== undefined)
            this._next = next;
    }


    get nextNull() {
        return this._nextNuLL;
    }

    set nextNull(node) {
        this._nextNuLL = node;
    }

    get value() {
        return this._value;
    }

    set value(val) {
        this._value = val;
    }

    get next() {
        return this._next;
    }

    set next(next) {
        this._next = next;
    }


    get actualNode() {
        return this._actualNode;
    }

    set actualNode(node) {
        this._actualNode = node;
    }


    get nextRefLine() {
        return this._nextRefLine;
    }

    set nextRefLine(line) {
        this._nextRefLine = line;
    }


    get nextVirtualRefLine() {
        return this._nextVirtualRefLine;
    }

    set nextVirtualRefLine(line) {
        this._nextVirtualRefLine = line;
    }

    get nextRef() {
        return this._nextRef;
    }

    set nextRef(ref) {
        this._nextRef = ref;
    }

    get leftDis() {
        return this._leftDis;
    }

    set leftDis(x) {
        this._leftDis = x;
    }

    get valBut() {
        return this._valBut;
    }

    set valBut(but) {
        this._valBut = but;
    }
}