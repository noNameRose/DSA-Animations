import { useEffect, useRef, useState } from "react"


export default function StackNode({node, nPop}) {
    const stkNode = useRef(null);
    const nodeInfor = useRef(null);
    const wrapper = useRef(null);
    const [isHover, setIsHover] = useState(false);


    function handleHover() {
        setIsHover(true);
    }

    function handleHoverOut() {
        setIsHover(false);
    }

    useEffect(() => {
        if (node === null)
            return;
        node.actualNode = stkNode.current;
        return () => {
            node.actualNode = null;
        }
    }, [node]);

    return (
        <div    className="relative w-full" 
                ref={wrapper}
                onPointerEnter={() => {handleHover()}}
                onPointerLeave={() => {handleHoverOut()}}
                >
            <button className=" font-bold
                            bg-stackNodeTheme
                            p-[0.5em]
                            pr-[5em]
                            pl-[5em]
                            rounded-[0.5em]
                            border-dashed
                            border-chainThickNess
                            border-stackNodeBorder
                            text-stackNodeText
                            stkNode
                            text-center
                            w-full
                            "
                    ref={stkNode}
            >
                {node ? node.data : 0}
            </button>
            <div    className="absolute 
                            bg-[white] 
                            p-[1em] 
                            rounded-[0.5em]
                            left-full
                            top-0
                            transform
                            -translate-y-1/4
                            "
                    ref={nodeInfor}
                    hidden={!isHover}
            >
                <pre>
                    <span className="font-bold">Data: </span> 
                    {node ? node.data : 0}
                </pre>
                <pre>
                    <span className="font-bold">Number of pop to reach: </span>
                    {nPop}
                </pre>
            </div>
        </div>
    )
}
