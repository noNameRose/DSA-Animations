import React from 'react'
import { color, size } from './inforCode/color'
export default function NodeContent({name, lineRef, reference, nodePos, domNull, virtualLineRef}) {
    let needLine = false;
    let clsName = "border-dashed absolute top-1/2";
    let virtualClassName = "border-solid absolute top-1/2"
    let isNullRight = (name === "Next");
    let nullStyle = {
        backgroundColor: color["null-background"],
        color: color["node-content-text-color"]
    }
    let opa = 1;
    if (name === "Next" || name === "Previous") {
        needLine = true;
        if (isNullRight) {
            clsName += " left-full";
            virtualClassName += " left-full";
            nullStyle["left"] = "100%";
        }
        else {
            clsName += " right-full";
            virtualClassName += " right-full";
            nullStyle["right"] = "100%";
        }
        if (nodePos === "first") 
            opa = name === "Previous" ? 1 : 0;
        else if (nodePos === "last") 
            opa = name === "Next" ? 1 : 0;
        else if (nodePos === "middle")
            opa = 0;
        else
            opa = 1;
    }
    nullStyle.opacity = opa;
  return (
    <button
        className=" 
                    p-[0.3em]
                    rounded-[0.3em]
                    self-stretch
                    relative
                    "
        style={
            {
                backgroundColor: color["node-content-bg"]
            }
        }
        ref={reference}
    >
        {name}
        {needLine && (  
                        <>
                            <div    className={clsName}
                                    style={
                                            {
                                                borderColor: color["ref-line-color"],
                                                borderTopWidth: size["ref-line-thickness"]
                                        }
                                    }
                                    ref={lineRef}
                            >
                                <div    className='inline
                                            absolute
                                            p-[0.3em]
                                            top-0
                                            rounded-[0.3em]
                                            transform
                                            -translate-y-1/2
                                            '
                                    style={nullStyle}
                                    ref={domNull}
                                >
                                                    Null
                                </div>
                            </div>
                            <div className={virtualClassName}
                                style={
                                    {
                                        borderTopWidth: size["virtual-line-thickness"]
                                    }
                                }
                                ref={virtualLineRef}
                            ></div>
                        </>
                    )
        }
    </button>
  )
}
