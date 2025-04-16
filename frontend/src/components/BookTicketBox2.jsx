import React, { useEffect, useState } from "react";
import BookHome from "./BookHome.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Thêm useNavigate
import DisplayFlightsHandle from "../components/DisplayFlightsHandle.jsx";
import flightsSearchRequest from "../clientRequest/FlightsSearchRequest.jsx";

const BookHomeContainer = () => {
  
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
  });


  const handleFormDataChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const moveToTicketSearchPage = async (e) => {
    
    navigate("/book/", {state: formData});
  };


  return (

    // <div className="px-[30px] md:px-[30px] max-w-[1400px] mx-auto">
    <div className="max-w-[1400px] mx-auto ">

        
        <div className="max-w-[520px] mx-auto bg-white p-7 rounded-lg shadow-lg border border-gray-300 min-h-[700px]"> 
        <div className="max-w-[300px] md:max-w-[500px] mx-auto bg-[#FED7AA] mb-[10px] py-[10px] px-[20px] rounded-lg border border-[#FED7AA]">
            <h1 className="text-[1em] text-[#00008B] md:text-[1.5em] text-blue font-bold text-center">
                FIND YOUR NEXT TRIP
            </h1>
        </div> 
         <BookHome
            formData={formData}
            setFormData={setFormData}
            handleFormDataChange={handleFormDataChange}
            handleFlightSearch={moveToTicketSearchPage}
        />
        <button
          className="bg-[#FED7AA] text-[#00008B] font-bold px-5 py-2 mt-5 rounded-full transition duration-100 w-full border-2 border-transparent hover:border-[#1E293B]"
          onClick={moveToTicketSearchPage}
        >
          Search Flights
        </button>
        </div>

      
    </div>
  );
};

export default BookHomeContainer;