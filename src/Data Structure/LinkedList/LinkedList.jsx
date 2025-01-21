import { size } from "./Style/size";
import { color } from "./Style/color";
import { useRef, useEffect } from "react";
import { getDomNodes,
         setUpRefLine, 
         setUpHeadLine,
         setUpTailLine,
         setUpCurrentNode,
         setUpPrevNode,
        } from "./SetUp/setUp.jsx";
import { insertLastAnimation,
         insertBetweenAnimation,
          insertFirstAnimation, 
          insertWhenEmptyAnimation} from "./Anime/insertAnimation.js";
import { removeAnimation,
         removeFirstAnimation,
         removeLastAnimation,
         removeToEmptyAnimation,
         removeWhenNotFoundAnimationWith1Node,
         unSucessDeleteAnimation } from "./Anime/removeAnimation.js";
import { searchAnimation } from "./Anime/searchAnimation.js";
import gsap from "gsap";

export default function LinkedList({operation}) {
    const {list, name, i, visitedNodes, isSuccess} = operation;
    const head_tail_style = {
                                backgroundColor: color["node-content-bg"],
                                padding: size["node-content-padding"],
                                borderRadius:size["node-content-border-radius"],
    };
    const tl = useRef(null);
    const domList = useRef(null);
    const refLineWidth = useRef(null);
    const domHead = useRef(null);
    const domTail = useRef(null);
    const domTailLine = useRef(null);
    const domTailLineRight = useRef(null);
    const domTailLineLeft = useRef(null);
    const domTailLineBottom = useRef(null);
    const domVirtualTailLineLeft = useRef(null);
    const domVirtualTailLineBottom = useRef(null);
    const domVirtualTailLineRight = useRef(null);
    const domHeadLine = useRef(null);
    const domCurrentNodeWrapper =useRef(null);
    const domCurrentLine = useRef(null);
    const domCurrentNode = useRef(null);
    const domVirtualHeadLine = useRef(null);
    const domPrevLine = useRef(null);
    const domPrevNode = useRef(null);
    const domPrevWrapper = useRef(null);
    const domHeadNull = useRef(null);
    const domtailNull = useRef(null);
    const domShortTailLine = useRef(null);

    let needCurrent = false;
    let needPrev = false;
    if (name === "insert" && i > 0 && i < list.size - 1) {
        needCurrent = true;
        needPrev = true;
    }
    // If this operation is removal
    if (name === "remove") {
        const n = visitedNodes.length;
        // More than 1 visited nodes => removal happens somewhere in between the list
        if (n > 1) {
            needCurrent = true;
            needPrev = true;
        } // Only 1 visited nodes => deletion happens at the beginning
        else {
            needCurrent = true;
            if (!isSuccess)
                needPrev = true;
        }
    }
    if (name === "search") {
        needCurrent = true;
    }

    useEffect(() => {
        list.headLine = domHeadLine.current;
        list.actualList = domList.current;
        list.actualHead = domHead.current;
        list.actualTail = domTail.current;
        list.tailLine = domTailLine.current;
        list.tailLineRight = domTailLineRight.current;
        list.tailLineLeft = domTailLineLeft.current;
        list.tailLineBottom = domTailLineBottom.current;
        list.virtualTailLineLeft = domVirtualTailLineLeft.current;
        list.virtualTailLineRight = domVirtualTailLineRight.current;
        list.virtualTailLineBottom = domVirtualTailLineBottom.current;
        list.currentNodeWrapper = domCurrentNodeWrapper.current;
        list.currentNode = domCurrentNode.current;
        list.currentLine = domCurrentLine.current;
        list.virtualHeadLine = domVirtualHeadLine.current;
        list.prevLine = domPrevLine.current;
        list.prevNode = domPrevNode.current;
        list.prevNodeWrapper = domPrevWrapper.current;
        list.shortTailLine = domShortTailLine.current;
        list.headNull = domHeadNull.current;
        list.tailNull = domtailNull.current;

        setUpRefLine(list, refLineWidth);
        setUpHeadLine(list);
        setUpTailLine(list);

        let centerDisObject;
        let disToCenterPrev;
        if (needCurrent)
            centerDisObject = setUpCurrentNode(list);
        if (needPrev)
            disToCenterPrev = setUpPrevNode(list);

        tl.current = gsap.timeline();

        if (name === "insert") {
            if (operation.i === 0) {
                // Insert at the beginning of the list when it's is not empty
                if (list.size - 1 > 0)
                    insertFirstAnimation(list, tl.current);
                else    // Insert at the begining when the list is empty
                    insertWhenEmptyAnimation(list, tl.current);
            }
            else if (operation.i === list.size - 1) {   // Insert at the end of the list
                insertLastAnimation(list, tl.current, operation.visitedNodes);
            }
            else {
                insertBetweenAnimation(list, tl.current, operation.visitedNodes, centerDisObject, disToCenterPrev);
            }
        }
        else if (name === "remove" && operation.isSuccess) {
            // deletion happens somewhere in between the list
            if (visitedNodes.length > 1) {
                if (visitedNodes[visitedNodes.length - 1].next === null) {
                    removeLastAnimation(list, tl.current, visitedNodes, centerDisObject, disToCenterPrev);
                }
                else {
                    removeAnimation(list, tl.current, operation.visitedNodes, centerDisObject, disToCenterPrev);
                }
            }
            else { // deletion happens at the beginning of the list
                const lstSize = list.size;
                // There are more than 1 node after deletion
                if (lstSize > 1)
                    removeFirstAnimation(list, tl.current, visitedNodes, centerDisObject);
                else { // The list is empty after deletion
                    removeToEmptyAnimation(list, tl.current, centerDisObject)
                }
            }
        }   // There is no node with given key to be removed
        else if (name === "remove" && !operation.isSuccess) {
            // There is more than 1 node in the list
            if (list.size > 1)
                unSucessDeleteAnimation(list, tl.current, visitedNodes, centerDisObject, disToCenterPrev);
            else // There is only 1 node
                removeWhenNotFoundAnimationWith1Node(list, tl.current, visitedNodes, centerDisObject, disToCenterPrev);

        }
        else if (name === "search") {
            searchAnimation(list, tl.current, centerDisObject, visitedNodes, operation.isSuccess);
        }

        tl.current.to(list.actualList, {
            onComplete: () => operation.cleanAnime()
        })


        return () => {
            
            list.actualList = null;
            list.headLine = null;
            list.tailLineRight = null;
            if (tl.current)
                tl.current.revert();
        }
    }, [operation])

    return (
        <div className="absolute left-[10em] top-[15em] font-bold">
            {needCurrent && <div className="absolute text-[white] bottom-[3em] z-50" ref={domCurrentNodeWrapper}>
                                <div className="border-solid"
                                    style={
                                        {
                                            backgroundColor: color["current-bg"],
                                            borderColor: color["current-border-color"],
                                            color: color["current-text"],
                                            borderWidth: size["travel-node-border-width"],
                                            padding: size["node-content-padding"],
                                            borderRadius: size["node-content-border-radius"]
                                        }
                                    }
                                    ref={domCurrentNode}
                                >
                                    Current
                                </div>
                                <div className="absolute left-1/2 border-solid" ref={domCurrentLine}
                                     style={
                                        {
                                            borderLeftWidth: size["ref-line-width"],
                                            color: color["virtual-line-tail-color"]
                                        }
                                     }
                                    
                                ></div>
                            </div>
            }
             {needPrev && <div className="absolute text-[white] bottom-[3em] z-50" ref={domPrevWrapper}>
                                <div className="border-solid"
                                    style={
                                        {
                                            backgroundColor: color["prev-bg"],
                                            borderColor: color["prev-border-color"],
                                            color: color["prev-text"],
                                            borderWidth: size["travel-node-border-width"],
                                            padding: size["node-content-padding"],
                                            borderRadius: size["node-content-border-radius"]
                                        }
                                    }
                                    ref={domPrevNode}
                                >
                                    Previous
                                </div>
                                <div className="absolute left-1/2 border-solid" 
                                     style={
                                        {
                                            borderLeftWidth: size["ref-line-width"],
                                            color: color["prev-line-color"]
                                        }
                                     }
                                     ref={domPrevLine}
                                    
                                ></div>
                            </div>
            }
            <div className="flex flex-col font-bold text-[#e8e8e8] border-dashed absolute" 
                 style={
                    { gap: size["ref-gap"],
                      backgroundColor: color["node-theme"],
                      padding: size["node-padding"], 
                      borderRadius: size["node-rounded"],
                      borderWidth: size["node-border-width"],
                      borderColor: color["node-border-normal-color"]
                    }}
                ref={domList}
            >
                <button style={head_tail_style} className="relative" ref={domHead}>
                    Head
                    <div className="absolute left-full top-1/2 border-dashed"
                         style={
                            {
                                borderTopWidth: size["ref-line-width"],
                                borderColor: color["ref-line-normal-color"]
                            }
                         }
                         ref={domHeadLine}
                    >
                         <div className={`absolute left-full p-[0.5em] inline transform -translate-y-[50%]`}
                                style={
                                    {
                                        backgroundColor: color["node-content-bg"],
                                        borderRadius: size["node-rounded"],
                                        color: "white",
                                        opacity: `${list.size === 0 ? 1 : 0}`,
                                    }
                                }
                                ref={domHeadNull}
                        >
                            Null
                        </div>
                    </div>
                    <div className="absolute left-full top-1/2 border-solid"
                         style={
                            {
                                borderTopWidth: size["ref-line-width"],
                            }
                         }
                         ref={domVirtualHeadLine}
                         
                    >
                    </div>
                    
                </button>
                <button style={head_tail_style} className="relative" ref={domTail}>
                    Tail
                    <div className="absolute left-full top-1/2 border-dashed"
                         style={
                            {
                                borderTopWidth: size["ref-line-width"],
                                borderColor: color["ref-line-normal-color"],
                                opacity: `${list.size === 0 ? 1 : 0}`,
                            }
                         }
                         ref={domShortTailLine}
                    >
                         <div className={`absolute left-full p-[0.5em] inline transform -translate-y-[50%]`}
                                style={
                                    {
                                        backgroundColor: color["node-content-bg"],
                                        borderRadius: size["node-rounded"],
                                        color: "white",
                                        opacity: `${list.size === 0 ? 1 : 0}`,
                                    }
                                }
                                ref={domtailNull}
                         >
                            Null
                        </div>
                    </div>
                    <div className="h-[13em] absolute top-full left-1/2 z-10" ref={domTailLine} style={{opacity: `${list.size === 0 ? 0 : 1}`}}>
                         <div className={`border-l-[${size["ref-line-width"]}] h-full border-dashed absolute left-0`}
                              style={
                                {
                                    borderColor: color["ref-line-normal-color"]
                                }
                              }
                              ref={domTailLineLeft}
                         ></div>
                         <div className={`border-l-[${size["ref-line-width"]}] border-solild absolute left-0`} ref={domVirtualTailLineLeft}
                         ></div>
                         <div className="absolute w-full border-dashed top-full"
                              style={
                                {
                                    borderBottomWidth: size["ref-line-width"],
                                    borderColor: color["ref-line-normal-color"]
                                }
                              }
                              ref={domTailLineBottom}
                         ></div>
                         <div className="absolute border-solid top-full"
                              style={
                                {
                                    borderBottomWidth: size["ref-line-width"],
                                }
                              }
                              ref={domVirtualTailLineBottom}
                              
                         ></div>
                         <div className="absolute border-dashed right-0 bottom-0"
                              style={
                                {
                                    borderRightWidth: size["ref-line-width"],
                                    borderColor: color["ref-line-normal-color"]
                                }
                              }
                              ref={domTailLineRight}
                         ></div>
                         <div className="absolute border-solid right-0 bottom-0"
                              style={
                                {
                                    borderRightWidth: size["ref-line-width"],
                                }
                              }
                              ref={domVirtualTailLineRight}
                         ></div>
                    </div>
                </button>
            </div>
            {getDomNodes(list, name, i)}
        </div>
    );
}
