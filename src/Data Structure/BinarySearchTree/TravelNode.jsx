export default function TravelNode({infor, reference, lineRef}) {
    const {name, bg, borderColor, textColor} = infor;
    return (
        <div    className="absolute
                         transform
                        -translate-y-[200%]
                        -translate-x-[0.9em]" 
                ref={reference}>
            <div    
                    className="
                            p-[0.3em]
                            rounded-[0.3em]
                            "
                    style={
                        {
                            backgroundColor: bg,
                            color: textColor,
                            border: `0.2em solid ${borderColor}`
                        }
                    }
            >
                {name}
            </div>
            <div   className="absolute
                            top-[100%]
                            left-1/2
                            transform
                            -translate-x-1/2
                            "
                    style={
                        {
                            borderLeft: `0.3em solid ${borderColor}`
                        }
                    }
                    ref={lineRef}
            ></div>
        </div>
    );
}

