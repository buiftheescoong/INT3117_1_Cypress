import express from "express";

import {
  addFlight,
  getAllFlights, 
  updateFlight
} from "../controller/searchFlightController.js";

import { getFlights } from "../controller/SearchFlightController/getSuitableFligths.js";

import { getSingleFlight } from "../controller/SearchFlightController/findFlightsRelyOnId.js";

import { authenticate} from "../auth/verifyToken.js";


const router = express.Router();

router.post("/addFlight", addFlight);
router.post("/search", getFlights);
router.get("/getAllFlights", getAllFlights);
router.get("/getSingleFlight/:id", authenticate, getSingleFlight);
router.put("/updateFlight/:id", updateFlight);


export default router;
