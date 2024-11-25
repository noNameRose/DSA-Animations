export default function NullComp({pos, reference}) {
    const {x, y} = pos;
    let name = `inline-block 
                p-[0.5em] 
                bg-[#e5f1e3] 
                absolute 
                transform
                rounded-[1em]
                text-[#35635b]
                `;
    return (
        <div className={name}
            style={{
                left: x + "em",
                top: y + "em",
            }}
            ref={reference}
        >
            Null
        </div>
    )
}
