
import AirLineDisplayForm from "./AvaiableAirLineDisplay/AirlineDisplayForm";
import { useEffect } from "react";
import getClassTypesRequest from "../clientRequest/ClassTypesRequest";
const SuitableFlights = (props) => {

  const {searchedFlights, searchStatus} = props;


  useEffect(()=>{
    getClassTypesRequest();
  }, []);

    
    return(
      <div>
      <p className="py-5 w-[100%] flex justify-center">
      <p className="mx-auto">{searchStatus}</p>
    </p>
    
    {searchedFlights.length > 0 ? (
      <div className="flex justify-center items-center gap-5 flex-wrap w-full">
        {searchedFlights.map((flight, index) => {
          return <AirLineDisplayForm flightInfors = {flight}></AirLineDisplayForm>;
        }
        )}
      </div>
    ) : null}
      </div>
      
    )
}


export default SuitableFlights;