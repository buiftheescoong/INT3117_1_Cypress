
import flights from "../../models/flightsDetailsModel/flightSchema.js";

export const getSingleFlight = async (req, res) => {
  const { id } = req.params;

  try {
    const flight = await flights.findById(id).populate('from')
    .populate('to').populate("airline");

    if (!flight) {
      return res
        .status(404)
        .json({ status: false, message: "Flight not found" });
    }

    const flightWithAirlineInfo = {
      ...flight.toObject(),
      airlineLogo: flight.airline.airlineLogo,
    };

    res.status(200).json(flightWithAirlineInfo);
  } catch (error) {
    console.error("Error when getting flight:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
