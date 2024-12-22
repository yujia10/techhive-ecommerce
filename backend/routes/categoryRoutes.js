import express from "express"
const router = express.Router();

import { createCategory } from "../controllers/categoryController.js";

router.route("/").post(createCategory);

export default router