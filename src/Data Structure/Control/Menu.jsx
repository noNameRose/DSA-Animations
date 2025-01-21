import Input from "./Input.jsx"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"

import { ButShadowColorContext, 
          StartButColorContext,
          StartButTextContext,
          MethodButColorContext,
          PlainTextColorContext,
          MethodTextColorContext
        } from "./ColorContext.jsx"
export default function Menu({onStart, 
                              isAnimating,
                              color,
                              methods,
                            }) {
  const { butShadowColor,
          startButColor,
          startButText,
          methodButColor,
          plainTextColor,
          methodTextColor,
          menuTheme,
          methodTabText,
          methodTabbg,
          closeTabBorder,
          menuShadow
        } = color;
  const tl = useRef(null);
  const closeTab = useRef(null);
  const menu = useRef(null);
  const menuWidth = useRef(null);
  const isClose = useRef(false);
  useGSAP(() => {
    if (menuWidth.current === null) {
      menuWidth.current = menu.current.getBoundingClientRect().height;
      menuWidth.current /= parseFloat(getComputedStyle(menu.current).fontSize);
    }
    tl.current = gsap.timeline({paused: true}).to(menu.current, {
      y: "100%",
    }).to(closeTab.current, {
      y: menuWidth.current + "em",
    }, "<");
    closeTab.current.onclick = () => {
      if (isClose.current === false) 
        tl.current.play();
      else
        tl.current.reverse();
      isClose.current = !isClose.current;
    }

  })
  return (
    <div className="fixed 
                    bottom-[2vh] 
                    left-[2vw] 
                    flex 
                    flex-col
                    lg:text-[0.8rem]
                    md:text-[0.5rem]
                    sm:text-[0.3rem]
                    text-[0.2rem]
                    z-50
                    "
    >
      <ButShadowColorContext.Provider value={butShadowColor}>
      <StartButColorContext.Provider value={startButColor}>
      <StartButTextContext.Provider value={startButText}>
      <MethodButColorContext.Provider value={methodButColor}>
      <PlainTextColorContext.Provider value={plainTextColor}>
      <MethodTextColorContext.Provider value={methodTextColor}>
        <svg xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill={methodTabText}
            className="
                        h-[2em] 
                        rounded-[0.2em]
                        z-20
                        border-[0.2em]
                        "
            style={
              {
                borderColor: `${closeTabBorder}`,
                backgroundColor: `${methodTabbg}`
              }
            }
            ref={closeTab}
            >
              <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z">
              </path>
        </svg>
        <section className="flex 
                            flex-col 
                            gap-[1em] 
                            p-[1em] 
                            "  
                  style={{
                    backgroundColor: `${menuTheme}`
                  }}
                  ref={menu}>
            {getInputField(methods, onStart, isAnimating)}
            {/* <Input name="Push" needValue={true} onStart={onStart} isAnimating={isAnimating}/>
            <Input name="Pop" onStart={onStart} isAnimating={isAnimating}/> */}
        </section>
        <button className="font-bold
                            p-[0.5em]
                            rounded-[0.2em]
                            z-10
                          "
                style={{
                  backgroundColor: `${methodTabbg}`,
                  color: `${methodTabText}`
                }}
            >
              Methods Tab
        </button>
        <div className="w-full 
                        h-full 
                        absolute
                        top-full
                        "
              style={
                {
                  backgroundColor: `${menuShadow}`
                }
              }
        ></div>
      </MethodTextColorContext.Provider>
      </PlainTextColorContext.Provider>
      </MethodButColorContext.Provider>
      </StartButTextContext.Provider>
      </StartButColorContext.Provider>
      </ButShadowColorContext.Provider>
    </div>
  )
}

function getInputField(methods, handleStart, isAnimating) {
  const inputLists = [];
  let i = 0;
  for (const funcName in methods) {
    const newInput = <Input name={funcName} 
                            needIndex={methods[funcName].needIndex}
                            needValue={methods[funcName].needValue}
                            key={i++}
                            onStart={handleStart}
                            isAnimating={isAnimating}
                            />;
    inputLists.push(newInput);
  }
  return inputLists;
}
