import express from "express";

import { getClassTypeInfors } from "../controller/classTypeInforsController.js";

const router = express.Router();
router.get("/getClassTypeInfors", getClassTypeInfors);


export default router;
