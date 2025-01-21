import { nodeGap } from "../SetUp/setUp";
import { color } from "../Style/color";
import { styles } from "../Style/colorState";
import { getEmsize } from "../SetUp/setUp";
import { changeNodeStyleAnimation, moveCurrentToNullAnimation } from "./generalAnimation";

export const searchAnimation = (list, tl, centerCurrentObject, visitedNodes, found) => {
    
    const {cur_node_height} = centerCurrentObject;
    const n = visitedNodes.length;
    const moveUpDis = 5;
    const moveDownDis = 5;
    const foundNode = visitedNodes[n - 1];
    const refLineWidth = parseFloat(list.head.nextRefLine.style.width);
    const curWrapper = list.currentNodeWrapper;
    const extendedRefLineWidth = Math.sqrt(refLineWidth*refLineWidth + moveUpDis*moveUpDis);
    const refLineRotateAngle = Math.atan(moveUpDis/refLineWidth);
    const headLineWidth = parseFloat(list.headLine.style.width);
    const extendedHeadLineWidth = Math.sqrt(moveUpDis*moveUpDis + headLineWidth*headLineWidth);
    const headLineRotateAngle = Math.atan(moveUpDis/headLineWidth);
    const isLastNode = found && (n === list.size);
    const tailLineRightHeight = parseFloat(list.tailLineRight.style.height);
    const curLine = list.currentLine;
    const curNode = list.currentNode;
    const {top: nodeTop} = foundNode.actualNode.getBoundingClientRect();
    const {width: curWidth} = curNode.getBoundingClientRect();
    const {width: nullWidth, top: nullTop} = foundNode.nextNull.getBoundingClientRect();
    const disToCenterCur = getEmsize(curWidth/2 - nullWidth/2, list.actualList);
    const cur_null_height = getEmsize(nullTop - nodeTop, list.actualList) - moveDownDis;

    travelAnimation(list, tl, visitedNodes, centerCurrentObject);


    // Animation if node with given key is found in the list
    if (found) {
        let prevRefLine = list.headLine;
        let prevLineStyle = {
            width: extendedHeadLineWidth + "em",
            transformOrigin: "left center",
            transform: `rotate(-${headLineRotateAngle}rad)`,
        };
        let prevLineInitialStyle = {
            width: headLineWidth + "em",
            transform: "rotate(0deg)",
        }

        // Found node is not at the beginning of the list => previous line is not head line
        if (n > 1) {
            prevRefLine = visitedNodes[n - 2].nextRefLine;
            prevLineStyle = {
                width: extendedRefLineWidth + "em",
                transformOrigin: "left center",
                transform: `rotate(-${refLineRotateAngle}rad)`,
            };
            prevLineInitialStyle.width = refLineWidth + "em";
        }

        tl.to(foundNode.actualNode, {
            top: -moveUpDis + "em"
        }).to(curWrapper, {
            bottom: moveUpDis + cur_node_height+ "em"
        }, "<")
        .to(foundNode.nextRefLine, {
            width: extendedRefLineWidth + "em",
            transformOrigin: "left center",
            transform: `rotate(${refLineRotateAngle}rad)`,
        }, "<")
        .to(prevRefLine, prevLineStyle, "<")
        if (isLastNode) {
            tl.to(list.tailLineRight, {height: tailLineRightHeight + moveUpDis + "em"}, "<");
        }
        tl.to(curLine, {height: 0})
        .to(foundNode.actualNode, {top: 0}, "<")
        changeNodeStyleAnimation(foundNode, tl, styles["node-normal-style"], styles["node-content-normal-style"], "<")
        .to(foundNode.nextRefLine, {width: refLineWidth + "em", transform: "rotate(0deg)"}, "<")
        .to(prevRefLine, prevLineInitialStyle, "<");
        if (isLastNode) {
            tl.to(list.tailLineRight, {height: tailLineRightHeight + "em"}, "<");
        }
        tl.to(curNode, {y: "5em", opacity: 0})
    }   // Animation if no node with given key is found
    else {
        tl.to(curNode, {scale: 0})
        .to(curLine, {scaleY: 0})
        .to(foundNode.actualNode, styles["node-normal-style"])
        .to(foundNode.valBut, styles["node-content-normal-style"], "<")
        .set(foundNode.nextVirtualRefLine, {borderColor: color["virtual-head-line-color"]})
        .to(foundNode.nextVirtualRefLine, {width: refLineWidth + "em"})
        .to(foundNode.nextNull, styles["node-content-visit-style"])
        .to(foundNode.nextRef, styles["node-content-normal-style"])
        .to(foundNode.nextVirtualRefLine, {scaleX: 0, transformOrigin: "right center"})
        .set(curWrapper, {left: foundNode.leftDis +
                                nodeGap -
                                disToCenterCur +
                                 "em",
                          bottom: -moveDownDis + "em"})
        .set(curLine, {height: cur_null_height + "em"}, "<")
        .to(curLine, {scaleY: 1})
        .to(curNode, {scale: 1})
        .to(curLine, {height: 0, delay: 0.2})
        .to(foundNode.nextNull, styles["node-content-normal-style"], "<")
        .to(curNode, {y: "-5em", opacity: 0})
    }


}


const travelAnimation = (list, tl, visitedNodes, {cur_node_height, disToCenterNode}) => {
    const curNode = list.currentNode;
    const curLine = list.currentLine;
    const curWrapper = list.currentNodeWrapper;
    const n = visitedNodes.length;
    const headLineWidth = parseFloat(list.headLine.style.width);
    const refLineWidth = parseFloat(list.head.nextRefLine.style.width);

    tl.fromTo(curNode, {opacity: 0, y: "-5em"}, {opacity: 1, y: "0"})
    .from(curLine, {height: 0})
    .to(list.actualHead, styles["head-current-visit-style"])
    .to(curNode, {scale: 0, transformOrigin: "bottom center"})
    .to(curLine, {scaleY: 0, transformOrigin: "bottom center"})
    .set(list.virtualHeadLine, {borderColor: color["virtual-head-line-color"]})
    .to(list.virtualHeadLine, {width: headLineWidth + "em"})
    .set(curLine, {height: cur_node_height + "em"})

    
    for (let i = 0; i < n; i++) {
        const node = visitedNodes[i];
        changeNodeStyleAnimation(node, tl, styles["node-current-visit-style"], styles["node-content-visit-style"])
        if (i === 0) {
            tl.to(list.actualHead, styles["head-normal-style"])
            .to(list.virtualHeadLine, {scaleX: 0, transformOrigin: "right center"})
        }
        else {
            const nodeBeforeThisNode = visitedNodes[i - 1];
            tl.to(nodeBeforeThisNode.nextRef, styles["node-content-normal-style"])
            .to(nodeBeforeThisNode.nextVirtualRefLine, {scaleX: 0, transformOrigin: "right center"})
        }
        tl.set(curWrapper, {
            left: node.leftDis + disToCenterNode + "em"
        })
        .to(curLine, {scaleY: 1})
        .to(curNode, {scale: 1});
        if (i < n - 1) {
            tl.to(curNode, {scale: 0, delay: 0.2})
            .to(curLine, {scaleY: 0})
            .to(node.actualNode, styles["node-normal-style"])
            .to(node.valBut, styles["node-content-normal-style"], "<")
            .set(node.nextVirtualRefLine, {borderColor: color["virtual-head-line-color"]}, "<")
            .to(node.nextVirtualRefLine, {width: refLineWidth + "em"});
        }
    }
    return tl;
}