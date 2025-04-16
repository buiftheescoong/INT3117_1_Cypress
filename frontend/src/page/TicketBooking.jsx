import React, { useEffect, useState, useContext } from "react";
import Header from "../components/TicketBookingForm/Header";
import FormHeader from "../components/TicketBookingForm/FormHeader";
import TravellerDetail from "../components/TicketBookingForm/TravellerDetail";
import SeatReservation from "../components/TicketBookingForm/SeatReservation";
import ReviewTicket from "../components/TicketBookingForm/ReviewTicket/ReviewTicket.jsx";
import FareSummary from "../components/TicketBookingForm/FareSummary";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BACKENDURL } from "../Config/Config";
import { authContext } from "../context/authContext";
import uploadImageToCloudinary from "../utils/uploadImageToCloudinary"; 
import airplaneLoader from "../assets/images/airplaneLoader.gif";
import getSpecifiedFlight from "../clientRequest/GetSpecifiedFlightRequest";
import WattingProcess from "../components/Loading/WattingProcess.jsx";

const TicketBooking = () => {

  const isUserLoggedIn = localStorage.getItem("token") !== null;

  const history = useNavigate();

  let { id, classType } = useParams();
  const [currentActiveForm, setCurrentActiveForm] = useState(0);
  const [numberOfPassengers, setNumberOfPassengers] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState(
    {
      "Business": [],
      "Economy" : []
    }
  );
  const [formData, setFormData] = useState({});
  const [currentFlight, setCurrentFlight] = useState({});
  const [loading, setLoading] = useState(true);
  const [ticketPrice, setTicketPrice] = useState({
      classType : classType,
      price: 0
  });

  const [isWattingProcessVisible, setIsWattingProcessVisible] = useState(false);

  const classTypeExtraFee = JSON.parse(localStorage.getItem("ClassTypes"))[classType].extra_fee;
  
  const handleFlightBooking = async (e) => {
    e.preventDefault();

    setIsWattingProcessVisible(true);
    
    const token = localStorage.getItem("token");

    try {
      for (const passengerId in formData) {
        const passenger = formData[passengerId];
        if (passenger.passportSizePhoto) {
          
          const cloudinaryResponse = await uploadImageToCloudinary(
            passenger.passportSizePhoto
          );
          console.log(
            "Image uploaded successfully:",
            cloudinaryResponse.secure_url
          );
          
          formData[passengerId].passportSizePhoto =
            cloudinaryResponse.secure_url;
        }
      }

      const response = await fetch(
        BACKENDURL + "/api/bookings/checkout-session/" + id,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingUsersData: formData,
            selectedSeats: selectedSeats,
            price: ticketPrice.price,
            classType: ticketPrice.classType
          }),
        }
      );


      const data = await response.json();
      console.log("check payment response : " + JSON.stringify(data));
      setIsWattingProcessVisible(false);
      if(data.url != null){
        window.location.href = data.url;
      } 
      
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getSpecifiedFlight(id, history, setCurrentFlight,
       setLoading, setTicketPrice, classTypeExtraFee);

  }, []);

  useEffect(() => {
    if(!isWattingProcessVisible){
      document.body.style.overflow = "auto";
    } else{
      document.body.style.overflow = "hidden";
    }
  }, [isWattingProcessVisible])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentActiveForm])

  if (!isUserLoggedIn) {
    window.scrollTo(0, 0);
    toast.error("Please log in to book tickets");
    history("/");
    return null;
  }

  return (
    <>
    <WattingProcess isVisible = {isWattingProcessVisible}></WattingProcess>
    <div className="px-[30px] md:px-[30px]">

      <div>
        {loading ? (
          <div className="w-full min-h-[60vh] flex justify-center items-center">
            <div className="">
              <img src={airplaneLoader} alt="" className="" />
            </div>
          </div>
        ) : (
          <div className="max-w-[1800px] mx-auto py-5 flex flex-col lg:flex-row gap-5">
            <div className="w-full lg:w-[70%]">
              <Header currentFlight={currentFlight} />
              <FormHeader currentActiveForm={currentActiveForm} />
              <div>
                {currentActiveForm === 0 ? (
                  <SeatReservation
                    setCurrentActiveForm={setCurrentActiveForm}
                    numberOfPassengers={numberOfPassengers}
                    setNumberOfPassengers={setNumberOfPassengers}
                    selectedSeats={selectedSeats}
                    setSelectedSeats={setSelectedSeats}
                    avaiableSeats={currentFlight.seatDetails}
                    selectedClassType = {classType}
                  />
                ) : currentActiveForm === 1 ? (
                  <TravellerDetail
                    setCurrentActiveForm={setCurrentActiveForm}
                    numberOfPassengers={numberOfPassengers}
                    formData={formData}
                    setFormData={setFormData}
                  />
                ) : currentActiveForm === 2 ? (
                  <ReviewTicket
                    setCurrentActiveForm={setCurrentActiveForm}
                    selectedSeats={selectedSeats}
                    formData={formData}
                    price={ticketPrice.price}
                    numberOfPassengers={numberOfPassengers}
                    handleFlightBooking={handleFlightBooking}
                  />
                ) : null}
              </div>
            </div>
            <div className="w-full lg:w-[30%] h-fit">
              <FareSummary
                price={ticketPrice.price}
                numberOfPassengers={numberOfPassengers}
              />
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default TicketBooking;
