import { useEffect, useRef } from "react"
import StackNode from "./StackNode.jsx"
import StackTrashNode from "./StackTrashNode.jsx";
import gsap from "gsap";

export default function StackComponent({operation, onPop, onPush, onEmptyTrash, cleanEmptyTrash}) {
    let stk = operation.stk;
    let traskStack = operation.trashStk;
    const stackWidth = useRef(null);
    const stackHeight = useRef(null);
    const stack = useRef(null);
    const trashStk = useRef(null);
    const leftBarTrash = useRef(null);
    const rightBarTrash = useRef(null);
    const tl = useRef();
    useEffect(() => {
      tl.current = gsap.timeline();
      let name = operation.name;
      let lastStackNode;
      try {
         lastStackNode = stk.peek().actualNode;
      }
      catch (err) {
        return;
      }
      if (stackWidth.current === null) {
        stackWidth.current = lastStackNode.getBoundingClientRect().width;
        stackWidth.current /= parseInt(getComputedStyle(lastStackNode).fontSize);
      }
      stack.current.style.minWidth = stackWidth.current + 1 + "em";
      trashStk.current.style.minWidth = stackWidth.current + 1 + "em";
      if (stackHeight.current === null) {
        stackHeight.current = lastStackNode.getBoundingClientRect().height;
        stackHeight.current /= parseInt(getComputedStyle(lastStackNode).fontSize);
      }
      stack.current.style.minHeight = (stackHeight.current * 15) + "em";
      trashStk.current.style.minHeight= stackHeight.current + "em";
      // If this operation is push
      if (name === "push") {
        tl.current.fromTo(lastStackNode, {
          y: "-5rem",
          scale: 0,
        }, {
          scale: 1,
        }).to(lastStackNode, {
          y: 0,
          duration: 1,
          ease: "bounce",
          onComplete: () => {
            onPush();
          }
        })
      } // if this operation is pop
      else if (name === "pop") {
        let topTrashStackNode = traskStack.peek().actualNode;
        tl.current.to(lastStackNode, {y: "-5rem", 
                                      opacity: 0,
                                      }).fromTo(topTrashStackNode, {
                                        y: "-5rem",
                                        scale: 0,
                                      }, {
                                        scale: 1,
                                      }).to(topTrashStackNode, {
                                        y: 0,
                                        duration: 1,
                                        ease: "bounce",
                                        onComplete: () => {
                                          onPop();
                                        }
                                      });
      }
      else if (name === "emptyTrash") {
        let leftBase = leftBarTrash.current;
        let rightBase = rightBarTrash.current;
        tl.current.to(leftBase, {
          rotate: "90deg",
          transformOrigin: "top left",
          ease: "elastic.out(1,0.3)",
          duration: 1.5,
        }).to(rightBase, {
          rotate: "-90deg",
          transformOrigin: "top right",
          ease: "elastic.out(1,0.3)",
          duration: 1.5,
        }, "<")
        .to(traskStack.stack.map((element) => element.actualNode), {
          y: "100vh",
          stagger: 0.1,
          duration: 2,
        }, "<+=1")
        .to(leftBase, {
          rotate: "0",
        }, "-=0.5")
        .to(rightBase, {
          rotate: "0",
          onComplete: () => {
            cleanEmptyTrash();
          }
        }, "<")
        ;
      }
      return () => {
        tl.current.revert();
      }
    }, [operation])
    return (
      <div className="  my-[2em]
                        flex
                        gap-[20em]
                        lg:text-[0.7rem]
                        md:text-mdFont
                        sm:text-smFont

                        ">
        <div className="flex 
                        flex-col-reverse
                        rounded-[1em]
                        border-solid
                        border-[1em]
                        border-stackBorderColor
                        border-t-[0]
                        relative
                        "
              ref={stack}
        >
            {stk.stack.map((element, index) => <StackNode key={index} node={element} nPop={stk.stack.length - index}/>)}
            <h1 className=" font-bold 
                          text-stackInputText
                            absolute
                            top-[105%]
                            left-1/2
                            transform
                            -translate-x-1/2
                          ">
                            Stack
            </h1>
        </div>
        <div className="flex 
                        flex-col-reverse
                        rounded-[1em]
                        border-solid
                        border-[1em]
                        border-stackBorderColor
                        border-t-[0]
                        border-b-[0]
                        relative
                       "
            ref={trashStk}
        >
          {traskStack.stack.map((element, index) => <StackTrashNode key={index} node={element}/>)}
          <pre className=" font-bold 
                          text-stackInputText
                            absolute
                            top-[105%]
                            left-1/2
                            transform
                            -translate-x-1/2
                          "
          >
            Trash Stack
          </pre>
          <button
            className="
                        absolute 
                        text-stackMenuText 
                        bg-stackInputText
                        p-[1em]
                        rounded-[0.2em]
                        top-[110%]
                        left-1/2
                        transform
                        -translate-x-1/2
                        font-bold
                        "
            onClick={() => {
              onEmptyTrash("emptyTrash", {
                value: null,
                index: null,
              })
            }}
          >
            Empty Trash
          </button>
          <div className="w-1/2 h-[5px] bg-stackBorderColor absolute top-full"
                ref={leftBarTrash}
          ></div>
          <div className="w-1/2 h-[5px] bg-stackBorderColor absolute top-full right-0"
                ref={rightBarTrash}
          ></div>
        </div>
      </div>
    )
}

