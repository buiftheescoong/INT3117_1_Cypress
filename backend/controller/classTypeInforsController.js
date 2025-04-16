import classType from "../models/flightsDetailsModel/classTypeSchema.js";

export const getClassTypeInfors = async (req, res) => {

  try {
    const classTypeInfors = await classType.find();
    res.status(200).json(classTypeInfors);
  } catch (error) {
    console.error("Error fetching class type infors:", error);
    res.status(500).json({ message: "Internal server error" });
  }

};