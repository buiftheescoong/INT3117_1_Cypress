import express from "express";
import { authenticate, restrict } from "../auth/verifyToken.js";

import { getCheckoutSession } from "../controller/bookingController.js";

import {
    getAllBookings,

} from "../controller/bookingController.js";

import { getAllUserBookedTickets } from "../controller/UserBookedTickets/getUserBookedTickets.js";


const router = express.Router();

router.post("/checkout-session/:flightId", authenticate, getCheckoutSession);

router.get("/getAllBookings", getAllBookings);

router.get("/getUserBookedTickets", authenticate, getAllUserBookedTickets);



export default router;
