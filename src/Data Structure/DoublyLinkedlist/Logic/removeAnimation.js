import { getEmSize, nodeLeft } from "./setUpList";
import { styles } from "../inforCode/colorState.js";
import { color } from "../inforCode/color.js";
import { changeNodeStyle, travelNodeAnimation} from "./anime.js";

export const removeFirst1 = (list, tl) => {
    const removeNode = list.head;
    const headLineWidth = parseFloat(list.headLine.style.width);

    list.shortTailLine.style.opacity = 1;
    tl.to(removeNode.prevNull, {scale: 0, transformOrigin: "right center"})
    .to(removeNode.nextNull, {scale: 0, transformOrigin: "left center"}, "<")
    .to([removeNode.nextRefLine, removeNode.prevRefLine], {width: 0})
    .to(list.headLine, {width: 0})
    .to(list.tailLineRight, {height: 0})
    .to(list.tailLineBottom, {width: 0})
    .to(list.tailLineLeft, {height: 0,
        onComplete: () => {
            list.tailLineRight.style.opacity = 0;
            list.tailLineLeft.style.opacity = 0;
            list.tailLineBottom.style.opacity = 0;
        }
    })
    .to(removeNode.actualNode, {scale: 0, transformOrigin: "bottom center"})
    .to(list.headLine, {
        width: headLineWidth + "em",
    })
    .fromTo(list.shortTailLine, {width: 0}, {width: headLineWidth + "em"}, "<")
    .fromTo([list.headNull, list.tailNull], {scale: 0}, {scale: 1, transformOrigin: "left center"})
}   



export const removeFirst2 = (list, tl, {centerDis, newHeadLineHeight}) => {
    const removeNode = list.head;
    const newHead = removeNode.next;
    const refLineWidth = parseFloat(removeNode.nextRefLine.style.width);
    const moveDownDis = 20;
    const newHeadRef = list.newHeadRef;
    const newHeadWrapper = list.newHeadWrapper;
    const newHeadRefLine = list.newHeadRefLine; 
    const headLineWidth = parseFloat(list.headLine.style.width);
    const extendedLineWidth = Math.sqrt(moveDownDis*moveDownDis + refLineWidth*refLineWidth);
    const rotateAngle = Math.atan(moveDownDis/refLineWidth);
    const headExtendedLineWidth = Math.sqrt(moveDownDis*moveDownDis + headLineWidth*headLineWidth);
    const rotateAngle2 = Math.atan(moveDownDis/headLineWidth);
    const newHeadRefX = parseFloat(newHeadWrapper.style.left);
    const tailLineWidth = parseFloat(list.tailLine.style.width);
    tl.set(list.headVirtualLine, {borderColor: color["remove-head-virtual-line-color"]})
    .set(newHead.prevNull, {opacity: 1})
    .to(list.actualHead, styles["head-manipulate-style"])
    .to(list.headVirtualLine, {width: headLineWidth + "em"});
    changeNodeStyle(removeNode, tl, styles["node-head-visit-style"], styles["node-head-content-visit-style"])
    .set(removeNode.nextVirtualLine, {borderColor: color["remove-head-virtual-line-color"]}, "<")
    .set(list.headNull, {opacity: 0})
    .to(removeNode.nextVirtualLine, {width: refLineWidth + "em"});
    changeNodeStyle(newHead, tl, styles["node-head-visit-style"], styles["node-head-content-visit-style"])
    .fromTo(newHeadRefLine, {scaleY: 0}, {scaleY: 1, transformOrigin: "bottom center"})
    .fromTo(newHeadRef, {scale: 0}, {scale: 1, transformOrigin: "bottom center"})
    .to(removeNode.actualNode, {top: moveDownDis + "em"})
    .to([removeNode.nextRefLine, removeNode.nextVirtualLine], {
        width: extendedLineWidth + "em",
        transformOrigin: "top left",
        transform: `rotate(-${rotateAngle}rad)`
    }, "<")
    .to(newHead.prevRefLine, {
        width: extendedLineWidth + "em",
        transformOrigin: "top right",
        transform: `rotate(-${rotateAngle}rad)`
    }, "<")
    .to([list.headLine, list.headVirtualLine], {
        width: headExtendedLineWidth + "em",
        transformOrigin: "top left",
        transform: `rotate(${rotateAngle2}rad)`
    }, "<")
    .to([list.headLine, list.headVirtualLine], {
        width: headLineWidth + "em",
        transform: "rotate(0)"
    }, "+=0.2")
    changeNodeStyle(removeNode, tl, styles["node-initial-style"], styles["node-content-initial-style"], "<")
    .to([list.headLine, list.headVirtualLine], {
        width: headLineWidth + nodeLeft + "em",
    })
    .to([removeNode.nextRefLine, removeNode.nextVirtualLine], {width: 0})
    .to(newHead.prevRefLine, {width: 0})
    .to(newHead.prevRefLine, {width: refLineWidth + "em", transform: "rotate(0deg)"})
    .fromTo(newHead.prevNull, {scale: 0}, {scale: 1, transformOrigin: "right center"})
    moveNodesToLeft(newHead, tl)
    .to(newHeadWrapper, {left: newHeadRefX - nodeLeft + "em"}, "<")
    .to([list.headLine, list.headVirtualLine], {width: headLineWidth + "em"}, "<")
    .to(list.tailLine, {width: (tailLineWidth - nodeLeft) + "em"}, "<")
    .to(list.headVirtualLine, {width: 0})
    .to(list.actualHead, styles["head-initial-style"])
    .to(newHeadRefLine, {scaleY: 0, transformOrigin: "top center"}, "<")
    changeNodeStyle(newHead, tl , styles["node-initial-style"], styles["node-content-initial-style"], "<")
    .to(newHeadRef, {y: "-5em", opacity: 0})
    .to(removeNode.prevNull, {scale: 0, transformOrigin: "right center"})
    .to(removeNode.prevRefLine, {width: 0})
    .to(removeNode.actualNode, {x: "10em", opacity: 0})
}



export const removeBetween = (list, tl, target_index, {cur_head_height, cur_node_height, moveDis}) => {
    const curNode = list.currentNode;
    const curWrapper = list.currentWrapper;
    const curLine = list.currentLine;
    const refLineWidth = parseFloat(list.head.nextRefLine.style.width);
    const removeNode = travelNodeAnimation(list, tl, target_index, cur_head_height, cur_node_height, refLineWidth, moveDis);
    const tailLineWidth = parseFloat(list.tailLine.style.width);
    let moveUpDis = -5;

    changeNodeStyle(removeNode, 
                    tl, 
                    styles["node-current-visit-style"], 
                    styles["node-content-current-visit-style"]
    ).to(removeNode.prev.nextRef, styles["node-content-initial-style"])
    .set(curWrapper, {left: (parseFloat(removeNode.actualNode.style.left) + moveDis)+ "em"})
    .to(removeNode.prev.nextVirtualLine, {scaleX: 0, transformOrigin: "right center"})
    .to(curLine, {scale: 1, transformOrigin: "bottom center"})
    .to(curNode, {scale: 1});

    const {extendedLineWidth, rotateAngle} = moveNodeUp(removeNode, list, tl, moveUpDis, cur_node_height);
    tl.set(removeNode.nextVirtualLine, {
        transform: `rotate(${rotateAngle}rad)`,
        transformOrigin: "left center",
        borderColor: color["vitual-line-current-visit"],
    })
    .to(removeNode.nextVirtualLine, {
        width: extendedLineWidth + 0.5 + "em",
    })
    changeNodeStyle(removeNode.next
                    , tl
                    , styles["node-current-visit-style"]
                    , styles["node-content-current-visit-style"]
                    )
    .to(removeNode.next.prevRefLine, {
        width: refLineWidth + "em",
        transform: "rotate(0deg)",
    })
    .set(removeNode.prevVirtualLine, {
        borderColor: color["vitual-line-current-visit"],
        transformOrigin: "right center",
        transform: `rotate(-${rotateAngle}rad)`
    })
    .to(removeNode.prevVirtualLine, {
        width: extendedLineWidth + "em",
    });
    changeNodeStyle(removeNode.prev
        , tl
        , styles["node-current-visit-style"]
        , styles["node-content-current-visit-style"]
        )
    .to(removeNode.next.prevRefLine, {width: refLineWidth + nodeLeft + "em"})
    .to(removeNode.prev.nextRefLine, {
        width: refLineWidth - 2 + "em", 
        transform: `rotate(0deg)`,
    });

    moveUpDis -= 2;
    const extendRefLineWidth = Math.sqrt(moveUpDis*moveUpDis + refLineWidth*refLineWidth);
    const rotateAngle2 = Math.atan(-moveUpDis/refLineWidth);
    tl.to(removeNode.actualNode, {top: moveUpDis + "em"})
    .to(curWrapper, {bottom: cur_node_height + Math.abs(moveUpDis) + "em"}, "<")
    .to([removeNode.nextRefLine, removeNode.nextVirtualLine], {
        width: extendRefLineWidth + "em",
        transform: `rotate(${rotateAngle2}rad)`}, "<")
    .to([removeNode.prevRefLine, removeNode.prevVirtualLine], {
        width: extendRefLineWidth + "em",
        transform: `rotate(-${rotateAngle2}rad)`}, "<")
    .to(removeNode.prev.nextRefLine, {width: refLineWidth + nodeLeft + "em"})
    .to([removeNode.nextRefLine, 
        removeNode.nextVirtualLine, 
        removeNode.prevRefLine, 
        removeNode.prevVirtualLine], {
            width: 0,
    });
    changeNodeStyle(removeNode.prev, 
                    tl,
                    styles["node-initial-style"],
                    styles["node-content-initial-style"],
                    "<");
    changeNodeStyle(removeNode.next, 
                    tl,
                    styles["node-initial-style"],
                    styles["node-content-initial-style"],
    "<").to(removeNode.actualNode, {scale: 0, transformOrigin: "top center"})
    .to(curLine, {height: 0})
    .to(curNode, {y: "5em", opacity: 0});
    moveNodesToLeft(removeNode.next, tl)
    .to([removeNode.prev.nextRefLine, removeNode.next.prevRefLine], {width: refLineWidth + "em"}, "<")
    .to(list.tailLine, {width: tailLineWidth - nodeLeft + "em"}, "<")
}


const moveNodeUp = (node, list, tl, moveUpDis, cur_node_height) => {
    const curWrapper = list.currentWrapper;
    const refLineWidth = parseFloat(list.head.nextRefLine.style.width);
    const extendedLineWidth = Math.sqrt(refLineWidth*refLineWidth + moveUpDis*moveUpDis);
    const rotateAngle = Math.atan(-moveUpDis/refLineWidth);

    tl.to(node.actualNode, {top: moveUpDis + "em"})
    .to(curWrapper, {bottom: cur_node_height + Math.abs(moveUpDis) + "em"}, "<")
    .to(node.nextRefLine, {
        width: extendedLineWidth + "em",
        transform: `rotate(${rotateAngle}rad)`,
        transformOrigin: "left center"
    }, "<")
    .to(node.next.prevRefLine, {
        width: extendedLineWidth + "em",
        transform: `rotate(${rotateAngle}rad)`,
        transformOrigin: "right center"
    }, "<")
    .to(node.prev.nextRefLine, {
        width: extendedLineWidth + "em",
        transform: `rotate(-${rotateAngle}rad)`,
        transformOrigin: "left center"
    }, "<")
    .to(node.prevRefLine, {
        width: extendedLineWidth + "em",
        transform: `rotate(-${rotateAngle}rad)`,
        transformOrigin: "right center"
    }, "<")
    return {
        extendedLineWidth,
        rotateAngle
    };
}

export const removeLast = (list, tl) => {
    const removeNode = list.tail;
    const newTail = removeNode.prev;
    const refLineWidth = parseFloat(removeNode.nextRefLine.style.width);
    const tailLineWidth = parseFloat(list.tailLine.style.width);
    const tailLineRightHeight = parseFloat(list.tailLineRight.style.height);

    newTail.nextNull.style.opacity = 1;

    moveNodeToRight(removeNode, tl)
    .set(removeNode.prevVirtualLine, {borderColor: color["virtual-tail-line-color"]}, "<")
    .to(list.tailLine, {width: tailLineWidth + nodeLeft + "em"}, "<")
    .to([newTail.nextRefLine, removeNode.prevRefLine], {width: (refLineWidth + nodeLeft )+ "em"}, "<")
    .to(list.actualTail, styles["tail-manipulate-style"])
    .to(list.virtualTailLineLeft, {height: "100%"})
    .to(list.virtualTailLineBottom, {width: "100%"})
    .to(list.virtualTailLineRight, {height: tailLineRightHeight + "em"})
    changeNodeStyle(removeNode, tl, styles["node-tail-visit-style"], styles["node-content-tail-visit-style"])
    .to(removeNode.prevVirtualLine, {width: refLineWidth + nodeLeft + "em"})
    changeNodeStyle(newTail, tl, styles["node-tail-visit-style"], styles["node-content-tail-visit-style"])
    .to(newTail.nextRefLine, {width: refLineWidth + "em"})
    .fromTo(newTail.nextNull, {scale: 0}, {scale: 1, transformOrigin: "left center"})
    .to([list.tailLineRight, list.virtualTailLineRight], {height: 0})
    .to(list.tailLine, {width: (tailLineWidth - nodeLeft) + "em"})
    .to([list.tailLineRight, list.virtualTailLineRight], {height: tailLineRightHeight + "em"})
    .to([removeNode.prevRefLine, removeNode.prevVirtualLine], {width: 0})
    .to(removeNode.nextNull, {scale: 0, transformOrigin: "left center"})
    .to(removeNode.nextRefLine, {width: 0})
    .to(list.virtualTailLineRight, {height: 0})
    changeNodeStyle(newTail, tl,styles["node-initial-style"], styles["node-content-initial-style"], "<")
    .to(list.virtualTailLineBottom, {width: 0})
    .to(list.virtualTailLineLeft, {height: 0})
    .to(list.actualTail, styles["head-initial-style"])
    .to(removeNode.actualNode, {y: "5em", opacity: 0})
}

const moveNodeToRight = (startNode, tl) => {
    let current = startNode;
    tl.to(current.actualNode, {})
    while (current !== null) {
        const domNode = current.actualNode;
        const x = parseFloat(domNode.style.left);
        tl.to(domNode, {left: x + nodeLeft + "em"}, "<");
        current = current.next;
    }
    return tl;
}


const moveNodesToLeft = (startNode, tl) => {
    let current = startNode;
    tl.to(startNode, {});
    while(current !== null) {
        const domNode = current.actualNode;
        const x = parseFloat(domNode.style.left);
        tl.to(domNode, {left: (x - nodeLeft)+ "em"}, "<");
        current = current.next;
    }
    return tl;
}