
import BstNode from "./AnimationNodes/BstNode.jsx"
import LinkedListNode from "./AnimationNodes/LinkedListNode.jsx"
import StackNode from "./AnimationNodes/StackNode.jsx"
import DoublyListNode from "./AnimationNodes/DoublyLinkedListNode.jsx"

export default function AnimationComp() {
  return (
    <div className="relative min-h-[20rem] w-[50rem]">
        <BstNode val={12}/>
        <LinkedListNode index={3} val={30}/>
        <StackNode val={59} pos="bottom-0 rotate-[-90deg] origin-bottom-left left-[67.5%]"/>
        <DoublyListNode index={10} val={8} pos="bottom-0 right-0"/>
    </div>
  )
}
