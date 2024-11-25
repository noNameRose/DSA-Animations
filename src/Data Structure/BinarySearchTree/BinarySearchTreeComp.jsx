import TreeNode from "./TreeNode.jsx";
import { useEffect, useRef } from "react";
import TravelNode from "./TravelNode.jsx";
import gsap from "gsap";
import {styles} from "./inofrCode/colorState.js";




export default function BinarySearchTreeComp({operation}) {
    const {tree, name} = operation;
    const treeList = [];
    const domCurNode = useRef(null);
    const dis_bet_node_travelNode = useRef(null);
    const connectedLine = useRef(null);
    const tl = useRef(null);
    const needTravelNode = operation.name === "search" 
                        || operation.name === "insert";
    getTreeList(tree.root, treeList);
    useEffect(() => {
        drawTreePostOrder(tree.root, 0, 0);
        drawNodeChain(tree.root);
        tl.current = gsap.timeline();
        if (name === "insert") {

        }
        else if (name === "search") {
            if (tree.isEmpty())
                return;
            const {visitedNodes, found} = tree.search(operation.searchTarget);
            const root = visitedNodes[0].actualNode;
            const {left: rl, top: rt} = root.getBoundingClientRect();
            const curNode = domCurNode.current;
            curNode.style.left = 0;
            curNode.style.top = 0;
            if (dis_bet_node_travelNode.current === null) {
                dis_bet_node_travelNode.current = Math.abs(rt - curNode.getBoundingClientRect().bottom);
                dis_bet_node_travelNode.current /= parseFloat(getComputedStyle(curNode).fontSize);
            }
            connectedLine.current.style.height = dis_bet_node_travelNode.current + "em";
            tl.current.from(curNode, {
                opacity: 0,
                y: "-1em",
            }).from(connectedLine.current, {
                height: 0,
            } );
            animeStyle(root, styles["node-current-visit-style"], tl.current);
            tl.current.to(curNode, {
                scale: 0,
                transformOrigin: "center center",
            }).to(curNode, {
                y: "10px",
            }, "<");
            let previousVal = visitedNodes[0].value;
            let previousNode = visitedNodes[0];
            for (let i = 1; i < visitedNodes.length; i++) {
                let currentVal = visitedNodes[i].value;
                let connector = previousNode.leftConnector;
                let chain = previousNode.leftVirtualLine;
                const node =visitedNodes[i].actualNode;
                const {left: nl, top: nt} = node.getBoundingClientRect();
                const nodeFS = parseFloat(getComputedStyle(curNode).fontSize);
                const y = (nt - rt)/nodeFS;
                const x = (nl - rl)/nodeFS;
                if (currentVal >= previousVal) {
                    connector = previousNode.rightConnector;
                    chain = previousNode.rightVirtualLine;
                }
                animeStyle(connector, 
                    styles["connector-current-visit-style"],
                    tl.current);
                tl.current.to(chain, {
                    height: previousNode.chainHeight + "em",
                });
                animeStyle(node, 
                            styles["node-current-visit-style"], 
                            tl.current);
                tl.current.set(curNode, {
                    y: "-200%",
                    left: x + "em",
                    top: y + "em",
                    scale: 1,
                }).from(connectedLine.current, {
                    height: 0,
                });
                previousNode = visitedNodes[i];
                previousVal = currentVal;
            }
        
        }

        return () => {
            if (tl.current)
                tl.current.revert();
        }
    }, [operation]);
    return (
        <div className="absolute
                        left-1/2 
                        top-[10em]
                        font-bold
                        lg:text-[0.6rem]
                        md:text-[0.35rem]
                        sm:text-[0.2rem]

                        ">
            {treeList}
            {needTravelNode && <TravelNode  
                                            reference={domCurNode}
                                            lineRef={connectedLine}
                                            infor={
                                                {
                                                    name: "Current",
                                                    bg: "#fdfbda",
                                                    borderColor: "#d3d0a8",
                                                    textColor: "#2d4659"
                                                }
                                            }/>}
        </div>
    )
}


function getTreeList(root, list) {
    if (root !== null) {
        getTreeList(root.left, list);
        list.push(<TreeNode node={root}/>);
        getTreeList(root.right, list);
    }
} 

function drawTreePostOrder(node) {
    if (node !== null) {
        const domNode = node.actualNode;
        domNode.style.left = node.position.x + "em";
        domNode.style.top = node.position.y + "em";
        drawTreePostOrder(node.left);
        drawTreePostOrder(node.right);
    }
}

function calculateHeight(coord1, coord2) {
    const {x1, y1} = coord1;
    const {x2, y2} = coord2;
    const x = Math.abs(x1 - x2);
    const y = Math.abs(y2 - y1);
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

function calculateAngle(coord1, coord2) {
    const {x1, y1} = coord1;
    const {x2, y2} = coord2;
    const x = Math.abs(x1 - x2);
    const y = Math.abs(y2 - y1);
    return Math.atan(x/y);
}

function animeStyle(node, style, tl, posParameter) {
    tl.to(node, style, posParameter);
}



// Todo: Refactor this peace of shit
function drawNodeChain(node) {
    if (node !== null) {
        const { left : l, 
                bottom, 
                height,
            } = node.actualNode.getBoundingClientRect();
        let dis;
        let angle;
        const nodeX = l;
        const nodeY = bottom - (height/2);
        const fSize = parseFloat(getComputedStyle(node.actualNode).fontSize);
        const {height: leftConnectorHeight} = node.leftConnector.getBoundingClientRect();
        if (node.left) {
            const leftChild = node.left.actualNode;
            const {right, top, width} = leftChild.getBoundingClientRect();
            const leftX = right - (width/2);
            const leftY = top;
            dis = calculateHeight(  {x1: leftX, y1: leftY}, 
                                        {x2: nodeX, y2: nodeY}) - leftConnectorHeight;
            angle = calculateAngle( {x1: leftX, y1: leftY}, 
                                        {x2: nodeX, y2: nodeY});
            dis /= fSize;
        }
        else {
            const nullLeftNode = node.nullLeft;
            const {top, left, width} = nullLeftNode.getBoundingClientRect();
            const nullLeftX = left + width/2;
            const nullLeftY = top;
            dis = calculateHeight({x1: nodeX, y1: nodeY}, {x2: nullLeftX, y2: nullLeftY}) - leftConnectorHeight;
            angle = calculateAngle({x1: nodeX, y1: nodeY}, {x2: nullLeftX, y2: nullLeftY});
            dis /= fSize;
        }
        node.leftChain.style.height = dis + "em";
        node.rightChain.style.height = dis + "em";

        node.leftConnector.style.transform = `rotate(${angle}rad)`;
        node.rightConnector.style.transform = `rotate(${-angle}rad)`;

        node.chainHeight = dis;


        drawNodeChain(node.left);
        drawNodeChain(node.right);
    }
}





// Todo: Back up
// function drawNodeChain(node) {
//     if (node !== null) {
//         const { left : l, 
//                 bottom, 
//                 height,
//                 right: r,
//             } = node.actualNode.getBoundingClientRect();
//         const fSize = parseFloat(getComputedStyle(node.actualNode).fontSize);
//         const {height: leftConnectorHeight} = node.leftConnector.getBoundingClientRect();
//         if (node.left) {
//             const leftChild = node.left.actualNode;
//             const {right, top, width} = leftChild.getBoundingClientRect();
//             const leftX = right - (width/2);
//             const leftY = top;
//             const nodeX = l;
//             const nodeY = bottom - (height/2);
//             let dis = calculateHeight(  {x1: leftX, y1: leftY}, 
//                                         {x2: nodeX, y2: nodeY}) - leftConnectorHeight;
//             let angle = calculateAngle( {x1: leftX, y1: leftY}, 
//                                         {x2: nodeX, y2: nodeY});
//             dis /= fSize;
//             node.leftChain.style.height = dis + "em";
//             node.leftConnector.style.transformOrigin = "top right"
//             node.leftConnector.style.transform = `rotate(${angle}rad)`;
//         }
//         else {
//             const nodeX = l;
//             const nodeY = bottom - (height/2);
//             const nullLeftNode = node.nullLeft;
//             const {top, left, width} = nullLeftNode.getBoundingClientRect();
//             const nullLeftX = left + width/2;
//             const nullLeftY = top;
//             let dis = calculateHeight({x1: nodeX, y1: nodeY}, {x2: nullLeftX, y2: nullLeftY}) - leftConnectorHeight;
//             let angle = calculateAngle({x1: nodeX, y1: nodeY}, {x2: nullLeftX, y2: nullLeftY});
//             dis /= fSize;
//             node.leftChain.style.height = dis + "em";
//             node.leftConnector.style.transformOrigin = "top right"
//             node.leftConnector.style.transform = `rotate(${angle}rad)`;
//         }
//         if (node.right) {
//             const nodeX = r;
//             const nodeY = bottom - (height/2);
//             const rightChild = node.right.actualNode;
//             const {left, width, top} = rightChild.getBoundingClientRect();
//             const rightChildX = left + width/2;
//             const rightChildY = top;
//             let dis = calculateHeight(
//                                         {x1: nodeX, y1: nodeY}, 
//                                         {x2: rightChildX , y2: rightChildY}
//                                     )
//                         - leftConnectorHeight;
//             let angle = calculateAngle( {x1: nodeX, y1: nodeY}, 
//                                         {x2: rightChildX , y2: rightChildY});
//             dis /= fSize;
//             node.rightChain.style.height = dis + "em";
//             node.rightConnector.style.transformOrigin = "top left";
//             node.rightConnector.style.transform = `rotate(-${angle}rad)`;
//         }
//         else {
//             const nodeX = r;
//             const nodeY = bottom - height/2;
//             const nullRightNode = node.nullRight;
//             const {left, width, top} = nullRightNode.getBoundingClientRect();
//             const nullRightX = left + width/2;
//             const nulllRightY = top;
//             let dis = calculateHeight(
//                                         {x1: nodeX, y1: nodeY},
//                                         {x2: nullRightX, y2: nulllRightY}
//                                     ) - leftConnectorHeight;
//             let angle = calculateAngle( {x1: nodeX, y1: nodeY},
//                                         {x2: nullRightX, y2: nulllRightY});
//             dis /= fSize;
//             node.rightChain.style.height = dis + "em";
//             node.rightConnector.style.transformOrigin = "top left";
//             node.rightConnector.style.transform = `rotate(-${angle}rad)`;
//         }
//         drawNodeChain(node.left);
//         drawNodeChain(node.right);
//     }
// }