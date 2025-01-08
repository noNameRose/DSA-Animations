import { getEmSize, nodeLeft } from "./setUpList";
import { styles } from "../inforCode/colorState.js";
import { color } from "../inforCode/color.js";
import { changeNodeStyle} from "./anime.js";


export const searchAnimation = (list, foundIndex, tl, {cur_node_height, cur_head_height, moveDis}) => {
    const refLineWidth = parseFloat(list.head.nextRefLine.style.width);
    const foundNode = nodeTravelAnimation(list, tl, foundIndex, cur_node_height, cur_head_height, moveDis);
    const curWrapper = list.currentWrapper;
    const curNode = list.currentNode;
    const curLine = list.currentLine;
    if (foundIndex < 0) {
        const nullPos = parseFloat(list.tail.actualNode.style.left) + nodeLeft;
        const {width: curNodeWidth, height} = curNode.getBoundingClientRect();
        const {width: nullWidth} = list.tail.nextNull.getBoundingClientRect();
        const {top: nodeTop} = list.tail.actualNode.getBoundingClientRect();
        const {top: nullTop} = list.tail.nextNull.getBoundingClientRect();
        const cur_null_height = getEmSize(nullTop - nodeTop - height, list.actualList);
        const disToCenter = getEmSize(curNodeWidth/2 - nullWidth/2, list.actualList);
        tl.to(list.tail.nextNull, styles["node-content-current-visit-style"])
        .to(list.tail.nextRef, styles["node-content-initial-style"])
        .to(list.tail.nextVirtualLine, {scaleX: 0, transformOrigin: "right center"})
        .set(curWrapper, {left: nullPos - disToCenter + "em", top: 0, bottom: ""})
        .set(curLine, {top: getEmSize(height, list.actualList) + "em", height: cur_null_height + "em"})
        .to(curLine, {scaleY: 1})
        .to(curNode, {scale: 1})
        .to(curLine, {scaleY: 0, delay: 0.5, transformOrigin: "top center"})
        .to(list.tail.nextNull, styles["node-content-initial-style"])
        .to(curNode, {y: "-5em", opacity: 0});
    }
    else {
        const moveUpDis = -5;
        const extendedLineWidth = Math.sqrt(moveUpDis*moveUpDis + refLineWidth*refLineWidth);
        const rotateAngle = Math.atan(-moveUpDis/refLineWidth); 
        const tailLineRightHeight = parseFloat(list.tailLineRight.style.height);
        const headLineWidth = parseFloat(list.headLine.style.width);

        let prevNextRefLine;
        let prevNextRefLineWidth;
        let prevNextRefLineAngle;

        if (foundNode.prev === null) {
            prevNextRefLine = list.headLine;
            prevNextRefLineWidth = Math.sqrt(moveUpDis*moveUpDis + headLineWidth*headLineWidth);
            prevNextRefLineAngle = Math.atan(-moveUpDis/headLineWidth);
        }
        else {
            prevNextRefLine = foundNode.prev.nextRefLine;
            prevNextRefLineWidth = extendedLineWidth;
            prevNextRefLineAngle = rotateAngle;
        }


        tl.to(foundNode.actualNode, {top: moveUpDis + "em"})
        .set(list.headNull, {opacity: 0}, "<")
        .to(curWrapper, {bottom: -moveUpDis + 3 + "em"}, "<")
        .to(foundNode.nextRefLine, {
            width: extendedLineWidth + "em", 
            transformOrigin: "left center", 
            transform: `rotate(${rotateAngle}rad)`}
        , "<")
        if (foundNode.next !== null) {
            tl.to(foundNode.next.prevRefLine, {
                width: extendedLineWidth + "em", 
                transformOrigin: "right center", 
                transform: `rotate(${rotateAngle}rad)`}
            , "<");
        }
        tl.to(foundNode.prevRefLine, {
            width: extendedLineWidth + "em", 
            transformOrigin: "right center", 
            transform: `rotate(-${rotateAngle}rad)`}
        , "<")
        .to(prevNextRefLine, {  // This animation made specifically for the next ref line of previous node
            width: prevNextRefLineWidth + "em",
            transformOrigin: "left center",
            transform: `rotate(-${prevNextRefLineAngle}rad)`
        }, "<");
        // Found at the last node
        if (foundIndex === list.size - 1) {
            tl.to(list.tailLineRight, {height: tailLineRightHeight + (-moveUpDis) + "em"}, "<")
        }

        tl.to(curLine, {scaleY: 0, transformOrigin: "top center", delay: 0.5});
        changeNodeStyle(foundNode, tl, styles["node-initial-style"], styles["node-content-initial-style"], "<")
        .to(foundNode.actualNode, {top: 0}, "<")
        .to([foundNode.nextRefLine, foundNode.prevRefLine], {
            width: refLineWidth + "em", 
            transform: "rotate(0rad)"
        }, "<")
        .to(prevNextRefLine, {width: headLineWidth + "em", transform: "rotate(0deg)"}, "<")
        if (foundNode.next !== null) {
            tl.to(foundNode.next.prevRefLine, {
                 width: refLineWidth + "em", 
                 transform: "rotate(0rad)"
            }, "<");
        }
        else {
            tl.to(list.tailLineRight, {height: tailLineRightHeight + "em"}, "<")
        }
        tl.to(curNode, {y: "5em", opacity: 0});
    }
}


const nodeTravelAnimation = (list, tl, endIndex, cur_node_height, cur_head_height, moveDis) => {
    const refLineWidth = parseFloat(list.head.nextRefLine.style.width);
    const curNode = list.currentNode;
    const curLine = list.currentLine;
    const curWrapper = list.currentWrapper;
    const headLineWidth = parseFloat(list.headLine.style.width);
    let finalIndex = endIndex < 0 ? list.size - 1 : endIndex;
    let current = list.head;
    let i = 0;

    tl.fromTo(curNode, {y: "-5em", opacity: 0}, {y: "0", opacity: 1})
    .set(list.headVirtualLine, {borderColor: color["vitual-line-current-visit"]})
    .to(curLine, {height: cur_head_height + "em"})
    .to(list.actualHead, styles["head-current-visit-style"])
    .to(curNode, {scale: 0, transformOrigin: "bottom center"})
    .to(curLine, {scaleY: 0, transformOrigin: "bottom center"})
    .to(list.headVirtualLine, {width: headLineWidth + "em"});


    while (i <= finalIndex) {
        const x = parseFloat(current.actualNode.style.left);
        const prevNode = current.prev;
        changeNodeStyle(
            current,
            tl,
            styles["node-current-visit-style"],
            styles["node-content-current-visit-style"]
        );
        if (i === 0) {
            tl.to(list.actualHead, styles["head-initial-style"])
            .to(list.headVirtualLine, {scaleX: 0, transformOrigin: "right center"})
        }
        if (prevNode !== null) {
            tl.to(prevNode.nextRef, styles["node-content-initial-style"])
            .to(prevNode.nextVirtualLine, {scaleX: 0, transformOrigin: "right center"})
        }

        tl.set(curWrapper, {left: x + moveDis  + "em"})
        .set(current.nextVirtualLine, {borderColor: color["vitual-line-current-visit"]})
        .set(curLine, {height: cur_node_height + "em"}, "<")
        .to(curLine, {scaleY: 1})
        .to(curNode, {scale: 1});

        if (i != finalIndex || i === finalIndex && endIndex < 0)
            tl.to(curNode, {scale: 0})
            .to(curLine, {scaleY: 0})
            .to(current.actualNode, styles["node-initial-style"])
            .to([current.valBut, current.prevRef], styles["node-content-initial-style"], "<")
            .to(current.nextVirtualLine, {width: refLineWidth + "em"})

        i++;
        current = current.next;
    }    
    return current === null ? list.tail : current.prev;
}