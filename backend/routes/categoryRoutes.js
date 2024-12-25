import express from "express"
const router = express.Router();

import {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
} from "../controllers/categoryController.js";

router.route("/categories").get(listCategory)
router.route("/").post(createCategory);
router.route("/:categoryId")
  .get(readCategory)
  .put(updateCategory)
  .delete(removeCategory);



export default router