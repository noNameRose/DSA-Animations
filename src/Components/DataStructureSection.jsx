import { Link } from "react-router-dom"
import Card from "./Card.jsx"
import { infors } from "./Dsa-Card-infor/infor.jsx"


export default function DataStructureSection() {

  return (

    <div className="
                    flex 
                    flex-col 
                    items-center 
                    gap-[5em] 
                    max-w-7xl 
                    mx-auto
                    py-[3em]
                    sm:pb-[10em]
                    ">
        <p className="font-bold text-[2rem] text-[#00334e]">Data Structure</p>   
        <div className="w-full flex flex-row justify-center gap-[3em] flex-wrap">
          {infors.map(infor => {
            const {name, type, difficulty, img, bgColor} = infor;
            return  (<Link to={"/" + removeSpace(name)}>
                      <Card name={name} 
                            color={bgColor} 
                            difficulty={difficulty} 
                            type={type}
                            img={img}
                            >
                      </Card>
                    </Link>);
          })}
        </div>     
    </div>
  )
}


const removeSpace = (str) => {
  let res = "";
  for (let ch of str) {
    if (ch !== ' ')
      res += ch;
  }
  return res;
}