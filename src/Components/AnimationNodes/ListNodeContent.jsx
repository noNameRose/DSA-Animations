export default function ListNodeContent({val, bgColor}) {
  return (
    <button className="self-stretch p-[0.5em] rounded-[0.3em]"
            style={
                {
                    backgroundColor: bgColor,
                }
            }
    >
      {val}
    </button>
  )
}
