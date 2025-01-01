import { useEffect, useRef } from "react"
import { color, size } from "./inforCode/color.js";
import NodeContent from "./NodeContent.jsx";


export default function ListNode({node, pos, index}) {
    const {x, y, opa} = pos;
    const domNode = useRef(null);
    const nextLine = useRef(null);
    const prevLine = useRef(null);
    const nextDom = useRef(null);
    const prevDom = useRef(null);
    const prevNullDom =useRef(null);
    const nextNullDom = useRef(null);
    const valButDom = useRef(null);
    const nextVirtualLineDom = useRef(null);
    const prevVirtualLineDom = useRef(null);
    let nodePos = "first";
    if (node.next === null)
        nodePos = "last";
    if (node.next !== null && node.prev !== null)
        nodePos = "middle";
    if (nodePos === "last" && index === 0)
        nodePos = "firstXlast";
    useEffect(() => {
        node.actualNode = domNode.current;
        node.nextRefLine = nextLine.current;
        node.prevRefLine = prevLine.current;
        node.nextRef = nextDom.current;
        node.prevRef = prevDom.current;
        node.nextNull = nextNullDom.current;
        node.prevNull = prevNullDom.current;
        node.valBut = valButDom.current;
        node.nextVirtualLine = nextVirtualLineDom.current;
        node.prevVirtualLine = prevVirtualLineDom.current;
        return () => {
            node.actualNode = null;
            node.nextReftLine = null;
            node.prevRefLine = null;
            node.nextRef = null;
            node.prevRef = null;
            node.valBut = null;
        }
    })
    return (
        <div    className="absolute
                            inline-flex
                            flex-col
                            gap-[1em]
                            items-center
                            p-[1.5em]
                            border
                            border-dashed
                            border-[0.3em]
                            rounded-[1em]
                            " 
                style={
                    {
                        backgroundColor: color["node-theme"],
                        borderColor: color["node-border-color"],
                        borderWidth: size["node-border-thickness"],
                        left: x + "em",
                        top: y + "em",
                        opacity: opa,
                        color: color["node-content-text-color"],
                    }
                }
                ref={domNode}>
            <p  className="index"
                style={
                    {
                        fontSize: size["index-size"]
                    }
                }
            >
                {index}
            </p>
            <NodeContent name={node.value} reference={valButDom}/>
            <NodeContent  name="Next" 
                        lineRef={nextLine} 
                        reference={nextDom} 
                        nodePos={nodePos}
                        domNull={nextNullDom}
                        virtualLineRef={nextVirtualLineDom}
            />
            <NodeContent name="Previous" 
                        lineRef={prevLine} 
                        reference={prevDom} 
                        nodePos={nodePos}
                        domNull={prevNullDom}
                        virtualLineRef={prevVirtualLineDom}
                        />
        </div>
    )
}
