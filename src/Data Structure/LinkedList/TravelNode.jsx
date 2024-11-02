export default function TravelNode({name}) {
    let className = `
                    text-white
                    p-[0.5em]
                    text-[white]
                    font-bold
                    border-chainThickNess
                    border-solid
                    rounded-sm
                    border-travel
                    absolute
                    z-100
                    lg:text-lgFont
                    md:text-mdFont
                    sm:text-smFont
                    `;
    let chainClassName = `  absolute
                            top-0
                            left-1/2
                            border-l-solid
                            border-l-chainThickNess
                            transfrom
                            -translate-y-full
                            vertical-chain`;
    if (name === "Previous") {
        className += " bg-previousTheme border-previousBorder";
        chainClassName += " border-previousBorder";
    }
    else {
        className += " bg-currentTheme border-currentBorder";
        chainClassName += " border-currentBorder"
    }
    className += ` ${name}`;
  return (
    <button
        className={className}
    >
        {name}
        <div className={chainClassName}
        ></div>
    </button>
  )
}
