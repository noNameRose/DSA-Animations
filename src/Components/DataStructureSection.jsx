import Card from "./Card.jsx"


export default function DataStructureSection() {
  return (

    <div className="pt-[3em] sm:pt-0 flex flex-col items-center gap-[5rem] max-w-7xl mx-auto sm:text-lg">
        <p className="font-bold text-mainText text-[2rem]">Data Structure</p>   
        <div className="w-full flex flex-col items-center">
            <Card color="#032536" name="Linked List" difficulty="Easy" type="Linear"/>
        </div>     
    </div>
  )
}
