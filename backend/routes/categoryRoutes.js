import express from "express"
const router = express.Router();

import {
  createCategory,
  updateCategory
} from "../controllers/categoryController.js";

router.route("/").post(createCategory);
router.route("/:categoryId").put(updateCategory);

export default router