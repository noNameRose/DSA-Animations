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
  const domLeftVirtualLine2 = useRef(null);
  const domRightVirtualLine2 = useRef(null);
  const domLeftVirtualLine3 = useRef(null);
  const domRightVirtualLine3 = useRef(null);
  const domClock = useRef(null);
  const domClockLine = useRef(null);
  const domClockWrapper = useRef(null);
  const domClockLineUp = useRef(null);
  useEffect(() => {
    node.clock = domClock.current;
    node.clockLine = domClockLine.current;
    node.clockWrapper = domClockWrapper.current;
    node.actualNode = domNode.current;
    node.leftChain = domLeftChain.current;
    node.rightChain = domRightChain.current;
    node.leftConnector = domLeftConnector.current;
    node.rightConnector = domRightConnector.current;
    node.nullLeft = nullLeft.current;
    node.nullRight = nullRight.current;
    node.leftVirtualLine = domLeftVirtualLine.current;
    node.rightVirtualLine = domRightVirtualLine.current;
    node.leftVirtualLine2 = domLeftVirtualLine2.current;
    node.rightVirtualLine2 = domRightVirtualLine2.current;
    node.leftVirtualLine3 = domLeftVirtualLine3.current;
    node.rightVirtualLine3 = domRightVirtualLine3.current;
    node.clockLineUp = domClockLineUp.current;
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
      node.leftVirtualLine2 = null;
      node.rightVirtualLine2 = null;
      node.leftVirtualLine3 = null;
      node.rightVirtualLine3 = null;
      node.clock = null;
      node.clockLine = null;
      node.clockWrapper = null;
      node.clockLineUp = null;
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
                        -top-[150%]
                        left-1/2
                        transform
                        -translate-x-1/2
                        opacity-0
                        z-10
          "
            ref={domClockWrapper}
          >
          <div className="
                          font-bold
                          p-[0.2em]
                          bg-[#fdfbda]
                          text-[#2d4659]
                          rounded-[0.8em]
                          border-[#d3d0a8]
                          border-solid
                          border-[0.3em]
                          "
                ref={domClock}
          >
                          Visiting...
          </div>
          <div ref={domClockLine} 
                className=" absolute 
                            border-l-[0.3em] 
                            border-solid 
                            border-[#d3d0a8]
                            left-1/2
                            top-full
                            "
          >
          </div>
          <div  ref={domClockLineUp}
                className=" absolute 
                            border-l-[0.3em] 
                            border-solid 
                            border-[#b5f7e6]
                            left-1/2
                            top-full
                            "
          >
          </div>
        </div>
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
                          border-l-[0.4em]
                          border-solid
                          left-1/2
                          border-[#d3d0a8]
                          top-full"
                ref={domLeftVirtualLine}
          >
          </div>
          <div className="absolute
                          border-l-[0.4em]
                          border-solid
                          left-1/2
                          border-[#2a2438]
                          top-full"
               ref={domLeftVirtualLine2}
          >
          </div>
          <div className="absolute
                          border-l-[0.4em]
                          border-solid
                          left-1/2
                          border-[#b5f7e6]
                          top-full"
               ref={domLeftVirtualLine3}
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
                            border-r-[0.4em]
                            border-[#d3d0a8]
                            right-1/2
                            top-full
                            "
          >
          </div>
          <div ref={domRightVirtualLine2}
                className="absolute 
                            border-solid
                            border-r-[0.4em]
                            border-[#2a2438]
                            right-1/2
                            top-full
                            "
          >
          </div>
          <div ref={domRightVirtualLine3}
                className="absolute 
                            border-solid
                            border-r-[0.4em]
                            border-[#b5f7e6]
                            right-1/2
                            top-full
                            "
          >
          </div>
        </div>
      </button>
      <NullComp pos={node.nullRightPos} reference={nullRight}/>
      <NullComp pos={node.nullLeftPos} reference={nullLeft}/>
    </div>
  )
}
