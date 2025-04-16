import React from "react";
import ChooseDateBox from "./ChooseDateBox";
class DepartureAndReturnDate extends React.Component{
    render(){

        const {formData, handleFormDataChange, isOneWayChosen} = this.props;
        return (
            
            <div className="md:w-[30%] border-b-[2px] md:border-b-[0px] md:border-r-[2px] text-[20px] text-[#00008B] border-gray-300 px-5 py-5">

            <ChooseDateBox title="Departure Date" name="departureDate" value={formData.departureDate} handleFormDataChange={handleFormDataChange}/>

            { !isOneWayChosen && <ChooseDateBox title="Return Date" name="returnDate" value={formData.returnDate} handleFormDataChange={handleFormDataChange}/>}
                
            </div>
           

        );
    }
}

export default DepartureAndReturnDate;