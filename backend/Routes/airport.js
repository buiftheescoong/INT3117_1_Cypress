import express from "express";

import { addAirport , getAllAirports, deleteAirport, updateAirport } from "../controller/airportController.js";

const router = express.Router();
router.get("/getAllAirports", getAllAirports);
router.post("/addAirport", addAirport);
router.delete("/deleteAirport/:id", deleteAirport); 
router.put("/updateAirport/:id", updateAirport); 

export default router;
