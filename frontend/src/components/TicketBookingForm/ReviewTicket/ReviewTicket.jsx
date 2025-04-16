import React, { useEffect, useState } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PassangerInfors from "./PassangersInforsInReviewTicket.jsx";

const ReviewTicket = ({
  formData,
  setCurrentActiveForm,
  selectedSeats,
  handleFlightBooking,
}) => {
  const [clientSecretSettings, setClientSecretSettings] = useState({
    clientSecret: "",
    loading: true,
  });

  // Check if formData is empty
  if (Object.keys(formData).length === 0) {
    return <p>No passenger data available.</p>;
  }

  const [terms, setTerms] = React.useState(false);
  const [aggreed, setAgreed] = React.useState(false);

  const toggleTerms = () => {
    setTerms(!terms);
  };

  const toggleAgreed = () => {
    setAgreed(!aggreed);
  };

  return (
    <>
      <div className="my-5 bg-white border-[1px] border-gray-200 rounded-[30px] p-5">
        <p className="mb-5 text-4xl text-[#00008B]">Review Ticket</p>
        {Object.keys(formData).map((passengerId, index) => {
          const passenger = formData[passengerId];
          return (
           <PassangerInfors index = {index} passenger = {passenger}></PassangerInfors>
          );
        })}
      </div>
      
      <div className="bg-white border-[1px] border-gray-200 rounded-[30px] p-5 mt-5">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="terms"
            className="mr-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400 focus:border-blue-400"
            onClick={toggleTerms}
          />
          <label htmlFor="terms" className="text-gray-700">
            I agree with the terms and conditions
          </label>
        </div>
        <div className="flex items-center mt-3">
          <input
            type="checkbox"
            id="agreement"
            className="mr-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400 focus:border-blue-400"
            onClick={toggleAgreed}
          />
          <label htmlFor="agreement" className="text-gray-700">
            I assure you that all the information I have provided is accurate
            and current. Additionally, I am fully aware that any inaccuracies or
            falsifications in the data provided for airplane ticket bookings may
            result in legal consequences, including potential legal actions and
            possible incarceration.
          </label>
        </div>
      </div>

      <div className="flex justify-start items-center gap-2 mt-10">
        <button
          className="border border-[#00008B] text-[#00008B] px-10 py-2 rounded-full hover:bg-[#00008B] duration-300 hover:text-white"
          onClick={() => setCurrentActiveForm(1)}
        >
          Previous
        </button>
        <button
          className={`bg-[#00008B] text-white px-10 py-2 rounded-full hover:bg-black duration-300 ${
            !aggreed || !terms ? "cursor-not-allowed" : ""
          }`}
          onClick={handleFlightBooking}
          disabled={!aggreed || !terms}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ReviewTicket;
