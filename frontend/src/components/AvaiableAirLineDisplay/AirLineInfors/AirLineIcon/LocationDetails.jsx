import { useContext } from "react";
import { DateFormatContext } from "../../../../context/dateFormatContext";

const LocationDetails = (props) => {

    const formatedDate = (date) => {
        return date.split('-').reverse().join('-');
    }


    return(
        <div className="w-[40%] px-2">
            <p className=" font-bold text-[12px] md:text-xl md:font-normal w-[100%] md:w-[100px]">{formatedDate(props.time)}</p>
            <p>{props.airportName}</p>
        </div>
    )
}

export default LocationDetails;