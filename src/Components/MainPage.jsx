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
                    p-[5em]
                    md:p-[7em]
                    sm:pr-[2em]
                    sm:pl-[2em]
                    items-center
                    max-w-max
                    m-auto
                    xsm:text-[0.5rem]
                    hsm:text-[0.7rem]
                    sm:text-[1rem]
                    gap-[3em]
                    bg-mainPageColor
                    ">
        <div className='
                        w-[30em]
                        h-[30em] 
                        bg-contain 
                        bg-no-repeat
                         '
              style={{
                backgroundPosition: "center center",
                backgroundImage: `url(${mainPageImage})`,
              }}           
                         >
        </div>
        <div className="flex flex-col gap-[2em]">
            <h1 className="font-bold 
                          text-mainText 
                          text-center 
                          text-[1.5rem]
                          pr-[1em]
                          pl-[1em]
                          ">
                Learn Data Structure and Algorithm effectively with animation
            </h1>
            <button
                className="bg-mainText 
                            rounded-md
                            text-[white]
                            font-bold
                            relative
                            self-center
                            fasdf
                            p-[0.5em]
                            pl-[5em]
                            pr-[5em]
                            text-[1rem]
                            sm:text-[1.5rem]
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
