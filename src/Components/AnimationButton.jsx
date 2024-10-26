import { useGSAP } from "@gsap/react"
import { useRef } from "react";
import gsap from "gsap";

export default function AnimationButton({name, color}) {
    const button = useRef(null);
    useGSAP(() => {
        console.log(document.documentElement.clientWidth);
        let tl = gsap.timeline({paused: true}).to(button.current, {
            backgroundColor: color,
        }).to(button.current.querySelector("p"), {
            color: "white",
        }, "<");
        button.current.onpointerenter = () => {
            tl.play();
        };
        button.current.onpointerleave = () => {
            tl.reverse();
        }
    });
    return (
        <button ref = {button} className="font-bold rounded-md p-2">
            <p>{name}</p>
        </button>
    )
}
