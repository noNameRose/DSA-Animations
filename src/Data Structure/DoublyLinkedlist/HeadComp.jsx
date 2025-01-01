import { color,size } from "./inforCode/color.js"


export default function HeadComp({reference, headLineRef, headNullRef, virtualLineRef}) { 
    return (
        <button
            className="p-[0.5em]
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
            head
            <div className="
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
                    ref={headLineRef}
            
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
                        ref={headNullRef}
                >
                    Null
                </div>
            </div>
            <div className="
                            absolute
                            top-1/2
                            border-solid
                            left-full
                            "
                    style={
                        {
                            borderTopWidth: size["virtual-line-thickness"]
                        }
                    }
                    ref={virtualLineRef}
            >
            </div>
        </button>
    )
}
