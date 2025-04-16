const AirLineClassDisplayForm = (props) => {
    
    const titleColor = "bg-"+props.color+"-500";
    console.log("check color : " + titleColor);
    return (
        
        <div className="border-[1px] rounded-[10px] border-gray-300 w-[50%] cursor-pointer hover:border-red-500
        transition duration-300 ease-in-out "
        onClick={() => {
            props.changeClassTypeInfors("isExpanded", true);
            props.changeClassTypeInfors("classType", props._class);
            }}>
            <div  className={`${titleColor} md:text-xl text-center py-2 rounded-tl-[10px] rounded-tr-[10px]`}>{props._class}</div>
            <div className="pt-3 text-center md:text-xl">{props.price}</div>
        </div>
    )
}

export default AirLineClassDisplayForm;