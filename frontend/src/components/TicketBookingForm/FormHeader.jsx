import React from "react";
import { IoIosArrowForward } from "react-icons/io";

const FormHeader = ({ currentActiveForm }) => {
  return (
    <div className="my-5 bg-white border-[1px] border-gray-200 rounded-[30px] p-5">
      <div>
        <ul className="flex justify-between items-center overflow-x-scroll sm:overflow-hidden">
          <li
            className={`min-w-[100px] text-xl ${
              currentActiveForm === 0 ? "text-[#00008B] font-semibold" : ""
            }`}
          >
            Seat Booking
          </li>
          <li
            className={`min-w-[50px] flex justify-center items-center ${
              currentActiveForm === 0 ? "text-blue-500" : ""
            }`}
          >
            <IoIosArrowForward />
          </li>
          <li
            className={`min-w-[100px] text-xl ${
              currentActiveForm === 1 ? "text-[#00008B]" : ""
            }`}
          >
            Traveller Details
          </li>
          <li
            className={`min-w-[50px] flex justify-center items-center ${
              currentActiveForm === 1 ? "text-[#00008B]" : ""
            }`}
          >
            <IoIosArrowForward />
          </li>
          <li
            className={`min-w-[100px] text-xl text-center ${
              currentActiveForm === 2 ? "text-[#00008B]" : ""
            }`}
          >
            Review
          </li>
          <li
            className={`min-w-[50px] flex justify-center items-center ${
              currentActiveForm === 2 ? "text-[#00008B]" : ""
            }`}
          >
            <IoIosArrowForward />
          </li>
          <li
            className={`min-w-[100px] text-xl ${
              currentActiveForm === 3 ? "text-[#00008B]" : ""
            }`}
          >
            Payment
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FormHeader;
