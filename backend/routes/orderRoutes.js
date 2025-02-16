import express from "express";
const router = express.Router();

import { createOrder, getAllOrders } from "../controllers/orderController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router.route("/")
.post(authenticate, createOrder)
.get(authenticate, authorizeAdmin, getAllOrders);

export default router;
