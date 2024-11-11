import { useEffect, useRef } from "react"
import StackNode from "./StackNode.jsx"
import StackTrashNode from "./StackTrashNode.jsx";
import gsap from "gsap";

export default function StackComponent({operation, onPop, onPush}) {
    let stk = operation.stk;
    const stack = useRef(null);
    let traskStack = operation.trashStk;
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
      }
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
      return () => {
        tl.current.revert();
      }
    }, [operation])
    return (
      <div className=" absolute
                        h-[70%]
                        left-[20vw]
                        top-[5vh]
                        flex
                        gap-[20em]
                        lg:text-[1.2rem]
                        md:text-[1rem]
                        ">
        <div className="flex 
                        flex-col-reverse
                        lg:text-lgFont
                        md:text-mdFont
                        sm:text-smFont
                        h-[100%]
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
                        lg:text-lgFont
                        md:text-mdFont
                        sm:text-smFont
                        h-[100%]
                        rounded-[1em]
                        border-solid
                        border-[1em]
                        border-stackBorderColor
                        border-t-[0]
                        border-b-[0]
                        relative
                       "
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
          <div className="w-1/2 h-[5px] bg-stackBorderColor absolute top-full"></div>
          <div className="w-1/2 h-[5px] bg-stackBorderColor absolute top-full right-0"></div>
        </div>
      </div>
    )
}

