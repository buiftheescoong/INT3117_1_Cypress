
import { BACKENDURL } from "../Config/Config.js";

async function getBookedTicketsRequest(setBookedTickets){
  const  token = localStorage.getItem("token");
  fetch(BACKENDURL + "/api/bookings/getUserBookedTickets", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    })
      .then((response) => {
        if (!response.ok) {
          console.log("get booked tickets is failed : " + response.status);
        }
        return response.json(); // Parse the response body as JSON
      })
      .then((data) => {

        console.log("check booked tickets : " + JSON.stringify(data));

        data.map((bookedTicket, index) => {
            let ticketInfors = {
                flight : bookedTicket.flight, 
                departCity: bookedTicket.departCity, 
                arrivalCity: bookedTicket.arrivalCity, 
                departDate: bookedTicket.departDate, 
                arrivalDate: bookedTicket.arrivalDate, 
                seatNumber : bookedTicket.seatNumber,
                price: bookedTicket.price,
                classType: bookedTicket.classType,
                flightNumber: bookedTicket.flightNumber, 
                ticketId: bookedTicket.ticketId, 
                status: bookedTicket.status
            }
            setBookedTickets((prev) => [...prev, ticketInfors]);
        })

      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        
      });
}


export default getBookedTicketsRequest;
