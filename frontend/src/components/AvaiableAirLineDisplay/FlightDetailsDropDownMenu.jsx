import React from "react";

const FlightDetailsDropDownMenu = (props) =>{

    const {expanded, aircraftInfors, flightInfors} = props;

    const{from, to , departDate, arriveDate} = flightInfors;

    const formatedDate = (date, time) => {

        return time + " ," + date.split('-').reverse().join('-');
    }

    const formartedLocation = (location, airport) => {
        return location + " - " + airport;
    }

    const calcDuration = (departDate, arriveDate) => {

        let departTimeUnit = departDate.time.substring(departDate.time.length-2, departDate.time.length);
        let [departHour, departMinute] = departDate.time.substring(0, departDate.time.length-2).split(":").map(Number);
        if(departTimeUnit == "PM"){
            departHour += 12;
        }
        console.log("check depart hour : " + departHour + "check depart minute : " + departMinute + " " + departTimeUnit);
    
        let arriveTimeUnit = arriveDate.time.substring(departDate.time.length-2, departDate.time.length);
        let [arriveHour, arriveMinute] = arriveDate.time.substring(0, departDate.time.length-2).split(":").map(Number);
        if(arriveTimeUnit == "PM"){
            arriveHour += 12;
        }

        console.log("check arrive hour : " + arriveHour + "check arrive minute : " + arriveMinute + " " + arriveTimeUnit);
    
        let _departDate = new Date(departDate.date);
    
        let _arriveDate = new Date(arriveDate.date);
    
        let durationDateToHour = (_arriveDate - _departDate)/(1000 * 3600);
    
        const departTotalMinutes = departHour * 60 + departMinute;
        let arriveTotalMinutes = arriveHour * 60 + arriveMinute;
    
        if (arriveTotalMinutes < departTotalMinutes) {
    
          arriveTotalMinutes += 24 * 60;
    
          durationDateToHour -= 24;
        }
    
        
        let durationMinutes = arriveTotalMinutes - departTotalMinutes;
    
      
        const durationHour = durationDateToHour + Math.floor(durationMinutes / 60);
        const durationMinute = durationMinutes % 60;
    
        
        const formattedDuration = `${durationHour}h ${durationMinute}m`;
    
        return formattedDuration;
      };

    return (
        <div className={`${expanded ? 'h-auto px-2 py-2' : 'h-[0px]'}  w-[100%] bg-gray-200 transition-all duration-300 ease-in-out 
        `}
            style={{
                overflow: 'hidden',
            }}
            >
            <div className="text-[0.9rem] md:text-[1rem] ">Flight code : <b>{aircraftInfors.airline.airlineCode}</b></div>
            <br></br>
            <div className="flex flex-row gap-5">
                <div className="w-[10%] text-[0.9rem] md:text-[1rem]">Depart : </div>
                <div className="w-[80%]">
                    <p className="font-bold text-[0.9rem] md:text-[1rem]">{formatedDate(departDate.date, departDate.time)}</p>
                    <p className="font-bold text-[0.9rem] md:text-[1rem]">{formartedLocation(from.nameLocation, from.airport)}</p>
                </div>
            </div>
            <br></br>
            <div className="flex flex-row gap-5">
                <div className="w-[10%] text-[0.9rem] md:text-[1rem]">Arrive : </div>
                <div className="w-[80%]">
                <p className="font-bold text-[0.9rem] md:text-[1rem]">{formatedDate(arriveDate.date, arriveDate.time)}</p>
                <p className="font-bold text-[0.9rem] md:text-[1rem]">{formartedLocation(to.nameLocation, to.airport)}</p>
                </div>
            </div>

            <br></br>
            <div className="flex flex-row gap-5">
                <div className="w-[10%] text-[0.9rem] md:text-[1rem]"></div>
                <div className="w-[80%] flex flex-row gap-5">
                    <p>Duration : <span className="text-red-500 inline-block pl-2">{calcDuration(departDate, arriveDate)}</span></p>
                    <p>Airbus : <span className="text-red-500 inline-block pl-2">{aircraftInfors.airline.airlineManifacturing}</span></p>
                </div>
            </div>
        </div>
    );
}

export default FlightDetailsDropDownMenu;