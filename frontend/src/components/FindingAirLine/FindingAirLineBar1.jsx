import React from "react";
import PassengerAndClassChoice from "./PassangerAndClassChoice";
import ChooseLocationToMove1 from "./ChooseLocation/ChooseLocationToMove1";
import DepartureAndReturnDate1 from "./Date/DepartureAndReturnDate1.jsx";

class FindingAirLineBar1 extends React.Component {
  render() {
    const {
      formData,
      handleFormDataChange,
      isInSmallScreen,
      setFormData,
      isOneWayChosen,
    } = this.props;

    return (
      <div
        className={`flex flex-col space-y-5 w-full border-[1px] rounded-[10px] p-5 ${
          isInSmallScreen ? "flex-col" : "flex-col" // Duy trì bố cục dọc cho mọi kích thước
        }`}
      >
        {/* Choose Location */}
        <div className="w-full">
          <ChooseLocationToMove1
            formData={formData}
            handleFormDataChange={handleFormDataChange}
            isInSmallScreen={isInSmallScreen}
            setFormData={setFormData}
          />
        </div>

        {/* Departure and Return Date */}
        <div className="w-full">
          <DepartureAndReturnDate1
            formData={formData}
            handleFormDataChange={handleFormDataChange}
            isOneWayChosen={isOneWayChosen}
          />
        </div>

        {/* Passenger and Class Choice */}
        {/* <div className="w-full">
          <PassengerAndClassChoice
            handleFormDataChange={handleFormDataChange}
            isInSmallScreen={isInSmallScreen}
          />
        </div> */}
      </div>
    );
  }
}

export default FindingAirLineBar1;
