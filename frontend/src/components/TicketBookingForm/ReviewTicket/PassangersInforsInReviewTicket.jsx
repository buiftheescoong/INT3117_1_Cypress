
import React from "react";

const passangerInfors = (props) => {
    const{index, passenger} = props;
    return( <div key={index} className="mt-10 ">
        <p className="">Passenger {index + 1} Details</p>
        <div>
          {/* Traveller Details */}

          <div className="flex flex-col gap-5 md:flex-row md:gap-5 w-full py-3">
            <div className="w-full md:w-1/2">
              <label
                htmlFor={`country${index}`}
                className="block text-sm text-[#00008B]"
              >
                First Name
              </label>
              <input
                type="text"
                id={`firstName${index}`}
                className="border-[1px] border-gray-200 rounded-md px-3 outline-none py-2 w-full"
                value={passenger.firstName}
                disabled
              />
            </div>
            <div className="w-full md:w-1/2">
              <label
                htmlFor={`passportNumber_${index}`}
                className="block text-sm text-[#00008B]"
              >
                Lastname
              </label>
              <input
                type="text"
                id={`passportNumber_${index}`}
                placeholder="Lastname"
                className="border-[1px] border-gray-200 rounded-md px-3 outline-none py-2 w-full"
                value={passenger.lastName}
                disabled
              />
            </div>
          </div>
          {/* Date of Birth and Passport Number */}
          <div className="flex flex-col gap-5 md:flex-row md:gap-5 w-full py-3">
            <div className="w-full md:w-1/2">
              <label htmlFor={`dob_${index}`} className="block text-sm text-[#00008B]">
                Date of birth
              </label>
              <input
                type="date"
                id={`dob_${index}`}
                className="border-[1px] border-gray-200 rounded-md px-3 outline-none py-2 w-full"
                value={passenger.dob}
                disabled
              />
            </div>
            <div className="w-full md:w-1/2">
              <label
                htmlFor={`passportNumber_${index}`}
                className="block text-sm text-[#00008B]"
              >
                Passport Number
              </label>
              <input
                type="text"
                id={`passportNumber_${index}`}
                placeholder="Passport Number"
                className="border-[1px] border-gray-200 rounded-md px-3 outline-none py-2 w-full"
                value={passenger.passportNumber}
                disabled
              />
            </div>
          </div>
          {/* Traveller Details */}

          <div className="flex flex-col gap-5 md:flex-row md:gap-5 w-full py-3">
            <div className="w-full md:w-1/2">
              <label
                htmlFor={`firstName${index}`}
                className="block text-sm text-[#00008B]"
              >
                Country
              </label>
              <input
                type="text"
                id={`country${index}`}
                className="border-[1px] border-gray-200 rounded-md px-3 outline-none py-2 w-full"
                value={passenger.country}
                disabled
              />
            </div>
            <div className="w-full md:w-1/2">
              <label
                htmlFor={`passportNumber_${index}`}
                className="block text-sm text-[#00008B]"
              >
                State
              </label>
              <input
                type="text"
                id={`passportNumber_${index}`}
                placeholder="State"
                className="border-[1px] border-gray-200 rounded-md px-3 outline-none py-2 w-full"
                value={passenger.state}
                disabled
              />
            </div>
          </div>

          {/* Phone numbner and email */}
          <div className="flex flex-col gap-5 md:flex-row md:gap-5 w-full py-3">
            <div className="w-full md:w-1/2">
              <label htmlFor={`dob_${index}`} className="block text-sm text-[#00008B]">
                Phone number
              </label>
              <input
                type="text"
                id={`dob_${index}`}
                className="border-[1px] border-gray-200 rounded-md px-3 outline-none py-2 w-full"
                value={passenger.phoneNumber}
                disabled
              />
            </div>
            <div className="w-full md:w-1/2">
              <label
                htmlFor={`passportNumber_${index}`}
                className="block text-sm text-[#00008B]"
              >
                Email
              </label>
              <input
                type="text"
                id={`passportNumber_${index}`}
                placeholder="Email"
                className="border-[1px] border-gray-200 rounded-md px-3 outline-none py-2 w-full"
                value={passenger.email}
                disabled
              />
            </div>
          </div>

          {/* Image */}
          <div className="w-full md:w-1/2">
            <label
              htmlFor={`passportSizePhoto_${index}`}
              className="block text-sm text-[#00008B]"
            >
              Passport Size Photo
            </label>
            <img
              src={passenger.passportSizePhoto} // Assuming passportSizePhoto contains the image data URL
              alt={`Passport Size Photo of Passenger ${index + 1}`}
              className="border-[1px] border-gray-200 rounded-md px-3 outline-none py-2 w-full"
            />
          </div>
        </div>
      </div>)
}

export default passangerInfors;