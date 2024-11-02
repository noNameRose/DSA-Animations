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

/**
 * 
 * @param {*} param0 
 * @returns 
 */

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
            if (operation.type === "insert" // This operation is insert
                && !operation.index    // Not insert at the beginning
                && !i    
                && initialList.size > 1)
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
            current.actualNode.style.left = x + "em";
                leftPosLists.push(x);
            if (!isInsertBetween)
                x += nodeWidth + gap;
            current = current.next;
            i++;
        }
        // the width of each connected chain between each node
        let chainWidth;
        // If the list is empty
        if (!nodes.length) 
            return;
        // Special case where list has only 1 node
        if (nodes.length < 2) {
            // In this case, the length of chain will equal
            // the width of node
            chainWidth = getNodeWidth(nodes[0]);
        }
        else  {
            chainWidth = 
                        ((nodes[1].getBoundingClientRect().left 
                       - nodes[0].querySelector(".next").getBoundingClientRect().right)) 
                       / parseInt(getComputedStyle(nodes[0]).fontSize);
        }
        console.log("Font size of each node: " + getComputedStyle(nodes[0]).fontSize);
        console.log("The width of the chain: " + chainWidth);
        // Set the width to all connected chain between each node
        document.querySelectorAll(".chain").forEach(
            chain => chain.style.width = chainWidth + "em");
        // the head node
        let head = document.querySelector(".head");
        // the tail node
        let tail = document.querySelector(".tail");
        // the height of the chain that connect head
        // to first node of the list
        let headChain = 
                        ( nodes[0].getBoundingClientRect().top 
                        - head.getBoundingClientRect().bottom) 
                        / parseInt(getComputedStyle(nodes[0]).fontSize);
        // The height of the chain that connect head
        // to the last node of the list
        let tailChain = (tail.getBoundingClientRect().top 
                       - nodes[nodes.length - 1].getBoundingClientRect().bottom)
                       / parseInt(getComputedStyle(nodes[0]).fontSize);
        // Set the height for the chain of the head node
        head.querySelector(".vertical-chain").style.height = headChain + "em";
        // Set the height for the chain of the tail node
        tail.querySelector(".vertical-chain").style.height = tailChain + "em";
        // ---------------------------------------------
        // Previous travel node in case we need to travel
        let prev = document.querySelector(".Previous"); 
        // Current travel node in case we need to travel
        let cur = document.querySelector(".Current");  
        // the height of the connected chain from current travel node 
        // to the current node it's checking
        let curChain;        
        // the height of the connected chain from previous travel node 
        // to the current node it's checking
        let prevChain;    
        // vertical distance from current travel node to null
        let verDisToNullFromCur;  
          // only run if we need to travel
        if (needTravelNode || isSearch) {
            // Get the first node 
            let firstNode = nodes[0];
            // Get the top coordinate of the first node
            // on screen
            let top = getNodeHeight(firstNode);
            // Get the left coordinate of the first node
            // on screen
            let left = getNodeWidth(firstNode);
            // Previous only appear on screen
            // if we insert or remove at specific index
            if (prev) {
                prev.style.top = top +  gap + "em";
                prev.style.left = -(left + gap) + "em";
            }
            // Current only appear on creen
            // if we insert or remove at specifc index
            if (cur) {
                cur.style.top = top + (2.5 * gap) + "em";
                curChain = (cur.getBoundingClientRect().top 
                          - nodes[0].getBoundingClientRect().bottom)
                          / parseInt(getComputedStyle(nodes[0]).fontSize);
            }
            if (prev)
                prevChain = (prev.getBoundingClientRect().top 
                           - nodes[0].getBoundingClientRect().bottom) 
                           / parseInt(getComputedStyle(nodes[0]).fontSize);
            if (cur)
                cur.querySelector(".vertical-chain").style.height = curChain + 0.5 + "em";
            let lastNode = nodes[i - 1];
            verDisToNullFromCur = (cur.getBoundingClientRect().top 
                                - lastNode.querySelector(".null").getBoundingClientRect().bottom)
                                 /parseInt(getComputedStyle(lastNode).fontSize);
        }
        // ---------------------------------------------
        tl.current = gsap.timeline();
        // If this operation is insertion
        if (operation.type === "insert") {
            // insert at the beginning of the list
            if (!operation.index) {
                // If the list is empty
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
                    // Make the null reference of next field 
                    // invisible
                    nodes[0].querySelector(".null").style.opacity = 0;
                    // Animation for insertion at the beginning
                    tl.current.from(nodes[0], {
                        opacity: 0,
                        y: "5rem",
                    }).from(nodes[0].querySelector(".chain"), {
                        width: 0,
                    }).to(head.querySelector(".vertical-chain"), {
                        height: 0,
                    }).from(head, {
                        x: nodeWidth + gap + "em",
                    }).to(head.querySelector(".vertical-chain"), {
                        height: headChain + "em",
                    });
                    // Move all the node to the right for new node
                    // at the beginning
                    moveNodeToRight(tl.current, 
                                    document.querySelectorAll(".node-wrapper"), 
                                    gap);
                }
            }   // insert at the end of the list
            else if (operation.index === initialList.size - 1) {   
                // Get the last node
                let lastNode = nodes[nodes.length - 1];
                // Get the node before the last node
                let beforeLastNode = nodes[nodes.length - 2];
                // Animation for insertation at the end of the list
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
                    x: -(getNodeWidth(beforeLastNode) + gap) + "em",
                }).to(tail.querySelector(".vertical-chain"), {
                    height: tailChain + "em",
                })
            } // insert at a specific index
            else { 
                // Animation for current and previous
                // until they reach the insertion point
                let i = createAnimationForTravelNode(operation.type, 
                                                    tl.current, 
                                                    prev, 
                                                    prevChain, 
                                                    cur, 
                                                    curChain,
                                                    operation.index, 
                                                    nodes, 
                                                    leftPosLists);
                // Animation for moving node to the right
                moveNodeToRight(tl.current, nodesNeedToMove, gap);
                // 
                tl.current.to(nodes[i - 1].querySelector(".chain"), {
                    width: chainWidth + getNodeWidth(nodes[i - 1]) + gap + "em",
                }, "<");
                let lastNode = nodes[nodes.length - 1];
                let yDis = getNodeHeight(nodes[i]);
                tl.current.to(cur, {
                    x: getNodeWidth(lastNode) + gap + "em",
                }, "<").to(nodes[i - 1].querySelector(".chain"), {
                    width: 0,
                }, "+=0.5").from(nodes[i], {
                    y: yDis + gap + "em",
                    opacity: 0,
                    duration: 1,
                }).from(nodes[i].querySelector(".chain"), {
                    width: 0,
                }, "+=0.5").to(nodes[i - 1].querySelector(".chain"), {
                    width: chainWidth + "em",
                }, "+=0.2").to(prev.querySelector(".vertical-chain"), {
                    height: 0,
                }, "+=0.5")
                changeNodeSyleAnimation(tl.current, nodes[i - 1],
                                        styles["node-initial-style"], 
                                        styles["node-content-initial-style"], 
                                        "<");
                tl.current.to(cur.querySelector(".vertical-chain"), {
                    height: 0,
                }, "<");
                changeNodeSyleAnimation(tl.current, nodes[i + 1], 
                                        styles["node-initial-style"],
                                        styles["node-content-initial-style"],
                                         "<");
                tl.current.to([prev, cur], {
                    y: "5rem",
                    opacity: 0,
                    onComplete: () => {
                        onClean();
                    }
                })
                ;
            }
        }  // This operation is deletion
        else if (operation.type === "remove") { 
            // If this is the second render
            // after remove is complete
            if (!controlDel.current) {
                return;
            }
            // Remove at the beginning of the list
            if (!operation.index) {
                // If the number of node in the list is greater than 1
                if (initialList.size > 1) {
                    // Make the null reference of the first node
                    // become invisible before we delete it
                    nodes[0].querySelector(".null").style.opacity = 0;
                    // Animation for removing the first node
                    tl.current.to(head.querySelector(".vertical-chain"), {
                        height: 0,
                    }).to(head, {
                        x: nodeWidth + gap + "em",
                    }).to(head.querySelector(".vertical-chain"), {
                        height: headChain + "em",
                    }).to(nodes[0].querySelector(".chain"), {
                        width: 0,
                    }).to(nodes[0], {
                        y: "5rem",
                        opacity: 0,
                    });
                    // The rest of the list after
                    // the first node is removed
                    let restOfTheList = Array.from(
                                                document.querySelectorAll(".node-wrapper")
                                            ).filter((node, index) => index != 0);
                    // Animation for moving all the node of the list to the left
                    moveNodeToLeft(tl.current, restOfTheList, gap);
                    // Animation for moving head 
                    // to the new first node of the list
                    tl.current.to(head, {
                        x: 0,
                        onComplete: () => {
                            controlDel.current = false;
                            operation.onDelete();
                        }
                    }, "<")
                }
            }   // remove at a speciffic index
            else { 
                // Animation for moving previous node 
                // and current to the deletion point
                let i = createAnimationForTravelNode(operation.type, 
                                            tl.current, 
                                            prev, 
                                            prevChain, 
                                            cur, curChain, 
                                            operation.index, 
                                            nodes, 
                                            leftPosLists);
                // The deleted node on screen
                let deleteNode = nodeWrappers[i];
                // The node that located before deleted node
                let nodeBeforeDeleteNode = nodeWrappers[i - 1];
                // The node that located after deleted node
                let nodeAfterDeleteNode = (i + 1 < nodes.length) 
                                            ? nodes[i + 1] 
                                            : null; // This is deletion at the end of the list
                                                    // since we don't have the node after deleted node
                nodeBeforeDeleteNode.querySelector(".null").style.opacity = 0;
                // If this is deletion in some node in the middle 
                // of the list but not the last position
                if (nodeAfterDeleteNode)
                    deleteNode.querySelector(".null").style.opacity = 0;
                tl.current.to(nodeBeforeDeleteNode.querySelector(".chain"), {
                    width: 0,
                }).to(deleteNode, {
                    y: getNodeHeight(deleteNode) + "em",
                }).to(cur, {
                    y: getNodeHeight(deleteNode) + "em",
                }, "<");
                tl.current.to(deleteNode.querySelector(".chain"), {
                    width: Math.sqrt(getNodeHeight(deleteNode)**2 + chainWidth**2) + "em",
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
                    width: chainWidth + getNodeWidth(nodeBeforeDeleteNode) + gap + "em",
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
                        x: -(nodeWidth + gap) + "em",
                    }).to(tail, {
                        y: -getNodeHeight(deleteNode) + "em",
                    }).to(tail.querySelector(".vertical-chain"), {
                        height: tailChain + "em",
                    })
                }
                tl.current.to(nodes[i], {
                    scale: 0,
                    transformOrigin: "bottom left"
                });
                moveNodeToLeft(tl.current, nodesNeedToMove, gap);
                tl.current.to(nodeBeforeDeleteNode.querySelector(".chain"), {
                    width: chainWidth + "em",
                    onComplete: () => {
                        controlDel.current = false;
                        operation.onDelete();
                    }
                }, "<");
            }
        }  // search for specific value
        else if (operation.type === "search"){ 
            let targetIndex = (operation.index !== -1) ? operation.index : initialList.size - 1;
            let i = 0;
            let no = nodes[targetIndex].querySelector(".null");
            tl.current.from(cur, {
                scale: 0,
            }).from(cur.querySelector(".vertical-chain"), {
                height: 0,
            });
            while (i <= targetIndex) {
                changeNodeSyleAnimation(tl.current, nodes[i], 
                                        styles["node-current-visit-style"], 
                                        styles["node-content-current-visit-style"]);
                if (i + 1 <= targetIndex) {
                    tl.current.to(cur.querySelector(".vertical-chain"), {
                        height: 0,
                    });
                    changeNodeSyleAnimation(tl.current, nodes[i], 
                                            styles["node-initial-style"], 
                                            styles["node-content-initial-style"], 
                                            "<");
                }
                i++;
                if (i <= targetIndex) {
                    tl.current.to(cur, {
                        left: leftPosLists[i] + "em",
                    }).to(cur.querySelector(".vertical-chain"), {
                        height: curChain + 0.5 +  "em",
                    })
                }
            }
            // The value we are looking for in the list
            // is not in the list => index is -1 in this case
            if (operation.index === -1) {
                tl.current.to(cur.querySelector(".vertical-chain"), {
                    height: 0,
                });
                changeNodeSyleAnimation(tl.current, nodes[targetIndex], 
                                        styles["node-initial-style"],
                                         styles["node-content-initial-style"],
                                          "<");
                let disToNull = leftPosLists[targetIndex] 
                                + getNodeWidth(nodes[targetIndex]) 
                                + gap 
                                - 1;
                tl.current.to(cur, {
                    left: disToNull + "em",
                }).to(cur.querySelector(".vertical-chain"), {
                    height: verDisToNullFromCur + 0.5 + "em",
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

        <div className={`absolute   
                        left-[25vh] 
                        top-[15vh]
                        lg:text-lgFont
                        md:text-mdFont
                        sm:text-smFont
                        `}>
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






















