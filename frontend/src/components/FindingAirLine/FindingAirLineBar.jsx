import React from "react";
import PassengerAndClassChoice from "./PassangerAndClassChoice";
import ChooseLocationToMove from "./ChooseLocation/ChooseLocationToMove";

import DepartureAndReturnDate from "./Date/DepartureAndReturnDate";

class FindingAirLineBar extends React.Component{


    render() {
        const { formData, handleFormDataChange, isInSmallScreen, setFormData, isOneWayChosen } = this.props;
      

        return ( 

          <div className="flex flex-col md:flex-row w-[100%] border-[1px] rounded-[10px] md:h-[150px]">

          <ChooseLocationToMove formData = {formData} handleFormDataChange = {handleFormDataChange} isInSmallScreen={isInSmallScreen}
          setFormData= {setFormData}/>
            
          <DepartureAndReturnDate formData = {formData} handleFormDataChange = {handleFormDataChange} isOneWayChosen={isOneWayChosen}/>
           
           <PassengerAndClassChoice setFormData= {setFormData} isInSmallScreen={isInSmallScreen}
           />

          </div>
        
        )

    }
}

export default FindingAirLineBar;