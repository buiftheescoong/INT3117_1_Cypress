import React, { useState, useImperativeHandle, forwardRef, useRef, useEffect } from "react";
import PassangerTypeChoice from "./PassangerAndClassDropDownMenuComponent/PassangerTypeChoice";
import ClassTypeChoice from "./PassangerAndClassDropDownMenuComponent/ClassTypeChoice";

const PassangerAndClassChoiceDropMenu = forwardRef((props, ref) => {
  
  const dropDownRef = useRef();
  const bgDropDownRef = useRef();

  const [passangerAnClassInfors, setPassangerAnClassInfors] = useState({
      Adults : 0,
      Child : 0,
      Class_type : "Economy"
  })

  useEffect(() => {
    let quantitiesPassangers = passangerAnClassInfors.Adults + passangerAnClassInfors.Child;
    props.setFormData((prev) =>( {
      ...prev,
      quantitesPassangers: quantitiesPassangers,
      flightType: passangerAnClassInfors.Class_type
    }))

  }, [passangerAnClassInfors]) 

  const handlePassangerAndClassInforsChange = (name , value) => {
    setPassangerAnClassInfors((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const disableScrollbarOfWindow = () => {

    if(props.isInSmallScreen && props.isDropdownVisible){
          
      if(!document.body.classList.contains("overflow-hidden")){
        document.body.classList.add("overflow-hidden")
      }

    }else{

      if(document.body.classList.contains("overflow-hidden")){
        document.body.classList.remove("overflow-hidden")
      }
    }
  }

  useEffect(() => {
    if (props.isDropdownVisible) {
      dropDownRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

    } 

    disableScrollbarOfWindow();
   
  }, [props.isDropdownVisible]);

  useEffect(()=>{
    disableScrollbarOfWindow();
  }, [props.isInSmallScreen])


  return (
    <>
      <div
        ref={bgDropDownRef}
        
       
        className= {`fixed md:static w-[100%] h-[100%] bg-black bg-opacity-50 inset-0 z-51
          ${ props.isDropdownVisible &&  props.isInSmallScreen? "" : "hidden "} `}
      ></div>

      <div ref={dropDownRef}

        className={`fixed md:absolute right-0 top-20 bg-gray-100 w-[100%] md:w-[270px] px-5 border-1 rounded-[10px] py-5 z-51
          ${props.isDropdownVisible? "" : "hidden"} `}
      >
        <div className="w-[100%] flex flex-row items-center justify-between">
          <h1 className="font-bold text-[#00008B]">Passenger</h1>
          <i
            className="fa-solid fa-x cursor-pointer hover:text-red-500"
            onClick={() => props.setIsDropdownVisible(false)}
          ></i>
        </div>
        <br />
        <hr className="border-1 border-black" />
        <br />
        <div>
          <PassangerTypeChoice passengerType="Adults" age="12+ years" isDropdownVisible = {props.isDropdownVisible} 
          handlePassangerAndClassInforsChange = {handlePassangerAndClassInforsChange}/>
          <PassangerTypeChoice passengerType="Child" age="2-11 years" isDropdownVisible = {props.isDropdownVisible}
          handlePassangerAndClassInforsChange = {handlePassangerAndClassInforsChange}/>
        </div>
        <br />
        <h1 className="font-bold text-[#00008B]">Class</h1>
        <br />
        <hr className="border-1 border-black" />
        <br />
        <div>
          <ClassTypeChoice label_name="Economy" handlePassangerAndClassInforsChange = {handlePassangerAndClassInforsChange}/>
          <ClassTypeChoice label_name="Business" handlePassangerAndClassInforsChange = {handlePassangerAndClassInforsChange}/>
          <br />
          <button 
          onClick={ ()=>{
            let passangerInfors = passangerAnClassInfors.Adults + " Adults, " + passangerAnClassInfors.Child + " Child - " + passangerAnClassInfors.Class_type;
            props.setPassangersInfors(passangerInfors);
            props.setIsDropdownVisible(false);

          }}
          className="border-1 rounded-[10px] w-[100%] bg-[#00008B] py-1 text-white hover:bg-blue-400">
            Confirm
          </button>
        </div>
      </div>
    </>
  );
});

export default PassangerAndClassChoiceDropMenu;