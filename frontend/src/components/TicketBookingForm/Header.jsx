import React from "react";

const Header = ({ currentFlight }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const formattedDate = `${date.getDate()} ${
      monthNames[date.getMonth()]
    } ${date.getFullYear()}`;

    return formattedDate;
  };

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
    <div className="overflow-hidden rounded-[30px] border-[1px]">
      <div className="w-full h-fit bg-[#e1e7ee] p-5 flex justify-between items-center">
        <div className="flex justify-start items-center gap-3">
          <div className="w-[60px]">
            <img src={currentFlight.airline.airlineLogo} alt="..." />
          </div>
          <p className="text-[18px] font-semibold text-[#00008B]">
            {currentFlight.airline.airlineManifacturing} Airlines
          </p>
        </div>
        <div>
          <p className="text-[14px] text-[#00008B]">Economy class</p>
        </div>
      </div>
      <div className="p-5 ">
        <div className="flex max-w-[800px] w-full m-auto justify-between items-center relative z-10 ">
          <div className="text-center">
            <p className="text-[15px] font-semibold text-white ">Depart</p>
            <p className="text-[20px] text-[#FED7AA] font-semibold mt-2">
              {currentFlight.departDate.time}
            </p>
            <p className="text-[14px] text-white">
              {formatDate(currentFlight.departDate.date)}
            </p>
          </div>
          <div className="flex items-center my-5 lg:my-0">
            <div className="w-[15px] h-[15px] rounded-full bg-blue-300"></div>
            <div className="w-[15px] h-[1px] border-[1px] border-blue-400 border-dashed lg:w-[30px]"></div>
            <div className="text-[12px] px-2 py-1 text-black bg-blue-200 rounded-full lg:text-[14px] lg:px-3 text-center">
              {calcDuration(currentFlight.departDate, currentFlight.arriveDate)}
            </div>
            <div className="w-[15px] h-[1px] border-[1px] border-blue-400 border-dashed lg:w-[30px]"></div>
            <div className="w-[15px] h-[15px] rounded-full bg-blue-300"></div>
          </div>
          <div className="text-center">
            <p className="text-[15px] font-semibold text-white">Arrive</p>
            <p className="text-[20px] text-[#FED7AA] font-semibold mt-2">
              {currentFlight.arriveDate.time}
            </p>
            <p className="text-[14px] text-white">
              {formatDate(currentFlight.arriveDate.date)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
