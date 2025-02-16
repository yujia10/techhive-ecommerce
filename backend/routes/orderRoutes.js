import express from "express";
const router = express.Router();

import { createOrder, getAllOrders, getUserOrders, countTotalOrders } from "../controllers/orderController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router.route("/")
.post(authenticate, createOrder)
.get(authenticate, authorizeAdmin, getAllOrders);

router.route("/mine").get(authenticate, getUserOrders);
router.route("/total-orders").get(countTotalOrders);

export default router;
