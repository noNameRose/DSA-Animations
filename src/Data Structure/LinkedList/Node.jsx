import gsap from "gsap"
import { useEffect, useRef } from "react"
import Tail from "./Tail.jsx";
import Head from "./Head.jsx";


export default function Node({value, index, node, isTail, isHead}) {
    const ref = useRef(null);
    let className = "flex items-center gap-12";
    if (isTail)
        className += " flex-col";
    useEffect(() => {
        node.actualNode = ref.current;
        return () => {
            node.actualNode = null;
        }
    }, [node]);
    return (
        <div className="flex flex-col items-center gap-12 node-wrapper absolute" ref={ref}>
            {isHead && <Head/>}
            <div className="inline-flex 
                            flex-col 
                            bg-nodeTheme 
                            items-center 
                            p-[1.5em] 
                            gap-5 
                            rounded-md
                            border-[0.3em] 
                            border-dashed 
                            border-nodeBorderColor
                            node
                            lg:text-lgFont
                            "
                >
                <p className="text-nodeText font-bold">{index}</p>
                <button className="text-nodeText p-[0.2em] bg-contentThem self-stretch rounded-sm font-bold">{value}</button>
                <button className="text-nodeText p-[0.2em] bg-contentThem rounded-sm relative next font-bold">
                    Next
                    <div className="chain
                                    absolute 
                                    top-1/2 
                                    left-full 
                                    border-t-chainThickNess
                                    border-dashed
                                border-nodeBorderColor"    
                    >
                        <div
                            className="bg-nullTheme 
                                        p-[0.3em] 
                                        rounded-sm
                                        absolute
                                        top-0
                                        left-full
                                        transform
                                        -translate-y-1/2
                                        null
                                        font-bold
                                        "
                        >
                            Null
                        </div>
                    </div>
                </button>
            </div>
            {isTail && <Tail/>}
        </div>
        )
}
