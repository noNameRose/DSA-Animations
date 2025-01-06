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
    const refLineWidth = parseFloat(list.head.nextRefLine.style.width);
    travelNodeAnimation(list, tl, target_index, cur_node_height, refLineWidth, moveDis);
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