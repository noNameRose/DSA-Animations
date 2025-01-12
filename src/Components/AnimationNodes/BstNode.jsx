import { color } from "./nodeColor.js"
export default function BstNode({val}) {
    const refStyle = {
        backgroundColor: color["Binary-Search-Tree"].bg,
        borderColor: color["Binary-Search-Tree"].borderColor,
        padding: "0.3em",
        borderRadius: "0.2em",
        borderWidth: "0.2em",
        borderStyle: "solid",
        top: "60%",
        position: "absolute"
    }


    return (
        <div className="border-[0.2em] border-solid inline p-[1em] rounded-full font-bold absolute left-10"
            style={
                {
                    backgroundColor: color["Binary-Search-Tree"].bg,
                    color: color["Binary-Search-Tree"].text,
                }
            }
        >
            {val}
            <button className="right-full rotate-[45deg]"
                    style={refStyle}
            >
                L
            </button>
            <button className="left-full rotate-[-45deg]"
                     style={refStyle}
            >
                R
            </button>
        </div>
    )
}
