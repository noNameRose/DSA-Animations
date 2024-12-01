export class Node {
    constructor(value, left, right) {
        this._value = value;
        this._actualNode = null;
        this._left = null;
        this._right = null;
        this._leftChain = null;
        this._rightChain = null;
        this._leftConnector = null;
        this._rightConnector = null;
        this._leftVirtualLine = null;
        this._rightVirtualLine = null;
        this._leftVirtualLine2 = null;
        this._rightVirtualLine2 = null;
        this._leftVirtualLine3 = null;
        this._rightVirtualLine3 = null;
        this._clockLineUp = null;
        this._nullLeft = null;
        this._nullRight = null;
        this._level = 0;
        this._chainHeight = null;
        this._clock = null;
        this._clockLine = null;
        this._clockWrapper = null;
        this._position = {
            x: 0,
            y: 0,
        };
        this._nullLeftPos = {
            x: 0,
            y: 0,
        }
        this._nullRightPos = {
            x: 0,
            y: 0,
        }
        if (left !== undefined)
            this._left = left;
        if (right !== undefined)
            this._right = right;
    }

    set clockLineUp(line) {
        this._clockLineUp = line;
    }

    get clockLineUp() {
        return this._clockLineUp;
    }

    set leftVirtualLine3(line) {
        this._leftVirtualLine3 = line;
    }

    get leftVirtualLine3() {
        return this._leftVirtualLine3;
    }

    set rightVirtualLine3(line) {
        this._rightVirtualLine3 = line;
    }

    get rightVirtualLine3() {
        return this._rightVirtualLine3;
    }


    set clockWrapper(wrapper) {
        this._clockWrapper = wrapper;
    }

    get clockWrapper() {
        return this._clockWrapper;
    }

    set clock(cl) {
        this._clock = cl;
    }

    get clock() {
        return this._clock;
    }

    set clockLine(cl) {
        this._clockLine = cl;
    }

    get clockLine() {
        return this._clockLine;
    }

    set chainHeight(height) {
        this._chainHeight = height;
    }

    get chainHeight() {
        return this._chainHeight;
    }

    set leftVirtualLine2(line) {
        this._leftVirtualLine2 = line;
    }

    get leftVirtualLine2() {
        return this._leftVirtualLine2;
    }

    set rightVirtualLine2(line) {
        this._rightVirtualLine2 = line;
    }

    get rightVirtualLine2() {
        return this._rightVirtualLine2;
    }

    set leftVirtualLine(line) {
        this._leftVirtualLine = line;
    }

    get leftVirtualLine() {
        return this._leftVirtualLine;
    }

    set rightVirtualLine(line) {
        this._rightVirtualLine = line;
    }

    get rightVirtualLine() {
        return this._rightVirtualLine;
    }

    set nullRight(n) {
        this._nullRight = n;
    }

    get nullRight() {
        return this._nullRight;
    }

    set nullLeft(n) {
        this._nullLeft = n;
    }

    get nullLeft() {
        return this._nullLeft;
    }

    set rightConnector(connector) {
        this._rightConnector = connector;
    }

    get rightConnector() {
        return this._rightConnector;
    }

    set leftConnector(connector) {
        this._leftConnector = connector;
    }

    get leftConnector() {
        return this._leftConnector;
    }

    set leftChain(chain) {
        this._leftChain = chain;
    }


    get leftChain() {
        return this._leftChain;
    }

    set rightChain(chain) {
        this._rightChain = chain;
    } 

    get rightChain() {
        return this._rightChain;
    }

    set nullLeftPos(pos) {
        this._nullLeftPos = pos;
    }

    set nullRightPos(pos) {
        this._nullRightPos = pos;
    }

    get nullLeftPos() {
        return this._nullLeftPos;
    }

    get nullRightPos() {
        return this._nullRightPos;
    }

    set level(l) {
        this._level = l;
    }

    get level() {
        return this._level;
    }

    set position(pos) {
        this._position  = pos;
    }

    get position() {
        return this._position;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
    }

    get right() {
        return this._right;
    }

    set right(right) {
        this._right = right;
    }

    get right() {
        return this._right;
    }

    set left(left) {
        this._left = left;
    }

    get left() {
        return this._left;
    }

    set actualNode(domNode) {
        this._actualNode = domNode;
    }

    get actualNode() {
        return this._actualNode;
    }

}
