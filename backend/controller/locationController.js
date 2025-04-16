import locationMove from "../models/flightsDetailsModel/locationMoveSchema.js";

export const getAllLocations = async (req, res) => {
  try {
    const allLocations = await locationMove.find();
    res.status(200).json(allLocations);
  } catch (error) {
    console.error("Error fetching locations:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};