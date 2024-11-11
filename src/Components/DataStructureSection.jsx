import { Link } from "react-router-dom"
import Card from "./Card.jsx"


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
        <div className="w-full flex flex-col items-center">
          <Link to="/LinkedList" className="w-full flex justify-center">
              <Card color="#032536" name="Linked List" difficulty="Easy" type="Linear"/>
          </Link>
        </div>     
    </div>
  )
}
