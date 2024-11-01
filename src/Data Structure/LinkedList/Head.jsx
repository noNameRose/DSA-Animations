export default function Head() {
  return (
    <button
        className="
        text-nodeText 
          lg:text-lgFont
          font-bold
          bg-tail_head_theme
          p-[0.5em]
          rounded-md
          border-[0.2em]
          border-dashed
          border-nodeBorderColor
          head
          self-center
          absolute
          bottom-full
          mb-[3rem]
          "
    >
      Head
      <div
        className="
                  absolute
                  border-l-[0.25em]
                  border-dashed
                  border-nodeBorderColor
                  vertical-chain
                  top-[105%]
                  left-1/2
        "
      ></div>
    </button>
  )
}