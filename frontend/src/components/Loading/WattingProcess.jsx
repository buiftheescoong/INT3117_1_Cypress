import React from "react";
import wattingIcon from "../../assets/images/load.gif"

const WattingProcess = (props) => {
    return(
        <div className={`fixed flex justify-center items-center bg-opacity-70 z-50 top-0 w-[100%] h-[100%] ${props.isVisible ? "bg-gray-300" : "hidden"}`}>
            <img src={wattingIcon} className="md:w-[300px] md:h-[300px]"></img>
        </div>
    )
}

export default WattingProcess;