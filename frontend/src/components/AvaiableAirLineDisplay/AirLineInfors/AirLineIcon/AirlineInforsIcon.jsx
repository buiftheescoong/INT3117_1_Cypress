import DistanceDetails from "./DistanceDetails";
import LocationDetails from "./LocationDetails";

const AirLineInforsIcon = (props) => {
    
        const {from, to, departDate, arriveDate} = props.flightInfors;
        return (
            <div className="flex flex-row items-center w-[100%] pt-2">
                <LocationDetails time= {departDate.date} airportName = {from.airportCode}></LocationDetails>
                <DistanceDetails quantitiesStop="2"></DistanceDetails>
                <LocationDetails time= {arriveDate.date} airportName = {to.airportCode}></LocationDetails>
            </div>
        )
}

export default AirLineInforsIcon;