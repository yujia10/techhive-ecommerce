import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    console.log(name);

  } catch (error) {

    console.log(error);
    // Return 400 with error details
    return res.status(400).json(error);
  }
});

export { createCategory };