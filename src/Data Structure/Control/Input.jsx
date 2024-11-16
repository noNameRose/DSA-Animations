import { useState, useContext} from "react"
import { MethodButColorContext, 
        PlainTextColorContext,
        MethodTextColorContext
    
    } from "./ColorContext.jsx";

import Button from "./Button.jsx";
export default function Input({name, 
                                needValue,
                                 needIndex,
                                  onStart, 
                                  isAnimating,
                                }) {
    const [val, setValue] = useState("");
    const [index, setIndex] = useState("");
    const butColor = useContext(MethodButColorContext);
    const plainTextColor = useContext(PlainTextColorContext);
    const methodText = useContext(MethodTextColorContext);
  return (
    <div className="flex
                    items-center
                    gap-[1em]
    ">
        <button   style={
                        {
                            background: `${butColor}`,
                            color: `${methodText}`
                        }
                    }
                className=" p-[0.5em] 
                            rounded-[0.1em] 
                            font-bold 
                            w-[7em]
                            "
                    >
                        {name}
        </button>
        <div className="flex gap-[1em]">
            {needValue && (<label className="flex items-center">
                            <pre className="font-bold"
                                style={{
                                    color:`${plainTextColor}`
                                }}
                            >Value = </pre>
                            <input
                                value={val}
                                onChange={(e) => {setValue(e.target.value)}}
                            />
                        </label>)
            }
            {needIndex && (<label className="flex items-center">
                            <pre className="font-bold"
                                style={{
                                    color:`${plainTextColor}`
                                }}
                            >Index = </pre>
                            <input
                                value={index}
                                onChange={(e) => {setIndex(e.target.value)}}
                            />
                        </label>)
            }
            <Button
                butName="Start"
                operationName={name.toLowerCase()}
                handleClick={onStart}
                val={needValue ? +val : null}
                i={needIndex ? +index : null}
                isDisable={isAnimating || (needValue && val.length === 0) || (needIndex && index.length === 0)}
            />
      </div>
    </div>
  )
}



