import React, { useState, useEffect } from "react";
import FindingAirLineBar1 from "./FindingAirLine/FindingAirLineBar1";

const BookHome = ({
  formData,
  setFormData,
  handleFormDataChange,
  handleFlightSearch,
}) => {
  const [isInSmallScreen, setIsInSmallScreen] = useState(
    window.innerWidth < 768
  );
  const [isOneWayChosen, setIsOneWayChosen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsInSmallScreen(true);
      } else {
        setIsInSmallScreen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleRadioChange = (e) => {
    if (e.target.value === "oneWay") {
      setIsOneWayChosen(true);
    } else {
      setIsOneWayChosen(false);
    }
  };

  return (
    <div className="max-w-[520px] mx-auto bg-white p-5 rounded-lg shadow-lg border border-gray-300 rounded-lg shadow-lg" style={{ borderColor: "#1E90FF" }}>
      
      <div className="flex flex-col w-full space-y-5">
        {/* Radio Buttons */}
        <div className="flex flex-col items-start gap-3">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="ticketType"
              value="oneWay"
              className="h-[1rem] w-[1rem] "
              onChange={handleRadioChange}
            />
            <label htmlFor="oneWay" className="text-[20px] text-[#00008B]">One way</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="ticketType"
              value="return"
              defaultChecked
              className="h-[1rem] w-[1rem] "
              onChange={handleRadioChange}
            />
            <label htmlFor="return" className="text-[20px] text-[#00008B]">Return</label>
          </div>
        </div>

        {/* FindingAirLineBar */}
        <FindingAirLineBar1
          formData={formData}
          handleFormDataChange={handleFormDataChange}
          isInSmallScreen={isInSmallScreen}
          setFormData={setFormData}
          isOneWayChosen={isOneWayChosen}
        />
      </div>
      {/* Search Button */}
        {/* <button
          className="bg-[#FED7AA] text-[#1E293B] font-bold px-5 py-2 mt-5 rounded-full transition duration-100 w-full border-2 border-transparent hover:border-[#1E293B]"
          onClick={handleFlightSearch}
        >
          Search Flights
        </button> */}
    </div>
  );
};

export default BookHome;
