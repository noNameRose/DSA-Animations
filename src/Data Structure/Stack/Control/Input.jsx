import { useState, useEffect } from "react"

export default function Input({name, needValue, needIndex, butColor, onStart, isAnimating}) {
    const [val, setValue] = useState("");
    const [index, setIndex] = useState("");
  return (
    <div className="flex
                    lg:text-lgMenuFont
                    md:text-mdFont
                    sm:text-smFont
                    items-center
                    gap-[1em]
    ">
        <button   style={
                        {
                            background: `${butColor}`,
                        }
                    }
                className=" p-[0.5em] 
                            rounded-[0.1em] 
                            font-bold 
                            text-stackMenuText 
                            w-[10em]
                            border-chainThickNess
                            border-solid
                            border-stackMenuButton
                            "
                    >
                        {name}
        </button>
        <div className="flex gap-[1em]">
            {needValue && (<label className="flex items-center">
                            <pre className="font-bold text-stackInputText">Value = </pre>
                            <input
                                value={val}
                                onChange={(e) => {setValue(e.target.value)}}
                            />
                        </label>)
                        
            }
            <button
                onClick={() => {
                    onStart(name.toLowerCase(), {
                            value: needValue ? val : null,
                            index: needIndex ?  index : null,
                        })
                }}
                style={
                    {
                        background: `${butColor}`
                    }
                }
                className="w-full p-[0.5em] rounded-[0.2em] text-stackMenuText font-bold"
                disabled={isAnimating || (needValue && val.length === 0)}
                    >
                        Start
            </button>
      </div>
    </div>
  )
}
