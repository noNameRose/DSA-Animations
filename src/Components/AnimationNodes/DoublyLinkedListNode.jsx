import { color } from "./nodeColor.js"
import ListNodeContent from "./ListNodeContent.jsx"

export default function DoublyListNode({index, val, pos}) {
    let tailWind = `inline-flex 
                    flex-col 
                    items-center 
                    gap-[1em] 
                    fond-bold 
                    p-[2em] 
                    border-[0.3em] 
                    border-solid 
                    rounded-[1em]
                    absolute
                    font-bold
                    ` + pos;
  return (
    <div className={tailWind}
         style={
            {
                backgroundColor: color["Doubly-Linked-List-Node"].bg,
                borderColor: color["Doubly-Linked-List-Node"].borderColor,
                color: color["Doubly-Linked-List-Node"].text
            }
         }   
    >
        <p>{index}</p>
        <ListNodeContent val={val} bgColor={color["Doubly-Linked-List-Node"].contentBg}/>
        <ListNodeContent val={"Next"} bgColor={color["Doubly-Linked-List-Node"].contentBg}/>
        <ListNodeContent val={"Previous"} bgColor={color["Doubly-Linked-List-Node"].contentBg}/>
    </div>
  )
}
