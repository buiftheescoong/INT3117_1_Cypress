import express from "express";

import { addAircraft , getAllAircrafts, deleteAircraft, updateAircraft } from "../controller/aircraftController.js";

const router = express.Router();
router.get("/getAllAircrafts", getAllAircrafts);
router.post("/addAircraft", addAircraft);
router.delete("/deleteAircraft/:id", deleteAircraft);
router.put("/updateAircraft/:id", updateAircraft);


export default router;
