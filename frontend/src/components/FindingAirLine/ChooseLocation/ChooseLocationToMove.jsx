import React, { useEffect, useState } from "react";
import SuggestLocation from "../ChooseLocation/ChooseLocationSuggest";
import LocationInput from "../ChooseLocation/LocationInput";
import getLocationsRequest from "../../../clientRequest/LocationMovesRequest";

const ChooseLocationToMove = (props) => {

    let [suggestLocations, setSuggestLocations] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                await getLocationsRequest();
                let locations = JSON.parse(localStorage.getItem("Locations"));
                if (locations != null) {
                    
                    locations.map(location => {
                        location.nameLocation;

                        suggestLocations.push(location.nameLocation);

                        console.log("check locations tau added : " + location.nameLocation);

                        console.log("Check locations get from server: ", JSON.stringify(suggestLocations));
                    });
                   
                    
                }
            } catch (error) {
                console.error("Error fetching locations: ", error);
            }
        };
    
        fetchLocations(); 
    }, []);

    const {formData, handleFormDataChange, isInSmallScreen, setFormData} = props;

    const swapData = () =>{
        console.log("swap data")
        let from = formData["from"];
        let to = formData["to"];
        setFormData((prevFormData) => ({
            ...prevFormData,
            ["from"]: to,
            ["to"]: from,
        }));
    }
        return( 

        <div className="flex gap-5 flex-col md:flex-row md:w-[40%] border-gray-300 border-b-[2px] md:border-r-[2px] md:border-b-[0px] md:items-center">

            <LocationInput title = "From" name = "from" placeHolder = "From" formData = {formData}
            handleFormDataChange = {handleFormDataChange} suggestions = {suggestLocations} isInSmallScreen={isInSmallScreen}
            setFormData = {setFormData}></LocationInput>
            
            

            <div class="flex flex-rowh-[20px] pl-5 md:pl-0 cursor-pointer"
            onClick = {swapData}>
            <i class="fa-solid fa-arrow-left"></i>
            <i class="fa-solid fa-arrow-right"></i>
            </div>

            <LocationInput title = "To" name = "to" placeHolder = "To" formData = {formData}
            handleFormDataChange = {handleFormDataChange} suggestions = {suggestLocations}
            setFormData = {setFormData}
            isInSmallScreen={isInSmallScreen}></LocationInput>

        </div>

           
            
        
            )
    
}

export default ChooseLocationToMove;