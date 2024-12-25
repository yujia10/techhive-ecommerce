import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

// CreateCategory function for creating a new category.
const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    // Check if the name was provided in the request
    if (!name) {
      // If not provided, return error messgae
      return res.json({ error: "Name is required!" })
    }

    // Check if a category with the same name already exists in the db.
    const existingCategory = await Category.findOne({ name })
    // If exists, return error message
    if (existingCategory) {
      return res.json({ error: "Already exists!" })
    }

    const category = await new Category({ name }).save()
    res.json(category)

  } catch (error) {
    console.log(error);
    // Return 400 with error details
    return res.status(400).json(error);
  }
});

// updateCategory function for updating an existing category.
const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;

    // Find the category by Id.
    const category = await Category.findOne({ _id: categoryId })
    // If not found, return error message.
    if (!category) {
      return res.status(404).json({ error: "Category is not found!" })
    }

    //Update category's name
    category.name = name

    //Save the updated category back to db.
    const updatedCategory = await category.save()
    res.json(updatedCategory)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Internet server error" })
  }
})

// Delete category function
const removeCategory = asyncHandler(async (req, res) => {
  try {
    // Find the category by Id
    const removed = await Category.findByIdAndDelete(req.params.categoryId)
    res.json(removed)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Internet server error" })
  }
})

// List category function
const listCategory = asyncHandler(async (req, res) => {
  try {
    const all = await Category.find({})
    res.json(all)
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
})

// Read a single category function
const readCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findOne({ _id: categoryId })

    // Return the category if is found
    if (category) {
      res.json(category);
    } else {
      // If no category is found, return error message
      res.status(404).json({ message: "Category is not found!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
})

export {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
};