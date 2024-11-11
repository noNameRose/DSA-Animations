import img from "../assets/linkedlist.png"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import gsap from "gsap"


export default function Card({color, name, type, difficulty}) {
  const card = useRef(null);
  useGSAP(() => {
    let tl = gsap.timeline({paused: true}).to(card.current, {
      scale: 1.03,
    })
    card.current.onpointerenter = () => {
      tl.play();
    };
    card.current.onpointerleave = () => {
      tl.reverse();
    }
  })
  return (
    <div className="rounded-[1rem]
                    inline-flex 
                    pb-[1.5em]
                    flex-col
                    items-center
                    md:flex-row
                    md:p-[2em]
                    w-[80%]
                    gap-3
                    "
          style={{
              backgroundColor: `${color}`,
          }}
          ref={card}
    >
        <div className="h-[15em]
                        w-[100%]
                        bg-contain
                        bg-center
                        bg-no-repeat
                        border-b-[0.05rem]
                        md:border-r-[0.05rem]
                        md:border-b-[0]
                        border-solid
                        border-[white]
                        p-[2em]
                        "
            style={{
                backgroundImage: `url(${img})`,
            }}
        >
        </div>
        <div className="flex flex-col gap-3 justify-start p-[2em]">
          <pre className="text-[white] font-bold text-[1.5rem]">{name}</pre>
          <pre className="text-[white]">Type: {type}</pre>
          <pre className="text-[white]">Difficulty: {difficulty}</pre>
        </div>
    </div>
  )
}
