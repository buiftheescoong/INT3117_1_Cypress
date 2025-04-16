
import { BACKENDURL } from "../Config/Config.js";
import { toast } from "react-toastify";

async function getClassTypesRequest(){
  fetch(BACKENDURL + "/api/classType/getClassTypeInfors", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => {
        if (!response.ok) {
          console.log("get class type is failed : " + response.status);
        }
        return response.json(); // Parse the response body as JSON
      })
      .then((data) => {

        let classTypesStorage = new Object();

        data.map(classType => {
          console.log("check class type handle : " + classType.type);
          classTypesStorage[classType.type] = classType;
        })

        console.log("class types formated:" +  JSON.stringify(classTypesStorage));

        localStorage.setItem("ClassTypes", JSON.stringify(classTypesStorage));
        // Handle the data here
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle errors here
      });
}


export default getClassTypesRequest;
