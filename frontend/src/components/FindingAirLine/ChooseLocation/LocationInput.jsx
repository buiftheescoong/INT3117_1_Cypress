import SuggestLocation from "./ChooseLocationSuggest";
import { useState, useEffect, useRef } from "react";
import SmallScreenSuggestLocation from "./SmallScreenSuggestLocation";

const LocationInput = (props) => {

    const {title, name, placeHolder, formData, handleFormDataChange, suggestions, isInSmallScreen, setFormData} = props;

    const [isFocused, setIsFocused] = useState(false);

    const [satisfiedLocation, setSatisfiedLocation] = useState(suggestions);

    const inputData = {
        title : title,
        name : name, 
        placeHolder : placeHolder, 
        formData : formData, 
        handleFormDataChange : handleFormDataChange,
        setFormData : setFormData,
        suggestions : suggestions
    }


    const handleSuggestLocation = (e, suggestionLocations) => {

        const locationName = e.target.value.toLowerCase();

        setSatisfiedLocation(suggestionLocations.filter(location => location.toLowerCase().includes(locationName) ));

    }

    const containerRef = useRef("");

    const handleFocus = () => {
        setIsFocused(true); 
        
    }

    useEffect(() => {
      const handleClickOutside = (event) => {
        
        if (containerRef.current && !containerRef.current.contains(event.target)) {
           setIsFocused(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
 
    


      useEffect(()=>{
        if(isInSmallScreen){
              
            if(!document.body.classList.contains("overflow-hidden")){
              document.body.classList.add("overflow-hidden")
            }
      
          }else{
      
            if(document.body.classList.contains("overflow-hidden")){
              document.body.classList.remove("overflow-hidden")
            }
          }
      }, [props.isInSmallScreen])


    

    return ( <div className="flex flex-col p-5  w-[40%] relative" ref = {containerRef}>
        <h1 className= "text-[#00008B] text-[20px]">{title}</h1>
        <input
          name={name}
          type="text"
          autocomplete="off"
          placeholder={placeHolder}
          value={formData[name]}
          className="outline-none text-[20px] md:text-[20px]"
          onFocus={handleFocus}
          onChange={(e) => {
            handleFormDataChange(e);
            handleSuggestLocation(e, suggestions);
        }}
        />

        {isInSmallScreen ? 

        <SmallScreenSuggestLocation inputData = {inputData} satisfiedLocation = {satisfiedLocation} 
        handleSuggestLocation={handleSuggestLocation} 
        isFocused={isFocused} setIsFocused={setIsFocused}></SmallScreenSuggestLocation> : 

        <SuggestLocation satisfiedLocation = {satisfiedLocation} 
        isFocused={isFocused} inputData = {inputData} setIsFocused={setIsFocused}></SuggestLocation>}

      </div>)

}

export default LocationInput;