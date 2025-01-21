import { color } from "../Style/color";
import { styles } from "../Style/colorState";
import { getEmsize, nodeGap } from "../SetUp/setUp";
export const changeNodeStyleAnimation = (node, tl, style1, style2, posParameter) => {
    tl.to(node.actualNode, style1, posParameter)
    .to([node.valBut, node.nextRef], style2, "<");
    return tl;
}


export const travelAnimation = (list, tl , visitedNodes, {cur_node_height, disToCenterNode, cur_head_height}, disToCenterPrev, methodName) => {
    const curNodeWrapper = list.currentNodeWrapper;
    const curLine = list.currentLine;
    const curNode = list.currentNode;
    const headLineWidth = parseFloat(list.headLine.style.width);
    const nodeHeight = getEmsize(list.head.actualNode.getBoundingClientRect().height, list.actualList);
    const refLineWidth = parseFloat(list.head.nextRefLine.style.width);

    const firstNode = visitedNodes[0];
    const n = visitedNodes.length;

    let newNode;
    let nodeAfterNewNode
    if (methodName === "insert") {
        newNode = visitedNodes[n-1].next;
        nodeAfterNewNode = newNode.next;
    }

    tl.fromTo(curNodeWrapper, {opacity: 0, y: "-5em"}, {opacity: 1, y: "0"})
    .from(curLine, {height: 0})
    .to(list.actualHead, styles["head-current-visit-style"])
    .to(curNode, {scale: 0, transformOrigin: "bottom center"})
    .to(curLine, {scaleY: 0, transformOrigin: "bottom center"})
    .set(list.virtualHeadLine, {borderColor: color["virtual-head-line-color"]})
    .to(list.virtualHeadLine, {width: headLineWidth + "em"});

    changeNodeStyleAnimation(firstNode, tl, styles["node-current-visit-style"], styles["node-content-visit-style"])
    .to(list.actualHead, styles["head-normal-style"])
    .to(list.virtualHeadLine, {scaleX: 0, transformOrigin: "right center"})
    .set(curNodeWrapper, {left: firstNode.leftDis + disToCenterNode + "em"})
    .set(curLine, {height: cur_node_height + "em"})
    .to(curLine, {scaleY: 1})
    .to(curNode, {scale: 1})
    .set(list.virtualHeadLine, {borderColor: color["prev-line-color"]})
    .fromTo(list.prevNode, {y: "-5em", opacity: 0}, {opacity: 1, y: "0"})
    .from(list.prevLine, {height: 0})
    .to(list.actualHead, styles["head-prev-visit-style"])
    .to(list.prevNode, {scale: 0, transformOrigin: "center bottom"})
    .to(list.prevLine, {scaleY: 0, transformOrigin: "bottom center"})
    .to(list.virtualHeadLine, {scaleX: 1, transformOrigin: "left center"})
    changeNodeStyleAnimation(firstNode, tl, styles["node-prev-visit-style"], styles["node-content-prev-visit-style"])
    .to(list.actualHead, styles["head-normal-style"])
    .to(list.virtualHeadLine, {scaleX: 0, transformOrigin: "right center"})
    .set(list.prevNodeWrapper, {left: firstNode.leftDis + disToCenterPrev + "em", top: nodeHeight + (cur_node_height) + "em"})
    .set(list.prevLine, {bottom: "100%", height: cur_node_height + "em"})
    .to(list.prevLine, {scaleY: 1, transformOrigin: "top center"})
    .to(list.prevNode, {scale: 1, transformOrigin: "top center"})

;

    for (let i = 0; i < n; i++) {
        const node = visitedNodes[i];

        if (i !== n - 1 || methodName === "insert") {
            tl.to(curNode, {scale: 0})
            .to(curLine, {scaleY: 0})
            .to(node.nextRef, styles["node-content-visit-style"])
            .set(node.nextVirtualRefLine, {borderColor: color["virtual-head-line-color"]})
            .to(node.nextVirtualRefLine, {width: refLineWidth + "em"})
        }

        if (i + 1 < n) {
            const nextNode = node.next;
            changeNodeStyleAnimation(nextNode, tl, styles["node-current-visit-style"], styles["node-content-visit-style"])
            .to(node.nextRef, styles["node-content-prev-visit-style"])
            .to(node.nextVirtualRefLine, {scaleX: 0, transformOrigin: "right center"})
            .set(curNodeWrapper, {left: nextNode.leftDis + disToCenterNode + "em"})
            .to(curLine, {scaleY: 1})
            .to(curNode, {scale: 1});
            if (i + 1 !== n - 1 || methodName === "insert") {
                tl.to(list.prevNode, {scale: 0})
                .to(list.prevLine, {scaleY: 0})
                .to(node.actualNode, styles["node-normal-style"])
                .to(node.valBut, styles["node-content-normal-style"], "<")
                .set(node.nextVirtualRefLine, {borderColor: color["prev-line-color"]})
                .to(node.nextVirtualRefLine, {scaleX: 1, transformOrigin: "left center"})
                changeNodeStyleAnimation(nextNode, tl, styles["node-prev-visit-style"], styles["node-content-prev-visit-style"])
                .to(node.nextRef, styles["node-content-normal-style"])
                .to(node.nextVirtualRefLine, {scaleX: 0, transformOrigin: "right center"})
                .set(list.prevNodeWrapper, {left: nextNode.leftDis + disToCenterPrev + "em"})
                .to(list.prevLine, {scaleY: 1})
                .to(list.prevNode, {scale: 1})
            }
        }
    }
    if (methodName === "insert") {
        changeNodeStyleAnimation(nodeAfterNewNode, tl, styles["node-current-visit-style"], styles["node-content-visit-style"])
        .to(visitedNodes[n - 1].nextRef, styles["node-content-prev-visit-style"])
        .to(visitedNodes[n - 1].nextVirtualRefLine, {scaleX: 0, transformOrigin: "right"})
        .set(curNodeWrapper, {left: newNode.leftDis + disToCenterNode + "em"})
        .to(curLine, {scaleY: 1})
        .to(curNode, {scale: 1});
    }
    return nodeAfterNewNode

}



export const moveNodeToRight = (startNode, list, tl) => {
    let current = startNode;
    const tailLineWidth = parseFloat(list.tailLine.style.width);
    tl.to(list.actualList, {})
    while (current !== null) {
        tl.fromTo(current.actualNode, {
            left: current.leftDis - nodeGap + "em"
        }, {
            left: current.leftDis + "em"
        }, "<");
        current = current.next;
    }
    tl.fromTo(list.tailLine, {
        width: tailLineWidth - nodeGap + "em"
    }, {
        width: tailLineWidth + "em"
    }, "<");
    return tl;
}

export const moveNodeToLeft = (startNode, list, tl, callback) => {
    let current = startNode;
    const tailLineWidth = parseFloat(list.tailLine.style.width);
    tl.to(list.actualList, {}, "<");
    while (current !== null) {
        const x = current.leftDis;
        current.actualNode.style.left = x - nodeGap + "em"
        tl.fromTo(current.actualNode, {
            left: x + "em",
        }, {
            left: x - nodeGap + "em"
        }, "<");
        current = current.next;
    }
    tl.to(list.tailLine, {
        width: tailLineWidth - nodeGap + "em",
    }, "<")
    return tl;
}

export const moveCurrentToNullAnimation = (list, tl, nextRefStyle) => {
    const curLine = list.currentLine;
    const curNode = list.currentNode;
    const curWrapper = list.currentNodeWrapper;
    const lastNode = list.tail;
    const refLineWidth = parseFloat(lastNode.nextRefLine.style.width);
    const moveDownDis = 5;
    const {top: nodeTop} = lastNode.actualNode.getBoundingClientRect();
    const {width: curWidth} = curNode.getBoundingClientRect();
    const {width: nullWidth, top: nullTop} = lastNode.nextNull.getBoundingClientRect();
    const disToCenterCur_Null = getEmsize(curWidth/2 - nullWidth/2, list.actualList);
    const cur_null_height = getEmsize(nullTop - nodeTop, list.actualList) - moveDownDis;

    

    tl.to(curNode, {scale: 0})
    .to(curLine, {scaleY: 0})
    .to(lastNode.nextRef, styles["node-content-visit-style"])
    .set(lastNode.nextVirtualRefLine, {borderColor: color["virtual-head-line-color"]})
    .to(lastNode.nextVirtualRefLine, {width: refLineWidth + "em"})
    .to(lastNode.nextNull, styles["node-content-visit-style"])
    .to(lastNode.nextRef, styles["node-content-visit-style"])
    .to(lastNode.nextRef, nextRefStyle)
    .to(lastNode.nextVirtualRefLine, {scaleX: 0, transformOrigin: "right center"})
    .set(curWrapper, {left: lastNode.leftDis 
                           + nodeGap 
                           - disToCenterCur_Null + "em",
                     bottom: -moveDownDis + "em"})
    .set(curLine, {height: cur_null_height + "em"})
    .to(curLine, {scaleY: 1})
    .to(curNode, {scale: 1})
    return tl;
}