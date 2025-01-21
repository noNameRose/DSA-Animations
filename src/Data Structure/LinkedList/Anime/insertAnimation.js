import { styles } from "../Style/colorState";
import { color } from "../Style/color";
import { getEmsize } from "../SetUp/setUp";
import { changeNodeStyleAnimation, travelAnimation, moveNodeToRight} from "./generalAnimation.js";
import { nodeGap } from "../SetUp/setUp";



export const insertLastAnimation = (list, tl, visitedNodes) => {
    const domTail = list.actualTail;
    const tailLineRightHeight = parseFloat(list.tailLineRight.style.height);
    const lastNode = visitedNodes[0];
    const refLineWidth = parseFloat(lastNode.nextRefLine.style.width);
    const tailLineWidth = parseFloat(list.tailLine.style.width);
    const newNode = list.tail;
    
    lastNode.nextNull.style.opacity = 1;    

    tl
    .to(domTail, styles["tail-manipulated-style"])
    .set([list.virtualTailLineLeft, list.virtualTailLineBottom, list.virtualTailLineRight], {
        borderColor: color["virtual-line-tail-color"],
    }, "<")
    .to(list.virtualTailLineLeft, {height: "100%"})
    .to(list.virtualTailLineBottom, {width: "100%"})
    .to(list.virtualTailLineRight, {height: tailLineRightHeight + "em"});
    changeNodeStyleAnimation(lastNode, tl, styles["node-tail-manipulate-style"], styles["node-content-tail-visit-style"])
    .to(lastNode.nextNull, {scale: 0, 
                            transformOrigin: "left center",
                            onComplete: () => lastNode.nextNull.style.opacity = 0
    })
    .to(lastNode.nextRefLine, {width: refLineWidth/2 + "em"})
    .fromTo(newNode.actualNode, {y: "5em", opacity: 0}, {y: 0, opacity: 1})
    .fromTo(newNode.nextRefLine, {width: 0}, {width: refLineWidth + "em"})
    .fromTo(newNode.nextNull, {scale: 0}, {scale: 1, transformOrigin: "left center"})
    .to(lastNode.nextRefLine, {width: refLineWidth + "em"})
    .to([list.tailLineRight, list.virtualTailLineRight], {height: 0});
    changeNodeStyleAnimation(lastNode, tl, styles["node-normal-style"], styles["node-content-normal-style"], "<")
    .fromTo(list.tailLine, {width: tailLineWidth - nodeGap + "em"}, {width: tailLineWidth + "em"})
    .to([list.tailLineRight, list.virtualTailLineRight], {height: tailLineRightHeight + "em"})
    .to(list.virtualTailLineRight, {height: 0})
    .to(list.virtualTailLineBottom, {width: 0})
    .to(list.virtualTailLineLeft, {height: 0})
    .to(domTail, styles["tail-normal-style"])

};


export const insertBetweenAnimation = (list, tl, visitedNodes, centerObject, disToCenterPrev) => {
    
    const n = visitedNodes.length;
    const nodeBeforeNewNode = visitedNodes[n - 1];
    const newNode = nodeBeforeNewNode.next;
    const translateDis = 8;
    const refLineWidth = parseFloat(nodeBeforeNewNode.nextRefLine.style.width);
    const extendedLineWidth = Math.sqrt(translateDis*translateDis + refLineWidth*refLineWidth);
    const rotateAngle = Math.atan(translateDis/refLineWidth);


    tl.set(newNode.actualNode, {
        top: -translateDis + "em",
        scale: 0
    }).set(newNode.nextRefLine, {
        width: 0
    },"<")


    const nodeAfterNewNode = travelAnimation(list, tl, visitedNodes, centerObject, disToCenterPrev, "insert");
    const curNodeWrapper = list.currentNodeWrapper;
    moveNodeToRight(nodeAfterNewNode, list, tl)
    .to(curNodeWrapper, {left: nodeAfterNewNode.leftDis + centerObject.disToCenterNode + "em"}, "<")
    .to(nodeBeforeNewNode.nextRefLine, {width: refLineWidth + nodeGap + "em"}, "<")
    .to(newNode.actualNode, {scale: 1})
    .to(nodeBeforeNewNode.nextRefLine, {width: refLineWidth - 2 + "em"})
    .to(nodeBeforeNewNode.nextRefLine, {transform: `rotate(-${rotateAngle}rad)`, transformOrigin: "left top"})
    .to(nodeBeforeNewNode.nextRefLine, {width: extendedLineWidth + "em"})
    .set(newNode.nextRefLine, {transform: `rotate(${rotateAngle}rad)`, transformOrigin: "left top"})
    .to(newNode.nextRefLine, {width: extendedLineWidth + 'em'})
    .to(newNode.actualNode, {top: 0})
    .to(newNode.nextRefLine, {width: refLineWidth + "em", transform: "rotate(0deg)"}, "<")
    .to(nodeBeforeNewNode.nextRefLine, {
        width: refLineWidth + 'em',
        transform: "rotate(0deg)",
    }, "<")
    .to(list.currentLine, {scaleY: 0})
    changeNodeStyleAnimation(nodeAfterNewNode, tl, styles["node-normal-style"], styles["node-content-normal-style"], "<")
    .to(list.prevLine, {scaleY: 0}, "<")
    changeNodeStyleAnimation(nodeBeforeNewNode, tl, styles["node-normal-style"], styles["node-content-normal-style"], "<")
    .to(list.currentNode, {y: "-5em", opacity: 0})
    .to(list.prevNode, {y: "5em", opacity: 0}, "<")
}


export const insertFirstAnimation = (list, tl) => {
    const newNode = list.head;
    const initialHead = newNode.next;
    const translateDis = 6;
    const refLineWidth = parseFloat(initialHead.nextRefLine.style.width);
    const headLineWidth = parseFloat(list.headLine.style.width);
    const extendedRefLineWidth = Math.sqrt(translateDis*translateDis + refLineWidth*refLineWidth);
    const refLineAngle = Math.atan(translateDis/refLineWidth);
    const extendedHeadLineWidth = Math.sqrt(translateDis*translateDis + headLineWidth*headLineWidth);
    const headLineAngle = Math.atan(translateDis/headLineWidth);

    tl.set(newNode.actualNode, {
        top: translateDis + "em",
        scale: 0,
    }).set(newNode.nextRefLine, {
        width: 0,
    });

    moveNodeToRight(initialHead, list, tl)
    .to(list.headLine, {width: headLineWidth + nodeGap + "em"}, "<")
    .to(newNode.actualNode, {
        scale: 1,
    })
    .to(list.actualHead, styles["head-current-visit-style"])
    .set(list.virtualHeadLine, {borderColor: color["virtual-head-line-color"]}, "<")
    .to(list.virtualHeadLine, {width: headLineWidth + nodeGap + "em"})
    changeNodeStyleAnimation(initialHead, tl, styles["node-current-visit-style"], styles["node-content-visit-style"])
    .set(newNode.nextRefLine, {transform: `rotate(-${refLineAngle}rad)`, transformOrigin: "left center"}, "<")
    .to(newNode.nextRefLine, {width: extendedRefLineWidth + "em"})
    .to([list.virtualHeadLine, list.headLine], {width: refLineWidth - 2 + "em"})
    changeNodeStyleAnimation(initialHead, tl, styles["node-normal-style"], styles["node-content-normal-style"], "<")
    .to([list.virtualHeadLine, list.headLine], {transform: `rotate(${headLineAngle}rad)`, transformOrigin: "left center"})
    .to([list.virtualHeadLine, list.headLine], {width: extendedHeadLineWidth + "em"})
    .to(list.virtualHeadLine, {width: 0})
    .to(list.actualHead, styles["head-normal-style"])
    .to(newNode.actualNode, {top: 0})
    .to(newNode.nextRefLine, {width: refLineWidth + "em", transform: "rotate(0deg)"}, "<")
    .to(list.headLine, {width: headLineWidth + "em", transform: "rotate(0deg)"}, "<")
}

export const insertWhenEmptyAnimation = (list, tl) => {
    const newNode = list.head;
    const refLineWidth = parseFloat(newNode.nextRefLine.style.width);
    const headLineWidth = parseFloat(list.headLine.style.width);
    const tailLineRightHeight = parseFloat(list.tailLineRight.style.height);


    list.tailLineLeft.style.height = "100%";
    list.tailLineBottom.style.width= "100%";
    list.tailLineRight.style.height = tailLineRightHeight + "em";

    
    tl.set([list.headNull, list.tailNull, list.shortTailLine], {opacity: 1})
    .to([list.headNull, list.tailNull], {scale: 0, transformOrigin: "left center"}) 
    .to([list.headLine, list.shortTailLine], {width: 0})
    .fromTo(newNode.actualNode, {
        top: "-7em",
        scale: 0
    }, {
        scale: 1
    })
    .to(newNode.actualNode, {
        top: "0em",
        ease: "bounce",
        duration: 1,
    })
    .fromTo(newNode.nextRefLine, {width: 0}, {width: refLineWidth + "em"})
    .fromTo(newNode.nextNull, {scale: 0}, {scale: 1, transformOrigin: "left center"})
    .fromTo(list.tailLineLeft,{height: 0} ,{height: "100%"})
    .fromTo(list.tailLineBottom, {width: 0},{width: "100%"})
    .to(list.headLine, {width: headLineWidth + "em"})
    .fromTo(list.tailLineRight, {height: 0}, {height: tailLineRightHeight + "em"}, "<")

    
}