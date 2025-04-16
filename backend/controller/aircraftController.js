import airlines from "../models/flightsDetailsModel/airlineSchema.js"

export const updateAircraft = async (req, res) => {
  const { id } = req.params;
  const { airlineManifacturing, airlineCode, airlineLogo, seatClasses } = req.body;

  try {
    const updatedAircraft = await airlines.findByIdAndUpdate(
      id,
      { airlineManifacturing, airlineCode, airlineLogo, seatClasses },
      { new: true }
    );

    if (!updatedAircraft) {
      return res.status(404).json({ message: "Aircraft not found" });
    }
    res.status(200).json({ message: "Aircraft updated successfully" });
  } catch (error) {
    console.error("Error updating aircraft:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export async function addAircraft(req, res) {
    const { airlineManifacturing, airlineCode, airlineLogo, seatClasses } = req.body;
    try {
        const existingAirline = await airlines.findOne({ airlineCode });
        if (existingAirline) {
            return res.status(400).json({ message: "Aircraft already exists" });
        }

        const newAirline = new airlines({
            airlineManifacturing,
            airlineCode,
            airlineLogo,
            seatClasses,
        });
        await newAirline.save();
        res.status(200).json("Aircraft added successfully");
    } catch (error) {
        console.error("Error when adding new aircraft", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function deleteAircraft(req, res) {
    const { id } = req.params; 

    try {
        const deletedAircraft = await airlines.findByIdAndDelete(id);

        if (!deletedAircraft) {
            return res.status(404).json({ message: "Aircraft not found" });
        }

        res.status(200).json({ message: "Aircraft deleted successfully" });
    } catch (error) {
        console.error("Error when deleting aircraft", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllAircrafts = (req, res) => {
    airlines.find({})
        .then((allAirlines) => {
            res.status(200).json(allAirlines);
        })
        .catch((e) => {
            console.error("Error when getting all aircrafts:", error);
            res.status(500).json({ message: "Internal server error" });
        });
};
