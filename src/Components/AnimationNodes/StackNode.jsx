import { color } from "./nodeColor";


export default function StackNode({val, pos}) {
    let tailWind = `px-[3em] 
                    py-[0.2em] 
                    font-bold 
                    rounded-[0.5em] 
                    border-[0.3em] 
                    border-solid  
                    absolute ` + pos
    return (
        <button className={tailWind}
                style={
                    {
                        backgroundColor: color["Stack"].bg,
                        color: color["Stack"].text,
                        borderColor: color["Stack"].borderColor
                    }
                }
        >
        {val}
        </button>
    )
}
