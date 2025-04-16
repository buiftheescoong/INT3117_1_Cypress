
import SuggestLocationForm from "./SuggestLocationForm";
import SuggestLocation from "./ChooseLocationSuggest";
import { useEffect } from "react";


const SmallScreenSuggestLocation = (props) => {

    const {title, name, placeHolder, formData, handleFormDataChange, suggestions, setFormData} = props.inputData;
    
    return (

        <>
       <div
            className={`fixed md:static w-[100%] h-[800px] bg-black bg-opacity-50 inset-0 z-49  
            ${ props.isFocused ? "" : "hidden"} `}
      ></div>

        <div className={`fixed w-[100%] h-[80%]  left-[0px] bottom-[0px] bg-white z-50 rounded-[10px]
            ${ props.isFocused ? "" : "hidden"} `}>
            <div className="flex flex-row h-[10%] justify-between items-center px-3">
                <h1 className="text-2xl font-bold mx-auto">{title}</h1>
                
                <i
                     className="fa-solid fa-x cursor-pointer hover:text-red-500"
                     onClick={() => props.setIsFocused(false)}
                ></i>
            </div>
        
       
        <input
          name={name}
          type="text"
          placeholder={placeHolder}
          autocomplete="off"
          value={formData[name]}
          className="border-[2px] rounded-[10px] text-[20px] w-[96%] h-[10%] mx-auto block"
          onChange={(e) => {
            handleFormDataChange(e);
            props.handleSuggestLocation(e, suggestions);
        }}
        />

        

        <div className={`z-50 px-4 py-1 w-[100%] h-[80%] bg-white overflow-y-scroll`} >
            {props.satisfiedLocation.map((location, index) => (
                <SuggestLocationForm departLocation = {location} code={"code"} airportName = "airportName" key={index}
                setFormData={setFormData} name={name}  setIsFocused={props.setIsFocused}  ></SuggestLocationForm>
            ))}
        </div>

        </div>
    
        </>
        
    );

    
    
}

export default SmallScreenSuggestLocation;

