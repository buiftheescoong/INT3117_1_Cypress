import express from "express";

import { getAllLocations } from "../controller/locationController.js";

const router = express.Router();
router.get("/getLocationsMove", getAllLocations);


export default router;
