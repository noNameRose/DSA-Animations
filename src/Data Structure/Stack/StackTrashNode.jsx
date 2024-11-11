import { useRef, useEffect } from "react"
export default function StackTrashNode({node}) {
    const stkTrashNode = useRef(null);
    useEffect(() => {
        node.actualNode = stkTrashNode.current;
        return () => {
            node.actualNode = null;
        }
    }, [node])
    return (
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
                            trashNode
                            "
                ref={stkTrashNode}
        >
            {node.data}
        </button>
    )
    
}
