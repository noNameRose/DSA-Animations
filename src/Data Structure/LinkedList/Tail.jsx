export default function Tail() {
  return (
    <button className="
                    text-nodeText 
                      lg:text-lgFont
                      font-bold
                      bg-tail_head_theme
                      p-[0.5em]
                      rounded-md
                      border-[0.2em]
                      border-dashed
                      border-nodeBorderColor
                      tail
                      self-center
                      z-50
                      relative
                      ">
      Tail
      <div className="absolute
                      border-l-chainThickNess
                      border-dashed
                      border-nodeBorderColor
                      top-0
                      left-1/2
                      transform
                      vertical-chain
                      -translate-y-[110%]
              "></div>
    </button>
  )
}
