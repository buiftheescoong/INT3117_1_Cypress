import flights from "../../models/flightsDetailsModel/flightSchema.js";
import locationMove from "../../models/flightsDetailsModel/locationMoveSchema.js";

const filterFlights = (matchedflights, quantitesPassangers, flightType) => {

    // filter flights has satitisfied class type
    if(matchedflights.length == 0) return matchedflights;

    let matchedflightsHasSpecifiedClassType = matchedflights.filter((flight) => {
       return flight.seatDetails.find( (eachSeatDetail) => 
        eachSeatDetail.classType == flightType) != null
        
    })



    // filter flights has enough avaiable seats
    let matchedflightHasEnoughSeat = matchedflightsHasSpecifiedClassType.filter(
      (flight) => {
          let specifiedClassTypeSeat = flight.seatDetails.find(seatDetailsObject => seatDetailsObject.classType == flightType);
          let emptySeats = specifiedClassTypeSeat.seats.filter(seat => seat.status == "available").length;
          console.log("check empty seat : " + emptySeats);
          return emptySeats >= quantitesPassangers;
      } 
    )



    return matchedflightHasEnoughSeat;
}

export const getFlights = async (req, res) => {

  const { from, to, departureDate, returnDate, quantitesPassangers, flightType} = req.body;

  if (!from || !to) {
    return res
    .status(400)
    .json({ status: false, message: "Enter flight details to search flights" });
  }

  if(!departureDate){
    return res
    .status(400)
    .json({ status: false, message: "Enter departure date to search flights" });
  }

  if(quantitesPassangers == 0){
    return res
    .status(400)
    .json({ status: false, message: "Enter quantities passangers to search flights" });
  }

  try {


    const fromLocation = await locationMove.findOne({ nameLocation: from });

    const toLocation = await locationMove.findOne({ nameLocation: to });


    if (!fromLocation || !toLocation) {
      return res
        .status(404)
        .json({ status: false, message: "No locations found" });
    }
    
    let matchedFlights = await flights.find({
      from: fromLocation._id,
      to: toLocation._id,
      "departDate.date" : departureDate,
    });

    matchedFlights = filterFlights(matchedFlights, quantitesPassangers, flightType);

    if (matchedFlights.length === 0) {
      console.log("no flights matched");
      return res
        .status(404)
        .json({ status: false, message: "No flights found" });
    }
    const flightsWithComprehensiveInfo = await Promise.all(
      matchedFlights.map(async (flight) => {
        const populatedFlight = await flights.populate(flight, [
          { path: "airline"},
          {path : "from"},
          {path : "to"}
        ]);
        return {
          ...populatedFlight.toObject(), 
          
        };
      })
    );
    console.log("check flights infors : " + JSON.stringify(flightsWithComprehensiveInfo));
    res.status(200).json(flightsWithComprehensiveInfo);
  } catch (error) {
    console.error("Error fetching flights:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

