import express from "express"
const router = express.Router();

import {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
} from "../controllers/categoryController.js";

router.route("/").post(createCategory);
router.route("/:categoryId").put(updateCategory);
router.route("/:categoryId").delete(removeCategory);
router.route("/categories").get(listCategory)

export default router