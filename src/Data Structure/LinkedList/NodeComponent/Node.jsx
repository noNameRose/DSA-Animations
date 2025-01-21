import { color } from "../Style/color.js"
import { size } from "../Style/size.js"
import {useRef, useEffect} from "react"

export default function Node({node, index, isLast}) {
    const refStyle = {
        paddingLeft: size["node-content-padding-X"],
        paddingRight: size["node-content-padding-X"],
        paddingTop: size["node-content-padding"],
        paddingBottom: size["node-content-padding"],
        backgroundColor: color["node-content-bg"],
        borderRadius: size["node-content-border-radius"],
        position: "relative"
    };

    const domNode = useRef(null);
    const domRefLine = useRef(null);
    const domNextNull = useRef(null);
    const domNextRef = useRef(null);
    const domValBut = useRef(null);
    const domNextVirtualLine = useRef(null);

    useEffect(() => {
        node.actualNode = domNode.current;
        node.nextRefLine = domRefLine.current;
        node.nextNull = domNextNull.current;
        node.nextRef = domNextRef.current;
        node.valBut = domValBut.current;
        node.nextVirtualRefLine = domNextVirtualLine.current;

        return () => {
            node.actualNode = null;
            node.nextRefLine = null;
            node.nextNull = null;
            node.valBut = null;
        }
    })

    return (
        <div className="font-bold flex flex-col items-center text-[white] border-dashed absolute"
            style={
                {
                    padding: size["node-padding"],
                    gap: size["ref-gap"],
                    backgroundColor: color["node-theme"],
                    borderWidth: size["node-border-width"],
                    borderColor: color["node-border-normal-color"],
                    borderRadius: size["node-rounded"],
                    left: node.leftDis + "em",
                    textAlign: "center",
                    
                }
            }
            ref={domNode}
        >
            <p className="text-[1.5em]">{index}</p>
            <button style={refStyle} className="self-stretch" ref={domValBut}>{node.value}</button>
            <button style={refStyle} className="self-stretch" ref={domNextRef}>
                Next
                <div className="absolute border-dashed top-1/2 left-full"
                     style={
                        {
                            borderTopWidth: size["ref-line-width"],
                            borderColor: color["node-border-normal-color"],
                        }
                     }
                     ref={domRefLine}
                >
                    <div className={`absolute left-full p-[0.5em] inline opacity-${isLast ? 1 : 0} transform -translate-y-[50%]`}
                            style={
                                {
                                    backgroundColor: color["node-content-bg"],
                                    borderRadius: size["node-rounded"],
                                    color: "white"
                                }
                            }
                            ref={domNextNull}
                    >
                        Null
                    </div>
                </div>
                <div className="absolute border-solid top-1/2 left-full"
                     style={
                        {
                            borderTopWidth: size["ref-line-width"],
                        }
                     }
                     ref={domNextVirtualLine}
                >
                </div>
            </button>
        </div>
    )
}
