import TreeNode from "./TreeNode.jsx";
import { useEffect, useRef } from "react";
import TravelNode from "./TravelNode.jsx";
import gsap from "gsap";
import {styles} from "./inofrCode/colorState.js";




export default function BinarySearchTreeComp({operation, onAnimate}) {
    const {tree, name, visitedNodes, isLeftChild} = operation;
    const treeList = [];
    const container = useRef(null);
    const domWrapper = useRef(null);
    const domParentWrapper = useRef(null);
    const domParentNode = useRef(null);
    const domCurNode = useRef(null);
    //
    const clockLineHeight = useRef(null);
    // This distance is for the case where we do searching NOT insertion
    const dis_bet_node_travelNode = useRef(null);
    // This distance is the height of the line that connect
    // the current travel node and each node in the tree
    // during insertion
    const dis_bet_node_curNode = useRef(null);
    // This distance is the height of the line that connect
    // the parent travel node and each node in the tree
    // during insertion
    const dis_bet_node_parentNode = useRef(null);
    const connectedLine = useRef(null);
    const connectedLineParent = useRef(null);
    const tl = useRef(null);
    const needParentNode = operation.name == "insert";
    const needTravelNode = operation.name === "search" 
                        || operation.name === "insert";
    getTreeList(tree.root, treeList);
    useEffect(() => {
        tl.current = gsap.timeline();
        drawTreePostOrder(tree.root);
        drawNodeChain(tree.root);
        if (name === "insert") {
            const n = visitedNodes.length;
            const curNodeWrapper = domWrapper.current;
            const curNode = domCurNode.current;
            const curNodeLine = connectedLine.current;
            const parentNode = domParentNode.current;
            const parentNodeWrapper = domParentWrapper.current;
            const parentNodeLine = connectedLineParent.current;
            const root = visitedNodes[0];
            const fntSize = parseFloat(getComputedStyle(root.actualNode).fontSize);
            // Get the width and height of the current travel node on screen
            const {width: curNodeWidth
                , height: curNodeHeight} = curNode.getBoundingClientRect();
            // Get the width and height of the parent travel node on screen
            const { width: pNodeWidth,
                    height: pNodeHeight} = parentNode.getBoundingClientRect();
            // The coordinate of the root on screen
            const {  bottom: rootBottom
                    ,top: rootTop
                    ,left: rootLeft
                    ,height: rootHeight
                    ,width: rootWidth
                } = root.actualNode.getBoundingClientRect();
            // I don't know what kind of name i should put to this dis
            // But it is created to position the current node with node in the tree
            const marginCurNodeX = curNodeWidth/2 - rootWidth/2;
            const marginCurNodeY = rootHeight + 1.3*curNodeHeight;
            const marginPnodeX = pNodeWidth/2 - rootWidth/2;
            const marginPnodeY = 2 * pNodeHeight;

            curNodeWrapper.style.left = -marginCurNodeX/fntSize + "em";
            curNodeWrapper.style.top = marginCurNodeY/fntSize + "em";

            parentNodeWrapper.style.left = -marginPnodeX/fntSize + "em";
            parentNodeWrapper.style.top = -marginPnodeY/fntSize + "em";

            if (dis_bet_node_curNode.current === null) {
                const {top} = curNodeWrapper.getBoundingClientRect();
                const dis =     Math.abs(top - rootBottom)
                            /   parseFloat(getComputedStyle(curNodeWrapper).fontSize);
                ;
                dis_bet_node_curNode.current = dis;
            }
            if (dis_bet_node_parentNode.current === null) {
                const {bottom} = parentNodeWrapper.getBoundingClientRect();
                const dis =     Math.abs(bottom - rootTop)
                            /   parseFloat(getComputedStyle(parentNodeWrapper).fontSize);
                dis_bet_node_parentNode.current = dis;
            }
            if (isLeftChild)
                visitedNodes[n - 1].nullLeft.style.opacity = 1;
            else
                visitedNodes[n - 1].nullRight.style.opacity = 1;
            tl.current.from(curNodeWrapper, {
                y: "7em",
                opacity: 0,
            });
            tl.current.to(curNodeLine, {
                height: dis_bet_node_curNode.current + "em",
            });
            animeStyle(   root.actualNode
                        , styles["node-current-visit-style"]
                        , tl.current);
            tl.current.from(parentNode, {
                y: "-2rem",
                opacity: 0,
            }).to(parentNodeLine, {
                height: dis_bet_node_parentNode.current + "em",
            });
            animeStyle(     root.actualNode
                        ,   styles["node-parent-visit-style"],
                        tl.current
            );
            let previousNode = root;
            for (let i = 1; i < n; i++) {
                travelNodeAnimation(  curNode
                                    , curNodeLine
                                    , tl.current
                                    , "top center"
                                    , true);
                const nextNode = visitedNodes[i];
                let connector = previousNode.leftConnector;
                let curVirtualChain = previousNode.leftVirtualLine;
                let virtualChain2 = previousNode.leftVirtualLine2;
                // The coordinate of the current node on screen we are currently cheking
                const {   left: nNodeLeft
                        , top: nNodeTop
                } = nextNode.actualNode.getBoundingClientRect(); 
                // The coordinate that travel node will go to reach the current visiting node
                const x = nNodeLeft - rootLeft;
                const y = nNodeTop - rootTop;
                if (nextNode.value >= previousNode.value) {
                    connector = previousNode.rightConnector;
                    curVirtualChain = previousNode.rightVirtualLine;
                    virtualChain2 = previousNode.rightVirtualLine2;
                }
                animeStyle(connector, styles["connector-current-visit-style"], tl.current);
                tl.current.to(curVirtualChain, {
                    height: previousNode.chainHeight + "em",
                });
                animeStyle(nextNode.actualNode, styles["connector-current-visit-style"], tl.current);
                tl.current.set(curNodeWrapper, {
                    left: (x - marginCurNodeX)/fntSize + "em",
                    top: (y + marginCurNodeY)/fntSize + "em",
                });
                travelNodeAnimation(curNode, curNodeLine, tl.current, "top center", false);
                travelNodeAnimation(parentNode, parentNodeLine, tl.current, "bottom center", true);
                animeStyle(connector, styles["connector-parent-visit-style"], tl.current);
                tl.current.to(virtualChain2, {
                    height: previousNode.chainHeight + "em",
                }).set(parentNodeWrapper, {
                    left: (x - marginPnodeX)/fntSize + "em",
                    top: (y - marginPnodeY)/fntSize + "em",
                }, "<");
                animeStyle(nextNode.actualNode, styles["node-parent-visit-style"], tl.current);
                travelNodeAnimation(parentNode, parentNodeLine, tl.current, "bottom center", false);
                previousNode = nextNode;
            }
            travelNodeAnimation(curNode, curNodeLine, tl.current, "top center", true);
            let connector = previousNode.leftConnector;
            let finalChain = previousNode.leftVirtualLine;
            let nullNode = previousNode.nullLeft;
            let finalChain2 = previousNode.leftVirtualLine2;
            let nullPos;
            let newNode;
            if (!isLeftChild) {
                connector = previousNode.rightConnector;
                finalChain = previousNode.rightVirtualLine;
                nullNode = previousNode.nullRight;
                nullPos = previousNode.right.position;
                newNode = previousNode.right;
                finalChain2 = previousNode.rightVirtualLine2;
            }
            else {
                nullPos = previousNode.left.position;
                newNode = previousNode.left;
            }
            animeStyle(connector, styles["connector-current-visit-style"], tl.current);
            tl.current.to(finalChain, {
                height: previousNode.chainHeight + "em",
            }).set(curNodeWrapper, {
                left: nullPos.x - (marginCurNodeX/fntSize) + "em",
                top: nullPos.y + (marginCurNodeY/fntSize) - 0.7 + "em",
            });
            animeStyle(nullNode, styles["node-current-visit-style"], tl.current);
            travelNodeAnimation(curNode, curNodeLine, tl.current, "top center", false);
            tl.current.to([curNodeWrapper, nullNode], {
                y: "7em",
            }).to(nullNode, {
                scale: 0,
                transformOrigin: "bottom center",
            }).to(curNodeLine, {
                scale: 0,
                transformOrigin: "bottom center",
            });
            animeStyle(connector, styles["connector-parent-visit-style"], tl.current);
            tl.current.to(finalChain2, {
                height: previousNode.chainHeight + "em",
            }).from(newNode.actualNode, {
                scale: 0,
                transformOrigin: "top center"
            }).from([newNode.leftChain, newNode.rightChain], {
                height: 0,
            }).from([newNode.nullLeft, newNode.nullRight], {
                scale: 0,
            }).to(parentNodeLine, {
                scale: 0,
                transOrigin: "top center",
            });
            recoverStyleAnimation(visitedNodes
                                , tl.current
                                , styles["node-initial-style"]
                                , styles["null-initial-style"])
            tl.current.to([curNode, parentNode], {
                scale: 0,
                onComplete: () => {
                    onAnimate();
                }
            })
        }
        else if (name === "search") {
            if (tree.isEmpty())
                return;
            const target = operation.searchTarget;
            const {found, visitedNodes} = tree.search(target);
            const n = visitedNodes.length;
            const curNode = domCurNode.current;
            const curNodeLine = connectedLine.current;
            const curNodeWrapper = domWrapper.current;
            const root = visitedNodes[0];
            const {height: rootHeight
                , width: rootWidth
                , top: rootTop
            } = root.actualNode.getBoundingClientRect();
            const {height: cNodeHeight
                , width: cNodeWidth
                , bottom: cNodeBottom
            } = curNode.getBoundingClientRect();
            const fntSize = parseFloat(getComputedStyle(root.actualNode).fontSize);
            const marginX = (cNodeWidth/2 - rootWidth/2)/fntSize;
            const marginY = (2 * cNodeHeight)/fntSize;
            curNodeWrapper.style.left = -marginX + "em";
            curNodeWrapper.style.top = -marginY + "em";
            if (dis_bet_node_travelNode.current === null) {
                const dis = Math.abs(cNodeBottom - rootTop) / fntSize;
                dis_bet_node_travelNode.current = dis;
            }
            curNodeLine.style.height = dis_bet_node_travelNode.current + "em";
            tl.current.from(curNode, {
                y: "-5em",
                opacity: 0,
            }).from(curNodeLine, {
                height: 0,
            });
            animeStyle(root.actualNode, styles["node-current-visit-style"], tl.current);
            let previousNode = root;
            for (let i = 1; i < n; i++ ) {
                const node = visitedNodes[i];
                let connector = previousNode.leftConnector;
                let virtualLine  = previousNode.leftVirtualLine;
                if (node.value >= previousNode.value) {
                    connector = previousNode.rightConnector;
                    virtualLine = previousNode.rightVirtualLine;
                }
                travelNodeAnimation(  curNode
                                    , curNodeLine
                                    , tl.current
                                    , "bottom center"
                                    , true);
                animeStyle(connector, styles["connector-current-visit-style"], tl.current);
                tl.current.to(virtualLine, {
                    height: previousNode.chainHeight + "em",
                })
                tl.current.set(curNodeWrapper, {
                    left: node.position.x - marginX + "em",
                    top: node.position.y - marginY+ "em",
                });
                animeStyle(node.actualNode, styles["node-current-visit-style"], tl.current);
                travelNodeAnimation( curNode, curNodeLine, tl.current, "bottom center", false);
                previousNode = node;
            }
            if (!found) {
                travelNodeAnimation( curNode, curNodeLine, tl.current, "bottom center", true);
                let connector = previousNode.leftConnector;
                let finalLine = previousNode.leftVirtualLine;
                let nullNode = previousNode.nullLeft;
                let nullPos = previousNode.nullLeftPos;
                if (target >= previousNode.value) {
                    connector = previousNode.rightConnector;
                    finalLine = previousNode.rightVirtualLine;
                    nullNode = previousNode.nullRight;
                    nullPos = previousNode.nullRightPos;
                }
                animeStyle(connector, styles["connector-current-visit-style"], tl.current);
                tl.current.to(finalLine, {
                    height: previousNode.chainHeight + "em",
                });
                animeStyle(nullNode, styles["node-current-visit-style"], tl.current);
                tl.current.set(curNodeWrapper, {
                    left: nullPos.x - marginX + "em",
                    top: nullPos.y + marginY + "em",
                }).set(curNodeLine, {
                    top: "-98%",
                });
                travelNodeAnimation(curNode, curNodeLine, tl.current, "top center", false);
            }
            let transOrigin = found ? "top center" : "bottom center";
            tl.current.to(curNodeLine, {
                scale: 0,
                transformOrigin: transOrigin,
            });
            recoverStyleAnimation(visitedNodes
                                , tl.current
                                , styles["node-initial-style"]
                                , styles["null-initial-style"]);
            tl.current.to(curNode, {
                scale: 0,
                onComplete: () => {
                    onAnimate();
                }
            })
        }
        else if (name === "inorder") {
            const root = tree.root;
            if (clockLineHeight.current === null) {
                let dis = Math.abs(
                                    root.clock.getBoundingClientRect().bottom 
                                  - root.actualNode.getBoundingClientRect().top);
                dis /= parseFloat(getComputedStyle(root.actualNode).fontSize);
                clockLineHeight.current = dis;
            } 
            inOrderTravelAnimation(root, tl.current, clockLineHeight.current);
            const nodesList = tree.flatten();
            // Create delay
            tl.current.to(root.actualNode, {
                delay: 1,
            });
            recoverStyleFromTravelAnimation(  nodesList       
                                            , tl.current
                                            , styles["node-initial-style"]
                                            , styles["null-initial-style"]);
            tl.current.to(root.actualNode, {
                onComplete: () => {
                    onAnimate();
                }
            });
        }
        else if (name === "postorder") {
            const root = tree.root;
            if (clockLineHeight.current === null) {
                let dis = Math.abs(
                                    root.clock.getBoundingClientRect().bottom 
                                  - root.actualNode.getBoundingClientRect().top);
                dis /= parseFloat(getComputedStyle(root.actualNode).fontSize);
                clockLineHeight.current = dis;
            } 
            postOrderTravelAnimation(root, tl.current, clockLineHeight.current);
            const nodesList = tree.flatten();
            // Create delay
            tl.current.to(root.actualNode, {
                delay: 1,
            });
            recoverStyleFromTravelAnimation(  nodesList       
                                            , tl.current
                                            , styles["node-initial-style"]
                                            , styles["null-initial-style"]);
            tl.current.to(root.actualNode, {
                onComplete: () => {
                    onAnimate();
                }
            })
        }
        else if (name === "preorder") {
            const root = tree.root;
            if (clockLineHeight.current === null) {
                let dis = Math.abs(
                                    root.clock.getBoundingClientRect().bottom 
                                  - root.actualNode.getBoundingClientRect().top);
                dis /= parseFloat(getComputedStyle(root.actualNode).fontSize);
                clockLineHeight.current = dis;
            } 
            preOrderTravelAnimation(root, tl.current, clockLineHeight.current);
            const nodesList = tree.flatten();
            // Create delay
            tl.current.to(root.actualNode, {
                delay: 1,
            });
            recoverStyleFromTravelAnimation(  nodesList       
                                            , tl.current
                                            , styles["node-initial-style"]
                                            , styles["null-initial-style"]);
            tl.current.to(root.actualNode, {
                onComplete: () => {
                    onAnimate();
                }
            });
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
                        "
                ref={container}
                        >
            {treeList}
            {needTravelNode && <TravelNode  
                                            wrapperRef={domWrapper}
                                            lineRef={connectedLine}
                                            nodeRef={domCurNode}
                                            isInsertion={name === "insert"}
                                            infor={
                                                {
                                                    name: "Current",
                                                    bg: "#fdfbda",
                                                    borderColor: "#d3d0a8",
                                                    textColor: "#2d4659",
                                                }
                                            }/>}
            {needParentNode && <TravelNode  
                                            wrapperRef={domParentWrapper}
                                            lineRef={connectedLineParent}
                                            nodeRef={domParentNode}
                                            isInsertion={name === "insert"}
                                            infor={
                                                {
                                                    name: "Parent",
                                                    bg: "#dbd8e3",
                                                    borderColor: "#2a2438",
                                                    textColor: "#2a2438",
                                                }
                                            }/>}
        </div>
    )
}

function recoverStyleAnimation(listNodes, tl, style, nullStyle) {
    listNodes.forEach(node => {
        tl.to(node.actualNode, style, "<")
        .to(node.leftConnector, style, "<")
        .to(node.rightConnector, style, "<")
        .to(node.leftVirtualLine, {height: 0}, "<")
        .to(node.rightVirtualLine, {height: 0}, "<")
        .to(node.leftVirtualLine2, {height: 0}, "<")
        .to(node.rightVirtualLine2, {height: 0}, "<")
        .to(node.leftVirtualLine3, {height: 0}, "<")
        .to(node.rightVirtualLine3, {height: 0}, "<")
        .to(node.nullLeft, nullStyle, "<")
        .to(node.nullRight, nullStyle, "<")
        ;
    });
}

function recoverStyleFromTravelAnimation(listNodes, tl, style, nullStyle) {
    listNodes.forEach(node => {
        tl.to(node.clockLine, {height: 0}, "<")
        .to(node.clockLineUp, {height: 0}, "<")
        .to(node.clock, {scale: 0, transformOrigin: "bottom center"}, "<");
    });
    tl.to(listNodes[0].actualNode, {});
    recoverStyleAnimation(listNodes, tl, style, nullStyle);
}

function travelNodeAnimation(travelNode, line, tl, transOrigin, isIn) {
    const s = isIn ? 0 : 1;
    let animeFirst = line;
    let animeSecond = travelNode;
    if (isIn) {
        animeFirst = travelNode;
        animeSecond = line;
    }
    tl.to(animeFirst, {
        scale: s,
        transformOrigin: transOrigin,
    }).to(animeSecond, {
        scale: s,
        transformOrigin: transOrigin,
    });
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
        node.nullLeft.style.opacity = (node.left === null) ? 1 : 0;
        node.nullRight.style.opacity = (node.right === null) ? 1 : 0;
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

function direction1Animation(node, isRight, style, tl) {
    const connector = isRight ? node.rightConnector : node.leftConnector;
    const virtualLine = isRight ? node.rightVirtualLine : node.leftVirtualLine;
    tl.to(connector, style).to(virtualLine, {height: node.chainHeight + "em"});
}

function direction2Animation(node, isRight, style, tl) {
    const connector = isRight ? node.rightConnector : node.leftConnector;
    const virtualLine = isRight ? node.rightVirtualLine2 : node.leftVirtualLine2;
    tl.to(connector, style).to(virtualLine, {height: node.chainHeight + "em"});
}

function lineUpAnimation(node, isLeft,  tl) {
    const line = isLeft ? node.leftVirtualLine3 : node.rightVirtualLine3;
    tl.set(line, {
        height: node.chainHeight + "em",
    }).from(line, {
        scale: 0,
        transformOrigin: "bottom center",
    }, "<");
}


function inOrderTravelAnimation(node, tl, clockLineHeight) {
    if (node !== null) {
        tl.fromTo(node.clockWrapper,
                 {  opacity: 0,
                    y: "-5em"
                  }, 
                 {opacity: 1,
                    y: 0,
        }).to(node.clockLine, {
            height: clockLineHeight + "em",
        })
        animeStyle(node.actualNode, styles["node-current-visit-style"], tl);
        direction1Animation(node, false, styles["node-current-visit-style"], tl);
        if (node.left === null) {
            animeStyle(node.nullLeft, styles["node-current-visit-style"], tl);
        }
        inOrderTravelAnimation(node.left, tl, clockLineHeight);
        if (node.left === null) {
            animeStyle(node.nullLeft, styles["node-finished-visit-style"], tl);
        }
        lineUpAnimation(node, true, tl);
        animeStyle(node.leftConnector, styles["node-finished-visit-style"], tl);
        animeStyle(node.actualNode, styles["node-finished-visit-style"], tl);

        clockAnimation(node, clockLineHeight,  tl);
        
        // Animation for visiting left
        direction1Animation(node, true, styles["connector-current-visit-style"], tl);
        if (node.right === null)
            animeStyle(node.nullRight, styles["node-current-visit-style"], tl);
        inOrderTravelAnimation(node.right, tl, clockLineHeight);

        if (node.right === null)
            animeStyle(node.nullRight, styles["node-finished-visit-style"], tl);
        lineUpAnimation(node, false, tl);
        animeStyle(node.rightConnector, styles["node-finished-visit-style"], tl);
    }
}

function postOrderTravelAnimation(node, tl, clockLineHeight) {
    if (node !== null) {
        tl.fromTo(node.clockWrapper,
            {  opacity: 0,
               y: "-5em"
             }, 
            {opacity: 1,
               y: 0,
        }).to(node.clockLine, {
            height: clockLineHeight + "em",
        });
        animeStyle(node.actualNode, styles["node-current-visit-style"], tl);
        direction1Animation(node, false, styles["connector-current-visit-style"], tl);
        if (node.left === null)
            animeStyle(node.nullLeft, styles["connector-current-visit-style"], tl);
        postOrderTravelAnimation(node.left, tl, clockLineHeight);
        if (node.left === null)
            animeStyle(node.nullLeft, styles["node-finished-visit-style"], tl);
        lineUpAnimation(node, true, tl);
        animeStyle(node.leftConnector, styles["node-finished-visit-style"], tl);

        // Animation for travell right
        direction1Animation(node, true, styles["connector-current-visit-style"], tl);
        if (node.right === null)
            animeStyle(node.nullRight, styles["node-current-visit-style"], tl);
        postOrderTravelAnimation(node.right, tl, clockLineHeight);
        if (node.right === null)
            animeStyle(node.nullRight, styles["node-finished-visit-style"], tl);
        lineUpAnimation(node, false, tl);
        animeStyle(node.rightConnector, styles["node-finished-visit-style"], tl);

        animeStyle(node.actualNode, styles["node-finished-visit-style"], tl);

        // Clock animation
        clockAnimation(node, clockLineHeight, tl);
    }
}

function preOrderTravelAnimation(node, tl, clockLineHeight) {
    if (node !== null) {
        tl.fromTo(node.clockWrapper,
            {  opacity: 0,
               y: "-5em"
             }, 
            {opacity: 1,
               y: 0,
        }).to(node.clockLine, {
            height: clockLineHeight + "em",
        });
        animeStyle(node.actualNode, styles["node-current-visit-style"], tl);
        animeStyle(node.actualNode, styles["node-finished-visit-style"], tl);
        clockAnimation(node, clockLineHeight, tl);
        direction1Animation(node, false, styles["connector-current-visit-style"], tl);
        if (node.left === null)
            animeStyle(node.nullLeft, styles["node-current-visit-style"], tl);
        preOrderTravelAnimation(node.left, tl, clockLineHeight);
        if (node.left === null)
            animeStyle(node.nullLeft, styles["node-finished-visit-style"], tl);
        lineUpAnimation(node, true, tl);
        animeStyle(node.leftConnector, styles["node-finished-visit-style"], tl);

        // Animation for travel right
        direction1Animation(node, true, styles["node-current-visit-style"], tl);
        if (node.right === null)
            animeStyle(node.nullRight, styles["node-current-visit-style"], tl);
        preOrderTravelAnimation(node.right, tl, clockLineHeight);
        if (node.right === null)
            animeStyle(node.nullRight, styles["node-finished-visit-style"], tl);
        lineUpAnimation(node, false, tl);
        animeStyle(node.rightConnector, styles["node-finished-visit-style"], tl);
    }
}

function clockAnimation(node, clockLineHeight, tl) {
    tl.set(node.clockLineUp, {
        height: clockLineHeight + "em",
    }).from(node.clockLineUp, {
        scale: 0,
        transformOrigin: "bottom center",
    }, "<").to(node.clock, {
        rotateY: "360",
        textContent: "Visited"
    });
    animeStyle(node.clock, styles["node-finished-visit-style"], tl, "<");
}







