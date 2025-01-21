import Node from "../NodeComponent/Node.jsx";


export const nodeGap = 14;

export const getDomNodes = (list, methodName, index) => {
    let current = list.head;
    let isInsertBetween = index < list.size - 1 && methodName === "insert";
    let i = 0;
    const domList = [];
    while (current !== null) {
        let curIndex = i;
        if (isInsertBetween && i > index)
            curIndex--;
        let isLast = false;
        if (current.next === null)
            isLast = true;
        current.leftDis = (i + 1) * nodeGap;
        domList.push(
            <Node node={current}
                  index={curIndex}
                  key={current.id}
                  isLast = {isLast}
            />
        )
        current = current.next;
        i++;
    }
    return domList;
}

export const setUpRefLine = (list, refLineWidth) => {
    if (list.size === 0)
        return;
    let lineWidth= refLineWidth.current;
    if (lineWidth === null) {
        const firstNode = list.head;
        const domNode = firstNode.actualNode;
        const {left: node_left} = domNode.getBoundingClientRect();
        const {right: ref_right} = firstNode.nextRef.getBoundingClientRect();
        const subPart = getEmsize(ref_right - node_left, list.actualList);
        const width = nodeGap - subPart;
        lineWidth = width;
        refLineWidth.current = width;
    }
    list.iterate(node => {
        node.nextRefLine.style.width = lineWidth + "em";
    })
};

export const setUpHeadLine = (list) => {
    const head = list.actualHead;
    const domList = list.actualList;
    const {right} = head.getBoundingClientRect();
    const {left} = domList.getBoundingClientRect();
    const sub = right - left;
    const width = nodeGap - getEmsize(sub, domList);
    list.headLine.style.width = width + "em";
}


export const setUpTailLine = (list) => {
    if (list.size > 0) {
        const domTailRef = list.actualTail;
        const lastNode = list.tail;
        const {left: tailRefLeft, width: tailRefWidth} = domTailRef.getBoundingClientRect();
        const {bottom: tailLineBottom} = list.tailLine.getBoundingClientRect();
        const {left: lastNodeLeft, width: nodeWidth, bottom: lastNodeBottom} = lastNode.actualNode.getBoundingClientRect();
        const tailLineWidth = (lastNodeLeft + nodeWidth/2) - (tailRefLeft + tailRefWidth/2);
        const tailLineRightHeight = getEmsize((tailLineBottom - lastNodeBottom), list.actualList);

        list.tailLine.style.width = getEmsize(tailLineWidth, list.actualList) + "em";
        list.tailLineRight.style.height = tailLineRightHeight + "em";
    }
    else {
        const tailLineWidth = parseFloat(list.headLine.style.width);
        list.shortTailLine.style.width = tailLineWidth + "em";
    }
};


export const getEmsize = (length, node) => {
    return length/parseFloat(getComputedStyle(node).fontSize);
}

export const setUpCurrentNode = (list) => {
    const curNodeWrapper = list.currentNodeWrapper;

    const {width: wrapperWidth, bottom: wrapperBottom} = curNodeWrapper.getBoundingClientRect();
    const {width: listWidth, top: listTop} = list.actualList.getBoundingClientRect();
    const {top: headTop} = list.actualHead.getBoundingClientRect();
    const {width: nodeWidth} = list.head.actualNode.getBoundingClientRect();

    const cur_head_height = getEmsize(headTop - wrapperBottom, list.actualList);
    const disToCenter = getEmsize(listWidth/2 - wrapperWidth/2, list.actualList);
    const cur_node_height = getEmsize(listTop - wrapperBottom, list.actualList);
    const disToCenterNode = getEmsize(nodeWidth/2 - wrapperWidth/2, list.actualList);

    curNodeWrapper.style.left = disToCenter + "em";
    list.currentLine.style.height = cur_head_height + "em";

    return {
        cur_node_height,
        disToCenterNode,
        cur_head_height
    }
}

export const setUpPrevNode = (list) => {
    const prevWrapper = list.prevNodeWrapper;
    const prevLine = list.prevLine;

    const {width: wrapperWidth, bottom} = prevWrapper.getBoundingClientRect();
    const {width: listWidth} = list.actualList.getBoundingClientRect();
    const {top: headTop} = list.actualHead.getBoundingClientRect();
    const {width: nodeWidth} = list.head.actualNode.getBoundingClientRect();

    const disToCenter = getEmsize(listWidth/2 - wrapperWidth/2, list.actualList);
    const prev_head_height = getEmsize(headTop - bottom, list.actualList);
    const disToCenterPrev = getEmsize(nodeWidth/2 - wrapperWidth/2, list.actualList);

    prevWrapper.style.left = disToCenter + "em";
    prevLine.style.height = prev_head_height + "em";
    
    return disToCenterPrev;
    
}