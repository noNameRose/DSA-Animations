import ListNode from "../ListNode.jsx";
export const nodeLeft = 12;

export function getDomNodes(list, keys, target_index) {
    const domList = []; 
    let current = list.head;
    let i = 1;
    let curindex = 0;
    let isInsertBetween = target_index > 0 || target_index  < list.size - 1;
    list.iterate((node) => {
        let index = curindex;
        if (isInsertBetween && index > target_index)
            index--;
        let position = {  x: nodeLeft * i, 
            y: 0,
            opa: 1
          };
        domList.push(   <ListNode  node={node} 
                        pos={position} 
                        key={keys[curindex]} 
                        index={index}
          />)
        current = current.next;
        i++;
        curindex++;
    });
    return domList;
}


export const setUpRefLine = (list, refLineWidth) => {
    if (list.size === 0)
        return;
    let lineWidth = refLineWidth.current;
    if (lineWidth === null) {
        const firstNode = list.head;
        const domNode = firstNode.actualNode
        const {left: sc_nodeLeft} = domNode.getBoundingClientRect();
        const {right: sc_refRight} = firstNode.nextRef.getBoundingClientRect();
        const sub = sc_refRight - sc_nodeLeft;
        const width = nodeLeft - getEmSize(sub, domNode);
        lineWidth = width;
        refLineWidth.current = width;
    }
    list.iterate(node => {
        node.nextRefLine.style.width = lineWidth + "em";
        node.prevRefLine.style.width = lineWidth + "em";
    });
}

export const setUpHeadLine = (list) => {
    const head = list.actualHead;
    const domList = list.actualList;
    const {right} = head.getBoundingClientRect();
    const {left} = domList.getBoundingClientRect();
    const sub = right - left;
    const width = nodeLeft - getEmSize(sub, domList);
    list.headLine.style.width = width + "em";
}

export const setUpTailLine = (list) => {
    if (list.size === 0) {
        const tail = list.actualTail;
        const domList = list.actualList;
        const {right} = tail.getBoundingClientRect();
        const {left} = domList.getBoundingClientRect();
        const sub = right - left;
        const width = nodeLeft - getEmSize(sub, domList);
        list.shortTailLine.style.width = width + "em";
        return;
    }
    list.tailLine.style.height = "10em";
    list.shortTailLine.style.opacity = 0;
    const lastNode = list.tail;
    const {left: prev_left
        , width: prev_width} = lastNode.prevRef.getBoundingClientRect();
    const {bottom: last_node_bottm} = lastNode.actualNode.getBoundingClientRect();
    const {   left: tail_left
            , width: tail_width
            , } = list.actualTail.getBoundingClientRect();
    const { bottom: tailLine_bottom} = list.tailLine.getBoundingClientRect();
    const tailLineWidth = (prev_left + prev_width/2) - (tail_left + tail_width/2);
    const tailLineRightHeight = tailLine_bottom - last_node_bottm;
    list.tailLine.style.width = getEmSize(tailLineWidth, list.actualList) + "em";
    list.tailLineRight.style.height = getEmSize(tailLineRightHeight, list.actualList) + "em";

}

export const setUpCurrentNode = (list) => {
    const curWrapper = list.currentWrapper;
    const curNode = list.currentNode;
    const domLst = list.actualList;
    const domHead = list.actualHead;
    const {top: headTop} = domHead.getBoundingClientRect();
    const {bottom: curNodeBottom} = curNode.getBoundingClientRect();
    const {width: listWidth, top: listTop} = domLst.getBoundingClientRect();
    const {width: curWrapperWidth} = curWrapper.getBoundingClientRect();
    const moveDis = getEmSize((listWidth/2) - (curWrapperWidth/2), domLst);
    const cur_head_height = getEmSize(headTop - curNodeBottom, domLst);
    const cur_node_height = getEmSize(listTop - curNodeBottom, domLst);
    curWrapper.style.left = moveDis + "em";

    return {
        cur_head_height,
        cur_node_height,
        moveDis
    }
}
export function getEmSize(size, node) {
    return size/parseFloat((getComputedStyle(node).fontSize));
}

export const getRandomNumber = () => {
    let randomNumber = Math.floor(Math.random() * 100);
    return randomNumber;
}