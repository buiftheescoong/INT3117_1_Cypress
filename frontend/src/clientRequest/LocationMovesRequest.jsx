
import { BACKENDURL } from "../Config/Config.js";
import { toast } from "react-toastify";

async function getLocationsRequest(){
  fetch(BACKENDURL + "/api/locationsMove/getLocationsMove", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => {
        if (!response.ok) {
          console.log("get locations move is failed : " + response.status);
        }
        return response.json(); // Parse the response body as JSON
      })
      .then((data) => {

         console.log("check location move : " + JSON.stringify(data));
         localStorage.setItem("Locations", JSON.stringify(data));

      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle errors here
      });
}


export default getLocationsRequest;
