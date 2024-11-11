import AnimationButton from "./AnimationButton.jsx"

export default function Navigation() {
  return (
    <div className="flex items-center 
                    justify-around 
                    p-[2em] 
                    max-w-screen-2xl
                    mx-auto
                    text-[white]
                    gap-[2em]
                    bg-navBarColor
                    ">
      <p className="font-bold text-[1.5rem] ">DSA Animation</p>
      <div className="sm:flex items-center gap-[1em] hidden">
        <AnimationButton name="Data Structure and Algorithm" color="#113C51"/>
        <AnimationButton name="Feed back" color="#113C51"/>
      </div>
      <AnimationButton name="login" color="#113C51"/>
    </div>
  )
}
