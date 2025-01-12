import { color } from "./style/Navigation-color/style.js"


export default function Navigation() {
  return (
    <div className='p-[2em] max-w-7xl mx-auto'>
      <h1 className="font-bold text-[1.7em]"
          style={
            {
              color: color["textColor"]
            }
          }
      >
          DSA ANIMATION
      </h1>
    </div>
  )
}
