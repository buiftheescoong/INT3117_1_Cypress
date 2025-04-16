import express from "express";

import {
    getAllPromotions,
    addPromotion
} from "../controller/promotionController.js";

const router = express.Router();

router.get("/getAllPromotions", getAllPromotions);
router.post("/addPromotion", addPromotion);

export default router;
