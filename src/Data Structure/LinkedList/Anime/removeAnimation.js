import { nodeGap } from "../SetUp/setUp.jsx";
import { color } from "../Style/color.js";
import { styles } from "../Style/colorState.js";
import { getEmsize } from "../SetUp/setUp.jsx";
import { changeNodeStyleAnimation, moveCurrentToNullAnimation, moveNodeToLeft, travelAnimation } from "./generalAnimation.js"

export const removeAnimation = (list, tl, visitedNodes, centerDisObject, disToCenterPrev) => {
    const n = visitedNodes.length;
    const removeNode = visitedNodes[n - 1];
    const prevRemoveNodes = visitedNodes[n - 2];
    travelAnimation(list, tl, visitedNodes, centerDisObject, disToCenterPrev, "remove");
    const moveUpDis = 5;
    const refLineWidth = parseFloat(removeNode.nextRefLine.style.width);
    const curWrapper = list.currentNodeWrapper;
    const extendedRefLineWidth = Math.sqrt(refLineWidth*refLineWidth + moveUpDis*moveUpDis);
    const rotateAngle = Math.atan(moveUpDis/refLineWidth);
    const curLine = list.currentLine;
    const curNode = list.currentNode;

    tl.to(removeNode.actualNode, {
        top: -moveUpDis + "em",
    }).to(curWrapper, {bottom: moveUpDis + centerDisObject.cur_node_height + "em"}, "<")
    .to(removeNode.nextRefLine, {
        width: extendedRefLineWidth + "em",
        transform: `rotate(${rotateAngle}rad)`, 
        transformOrigin: "left center"
    }, "<")
    .to(prevRemoveNodes.nextRefLine, {
        width: extendedRefLineWidth + "em",
        transform: `rotate(-${rotateAngle}rad)`, 
        transformOrigin: "left center"
    }, "<")
    .to(prevRemoveNodes.nextRefLine, {
        width: refLineWidth - 1 + "em",
        transform: "rotate(0deg)"
    })
    .set(removeNode.nextVirtualRefLine, {
        borderColor: color["virtual-head-line-color"],
        transform: `rotate(${rotateAngle}rad)`,
         transformOrigin: "left center"})
    .to(removeNode.nextVirtualRefLine, {width: extendedRefLineWidth + "em"});
    changeNodeStyleAnimation(removeNode.next, tl, styles["node-current-visit-style"],styles["node-content-visit-style"])
    .to(prevRemoveNodes.nextRefLine, {
        width: refLineWidth + nodeGap + "em"
    })
    .to([removeNode.nextRefLine, removeNode.nextVirtualRefLine], {
        width: 0
    })
    changeNodeStyleAnimation(removeNode.next, tl, styles["node-normal-style"], styles["node-content-normal-style"], "<")
    .to(removeNode.actualNode, {
        scale: 0,
        transformOrigin: "top center",
    })
    .to(curLine, {scaleY: 0, transformOrigin: "top center"})
    .to(list.prevLine, {scaleY: 0, transformOrigin: "bottom center"}, "<")
    .to(curNode, {y: "5em", opacity: 0})
    changeNodeStyleAnimation(prevRemoveNodes, tl, styles["node-normal-style"], styles["node-content-normal-style"], "<")
    .to(list.prevNode, {y: "5em", opacity: 0});
    moveNodeToLeft(removeNode.next, list, tl);
}


export const removeFirstAnimation = (list, tl, visitedNodes, {cur_node_height, disToCenterNode}) => {
    const curWrapper = list.currentNodeWrapper;
    const curNode = list.currentNode;
    const curLine = list.currentLine;
    const headLineWidth = parseFloat(list.headLine.style.width);
    const refLineWidth = parseFloat(list.head.nextRefLine.style.width);
    const tailLineRightHeight = parseFloat(list.tailLineRight.style.height);
    const moveDownDis = 12;
    const extendedRefLineWidth = Math.sqrt(refLineWidth*refLineWidth + moveDownDis*moveDownDis);
    const rotateAngle = Math.atan(moveDownDis/refLineWidth);
    const removeNode = list.head;
    const extendedHeadLineWidth = Math.sqrt(headLineWidth*headLineWidth + moveDownDis*moveDownDis);
    const rotateAngleHead = Math.atan(moveDownDis/headLineWidth);
    const tailLineHeight = parseFloat(getEmsize(list.tailLine.getBoundingClientRect().height, list.actualList));


    tl.fromTo(curNode, {opacity: 0, top: -5 + "em"}, {opacity: 1, top: 0})
    .from(curLine, {height: 0})
    .to(list.actualHead, styles["head-current-visit-style"])
    .to(curNode, {scale: 0, transformOrigin: "bottom center"})
    .to(curLine, {scaleY: 0, transformOrigin: "bottom center"})
    .set(list.virtualHeadLine, {borderColor: color["virtual-head-line-color"]})
    .to(list.virtualHeadLine, {width: headLineWidth + "em"});
    changeNodeStyleAnimation(removeNode, tl, styles["node-current-visit-style"], styles["node-content-visit-style"])
    .to(list.actualHead, styles["head-normal-style"])
    .to(list.virtualHeadLine, {scaleX: 0, transformOrigin: "right center"})
    .set(curWrapper, {left: removeNode.leftDis +  disToCenterNode +   "em"})
    .set(curLine, {height: cur_node_height + "em"}, "<")
    .to(curLine, {scaleY: 1})
    .to(curNode, {scale: 1})
    .to(removeNode.actualNode, {top: moveDownDis + "em"})
    .to(curWrapper, {top: moveDownDis - (cur_node_height*2) + "em"}, "<")
    .to(list.tailLine, {height: tailLineHeight + moveDownDis + "em"}, "<")
    .to(list.tailLineRight, {height: tailLineRightHeight + moveDownDis + "em"}, "<")
    .to(removeNode.nextRefLine, {
        width: extendedRefLineWidth + "em",
        transform: `rotate(-${rotateAngle}rad)`,
        transformOrigin: "left center"
    }, "<")
    .to(list.headLine, {
        width: extendedHeadLineWidth + "em",
        transform: `rotate(${rotateAngleHead}rad)`,
        transformOrigin: "left center"
    }, "<")
    .set(removeNode.nextVirtualRefLine, {
        transform: `rotate(-${rotateAngle}rad)`,
        transformOrigin: "left center",
        borderColor: color["virtual-head-line-color"]
    }, "<")
    .to(removeNode.nextVirtualRefLine, {
        width: extendedRefLineWidth + "em"
    });
    changeNodeStyleAnimation(removeNode.next, tl, styles["node-current-visit-style"], styles["node-content-visit-style"])
    .to(list.headLine, {
        width: refLineWidth - 2 + "em",
        transform: "rotate(0deg)"
    })
    .to(list.headLine, {
        width: headLineWidth + nodeGap + "em"
    })
    .to([removeNode.nextRefLine, removeNode.nextVirtualRefLine], {width: 0});
    changeNodeStyleAnimation(removeNode.next, tl, styles["node-normal-style"], styles["node-content-normal-style"], "<")
    .to(removeNode.actualNode, {scale: 0, transformOrigin: "top center"})
    .to(curLine, {height: 0})
    .to(curNode, {y: "5em", opacity: 0});
    moveNodeToLeft(removeNode.next, list, tl)
    .to(list.headLine, {width: headLineWidth + "em"}, "<")
    .to(list.tailLine, {height: tailLineHeight + "em"}, "<")
    .to(list.tailLineRight, {height: tailLineRightHeight + "em"}, "<")
}   



export const removeLastAnimation = (list, tl, visitedNodes, centerDisObject, disToCenterPrev) => {
        const moveUpDis = 7;
        const n = visitedNodes.length;
        const removeNode = visitedNodes[n - 1];
        const nodeBeforeRemoveNode = visitedNodes[n - 2];
        const curWrapper = list.currentNodeWrapper;
        const curNode = list.currentNode;
        const curLine = list.currentLine;
        const prevNodeHeight = getEmsize(list.prevNode.getBoundingClientRect().height, list.actualList);
        const tailLineWidth = parseFloat(list.tailLine.style.width);
        const refLineWidth = parseFloat(removeNode.nextRefLine.style.width);
        const extendedRefLineWidth = Math.sqrt(refLineWidth*refLineWidth + moveUpDis*moveUpDis);
        const tailLineRightHeight = parseFloat(list.tailLineRight.style.height);
        const rotateAngle = Math.atan(moveUpDis/refLineWidth);
        const tailLineHeight = parseFloat(getEmsize(list.tailLine.getBoundingClientRect().height, list.actualList));
        const nullHeight = getEmsize(removeNode.nextNull.getBoundingClientRect().height, list.actualList);
        travelAnimation(list, tl, visitedNodes, centerDisObject, disToCenterPrev, "remove");

        
        nodeBeforeRemoveNode.nextNull.style.opacity = 1;

        tl.set(nodeBeforeRemoveNode.nextNull, {
            left: refLineWidth + nodeGap + "em",
        })
        .set(removeNode.nextNull, {
            opacity: 0,
        }, "<")
        .to(nodeBeforeRemoveNode.nextRefLine, {
            width: refLineWidth - 3 + "em",
        })
        .to(removeNode.actualNode, {top: -moveUpDis + "em"})
        .to(curWrapper, {bottom: moveUpDis + centerDisObject.cur_node_height + "em"}, "<")
        .to(list.tailLineRight, {
            height: tailLineRightHeight + moveUpDis + "em"
        }, "<")
        .to(removeNode.nextRefLine, {
            width: extendedRefLineWidth + "em",
            transform: `rotate(${rotateAngle}rad)`,
            transformOrigin: "left center"
        }, "<")
         .set(removeNode.nextVirtualRefLine, {
            borderColor: color["virtual-head-line-color"],
            transform: `rotate(${rotateAngle}rad)`,
            transformOrigin: "left center",
        })
        .to(removeNode.nextVirtualRefLine, {
            width: extendedRefLineWidth + "em"
        })
        .to(nodeBeforeRemoveNode.nextNull, styles["node-content-visit-style"])
        .to(nodeBeforeRemoveNode.nextRefLine, {width: refLineWidth + nodeGap + "em"})
        .to([removeNode.nextRefLine, removeNode.nextVirtualRefLine], {
            width: 0
        })
        .to(nodeBeforeRemoveNode.nextNull, styles["node-content-normal-style"], "<")
        .to(list.prevNode, {
            scale: 0
        })
        .to(list.prevLine, {
            scaleY: 0
        })
        .set(list.prevLine, {
            top: "100%",
        })
        .set(list.prevNodeWrapper, {
            top: -prevNodeHeight - centerDisObject.cur_node_height + "em",
        }, "<")
        .to(list.prevLine, {
            scaleY: 1,
            transformOrigin: "bottom center"
        })
        .to(list.prevNode, {
            scale: 1,
            transformOrigin: "bottom center"
        })
        .to(list.tailLineRight, {
            height: 0
        })
        .to(list.tailLine, {
            width: tailLineWidth - nodeGap + "em",
        })
        .to(list.tailLineRight, {
            height: tailLineRightHeight + "em"
        })
        .to(nodeBeforeRemoveNode.nextRefLine, {
            width: refLineWidth + "em",
        })
        .to(nodeBeforeRemoveNode.nextNull, {
            left: refLineWidth + "em"
        }, "<")
        .to(removeNode.actualNode, {
            scale: 0,
            transformOrigin: "top center",
        })
        .to([list.prevLine, curLine], {
            height: 0
        })
        changeNodeStyleAnimation(nodeBeforeRemoveNode, tl, styles["node-normal-style"], styles["node-content-normal-style"], "<")
        .to([list.prevNode, curNode], {
            y: "-5em",
            opacity: 0,
        })      
}


export const unSucessDeleteAnimation = (list, tl, visitedNodes, centerDisObject, disToCenterPrev) => {
    const prevLine = list.prevLine;
    const prevNode = list.prevNode;
    const curLine = list.currentLine;
    const curNode = list.currentNode;
    const prevWrapper = list.prevNodeWrapper;
    const n = visitedNodes.length;
    const nodeBeforeTail = visitedNodes[n - 2];
    const refLineWidth = parseFloat(list.head.nextRefLine.style.width);

    

    travelAnimation(list, tl, visitedNodes, centerDisObject, disToCenterPrev);
    tl.to(prevNode, {
        scale: 0
    }).to(prevLine, {
        scaleY: 0,
    });
    changeNodeStyleAnimation(nodeBeforeTail, tl, styles["node-normal-style"], styles["node-content-normal-style"])
    .to(nodeBeforeTail.nextRef, styles["node-content-prev-visit-style"], "<")
    .set(nodeBeforeTail.nextVirtualRefLine, {borderColor: color["prev-line-color"] })
    .to(nodeBeforeTail.nextVirtualRefLine, {scaleX: 1, transformOrigin: "left center"});
    changeNodeStyleAnimation(list.tail, tl, styles["node-prev-visit-style"], styles["node-content-prev-visit-style"])
    .to(nodeBeforeTail.nextRef, styles["node-content-normal-style"])
    .to(nodeBeforeTail.nextVirtualRefLine, {scaleX: 0, transformOrigin: "right center"})
    .set(prevWrapper, {left: list.tail.leftDis + disToCenterPrev + "em"})
    .to(prevLine, {scaleY: 1})
    .to(prevNode, {scale: 1})
    moveCurrentToNullAnimation(list, tl, styles["node-content-prev-visit-style"])
    .to([curLine, prevLine], {height: 0})
    .to(list.tail.nextNull, styles["node-content-normal-style"], "<");
    changeNodeStyleAnimation(list.tail, tl, styles["node-normal-style"], styles["node-content-normal-style"], "<")
    .to([curNode, prevNode], {y: "5em", opacity: 0})
}


export const removeToEmptyAnimation = (list, tl, centerCurrentObject) => {
    const {cur_node_height, disToCenterNode} = centerCurrentObject;
    const headLineWidth = parseFloat(list.headLine.style.width);
    const curNode = list.currentNode;
    const curLine = list.currentLine;
    const curWrapper = list.currentNodeWrapper;
    const tailLineRightHeight = parseFloat(list.tailLineRight.style.height);

    list.headNull.style.opacity = 1;
    list.tailNull.style.opacity = 1;
    list.shortTailLine.style.opacity = 1;
    list.shortTailLine.style.width = headLineWidth + "em";
    list.tailLineRight.style.height = 0;
    list.tailLineBottom.style.width = 0;
    list.tailLineLeft.style.height = 0;
    

    tl
    .fromTo(curNode, {opacity: 0, y: "-5em"}, {opacity: 1, y: "0"})
    .from(curLine, {height: 0})
    .to(list.actualHead, styles["head-current-visit-style"])
    .to(curNode, {scale: 0, transformOrigin: "bottom center"})
    .to(curLine, {scaleY: 0, transformOrigin: "bottom center"})
    .set(list.virtualHeadLine, {borderColor: color["virtual-head-line-color"]})
    .to(list.virtualHeadLine, {width: headLineWidth + "em"})
    changeNodeStyleAnimation(list.head, tl, styles["node-current-visit-style"], styles["node-content-visit-style"])
    .to(list.actualHead, styles["head-normal-style"])
    .to(list.virtualHeadLine, {scaleX: 0, transformOrigin: "right center"})
    .set(curWrapper, {left: list.head.leftDis + disToCenterNode + "em"}, "<")
    .set(curLine, {height: cur_node_height + "em"})
    .to(curLine, {scaleY: 1})
    .to(curNode, {scale: 1})
    .to(list.headLine, {width: 0})
    .fromTo(list.tailLineRight, {height: tailLineRightHeight + "em"}, {height: 0})
    .fromTo(list.tailLineBottom, {width: "100%"}, {width: 0})
    .fromTo(list.tailLineLeft, {height: "100%"}, {height: 0})
    .to(list.head.nextNull, {scale: 0, transformOrigin: "left center"})
    .to(list.head.nextRefLine, {width: 0})
    .to(list.head.actualNode, {scale: 0, transformOrigin: "top center"})
    .to(curLine, {height: 0})
    .to(curNode, {y: "-5em", opacity: 0})
    .to(list.headLine, {width: headLineWidth + "em"})
    .fromTo(list.shortTailLine, {width: 0} , {width: headLineWidth + "em"}, "<")
    .fromTo([list.headNull, list.tailNull], {scale: 0},{scale: 1, transformOrigin: "left center"})
}

export const removeWhenNotFoundAnimationWith1Node = (list, tl, visitedNodes,  {disToCenterNode, cur_node_height}, disToCenterPrev) => {
    const curNodeWrapper = list.currentNodeWrapper;
    const curLine = list.currentLine;
    const curNode = list.currentNode;
    const headLineWidth = parseFloat(list.headLine.style.width);
    const nodeHeight = getEmsize(list.head.actualNode.getBoundingClientRect().height, list.actualList);
    const refLineWidth = parseFloat(list.head.nextRefLine.style.width);

    const firstNode = visitedNodes[0];

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
    moveCurrentToNullAnimation(list, tl, styles["head-prev-visit-style"])
    .to([curLine, list.prevLine], {height: 0})
    .to(firstNode.nextNull, styles["node-content-normal-style"], "<")
    changeNodeStyleAnimation(firstNode, tl, styles["node-normal-style"], styles["node-content-normal-style"], "<")
    .to(curNode, {y: "-5em", opacity: 0})
    .to(list.prevNode, {y: "5em", opacity: 0}, "<")



}