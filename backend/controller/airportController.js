import locationMove from  "../models/flightsDetailsModel/locationMoveSchema.js"

export async function addAirport(req, res) {
    const { nameLocation, airport, airportCode} = req.body;
    try {
        const existingAirport = await locationMove.findOne({ airportCode });
        if (existingAirport) {
            return res.status(400).json({ message: "Airport already exists" });
        }

        const newAirport = new locationMove({
            nameLocation,
            airport,
            airportCode,
        });
        await newAirport.save();
        res.status(200).json("Airport added successfully");
    } catch (error) {
        console.error("Error when adding new airport", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function deleteAirport(req, res) {
    const { id } = req.params; 
    try {
        const deletedAirport = await locationMove.findByIdAndDelete(id);
        if (!deletedAirport) {
            return res.status(404).json({ message: "Airport not found" });
        }
        res.status(200).json({ message: "Airport deleted successfully" });
    } catch (error) {
        console.error("Error when deleting airport", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function updateAirport(req, res) {
    const { id } = req.params; 
    const { nameLocation, airport, airportCode } = req.body; 

    try {
        const updatedAirport = await locationMove.findByIdAndUpdate(
            id,
            { nameLocation, airport, airportCode },
            { new: true }
        );
        if (!updatedAirport) {
            return res.status(404).json({ message: "Airport not found" });
        }
        res.status(200).json({ message: "Airport updated successfully" });

    } catch (error) {
        console.error("Error when updating airport", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const getAllAirports = (req, res) => {
    locationMove.find({})
        .then((allAirports) => {
            res.status(200).json(allAirports);
        })
        .catch((e) => {
            console.error("Error when getting all airports:", error);
            res.status(500).json({ message: "Internal server error" });
        });
};