import { color } from "./nodeColor.js"
import ListNodeContent from "./ListNodeContent.jsx"

export default function LinkedListNode({index, val}) {
  return (
    <div className="inline-flex 
                    flex-col 
                    items-center 
                    gap-[1em] 
                    text-[white] 
                    font-bold 
                    p-[2em]
                    border-[0.3em]
                    border-solid
                    rounded-[1em]
                    absolute
                    "
         style={
            {
                backgroundColor: color["Singly-Linked-List-Node"].bg,
                borderColor: color["Singly-Linked-List-Node"].borderColor,

            }
         }   
    >
        <p>{index}</p>
        <ListNodeContent val={val} bgColor={color["Singly-Linked-List-Node"].contentBg}/>
        <ListNodeContent val={"Next"} bgColor={color["Singly-Linked-List-Node"].contentBg}/>
    </div>
  )
}
