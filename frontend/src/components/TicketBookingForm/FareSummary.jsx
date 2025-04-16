import React from "react";

const FareSummary = ({ price, numberOfPassengers }) => {
  return (
    <div className="w-full rounded-[30px] border bg-[#e1e7ee] border-gray-300 overflow-hidden">
      <p className="text-4xl p-5 text-[#00008B] bg-[#e1e7ee] font-semiBold">Fare Summary</p>
      <div className="w-full border-b-[1px] border-gray-300"></div>
      <div className="p-5">
        <div className="flex flex-col gap-3">
          
          <div className="flex justify-between">
            <p className="text-[16px] font-semiBold text-[#00008B] ">
              Ticket {numberOfPassengers}x
            </p>
            <p className="text-[16px] font-semiBold text-[#00008B]">
              {numberOfPassengers * price}
            </p>
          </div>
          {/* Discount */}
          <div className="flex justify-between">
            <p className="text-[16px] text-[#00008B] font-semiBold">Discount</p>
            <p className="text-[16px] text-[#00008B]">-</p>
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-300">
        <div className="p-5">
          <div className="flex justify-between">
            <p className="text-[18px] font-semiBold text-[#00008B]">Total</p>
            <p className="text-[18px] font-semiBold text-[#00008B]">
              Rs. {price * numberOfPassengers}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FareSummary;
