import AirLineClass from "./AirLineClass/AirLineClass";
import AirLineInfors from "./AirLineInfors/AirlineInfors"
import ClassServiceInfors from "../ClassServiceInfors/ClassServiceInfors.jsx";
import FlightDetailsDropDownMenu from "./FlightDetailsDropDownMenu";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";


const AirLineDisplayForm = (props) => {


    const flightInforsObject = {
        from : props.flightInfors.from,
        to : props.flightInfors.to,
        departDate : props.flightInfors.departDate,
        arriveDate : props.flightInfors.arriveDate
    }

    const aircraftInfors = {
        airline : props.flightInfors.airline
    }


    const [pricesEachClass, setPricesEachClass] = useState({});

    const navigate = useNavigate();

    useEffect(() => {

        let _pricesEachClass = new Object();

        props.flightInfors.seatDetails.map(
            (classTypeInfors) => {
                let classTypeName = classTypeInfors.classType;
    
                let classTypeExtraFee = JSON.parse(localStorage.getItem("ClassTypes"))[classTypeName].extra_fee;

                let price = props.flightInfors.price* (1 + classTypeExtraFee);

                _pricesEachClass[classTypeName] = price;
                
            }
        )


         setPricesEachClass(_pricesEachClass);


    }, [])


    const [flightsInforsExpanded, setFlightsInforsExpanded] = useState(false);

    const[classServiceInfors, setClassSerivceInfors] = useState(
        {
            isExpanded : false,
            classType: ""
        }
    )
    

    useEffect(()=>{
       if(classServiceInfors.isExpanded && flightsInforsExpanded){

         changeClassTypeInfors("isExpanded", false);

       }
    }, [flightsInforsExpanded]);

    useEffect(()=>{
        if(classServiceInfors.isExpanded && flightsInforsExpanded){
          setFlightsInforsExpanded(false);
        }
     }, [classServiceInfors.isExpanded]);
     
     
 

     const changeClassTypeInfors = (name, value)=>{
        setClassSerivceInfors((prevFormData) => ({
            ...prevFormData,
            [name] : value
          }));
     }
    

     const handleBookingRedirect = () => {
        console.log("check airline id selected : " + props.flightInfors._id);
        if (props.flightInfors._id) {
          navigate(`/book/${props.flightInfors._id}/${classServiceInfors.classType}`); // Điều hướng với ID chuyến bay
        } else {
          alert("flight is not exists !");
        }
    };  

    return (
        <div className="flex flex-col gap-0 w-[80%]">
        
        
        <div className={`${flightsInforsExpanded | classServiceInfors.isExpanded? 'rounded-tl-[10px] rounded-tr-[10px]' : 'rounded-[10px]'}  flex flex-row justify-between h-[150px] bg-gray-200 px-5 py-5 
        transition-all duration-300 ease-in-out md:items-center w-[100%]`}>
            <AirLineInfors isExpanded = {flightsInforsExpanded} setExpanded={setFlightsInforsExpanded}
            flightInfors = {flightInforsObject} ></AirLineInfors>
            <AirLineClass isExpanded = {classServiceInfors.isExpanded} changeClassTypeInfors={changeClassTypeInfors}
            pricesEachClass = {pricesEachClass} ></AirLineClass>
        </div>
        
        <FlightDetailsDropDownMenu expanded = {flightsInforsExpanded}
        aircraftInfors = {aircraftInfors} flightInfors = {flightInforsObject}
        ></FlightDetailsDropDownMenu>
        <ClassServiceInfors expanded = {classServiceInfors.isExpanded} classType = {classServiceInfors.classType}
         handleBookingRedirect = {handleBookingRedirect}
        ></ClassServiceInfors>
        </div>
        
    )
}

export default AirLineDisplayForm;