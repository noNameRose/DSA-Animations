import { size } from "./Style/size";
import { color } from "./Style/color";
import { useRef, useEffect } from "react";
import { getDomNodes,
         setUpRefLine, 
         setUpHeadLine,
         setUpTailLine
        } from "./SetUp/setUp.jsx";
export default function LinkedList({operation}) {
    const {list, operationName} = operation;
    const head_tail_style = {
                                backgroundColor: color["node-content-bg"],
                                padding: size["node-content-padding"],
                                borderRadius:size["node-content-border-radius"],
    };


    const domList = useRef(null);
    const refLineWidth = useRef(null);
    const domHead = useRef(null);
    const domTail = useRef(null);
    const domTailLine = useRef(null);
    const domTailLineRight = useRef(null);

    const domHeadLine = useRef(null);

    useEffect(() => {
        list.headLine = domHeadLine.current;
        list.actualList = domList.current;
        list.actualHead = domHead.current;
        list.actualTail = domTail.current;
        list.tailLine = domTailLine.current;
        list.tailLineRight = domTailLineRight.current

        setUpRefLine(list, refLineWidth);
        setUpHeadLine(list);
        setUpTailLine(list);

        return () => {
            
            list.actualList = null;
            list.headLine = null;
            list.tailLineRight = null;
        }
    }, [operation])

    return (
        <div className="absolute left-[10em] top-[15em] font-bold ring-8">
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
                    <div className="w-[100px] absolute left-full top-1/2 border-dashed"
                         style={
                            {
                                borderTopWidth: size["ref-line-width"],
                                borderColor: color["ref-line-normal-color"]
                            }
                         }
                         ref={domHeadLine}
                    >
                    </div>
                </button>
                <button style={head_tail_style} className="relative" ref={domTail}>
                    Tail
                    <div className="h-[11em] absolute top-full left-1/2 z-10" ref={domTailLine}>
                         <div className={`border-l-[${size["ref-line-width"]}] h-full border-dashed absolute left-0`}
                              style={
                                {
                                    borderColor: color["ref-line-normal-color"]
                                }
                              }
                         ></div>
                         <div className="absolute w-full border-dashed top-full"
                              style={
                                {
                                    borderBottomWidth: size["ref-line-width"],
                                    borderColor: color["ref-line-normal-color"]
                                }
                              }
                         ></div>
                         <div className="absolute h-[50px] border-dashed right-0 bottom-0"
                              style={
                                {
                                    borderRightWidth: size["ref-line-width"],
                                    borderColor: color["ref-line-normal-color"]
                                }
                              }
                              ref={domTailLineRight}
                         ></div>
                    </div>
                </button>
            </div>
            {getDomNodes(list)}
        </div>
    );
}
