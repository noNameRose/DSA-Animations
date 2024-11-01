import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import Node from "./Node.jsx";
import TravelNode from "./TravelNode.jsx";
import {styles} from "./inforCode/colorState.js";
import { createAnimationForTravelNode, 
         changeNodeSyleAnimation, 
         moveNodeToLeft,
         moveNodeToRight,
         getNodeHeight,
         getNodeWidth,
         changeNullStyle
        } from "./inforCode/anime.js";

export default function LinkedList({initialList, operation, onClean, controlDel, keys}) {
    const tl = useRef();    // gsap timeline is stored in ref
    let gap = 3.5;   // the gap between each node
    // Get a list of Node Component for each node in real linked list
    const list = getNodeList(initialList, operation, keys.keys);
    let needTravelNode = (operation.type === "insert" && operation.index < initialList.size - 1 && operation.index > 0) 
                        ||
                        (operation.type === "remove" && operation.index > 0);
    let isSearch = operation.type === "search";
    useEffect(() => {
        if (initialList.size === 0)
            return;
        let current = initialList.head;
        let x = 0;
        let i = 0;
        let nodeWidth;
        if (current)
            nodeWidth = getNodeWidth(current.actualNode);
        let leftPosLists = [];
        let nodesNeedToMove = [];
        let nodeWrappers = [];
        let nodes = [];
        while (current) {
            nodeWrappers.push(current.actualNode);
            nodes.push(current.actualNode.querySelector(".node"));
            let isInsertBetween = false;
            if (operation.type === "insert" && !operation.index && !i && initialList.size > 1)
                x -= getNodeWidth(current.actualNode) + gap;
            if (operation.type === "insert" && operation.index < initialList.size - 1 && operation.index > 0) {
                if (i == operation.index) {
                    current.actualNode.querySelector(".null").style.opacity = 0;
                    isInsertBetween = true;
                }
                else if (i == operation.index - 1) {
                    current.actualNode.querySelector(".null").style.opacity = 0;
                }
                else if (i >= operation.index + 1) {
                    nodesNeedToMove.push(current.actualNode);
                }
            }
            if (operation.type === "remove" && i >= operation.index + 1) {
                nodesNeedToMove.push(current.actualNode);
            }
            current.actualNode.style.left = x + "rem";
                leftPosLists.push(x);
            if (!isInsertBetween)
                x += nodeWidth + gap;
            current = current.next;
            i++;
        }
        let chainWidth; // the width of each connected chain between each node
        if (!nodes.length)  // we the list is empty
            return;
        if (nodes.length < 2)
            chainWidth = getNodeWidth(nodes[0]);
        else
            chainWidth = ((nodes[1].getBoundingClientRect().left - nodes[0].querySelector(".next").getBoundingClientRect().right)) / parseInt(getComputedStyle(nodes[0]).fontSize);
        document.querySelectorAll(".chain").forEach(chain => chain.style.width = chainWidth + "rem");
        let head = document.querySelector(".head"); // the head node
        let tail = document.querySelector(".tail"); // the tail node
        let headChain = (nodes[0].getBoundingClientRect().top - head.getBoundingClientRect().bottom) / parseInt(getComputedStyle(nodes[0]).fontSize);
        let tailChain = (tail.getBoundingClientRect().top - nodes[nodes.length - 1].getBoundingClientRect().bottom) / parseInt(getComputedStyle(nodes[0]).fontSize);
        head.querySelector(".vertical-chain").style.height = headChain + "rem";
        tail.querySelector(".vertical-chain").style.height = tailChain + "rem";
        let prev = document.querySelector(".Previous"); // previous travel node in case we need to travel
        let cur = document.querySelector(".Current");   // current travel node in case we need to travel
        let curChain;        // the height of the connected chain from current travel node to the current node it's checking
        let prevChain;      // the height of the connected chain from previous travel node to the current node it's checking
        let verDisToNullFromCur;   // vertical distance from current travel node to null
        if (needTravelNode || isSearch) {   // only run if we need to travel
            let firstNode = nodes[0];
            let top = getNodeHeight(firstNode);
            let left = getNodeWidth(firstNode);
            if (prev) {
                prev.style.top = top +  gap + "rem";
                prev.style.left = -(left + gap) + "rem";
            }
            if (cur) {
                cur.style.top = top + (2.5 * gap) + "rem";
                curChain = (cur.getBoundingClientRect().top - nodes[0].getBoundingClientRect().bottom)/ parseInt(getComputedStyle(nodes[0]).fontSize);
            }
            if (prev)
                prevChain = (prev.getBoundingClientRect().top - nodes[0].getBoundingClientRect().bottom) / parseInt(getComputedStyle(nodes[0]).fontSize);
            if (cur)
                cur.querySelector(".vertical-chain").style.height = curChain + 0.5 + "rem";
            let lastNode = nodes[i - 1];
            verDisToNullFromCur = (cur.getBoundingClientRect().top - lastNode.querySelector(".null").getBoundingClientRect().bottom)/parseInt(getComputedStyle(lastNode).fontSize);
            console.log(verDisToNullFromCur);
        }
        tl.current = gsap.timeline();
        if (operation.type === "insert") {
            if (!operation.index) { // insert at the beginning of the list
                if (initialList.size < 2) {
                    tl.current.from(nodes[0], {
                        y: "5rem",
                        opacity: 0,
                    }).from(nodes[0].querySelector(".chain"), {
                        width: 0,
                    }).from(nodes[0].querySelector(".null"), {
                        x: "5rem",
                        opacity: 0,
                    }).from(head, {
                        y: "-5rem",
                        opacity: 0,
                    }).from(tail, {
                        y: "5rem",
                        opacity: 0,
                    }, "<").from(head.querySelector(".vertical-chain"), {
                        height: 0,
                    }).from(tail.querySelector(".vertical-chain"), {
                        height: 0,
                    }, "<")
                }
                else {
                    nodes[0].querySelector(".null").style.opacity = 0;
                    tl.current.from(nodes[0], {
                        opacity: 0,
                        y: "5rem",
                    }).from(nodes[0].querySelector(".chain"), {
                        width: 0,
                    }).to(head.querySelector(".vertical-chain"), {
                        height: 0,
                    }).from(head, {
                        x: nodeWidth + gap + "rem",
                    }).to(head.querySelector(".vertical-chain"), {
                        height: headChain + "rem",
                    });
                    moveNodeToRight(tl.current, document.querySelectorAll(".node-wrapper"), gap);
                }
            }
            else if (operation.index === initialList.size - 1) {    // insert at the end of the list
                let lastNode = nodes[nodes.length - 1];
                let beforeLastNode = nodes[nodes.length - 2];
                tl.current.to(beforeLastNode.querySelector(".null"), {
                    y: "5rem",
                    opacity: 0,
                }).to(beforeLastNode.querySelector(".chain"), {
                    width: 0,
                }).from(lastNode, {
                    y: "-5rem",
                    opacity: 0,
                }).from(lastNode.querySelector(".chain"), {
                    width: 0,
                }).from(lastNode.querySelector(".null"), {
                    x: "5rem", 
                    opacity: 0,
                }).to(beforeLastNode.querySelector(".chain"), {
                    width: chainWidth + "rem",
                }).to(tail.querySelector(".vertical-chain"), {
                    height: 0,
                }).from(tail, {
                    x: -(getNodeWidth(beforeLastNode) + gap) + "rem",
                }).to(tail.querySelector(".vertical-chain"), {
                    height: tailChain + "rem",
                })
            }
            else {  // insert at a specific index
                let i = createAnimationForTravelNode(operation.type, tl.current, prev, prevChain, cur, curChain, operation.index, nodes, leftPosLists);
                moveNodeToRight(tl.current, nodesNeedToMove, gap);
                tl.current.to(nodes[i - 1].querySelector(".chain"), {
                    width: chainWidth + getNodeWidth(nodes[i - 1]) + gap + "rem",
                }, "<");
                let lastNode = nodes[nodes.length - 1];
                let yDis = getNodeHeight(nodes[i]);
                tl.current.to(cur, {
                    x: getNodeWidth(lastNode) + gap + "rem",
                }, "<").to(nodes[i - 1].querySelector(".chain"), {
                    width: 0,
                }, "+=0.5").from(nodes[i], {
                    y: yDis + gap + "rem",
                    opacity: 0,
                    duration: 1,
                }).from(nodes[i].querySelector(".chain"), {
                    width: 0,
                }, "+=0.5").to(nodes[i - 1].querySelector(".chain"), {
                    width: chainWidth + "rem",
                }, "+=0.2").to(prev.querySelector(".vertical-chain"), {
                    height: 0,
                }, "+=0.5")
                changeNodeSyleAnimation(tl.current, nodes[i - 1],styles["node-initial-style"], styles["node-content-initial-style"], "<");
                tl.current.to(cur.querySelector(".vertical-chain"), {
                    height: 0,
                }, "<");
                changeNodeSyleAnimation(tl.current, nodes[i + 1], styles["node-initial-style"],styles["node-content-initial-style"], "<");
                tl.current.to([prev, cur], {
                    y: "5rem",
                    opacity: 0,
                    onComplete: () => {
                        onClean();
                    }
                })
                ;
            }
        }
        else if (operation.type === "remove") { 
            if (!controlDel.current) {
                return;
            }
            if (!operation.index) { // remove at the beginning of the list
                if (initialList.size > 1) {
                    nodes[0].querySelector(".null").style.opacity = 0;
                    tl.current.to(head.querySelector(".vertical-chain"), {
                        height: 0,
                    }).to(head, {
                        x: nodeWidth + gap + "rem",
                    }).to(head.querySelector(".vertical-chain"), {
                        height: headChain + "rem",
                    }).to(nodes[0].querySelector(".chain"), {
                        width: 0,
                    }).to(nodes[0], {
                        y: "5rem",
                        opacity: 0,
                    });
                    let restOfTheList = Array.from(document.querySelectorAll(".node-wrapper")).filter((node, index) => index != 0);
                    moveNodeToLeft(tl.current, restOfTheList, gap);
                    tl.current.to(head, {
                        x: 0,
                        onComplete: () => {
                            controlDel.current = false;
                            operation.onDelete();
                        }
                    }, "<")
                }
            }
            else { // remove at a speciffic index
                let i = createAnimationForTravelNode(operation.type, 
                                            tl.current, 
                                            prev, 
                                            prevChain, 
                                            cur, curChain, 
                                            operation.index, 
                                            nodes, 
                                            leftPosLists);
                let deleteNode = nodeWrappers[i];
                let nodeBeforeDeleteNode = nodeWrappers[i - 1];
                let nodeAfterDeleteNode = (i + 1 < nodes.length) ? nodes[i + 1] : null;
                nodeBeforeDeleteNode.querySelector(".null").style.opacity = 0;
                if (nodeAfterDeleteNode)
                    deleteNode.querySelector(".null").style.opacity = 0;
                tl.current.to(nodeBeforeDeleteNode.querySelector(".chain"), {
                    width: 0,
                }).to(deleteNode, {
                    y: getNodeHeight(deleteNode) + "rem",
                }).to(cur, {
                    y: getNodeHeight(deleteNode) + "rem",
                }, "<");
                tl.current.to(deleteNode.querySelector(".chain"), {
                    width: Math.sqrt(getNodeHeight(deleteNode)**2 + chainWidth**2) + "rem",
                    transformOrigin: "top left",
                    rotate: `-${Math.atan(getNodeHeight(deleteNode)/chainWidth)}rad`
                }, "<");
                if (!nodeAfterDeleteNode) {
                    tl.current.set(deleteNode.querySelector(".null"), {
                        rotate: `${Math.atan(getNodeHeight(deleteNode)/chainWidth)}rad`,
                        transformOrigin: "left",
                    }, "<");
                }
                tl.current.to(nodeBeforeDeleteNode.querySelector(".chain"), {
                    width: chainWidth + getNodeWidth(nodeBeforeDeleteNode) + gap + "rem",
                })
                if (!nodeAfterDeleteNode) {
                    tl.current.set(nodeBeforeDeleteNode.querySelector(".null"), {
                        opacity: 1,
                    }).set(deleteNode.querySelector(".null"), {
                        opacity: 0,
                    }, "<")
                }
                tl.current.to(deleteNode.querySelector(".chain"), {
                    width: 0.
                }, "+=0.5").to(prev.querySelector(".vertical-chain"), {
                    height: 0,
                }).to(nodes[i - 1], styles["node-initial-style"], "<")
                .to(nodes[i - 1].querySelectorAll("button"), styles["node-content-initial-style"], "<")
                .to(cur.querySelector(".vertical-chain"), {
                    height: 0,
                }, "<").to(nodes[i], styles["node-initial-style"], "<")
                .to(nodes[i].querySelectorAll("button"), styles["node-content-initial-style"], "<")
                .to([cur, prev], {
                    scale: 0,
                    transformOrigin: "center center"
                });
                if (!nodeAfterDeleteNode) {
                    tl.current.to(tail.querySelector(".vertical-chain"), {
                        height: 0,
                    }).to(tail, {
                        x: -(nodeWidth + gap) + "rem",
                    }).to(tail, {
                        y: -getNodeHeight(deleteNode) + "rem",
                    }).to(tail.querySelector(".vertical-chain"), {
                        height: tailChain + "rem",
                    })
                }
                tl.current.to(nodes[i], {
                    scale: 0,
                    transformOrigin: "bottom left"
                });
                moveNodeToLeft(tl.current, nodesNeedToMove, gap);
                tl.current.to(nodeBeforeDeleteNode.querySelector(".chain"), {
                    width: chainWidth + "rem",
                    onComplete: () => {
                        controlDel.current = false;
                        operation.onDelete();
                    }
                }, "<");
            }
        }
        else if (operation.type === "search"){  // search for specific value
            let targetIndex = (operation.index !== -1) ? operation.index : initialList.size - 1;
            let i = 0;
            let no = nodes[targetIndex].querySelector(".null");
            tl.current.from(cur, {
                scale: 0,
            }).from(cur.querySelector(".vertical-chain"), {
                height: 0,
            });
            while (i <= targetIndex) {
                changeNodeSyleAnimation(tl.current, nodes[i], styles["node-current-visit-style"], styles["node-content-current-visit-style"]);
                if (i + 1 <= targetIndex) {
                    tl.current.to(cur.querySelector(".vertical-chain"), {
                        height: 0,
                    });
                    changeNodeSyleAnimation(tl.current, nodes[i], styles["node-initial-style"], styles["node-content-initial-style"], "<");
                }
                i++;
                if (i <= targetIndex) {
                    tl.current.to(cur, {
                        left: leftPosLists[i] + "rem",
                    }).to(cur.querySelector(".vertical-chain"), {
                        height: curChain + 0.5 +  "rem",
                    })
                }
            }
            if (operation.index === -1) {
                tl.current.to(cur.querySelector(".vertical-chain"), {
                    height: 0,
                });
                changeNodeSyleAnimation(tl.current, nodes[targetIndex], styles["node-initial-style"], styles["node-content-initial-style"], "<");
                let disToNull = leftPosLists[targetIndex] 
                                + getNodeWidth(nodes[targetIndex]) 
                                + gap
                                - 2;
                tl.current.to(cur, {
                    left: disToNull + "rem",
                }).to(cur.querySelector(".vertical-chain"), {
                    height: verDisToNullFromCur + 0.5 + "rem",
                });
                changeNullStyle(tl.current, no, styles["null-visit-style"]);
            }
            tl.current.to(cur.querySelector(".vertical-chain"), {
                height: 0,
            });
            if (operation.index === -1)
                changeNullStyle(tl.current, no, styles["null-normal-style"], "<");
            else 
                changeNodeSyleAnimation(tl.current, nodes[targetIndex], styles["node-initial-style"], styles["node-content-initial-style"], "<");
            tl.current.to(cur, {
                scale: 0,
                onComplete: () => {
                    onClean();
                }
            })
        }
        return () => {
            tl.current.revert();
            document.querySelectorAll(".null").forEach(no => no.style.opacity = 1);
        };
    }, [operation, initialList]);

    

    return (

        <div className={`absolute left-[25vh] top-[15vh]`}>
            <div className="relative"
                 style={{
                        //  gap: `${gap}rem`
                        }}>
                            {
                                needTravelNode 
                                    && 
                                <TravelNode name="Previous"/>
                            }
                            {
                                (needTravelNode || isSearch)
                                    && 
                                <TravelNode name="Current"/>
                            }
                            {list}
                           
            </div>
        </div>
    )
}




/**
 * This function return an array of Node component from the list
 * 
 * @param {LinkedList} list the linked list
 * @param {Object} operation object that holds what kind of operation we are working on the list
 * @param {Array} keys an array of keys for each node that will be rendered on the screen
 * @returns 
 */
function getNodeList(list, operation, keys) {
    let res = [];   // the result array
    let current = list.head;    // we get the head of the list
    let i = 0;      // current index we are at
    while (current) {  // loop until travel variable reach null
        let isTail = false; // help you know if this node is tail
        let index = i;      // the index for the node
        let isHead = false; // help you know if this node is head
        if (index === 0)   // this is head
            isHead = true;  
        if (!current.next)  // this is tail
            isTail = true;  
        // if this operation is insertion at specific index
        if (operation.index > 0 && operation.index < list.size - 1 && operation.type === "insert") {
            // and also, we have passed the index where insertion happened
            if (i >= operation.index + 1)
                index--; // we do this to make all the node has index in ascending order and the index of each node differ by 1
            // Remember: this happen before all of the animation and thus, on screen, the new node hasn't inserted yet,
            // It has already been rendered but we hide it so that the animation make it look like it just inserted
        }
        let node = (<Node   isHead={isHead}
                            value={current.value} 
                            key={keys[i]} 
                            index={index} 
                            list = {list} 
                            node={current} 
                            isTail={isTail}/>);
        res.push(node);     // push the node    
        current = current.next; // we go to next node in the list
        i++;        // go to next index
    }
    return res;
}






















