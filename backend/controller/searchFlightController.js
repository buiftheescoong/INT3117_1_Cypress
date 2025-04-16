import flights from "../models/flightsDetailsModel/flightSchema.js";
import airlines from "../models/flightsDetailsModel/airlineSchema.js";
import locationMove from "../models/flightsDetailsModel/locationMoveSchema.js";
import mongoose from "mongoose";

export const updateFlight = async (req, res) => {
  const { id } = req.params; 
  const { departDate, arriveDate, status } = req.body; 

  try {
    const flight = await flights.findById(id);
    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    flight.departDate = departDate || flight.departDate;
    flight.arriveDate = arriveDate || flight.arriveDate;
    flight.status = status || flight.status;

    await flight.save();

    res.status(200).json({ message: "Flight updated successfully", flight });
  } catch (error) {
    console.error("Error when updating flight:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const addFlight = async (req, res) => {
  const {
    flightNumber,
    from,
    to,
    departDate,
    arriveDate,
    price,
    status,
    airline,
  } = req.body;

  try {
    // const airline = await airlines.findOne({ airlineCode: airlineCode });
    // if (!airline) {
    //   return res.status(404).json({ message: "Airline not found" });
    // }
    // const from = await locationMove.findOne({})

    const selectedAircraft = await airlines.findById(airline);

      if (!selectedAircraft) {
        return res.status(404).json({ message: "Aircraft not found" });
      }

      // Tạo seatDetails từ aircraft
      const seatDetails = selectedAircraft.seatClasses.map((seatClass) => {
        return {
          classType: seatClass.classType,
          seats: seatClass.seats.map((seatNumber) => ({
            seatNumber,
            status: "available", 
          }))
        };
      });
    const newFlight = new flights({
      flightNumber,
      from,
      to,
      departDate,
      arriveDate,
      price,
      seatDetails,
      status,
      airline,
    });

    await newFlight.save();

    res.status(200).json("Add flight successfully");
  } catch (error) {
    console.error("Error when adding new flight:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




export const getAllFlights = async (req, res) => {
  try {
    const allFlights = await flights.find().populate('from', "nameLocation airportCode")
    .populate('to', "nameLocation airportCode").populate('airline', "airlineCode airlineLogo");
    res.status(200).json(allFlights);
  } catch (error) {
    console.error("Error fetching flights:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
