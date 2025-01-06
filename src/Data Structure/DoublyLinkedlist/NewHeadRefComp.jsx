import { color, size} from "./inforCode/color"

export default function NewHeadRefComp({reference}) {
  const {domNewHeadRef, domNewHeadRefLine, domNewHeadRefWrapper} = reference
  return (
    <div className="absolute bottom-[4em]" ref={domNewHeadRefWrapper}>
        <button className="w-[15ch] p-[0.5em] border-solid rounded-[0.5em]"
                style={
                    {
                        backgroundColor: color["NewHead-Ref-bg"],
                        borderWidth: size["node-border-thickness"],
                        borderColor: color["NewHead-Ref-border"],
                        color: color["NewHead-Text"]
                    }
                }
                ref={domNewHeadRef}
        >
            New Head
        </button>
        <div  className="absolute left-1/2 " 
              style={
                {
                  borderLeftWidth: size["virtual-line-thickness"],
                  borderColor: color["NewHead-Ref-border"],

                }
              }
              ref={domNewHeadRefLine}
        >
        </div>
    </div>
  )
}
