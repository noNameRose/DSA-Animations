export default function TravelNode({infor, wrapperRef, lineRef, nodeRef, isInsertion}) {
    const {name, bg, borderColor, textColor} = infor;
    let wrapperClass =    `absolute
                            lg:text-[0.6rem]
                            md:text-[0.35rem]
                            sm:text-[0.2rem]
                        `;
    let topPos = "100%";
    let bottomPos = "0";
    if (  (isInsertion && name === "Parent")
        || (!isInsertion && name === "Current")
    ) {
        //wrapperClass += " -translate-y-[200%]";
    }
    else {
        topPos = "";
        bottomPos = "100%"; 
        //wrapperClass += " translate-y-[5em]";
    }
    return (
        <div    className={wrapperClass}
                ref={wrapperRef}>
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
                    ref={nodeRef}
            >
                {name}
            </div>
            <div   className="absolute
                            left-1/2
                            "
                    style={
                        {
                            borderLeft: `0.3em solid ${borderColor}`,
                            top: `${topPos}`,
                            bottom: `${bottomPos}`,
                        }
                    }
                    ref={lineRef}
            ></div>
        </div>
    );
}


