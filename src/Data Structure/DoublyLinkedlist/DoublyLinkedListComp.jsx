import { useEffect, useRef } from "react";
import { color, size } from "./inforCode/color.js";
import { getDomNodes
        , setUpRefLine
        , setUpHeadLine
        , setUpTailLine
        , setUpCurrentNode
        } from "./Logic/setUpList.jsx";
import { insertFirstEmpty
        , insertFirst
        , insertLast
        , insertBeforelast
        , insertBetween
    } from "./Logic/anime.js";
import gsap from "gsap";
import HeadComp from "./HeadComp.jsx";
import TailComp from "./TailComp.jsx";


export default function DoublyLinkedListComp({operation, cleanAnime, keys}) {
    const {list, name} = operation;
    let needTravelNode = false;
    let listDomNodes;
    if (name === "insert")
        listDomNodes = getDomNodes(list, keys, operation.index);
    else
        listDomNodes = getDomNodes(list, keys, operation.index);
    if (name !== "normal") {
        const i = operation.index;
        if (i > 0 && i < list.size - 2)
            needTravelNode = true;
    }
    const domList = useRef(null);
    const domHead = useRef(null);
    const domTail = useRef(null);
    const domHeadNull = useRef(null);
    const domTailNull = useRef(null);
    const domHeadLine = useRef(null);
    const domTailLine = useRef(null);
    const domCurNode = useRef(null);
    const domCurWrapper = useRef(null);
    const domCurLine = useRef(null);
    const domTailLineLeft = useRef(null);
    const domTailLineRight = useRef(null);
    const domTailLineBottom = useRef(null);
    const domShortTailLine = useRef(null);
    const domVirtualTailLeft = useRef(null);
    const domVirtualTailRight = useRef(null);
    const domVirtualTailBottom = useRef(null);
    const refLineWidth = useRef(null);
    const domHeadVirtualLine = useRef(null);

    const tl = useRef(null);
    useEffect(() => {
        tl.current = gsap.timeline();
        list.currentNode = domCurNode.current;
        list.currentWrapper = domCurWrapper.current;
        list.currentLine = domCurLine.current;
        list.actualList = domList.current;
        list.actualHead = domHead.current;
        list.actualTail = domTail.current;
        list.headLine = domHeadLine.current;
        list.tailLine = domTailLine.current;
        list.tailLineLeft = domTailLineLeft.current;
        list.tailLineRight = domTailLineRight.current;
        list.tailLineBottom = domTailLineBottom.current;
        list.shortTailLine = domShortTailLine.current;
        list.headNull = domHeadNull.current;
        list.tailNull = domTailNull.current;
        list.virtualTailLineLeft = domVirtualTailLeft.current;
        list.virtualTailLineBottom = domVirtualTailBottom.current;
        list.virtualTailLineRight = domVirtualTailRight.current;
        list.headVirtualLine = domHeadVirtualLine.current;
        setUpRefLine(list, refLineWidth);
        setUpHeadLine(list);
        setUpTailLine(list);

        let lineObj;
        if (needTravelNode)
            lineObj = setUpCurrentNode(list);

        // Insertion
        if (name === "insert") {
            const insert_index = operation.index;
            // Insert at the beginning and the list is empty
            if (insert_index === 0 && list.size - 1 === 0) {
                insertFirstEmpty(list, tl.current);
            }  // Insert at the begining but the list is not empty
            else if (insert_index === 0 && list.size > 0) {
                insertFirst(list, tl.current);
            }  // Insert at the end of the list
            else if (insert_index === list.size - 1) {
                insertLast(list, tl.current);
            }  // Insert at the node before the last node
            else if (insert_index === list.size - 2) {
                insertBeforelast(list, tl.current);
            }   // Inser somewhere between the list
            else {
                insertBetween(list, tl.current, operation.index, lineObj);
            }
            tl.current.to(list.actualList, {
                onComplete: () => {
                    cleanAnime();
                }
            })
        }
        return () => {
            list.actualList = null;
            list.shortTailLine = null;
            if (tl.current)
                tl.current.revert();
        }
    }, [operation]);
    return (
        <>
            <div className="fixed bottom-0 right-0">
                <button className="text-[red] text-[2rem] p-[1em] rounded-md bg-[white]"
                        onClick={() => {
                        if (tl.current)
                                tl.current.pause();
                        }}
                >
                    PAUSE
                </button>
                <button className="text-[red] text-[2rem] p-[1em] rounded-md bg-[white]"
                        onClick={() => {
                        if (tl.current)
                                tl.current.resume();
                        }}
                >
                    Resume
                </button>
            </div>
            <div className="absolute
                            left-[10em]
                            top-[15em]
                            font-bold
                            "
            >
                { needTravelNode  &&  
                                        <div    className="absolute bottom-[3em]"
                                                ref={domCurWrapper}
                                        >
                                            <div    className="rounded-[0.3em] p-[0.5em]"
                                                    style={
                                                        {
                                                            backgroundColor: color["current-bg"],
                                                            borderColor: color["current-border-color"],
                                                            borderWidth: size["node-border-thickness"],
                                                            color: color["current-text"],
                                                        }
                                                    }
                                                    ref={domCurNode}
                                            >
                                                Current
                                            </div>
                                            <div    className="absolute left-1/2 top-full border-solid z-10"
                                                        style={
                                                            {
                                                                borderColor: color["current-border-color"],
                                                                borderLeftWidth: size["virtual-line-thickness"]
                                                            }
                                                        }
                                                        ref={domCurLine}
                                                >
                                            </div>
                                        </div>
                }
                <div    ref={domList}
                        className="absolute
                                flex
                                flex-col
                                gap-[1em]
                                p-[2em]
                                rounded-[1em]
                                border
                                border-dashed
                                border-[0.3em]
                        "
                        style={
                            {
                                backgroundColor: color["node-theme"],
                                borderColor: color["node-border-color"],
                            }
                        }
                >
                    <HeadComp   reference={domHead} 
                                headLineRef={domHeadLine}
                                headNullRef={domHeadNull}
                                virtualLineRef={domHeadVirtualLine}
                                />
                    <TailComp   reference={domTail} 
                                tailLineRef={domTailLine} 
                                shortTailLineRef={domShortTailLine}
                                tailLineLeft={domTailLineLeft}
                                tailLineBottom={domTailLineBottom}
                                tailLineRight={domTailLineRight}
                                tailNullRef={domTailNull}
                                virtualTailLeft={domVirtualTailLeft}
                                virtualTailBottom={domVirtualTailBottom}
                                virtualTailRight={domVirtualTailRight}
                                />
                </div>
                {listDomNodes}
            </div>
        </>
  )
}
