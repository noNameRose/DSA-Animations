import { useContext } from "react";
import { ButShadowColorContext, 
        StartButColorContext,
        StartButTextContext
    } from "./ColorContext.jsx";

export default function Button({butName, 
                                operationName, 
                                handleClick, 
                                val, 
                                i,
                                isDisable,
                            }) {
    const shadowColor = useContext(ButShadowColorContext);
    const backGroundColor = useContext(StartButColorContext);
    const textColor = useContext(StartButTextContext);
    return (
        <div className="inline-block relative">
             <div className="w-full 
                            h-full 
                            rounded-[0.2em]
                            absolute
                            top-0
                            "
                style={
                    {backgroundColor: `${shadowColor}`}
                }             
            ></div>
            <button
                onClick={() => {
                    handleClick(operationName, {
                        value: val,
                        index: i,
                    });
                }}
                style={
                    {
                        background: `${backGroundColor}`,
                        color: `${textColor}`,
                        transform: `translateY(${isDisable ? 0: -15}%)`,
                        transition: "transform 0.2s"
                    }
                }
                className="p-[0.5em] 
                            rounded-[0.2em] 
                            font-bold 
                            "
                disabled={isDisable}
            >
                {butName}
            </button>
        </div>
  )
}
