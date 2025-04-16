
import { BACKENDURL } from "../Config/Config.js";
import { toast } from "react-toastify";

async function  flightsSearchRequest(formData, setSearchStatus, setSearchedFlights, 
  setIsWattingProcessVisible
) {


    try {
      const response = await fetch(BACKENDURL + "/api/flights/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("check data get : " + JSON.stringify(formData));

      const data = await response.json();

      setIsWattingProcessVisible(false);

      if(response.status == 400){
        setSearchStatus(<p className="text-red-500">{data.message}</p>);
        return;
      }

      if (data.status === false) {
        toast.error(data.message);
        setSearchedFlights([]);
        setSearchStatus("No flights found for the provided informations");
      } else {
        setSearchedFlights(data);
        setSearchStatus(
          <>
            <b>{data.length}</b> flights found from <b>{formData.from}</b> to{" "}
            <b>{formData.to}</b>
          </>
        );
      }
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  export default flightsSearchRequest;
