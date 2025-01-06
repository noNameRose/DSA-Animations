import { getEmSize, nodeLeft } from "./setUpList.jsx";
import {styles} from "../inforCode/colorState.js"
import { color } from "../inforCode/color.js";

export const insertFirstEmpty = (list, tl) => {
    const newNode = list.head;
    const headLineWidth = getEmSize(list.headLine.getBoundingClientRect().width, list.actualList);
    const tailLeftHeight = getEmSize(list.tailLineLeft.getBoundingClientRect().height, list.actualList);
    const tailRightHeight = getEmSize(list.tailLineRight.getBoundingClientRect().height, list.actualList);
    list.shortTailLine.style.opacity = 1;
    list.tailLineRight.style.opacity = 1;
    list.tailLineLeft.style.opacity = 1;
    list.tailLineBottom.style.opacity = 1;
    tl.to([list.headNull, list.tailNull], {
        x: "5rem",
        opacity: 0,
    }).to([list.headLine, list.shortTailLine], {
        width: 0,
    }).from(newNode.actualNode, {
        y: "-3rem",
        opacity: 0,
    }).from([newNode.nextRefLine, newNode.prevRefLine], {
        width: 0
    }).fromTo([newNode.prevNull, newNode.nextNull], {
        scale: 0,
    }, {scale: 1,
    })
    .to(list.headLine, {
        width: headLineWidth+ "em",
    })
    .fromTo(list.tailLineLeft, {
        height: 0,
    }, {height: tailLeftHeight + "em"})
    .fromTo(list.tailLineBottom, {
        width: 0,
    }, {width: "100%"}, "-=0.1")
    .fromTo(list.tailLineRight, {
        height: 0,
    }, {height: tailRightHeight + "em"}, "-=0.1");
};

export const insertFirst = (list, tl) => {
    const lineMoveMentDuration = 0.5;
    const newNode = list.head;
    const moveNodes = newNode.next;
    const refLineWidth = parseFloat(moveNodes.nextRefLine.style.width);
    const headLineWidh = getEmSize(list.headLine.getBoundingClientRect().width, list.actualList);
    const tailLineWidth = parseFloat(list.tailLine.style.width);
    const moveDownDis = 20;
    const extendPrevLineWidth = Math.sqrt((refLineWidth*refLineWidth) + (moveDownDis * moveDownDis));
    const extendHeadLineWidth = Math.sqrt((headLineWidh * headLineWidh) + (moveDownDis * moveDownDis));
    const rotateAngle = Math.atan(moveDownDis/refLineWidth);
    const headRotateAngle = Math.atan(moveDownDis/headLineWidh);
    moveNodes.prevNull.style.opacity = 1;
    list.headNull.style.opacity = 0;
    moveNodesLeft(moveNodes, tl)
    .to(list.headLine, {
        width: headLineWidh + nodeLeft + "em",
    }, "<")
    .fromTo(list.tailLine, {width: tailLineWidth - nodeLeft + "em"} , {
        width: tailLineWidth + "em",
        duration: 1,
    }, "<")
    .fromTo(newNode.actualNode, {scale: 0} ,{
        scale: 1,
    })
    .to(moveNodes.prevNull, {
        scale: 0,
        transformOrigin: "center right",
    })
    .to(moveNodes.prevRefLine, {
        width: 0,
    })
    .set(moveNodes.prevRefLine, {
        transform: `rotate(-${rotateAngle}rad)`,
        transformOrigin: "center right",
    })
    .to(moveNodes.prevRefLine, {
        width: extendPrevLineWidth + "em",
    })
    .set(newNode.nextRefLine, {
        transform: `rotate(-${rotateAngle}rad)`,
        transformOrigin: "left center"
    })
    .fromTo(newNode.nextRefLine, {width:0}, {
        width: extendPrevLineWidth + "em",
    })
    .to(newNode.nextRefLine, {
        width: extendPrevLineWidth + "em",
    })
    .to(list.headLine, {
        width: 0,
    })
    .set(list.headLine, {
        transform: `rotate(${headRotateAngle}rad)`,
        transformOrigin: "center left",
    })
    .to(list.headLine, {
        width: extendHeadLineWidth + "em",
    })
    .fromTo(list.head.actualNode, {top:  moveDownDis + "em" }, {
        top: 0,
        duration: lineMoveMentDuration,
    })
    .to(newNode.nextRefLine, {
        width: refLineWidth + "em",
        transform: "rotate(0deg)",
        duration: lineMoveMentDuration,
    }, "<")
    .to(moveNodes.prevRefLine, {
        width: refLineWidth + "em",
        transform: "rotate(0deg)",
        duration: lineMoveMentDuration,
    }, "<")
    .to(list.headLine, {
        width: headLineWidh + "em",
        transform: "rotate(0deg)",
        duration: lineMoveMentDuration,
    }, "<")
    .fromTo(newNode.prevRefLine, {width: 0}, {width: refLineWidth + "em", delay: 0.5})
    .fromTo(newNode.prevNull, {scale: 0}, 
        {   scale: 1, 
            transformOrigin: "center right",
            onComplete: () => {
                moveNodes.prevNull.style.opacity = 0;
                list.headNull.style.opacity = 1;
            }
        })
    ;
}
   


export const insertLast = (list, tl) => {
    const tail = list.tail.prev;
    const newNode = list.tail;
    const refLineWidth = parseFloat(newNode.nextRefLine.style.width);
    const prevTailLineWidth = parseFloat(list.tailLine.style.width) - nodeLeft;
    const tailRightHeight = parseFloat(list.tailLineRight.style.height);
    tail.nextNull.style.opacity = 1;
    tl.to(list.actualTail, styles["tail-manipulate-style"])
    .to(list.virtualTailLineLeft, {height: "100%"})
    .to(list.virtualTailLineBottom, {width: "100%"})
    .to(list.virtualTailLineRight, {height: tailRightHeight + "em"})
    .to(tail.actualNode, styles["node-tail-visit-style"])
    .to(tail.nextRef, styles["node-content-tail-visit-style"], "<")
    .to(tail.prevRef, styles["node-content-tail-visit-style"], "<")
    .to(tail.valBut, styles["node-content-tail-visit-style"], "<")
    .to(tail.nextNull, {scale: 0, transformOrigin: "center left"})
    .to(tail.nextRefLine, {width: 0})
    .fromTo(newNode.actualNode, {x: "5em", opacity: 0}, {x: "0em", opacity:1})
    .fromTo(newNode.nextRefLine, {width: 0}, {width: refLineWidth + "em"})
    .fromTo(newNode.nextNull, {scale: 0}, {scale: 1, transformOrigin: "center left"})
    .to(tail.nextRefLine, {width: refLineWidth + "em"})
    .fromTo(newNode.prevRefLine, {width: 0}, {width: refLineWidth + "em"})
    .to([list.virtualTailLineRight, list.tailLineRight], {height: 0})
    .to(tail.actualNode, styles["node-initial-style"], "<")
    .to(tail.nextRef, styles["node-content-initial-style"], "<")
    .to(tail.prevRef, styles["node-content-initial-style"], "<")
    .to(tail.valBut, styles["node-content-initial-style"], "<")
    .from(list.tailLine, {width: prevTailLineWidth + "em"})
    .to([list.tailLineRight, list.virtualTailLineRight], {height: tailRightHeight + "em"})
    .to(list.virtualTailLineRight, {height: 0})
    .to(list.virtualTailLineBottom, {width: 0})
    .to(list.virtualTailLineLeft, {height: 0})
    .to(list.actualTail, styles["tail-initial-style"])
    .to(list.actualList, {
        onComplete: () => {
            tail.nextNull.style.opacity = 0;
            tail.nextNull.style.scale = 1;
        }
    })

}

export const insertBeforelast = (list, tl) => {
    const tail = list.tail;
    const moveDownDis = 20;
    const newNode = tail.prev;
    const nodeBeforeNewNode = newNode.prev;
    const tailXcoordinate = parseFloat(tail.actualNode.style.left);
    const curTailLineWidth = parseFloat(list.tailLine.style.width);
    const refLineWidth = parseFloat(tail.nextRefLine.style.width);
    const tailRightHeight = parseFloat(list.tailLineRight.style.height);
    const extendLineWidth = Math.sqrt((refLineWidth * refLineWidth) + (moveDownDis * moveDownDis));
    const rotateAngle = Math.atan(moveDownDis/refLineWidth);

    newNode.nextRefLine.style.width = 0;
    newNode.prevRefLine.style.width = 0;

    tl.fromTo(list.tailLine, {width: (curTailLineWidth - nodeLeft) + "em"}, {width: curTailLineWidth + "em"})
    .fromTo(tail.actualNode, {left: (tailXcoordinate - nodeLeft) + "em"}, {left: tailXcoordinate + "em"}, "<")
    .to([nodeBeforeNewNode.nextRefLine, tail.prevRefLine], {width: (refLineWidth + nodeLeft) + "em"}, "<")
    .fromTo(newNode.actualNode, {scale: 0}, {scale: 1})
    .to(list.actualTail, styles["tail-manipulate-style"])
    .to(list.virtualTailLineLeft, {height: "100%"})
    .to(list.virtualTailLineBottom, {width: "100%"})
    .to(list.virtualTailLineRight, {height: tailRightHeight + "em"})
    .to(tail.actualNode, styles["node-tail-visit-style"])
    .to([tail.prevRef, tail.nextRef, tail.valBut], styles["node-content-tail-visit-style"], "<")
    .to(tail.prevVirtualLine, {width: (refLineWidth + nodeLeft) + "em"})
    .to(nodeBeforeNewNode.actualNode, styles["node-tail-visit-style"])
    .to([nodeBeforeNewNode.prevRef, nodeBeforeNewNode.nextRef, nodeBeforeNewNode.valBut], styles["node-content-tail-visit-style"], "<")
    .to(nodeBeforeNewNode.nextRefLine, {width: 0})
    .set(nodeBeforeNewNode.nextRefLine, {transformOrigin: "top left", transform: `rotate(${rotateAngle}rad)`})
    .to(nodeBeforeNewNode.nextRefLine, {width: extendLineWidth + "em"})
    .set(newNode.prevRefLine, {transformOrigin: "top right", transform: `rotate(${rotateAngle}rad)`})
    .to(newNode.prevRefLine, {width: extendLineWidth + "em"})
    .to([tail.prevVirtualLine, tail.prevRefLine], {width: 0, delay: 0.3});

    changeNodeStyle(nodeBeforeNewNode, tl, styles["node-initial-style"], styles["node-content-initial-style"], "<")
    .set(tail.prevRefLine, {transformOrigin: "top right", transform: `rotate(-${rotateAngle}rad)`})
    .to(tail.prevRefLine, {width: extendLineWidth + "em"})
    .set(newNode.nextRefLine, {transform:  `rotate(-${rotateAngle}rad)`, transformOrigin: "top left"})
    .to(newNode.nextRefLine, {width: extendLineWidth + "em"})
    .fromTo(newNode.actualNode, {y: moveDownDis + "em"}, {y: 0})
    .to([newNode.prevRefLine, newNode.nextRefLine, tail.prevRefLine, nodeBeforeNewNode.nextRefLine], {
        width: refLineWidth + "em",
        transform: "rotate(0deg)"
    }, "<");

    changeNodeStyle(tail, tl, styles["node-initial-style"], styles["node-content-initial-style"])
    .to(list.virtualTailLineRight, {height: 0}, "<")
    .to(list.virtualTailLineBottom, {width: 0})
    .to(list.virtualTailLineLeft, {height: 0})
    .to(list.actualTail, styles["tail-initial-style"])
    .to(list.actualList, {
        onComplete: () => {
            newNode.nextRefLine.style.width = refLineWidth + "em";
            newNode.prevRefLine.style.width = refLineWidth + "em";
        }
    })
}

export const insertBetween = (list, tl, target_index, {cur_head_height, cur_node_height, moveDis}) => {
    const headLineWidth = parseFloat(list.headLine.style.width);
    const headVirtualLine = list.headVirtualLine;
    const refLineWidth = parseFloat(list.head.nextRefLine.style.width);
    const curNode = list.currentNode;
    const curWrapper = list.currentWrapper;
    const curLine = list.currentLine;
    const tailLineWidth = parseFloat(list.tailLine.style.width);
    const moveDownDis = 20;
    const extendedLineWidth = Math.sqrt((moveDownDis*moveDownDis) + (refLineWidth*refLineWidth));
    const rotateAngle = Math.atan(moveDownDis/refLineWidth)

    headVirtualLine.style.borderTopColor = color["head-virtual-line-color"],

    tl.fromTo(curNode, {y: "-5em", opacity: 0}, {y: 0, opacity: 1})
    .to(list.currentLine, {height: cur_head_height + "em"})
    .to(list.actualHead, styles["head-current-visit-style"])
    .to(list.currentNode, {scale: 0, transformOrigin: "bottom center"})
    .to(list.currentLine, {scale: 0, transformOrigin: "bottom center"})
    .to(headVirtualLine, {width: headLineWidth + "em"});
    

    const current = travelNodeAnimation(list, tl, target_index, cur_node_height, refLineWidth, moveDis);

    const newNode = current;
    const nodeAfterNewNode = newNode.next;
    changeNodeStyle(nodeAfterNewNode, tl, styles["node-current-visit-style"], styles["node-content-current-visit-style"])
    .to(newNode.prev.nextRef, styles["node-content-initial-style"])
    .to(newNode.prev.nextVirtualLine, {scaleX: 0, transformOrigin: "right center"})
    .set(curWrapper, {left: parseFloat(newNode.actualNode.style.left) + moveDis + "em"})
    .to(curLine, {scale: 1})
    .to(curNode, {scale: 1})
    moveNodesLeft(nodeAfterNewNode, tl);
    tl.to(curWrapper, {left: parseFloat(nodeAfterNewNode.next.actualNode.style.left) + moveDis + "em", duration: 1}, "<")
    .fromTo(list.tailLine, {width: (tailLineWidth - nodeLeft) + "em"}, {width: tailLineWidth + "em", duration: 1}, "<")
    .to([newNode.prev.nextRefLine, nodeAfterNewNode.prevRefLine], {width: refLineWidth + nodeLeft + "em", duration: 1}, "<")
    .fromTo(newNode.actualNode, {scale: 0}, {scale: 1})
    .set(newNode.nextRefLine, {transformOrigin: "top left", transform: `rotate(-${rotateAngle}rad)`})
    .to(nodeAfterNewNode.prevVirtualLine, {
        width: refLineWidth + nodeLeft + "em",
        borderColor: color["vitual-line-current-visit"]
    });
    changeNodeStyle(newNode.prev, tl, styles["node-current-visit-style"], styles["node-content-current-visit-style"])
    .to(newNode.prev.nextRefLine, {width: 0})
    .set(newNode.prev.nextRefLine, {transform: `rotate(${rotateAngle}rad)`, transformOrigin: "top left"})
    .set(newNode.prevRefLine, {transform: `rotate(${rotateAngle}rad)`, transformOrigin: "top right"})
    .to(newNode.prev.nextRefLine, {width: extendedLineWidth + "em"})
    .fromTo(newNode.prevRefLine, {width: 0}, {width: extendedLineWidth + "em"})
    .to([nodeAfterNewNode.prevVirtualLine, nodeAfterNewNode.prevRefLine], {width: 0});
    changeNodeStyle(newNode.prev, tl, styles["node-initial-style"], styles["node-content-initial-style"], "<")
    .fromTo(newNode.nextRefLine, {width: 0}, {width: extendedLineWidth + "em"})
    .set(nodeAfterNewNode.prevRefLine, {transform: `rotate(-${rotateAngle}rad)`, transformOrigin: "center right"})
    .to(nodeAfterNewNode.prevRefLine, {width: extendedLineWidth + "em"})
    .fromTo(newNode.actualNode, {y: moveDownDis + "em"}, {y: 0})
    .to(newNode.prevRefLine, {width: refLineWidth + "em", transform: `rotate(0deg)`}, "<")
    .to(newNode.nextRefLine, {width: refLineWidth + "em", transform: `rotate(0deg)`}, "<")
    .to(newNode.prev.nextRefLine, {width: refLineWidth + "em", transform: `rotate(0deg)`}, "<")
    .to(nodeAfterNewNode.prevRefLine, {width: refLineWidth + "em", transform: `rotate(0deg)`}, "<");

    tl.to(curLine, {height: 0});
    changeNodeStyle(nodeAfterNewNode, tl, styles["node-initial-style"], styles["node-content-initial-style"], "<")
    .to(curNode, {
        y: "-5em", 
        opacity: 0,
    });
    

    
}


export const travelNodeAnimation = (list, tl, target_index, cur_node_height, refLineWidth, moveDis) => {
    let i = 0;
    let current = list.head;
    const curWrapper = list.currentWrapper;
    const curLine = list.currentLine;
    const curNode = list.currentNode;
    const headVirtualLine = list.headVirtualLine;
    while (i < target_index) {
        const curNodeLeft = parseFloat(current.actualNode.style.left);
        const prevNode = current.prev;
        changeNodeStyle( current,
                         tl,
                         styles["node-current-visit-style"],
                         styles["node-content-current-visit-style"]
        );
        if (i === 0) {
            tl.to(list.actualHead, styles["head-initial-style"])
            .to(headVirtualLine, {transformOrigin: "right center", scaleX: 0});
        }
        if (prevNode !== null) {
            tl.to(prevNode.nextRef, styles["node-content-initial-style"])
            .to(prevNode.nextVirtualLine, {
                scaleX: 0,
                transformOrigin: "right center",
            });
        }
        tl.set(curWrapper, {left: (curNodeLeft + moveDis) + "em"})
        .set(curLine, {height: cur_node_height + "em"})
        .to(curLine, {scale: 1})
        .to(curNode, {scale: 1})
        .to(curNode, {scale: 0})
        .to(curLine, {scale: 0})
        .to(current.actualNode, {
            color: color["node-content-text-color"],
            backgroundColor: color["node-theme"],
            borderColor: color["node-border-color"],
            borderStyle: "dashed"
        })
        .to([current.valBut, current.prevRef], {backgroundColor: color["node-content-bg"], color: color["node-content-text-color"]}, "<")
        .to(current.nextRef, {color: color["content-current-visit-color"]}, "<")
        .set(current.nextVirtualLine, {borderColor: color["vitual-line-current-visit"]})
        .to(current.nextVirtualLine, {width: refLineWidth + "em"})
        i++;
        current = current.next;
    }
    return current;
}

export const changeNodeStyle = (node, tl, pStyle, cStyle, posParameter) => {
    tl.to(node.actualNode, pStyle, posParameter)
    .to([node.prevRef, node.nextRef, node.valBut], cStyle, "<");
    return tl;
}

const moveNodesLeft = (startNode, tl) => {
    let current = startNode;
    while (current !== null) {
        const node = current.actualNode;
        const xBefore = parseInt(node.style.left) - nodeLeft;
        tl.from(current.actualNode, {
            left: xBefore + "em",
            duration: 1,
        }, "<")
        current = current.next;
    }
    return tl;
}