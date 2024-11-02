import { gsap } from "gsap"
import { useState } from "react";

export default function Input({name, needValue, needIndex, onStart}) {
  const [value, setValue] = useState("");
  const [index, setIndex] = useState("");

  function handleHover(e) {
    gsap.to(e.currentTarget, {
      x: "2rem"
    });
  }
  function handleOut(e) {
    gsap.to(e.currentTarget, {
      x: "0"
    })
  }
  return (
    <div className="flex items-center gap-5 ">
      <button className="
                      text-inputTextColor 
                      p-[0.7em] 
                      bg-buttonTheme 
                      rounded-sm
                      font-bold
                      lg:text-lgMenuFont
                      md:text-mdFont
                      sm:text-smFont
                      "
                      onPointerOver={handleHover}
                      onPointerOut={handleOut}
                      >{name}
      </button>
      <div className="inline-flex gap-5 items-center">
        {needValue && ( <label className="flex gap-2">
                          <pre className="text-inputTextColor 
                                            font-bold
                                            lg:text-lgMenuFont
                                            md:text-mdFont
                                            sm:text-smFont
                                            ">Value = </pre>
                          <input
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            className="max-w-[3rem] 
                                      min-h-full
                                      lg:text-lgMenuFont
                                      md:text-mdFont
                                      sm:text-smFont
                                      "
                          />
                        </label>)}
        {needIndex && ( <label className="flex gap-2">
                          <pre className="text-inputTextColor 
                                            font-bold
                                            lg:text-lgMenuFont
                                            md:text-mdFont
                                            sm:text-smFont
                                            
                                            ">Index = </pre>
                            <input
                              value={index}
                              onChange={e => setIndex(e.target.value)}
                              className=" max-w-[3rem]
                                          lg:text-lgMenuFont
                                          md:text-mdFont
                                          sm:text-smFont
                                        "
                            />
                          </label>)}
        <button className="
                  text-inputTextColor 
                    p-[0.5em] 
                  bg-buttonTheme 
                    rounded-sm
                    font-bold
                    lg:text-lgMenuFont
                    md:text-mdFont
                    sm:text-smFont
                    "
                onClick={() => {
                  onStart(name.toLowerCase(), {
                    value: needValue ? +value : null,
                    index: needIndex ? +index : null,
                  })
                }}
        >Start
        </button>
      </div>
    </div>
    
  )
}
