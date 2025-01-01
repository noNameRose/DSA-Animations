import {color, size} from "./inforCode/color.js"


export default function TailComp({
                                    reference, 
                                    tailLineRef,
                                    tailLineLeft,
                                    tailLineBottom,
                                    tailLineRight,
                                    shortTailLineRef,
                                    tailNullRef,
                                    virtualTailLeft,
                                    virtualTailBottom,
                                    virtualTailRight
                                }) {
  return (
    <button
        className=" p-[0.5em]
                    rounded-[0.3em]
                    relative
                    "
        style={
            {
                color: color["node-content-text-color"],
                backgroundColor: color["node-content-bg"]
            }
        }
        ref={reference}
    >
      Tail
      <div          className="      w-[80px]
                            absolute
                            top-1/2
                            border-dashed
                            left-full
                            "
                    style={
                        {
                            borderColor: color["ref-line-color"],
                            borderTopWidth: size["node-border-thickness"]
                        }
                    }
                    ref={shortTailLineRef}
            >
                <div    className="
                                absolute
                                left-full
                                rounded-[0.3em]
                                p-[0.3em]
                                transform
                                -translate-y-1/2
                                "
                        style={
                            {
                                backgroundColor: color["null-background"]
                            }
                        }
                        ref={tailNullRef}
                >Null</div>
        </div>
        <div className="  
                            absolute
                            left-1/2
                            top-full
                            rounded-[0.3em]
                            z-10
                            "
                ref={tailLineRef}
        >
            <div className="h-full absolute left-0 border-dashed"
                style={
                    {
                        borderLeftWidth: size["node-border-thickness"],
                        borderColor: color["ref-line-color"]
                    }
                }
                ref={tailLineLeft}
            ></div>
             <div className="absolute left-0 border-solid"
                style={
                    {
                        borderLeftWidth: size["virtual-line-thickness"],
                        borderColor: color["virtual-tail-line-color"]
                    }
                }
                ref={virtualTailLeft}
            ></div>
            <div className="w-full absolute bottom-0 border-dashed"
                style={
                    {
                        borderBottomWidth: size["node-border-thickness"],
                        borderColor: color["ref-line-color"]
                    }
                }
                ref={tailLineBottom}
            ></div>
             <div className="absolute bottom-0 border-solid"
                style={
                    {
                        borderBottomWidth: size["virtual-line-thickness"],
                        borderColor: color["virtual-tail-line-color"]
                    }
                }
                ref={virtualTailBottom}
            ></div>
            <div className="absolute right-0 border-dashed bottom-0"
                style={
                    {
                        borderLeftWidth: size["node-border-thickness"],
                        borderColor: color["ref-line-color"]
                    }
                }
                ref={tailLineRight}
            ></div>
             <div className="absolute right-0 border-solid bottom-0"
                style={
                    {
                        borderLeftWidth: size["virtual-line-thickness"],
                        borderColor: color["virtual-tail-line-color"]
                    }
                }
                ref={virtualTailRight}
            ></div>

        </div>
    </button>
  )
}
