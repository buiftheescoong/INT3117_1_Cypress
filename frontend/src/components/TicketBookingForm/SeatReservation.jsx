import React, { useEffect, useRef, useState } from "react";
import AirplaneHead from "../../assets/images/airplaneHead.png";

import { toast } from "react-toastify";

const SeatReservation = ({
  setCurrentActiveForm,
  numberOfPassengers,
  setNumberOfPassengers,
  selectedSeats,
  setSelectedSeats,
  avaiableSeats,
  selectedClassType
}) => {


  const [currentSeats, setCurrentSeats] = useState(
    {
      "Business": [],
      "Economy" : []
    }
  );

  const [unAvaiableSeats, setUnAvaiableSeats] = useState([]);

  const [reservedSeats, setReservedSeats] = useState([]);

  const handleAvaiableSeats = () => {

      console.log("check selected class type : " + selectedClassType);
      
      avaiableSeats.map((classTypeObject) => {

        setCurrentSeats((prevSeats) => ({
          ...prevSeats, 
          [classTypeObject.classType]: [...classTypeObject.seats.map(seatInfors => 
            {   if(seatInfors.status == "booked" && !reservedSeats.includes(seatInfors.seatNumber)){
                  setReservedSeats((prevReservedSeats) => [...prevReservedSeats, seatInfors.seatNumber]);
                }
                return seatInfors.seatNumber;
            }
            
          )]
        }));
        console.log("check evaluated class type : " + classTypeObject.classType + " and selected class type : " + selectedClassType);
        if(classTypeObject.classType != selectedClassType){
          classTypeObject.seats.forEach(seat => {
              if(!unAvaiableSeats.includes(seat.seatNumber)){
                setUnAvaiableSeats(prev => [
                  ...prev, 
                  seat.seatNumber
                ]);
              }
          })
        }
        
        console.log("check avaiable seats " + classTypeObject.classType + " : "  + JSON.stringify(currentSeats));  
        console.log("check reserved seats "  + JSON.stringify(reservedSeats));  
      })      

    

      console.log("check unavaiable seats : " + JSON.stringify(unAvaiableSeats));


  }

  const handleNextClick = () => {
    if (numberOfPassengers === 0) {
      toast.warn("Please select atleast one seat to proceed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    } else {
      setCurrentActiveForm(1);
    }
  };

  const handleSeatClick = (classType, seat) => {
    if (!reservedSeats.includes(seat) && !unAvaiableSeats.includes(seat)) {
      if (selectedSeats[classType] != null) {
        if(!selectedSeats[classType].includes(seat)){
          setSelectedSeats({
            ...selectedSeats,
            [classType]: [...(selectedSeats[classType]), seat],
          });
        } else{
          setSelectedSeats({
            ...selectedSeats,
            [classType]: [...(selectedSeats[classType].filter(_seat => _seat !== seat))],
          });
        }
        
      } else {
        setSelectedSeats({
          ...selectedSeats,
          [classType]: [seat],
        });
      }
    }
  };

  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const imageRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {

    handleAvaiableSeats();

    const updateContainerSize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setContainerSize({ width: clientWidth, height: clientHeight });
      }
    };

    updateContainerSize();
    window.addEventListener("resize", updateContainerSize);

    return () => {
      window.removeEventListener("resize", updateContainerSize);
    };
  }, []);

  useEffect(() => {
    if (imageRef.current) {
      const { width, height } = containerSize;
      if (width && height) {
        if (width >= 768) {
          imageRef.current.style.width = `${width}px`;
          imageRef.current.style.height = "auto";
        } else {
          imageRef.current.style.width = "auto";
          imageRef.current.style.height = `${height}px`;
        }
      }
    }
  }, [containerSize]);

  useEffect(() => {
    // Calculate total number of selected seats and update numberOfPassengers prop
    let totalSelectedSeats = 0;
    for (const row in selectedSeats) {
      totalSelectedSeats += selectedSeats[row].length;
    }
    setNumberOfPassengers(totalSelectedSeats);
  }, [selectedSeats, setNumberOfPassengers]);

  const renderSeats = (classType) => {
  
    return currentSeats[classType].map((seat) => (
      <div
        key={seat}
        className={`seatContainer ${
          selectedSeats[classType] && selectedSeats[classType].includes(seat)
            ? "selectedSeats"
            : reservedSeats.includes(seat)
            ? "bookedSeats"
            : unAvaiableSeats.includes(seat)
            ? "unAvaiableSeats"
            : "seatsHover"
            
        } w-[50px] md:w-[80px] md:h-[80px]`}
        onClick={() => handleSeatClick(classType, seat)}
      >
        <p className="text-[15px] ">
          {seat}
        </p>
      </div>
    ));
  };

  const numPassengersText =
    Object.values(selectedSeats).reduce(
      (total, seats) => total + seats.length,
      0
    ) + " Passenger(s)";

  return (
    <div className="my-5 bg-white border-[1px] border-gray-200 rounded-[30px] p-5">
      <p className="mb-5 text-4xl text-[#00008B]">Seat Booking</p>
      <p className="mb-2">{numPassengersText}</p>
      <div className="flex flex-col  mt-5">

      <div className="hidden w-[100%] md:block">
          <img
            ref={imageRef}
            src={AirplaneHead}
            alt=""
            className="w-[100%] md:block"
          />
        </div>

        <div
          ref={containerRef}
          className="flex flex-col gap-20 h-fit p-5 bg-[#f3f5f8] rounded-b-[15px] md:rounded-s-[15px] md:w-auto"
        >
          {Object.keys(currentSeats).map((classType) => (
            <div key={classType} className="flex flex-row  flex-wrap gap-1  justify-center w-[100%]">
              {renderSeats(classType)}
            </div>
          ))}
        </div>


      </div>
      <button
        className="bg-[#00008B] text-white px-10 py-2 rounded-full hover:bg-black duration-300 mt-2"
        onClick={handleNextClick}
      >
        Next
      </button>
    </div>
  );
};

export default SeatReservation;
