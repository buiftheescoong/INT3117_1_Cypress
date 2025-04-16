import express from "express";
import { deleteTicket } from "../controller/ticketController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";


const router = express.Router();

router.delete("/delete-ticket/:ticketId",authenticate, deleteTicket);

export default router;
