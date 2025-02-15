import express from "express";
const router = express.Router();

import { createOrder } from "../controllers/orderController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router.route("/").post(authenticate, createOrder);

export default router;
