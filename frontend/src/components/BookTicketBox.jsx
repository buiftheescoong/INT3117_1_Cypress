import React from "react";
import FindingAirLineBar from "./FindingAirLine/FindingAirLineBar";
import { useState, useEffect } from "react";

const BookTicketBox = ({
  formData,
  setFormData,
  handleFormDataChange,
  handleFlightSearch
}) => {

    const [isInSmallScreen, setIsInSmallScreen] = useState(window.innerWidth < 768 ? true : false);

    const[isOneWayChosen, setIsOneWayChosen] = useState(false);
    
    useEffect(() => {
        const handleResize = () => {
            console.log("window is resized");
        if(window.innerWidth < 768){
            setIsInSmallScreen(true);
            console.log("apporoach small screen, isSmallScreen : " + isInSmallScreen);
            
        } else{
            setIsInSmallScreen(false);
            
        }
        

    };

    window.addEventListener("resize", handleResize);



    return () => {
      window.removeEventListener("resize", handleResize);
      console.log("remove resize listener")
    };
  }, []);

  const handleRadioChange = (e) =>{
    if(e.target.value == "oneWay"){
      setIsOneWayChosen(true);
    } else{
      setIsOneWayChosen(false);
    }
  }

  return (

    <div className="bg-white py-[50px] mx-auto px-5 border-[2px] rounded-[10px] border-black-700 h-[42rem] md:h-[20rem] block md:flex w-[90%]">

      <div className="flex flex-col w-[100%] mx-auto">

        <div className="flex gap-5 items-center justify-start mb-5">
          <div className="flex justify-center items-center gap-2">
            <input type="radio" name="ticketType" value="oneWay" class="h-[1rem] w-[1rem]"
            onChange={handleRadioChange}/>
            <label htmlFor="oneWay" className="text-[20px] text-[#00008B]">One way</label>
          </div>

          <div className="flex justify-center items-center gap-2">
            <input type="radio" name="ticketType" value="return" defaultChecked class="h-[1rem] w-[1rem]"
            onChange={handleRadioChange}/>
            <label htmlFor="return" className="text-[20px] text-[#00008B]">Return</label>
          </div>

        </div>

        
        <FindingAirLineBar formData = {formData} handleFormDataChange = {handleFormDataChange} isInSmallScreen={isInSmallScreen}
        setFormData= {setFormData} isOneWayChosen={isOneWayChosen}/>
         {/* <button className="hover:bg-[#1E293B] bg-[#bebebe] text-black hover:text-white px-5 py-2 mt-5 rounded-lg transition duration-100 w-[200px] self-center"
          onClick={handleFlightSearch}>
        Search Flights
        </button> */}
        <button
           className="bg-[#FED7AA] text-[#00008B] font-bold px-5 py-2 mt-5 rounded-full transition duration-100 w-[200px] self-center border-2 border-transparent hover:border-[#1E293B]"
            onClick={handleFlightSearch}
          >
          Search Flights
        </button>
      </div>
       
    </div>
  );
};

export default BookTicketBox;
