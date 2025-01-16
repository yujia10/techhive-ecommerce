import asyncHandler from '../middlewares/asyncHandler.js';
import Product from '../models/productModel.js';

// Create/Add product function
const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, brand, quantity } = req.fields;

    // Validation
    switch (true) {
      case !name:
        return res.json({ error: 'Name is required!' });
      case !description:
        return res.json({ error: 'Description is required!' });
      case !price:
        return res.json({ error: 'Price is required!' });
      case !category:
        return res.json({ error: 'Category is required!' });
      case !brand:
        return res.json({ error: 'Brand is required!' });
      case !quantity:
        return res.json({ error: 'Quantity is required!' });
    }

    const product = new Product({ ...req.fields });
    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

// Update product details function
const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, brand, quantity } = req.fields;

    // Validation
    switch (true) {
      case !name:
        return res.json({ error: 'Name is required!' });
      case !description:
        return res.json({ error: 'Description is required!' });
      case !price:
        return res.json({ error: 'Price is required!' });
      case !category:
        return res.json({ error: 'Category is required!' });
      case !brand:
        return res.json({ error: 'Brand is required!' });
      case !quantity:
        return res.json({ error: 'Quantity is required!' });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );

    // Check if the product exists
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});
export { addProduct, updateProductDetails };
