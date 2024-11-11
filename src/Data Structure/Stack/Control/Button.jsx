import { useState } from "react"

export default function Button({butName, 
                                operationName, 
                                handleClick, 
                                val, 
                                i,
                                textColor,
                                backGroundColor,
                                isDisable
                            }) {
  return (
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
            }
        }
        className="p-[0.5em] rounded-[0.2em] font-bold"
        disabled={isDisable}
    >
        {butName}
    </button>
  )
}
