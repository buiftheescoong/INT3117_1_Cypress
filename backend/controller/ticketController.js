import bookings from "../models/bookingSchema.js"
import flightSchema from "../models/flightsDetailsModel/flightSchema.js";
import tickets from "../models/ticketSchema.js"
import userSchema from "../models/userSchema.js";


async function updateSeats(flight, currentSeatNumber, classType){

  console.log("check seat details :" + JSON.stringify(flight.seatDetails));
  let selectedClassType =  flight.seatDetails
  .find(assessedClassType => assessedClassType.classType == classType);

  console.log("check current seat number need fixed : " + currentSeatNumber);

  console.log("check current class type need fixed : " + classType);
  console.log("check selected class type seats in delete : " + JSON.stringify(selectedClassType));

  let currentSelectedSeat = selectedClassType.seats.find(seat => seat.seatNumber == currentSeatNumber);
  if(currentSelectedSeat != null){
    currentSelectedSeat.status =  "available";
  }

   console.log("new seat details : " + JSON.stringify(flight.seatDetails));
    
    await flight.save();
}

  export async function deleteTicket(req, res) {
    const { ticketId } = req.params;
    const userId = req.userId;
  
    try {
      const user = await userSchema.updateOne(
        { _id: userId },
        { $pull: { bookings:  ticketId} } 
      );

      console.log("check user need delete ticket : " + JSON.stringify(user));
      const ticket = await tickets.findById(ticketId);
  
      if (!ticket) {
        return res.status(404).json({ message: "Ticket not found." });
      }
      console.log("check ticket deleted : " + JSON.stringify(ticket));

      const bookingTicket = await bookings.findOne(ticket.bookingId);

      const flight = await flightSchema.findOne(bookingTicket.flight);

      console.log("check flight need update avaiable seats : " + JSON.stringify(flight));

      console.log("check booking infors delete: " + JSON.stringify(bookingTicket));

      updateSeats(flight, bookingTicket.seatNumber, bookingTicket.classType);



      if (ticket.bookingId) {        
        await bookings.findByIdAndDelete(ticket.bookingId);
      }
      await tickets.findByIdAndDelete(ticketId);
      return res.status(200).json({ message: "Ticket and booking deleted successfully." });
    } catch (error) {
      console.error("Error cancelling ticket:", error);
      return res.status(500).json({ message: "Failed to cancel ticket." });
    }
  };