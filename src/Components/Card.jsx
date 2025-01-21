
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import gsap from "gsap"


export default function Card({color, name, type, difficulty, img}) {
  const card = useRef(null);
  const logoImage = img;
  useGSAP(() => {
    const tl = gsap.timeline({paused: true}).to(
      card.current, {
        boxShadow: "0px 0px 10px 2px grey",
      }
    );
    card.current.onpointerenter = () => {
      gsap.to(card.current, {
        y: "-0.5em",
      });
      tl.play();
    };
    card.current.onpointerleave = () => {
      gsap.to(card.current, {
        y: 0,
        boxShadow: ""
      });
      tl.reverse();
    }
  })
  return (
    <div className="rounded-[1rem]
                    inline-flex 
                    p-[1.5em]
                    flex-col
                    items-center
                    gap-[2em]
                    min-h-[20em]
                    "
          style={{
              backgroundColor: `${color}`,
          }}
          ref={card}
    >
        {logoImage}
        <div className="flex flex-col gap-3 justify-start">
          <pre className="text-[white] font-bold text-[1.5rem]">{name}</pre>
          <pre className="text-[white]">Type: {type}</pre>
          <pre className="text-[white]">Difficulty: {difficulty}</pre>
        </div>
    </div>
  )
}
