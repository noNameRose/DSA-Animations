import gsap from "gsap"
import { useGSAP } from '@gsap/react';
import { useRef } from "react";
import mainPageImage from "../assets/mainPageImage.svg"
export default function MainPage() {
    const button = useRef(null);
    const buttonShadow = useRef(null);
    useGSAP(() => {
        let tl = gsap.timeline({paused: true}).to(buttonShadow.current, {
          width: "100%",
        });
        button.current.onpointerenter = () => {
            tl.play();
        };
        button.current.onpointerleave = () => {
            tl.reverse();
        }
    });
    return (
      <div className="
                    flex
                    flex-col 
                    justify-center
                    md:flex-row
                    sm:p-[5em]
                    p-0
                    pt-10
                    items-center
                    gap-[5rem]
                    max-w-max
                    m-auto
                    ">
        <div className='
                        w-[30rem]
                        h-[30rem] 
                        bg-contain 
                        bg-no-repeat
                         '
              style={{
                backgroundPosition: "center center",
                backgroundImage: `url(${mainPageImage})`,
              }}           
                         >
        </div>
        <div className="flex flex-col gap-[2rem]">
            <h1 className="font-bold text-mainText text-[1.5rem] text-center">
                Learn Data Structure and Algorithm effectively with animation
            </h1>
            <button
                className="bg-mainText 
                            p-[0.7em] 
                            pl-[5em]
                            pr-[5em]
                            text-[1.5rem]
                            rounded-md
                            text-[white]
                            font-bold
                            relative
                            self-center
                            "
                ref={button}
            >
              <p className="z-20 relative">Explore</p>
              <div className="bg-buttonHover
                              w-0
                              h-full
                              rounded-md
                              absolute
                              top-0
                              left-0
                              shadow
                              z-10
            " ref={buttonShadow}></div>
            </button>
        </div>
    </div>
  )
}
