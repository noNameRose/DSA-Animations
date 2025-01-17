import Node from "../NodeComponent/Node.jsx";


const nodeGap = 14;

export const getDomNodes = (list) => {
    let current = list.head;
    let i = 0;
    const domList = [];
    while (current !== null) {
        let isLast = false;
        if (current.next === null)
            isLast = true;
        current.leftDis = (i + 1) * nodeGap;
        domList.push(
            <Node node={current}
                  key={i}
                  index={i}
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
};


export const getEmsize = (length, node) => {
    return length/parseFloat(getComputedStyle(node).fontSize);
}