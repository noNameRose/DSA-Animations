import {useEffect, useRef} from "react"
import NullComp from "./NullComp.jsx";

export default function TreeNode({node}) {
  const domNode = useRef(null);
  const domLeftChain = useRef(null);
  const domRightChain = useRef(null);
  const domRightConnector = useRef(null);
  const domLeftConnector = useRef(null);
  const nullLeft = useRef(null);
  const nullRight = useRef(null);
  const domLeftVirtualLine = useRef(null);
  const domRightVirtualLine = useRef(null);
  const isLeft = node.left !== null;
  const isRight = node.right !== null;
  useEffect(() => {
    node.actualNode = domNode.current;
    node.leftChain = domLeftChain.current;
    node.rightChain = domRightChain.current;
    node.leftConnector = domLeftConnector.current;
    node.rightConnector = domRightConnector.current;
    node.nullLeft = nullLeft.current;
    node.nullRight = nullRight.current;
    node.leftVirtualLine = domLeftVirtualLine.current;
    node.rightVirtualLine = domRightVirtualLine.current;
    return () => {
      node.actualNode = null;
      node.leftChain = null;
      node.rightChain = null;
      node.leftConnector = null;
      node.rightConnector = null;
      node.nullLeft = null;
      node.nullRight = null;
      node.leftVirtualLine = null;
      node.rightVirtualLine = null;
    }
  }, [node]);
  return (
    <div>
      <button className="
                        text-[#e5f1e3]
                        bg-[#529471]
                          p-[0.7em]
                          rounded-full
                          border-[0.2em]
                          border-dashed
                          absolute
                        "
              ref={domNode}
      >
        {node.value}
        <div className="absolute 
                        top-[70%] 
                        right-[90%]
                        text-[#e5f1e3]
                        bg-[#529471]
                        p-[0.3em]
                        border-[0.2em]
                        border-dashed
                        rounded-[0.5em]
                        origin-top-right
                        "
            ref={domLeftConnector}
        >
          L
          <div ref={domLeftChain} 
                className=" absolute 
                            border-l-[0.3em]
                            border-dashed
                            border-[#e5f1e3]
                            left-1/2
                            top-full
                            ">
          </div>
          <div className="absolute
                          border-l-[0.35em]
                          border-solid
                          left-1/2
                           border-[#d3d0a8]
                          top-full"
                ref={domLeftVirtualLine}
          >
          </div>
        </div>
        <div className="absolute 
                        top-[70%] 
                        left-[90%]
                        text-[#e5f1e3]
                        bg-[#529471]
                        p-[0.3em]
                        border-[0.2em]
                        border-dashed
                        rounded-[0.5em]
                        origin-top-left
                        "
              ref={domRightConnector}
        >
          R
          <div ref={domRightChain} 
                className=" absolute 
                            border-dashed
                            border-r-[0.3em]
                            border-[#e5f1e3]
                            right-1/2
                            top-full
                            ">
          </div>
          <div ref={domRightVirtualLine}
                className="absolute 
                            border-solid
                            border-r-[0.3em]
                            border-[#d3d0a8]
                            right-1/2
                            top-full
                            "
          >
          </div>
        </div>
      </button>
      {!isLeft && <NullComp pos={node.nullLeftPos} reference={nullLeft}/>}
      {!isRight && <NullComp pos={node.nullRightPos} reference={nullRight}/>}
    </div>
  )
}
