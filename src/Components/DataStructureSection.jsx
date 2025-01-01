import { Link } from "react-router-dom"
import Card from "./Card.jsx"
import llImage from "../assets/linkedlist.png"
import bstImage from "../assets/bst.png"
import stkImage from "../assets/stk.png"
import dblyll from "../assets/doublyLinkedList.png"

export default function DataStructureSection() {
  return (

    <div className="
                    sm:pt-0 
                    flex 
                    flex-col 
                    items-center 
                    gap-[5em] 
                    max-w-7xl 
                    mx-auto
                    bg-mainPageColor
                    ">
        <p className="font-bold text-mainText text-[2rem]">Data Structure</p>   
        <div className="w-full flex flex-col items-center gap-[3em]">
          <Link to="/LinkedList" className="w-full flex justify-center">
              <Card color="#032536" name="Linked List" difficulty="Easy" type="Linear" img={llImage}/>
          </Link>
          <Link to="/Stack" className="w-full flex justify-center">
              <Card color="#774936" name="Stack" difficulty="Easy" type="Linear" img={stkImage}/>
          </Link>
          <Link to="/BinarySearchTree" className="w-full flex justify-center">
              <Card color="#35635b" name="Binary Search Tree" difficulty="Easy" type="Non-Linear" img={bstImage}/>
          </Link>
          <Link to="/DoublyLinkedList" className="w-full flex justify-center">
              <Card color="#304852" name="Doubly Linked List" difficulty="Medium" type="Linear" img={dblyll}/>
          </Link>
        </div>     
    </div>
  )
}
