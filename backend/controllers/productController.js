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

// Delete product function
const removeProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error!' });
  }
});

// Fetch products as a paginated list matching an optional search keyword
const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);

    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error!' });
  }
});

// Fetch product by its id
const fetchProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Product not found.' });
  }
});

const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate('category')
      .limit(12)
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.json({ error: 'Server error' });
  }
});

// Add review to a product
const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    // Find the product by Id
    const product = await Product.findById(req.params.id);

    // Check if the product exists
    if (product) {
      // Check if the user has already submit the review for the product
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error('Product already reviewed!');
      }

      // Create a new review object
      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      // Push the new review to reviews array
      product.reviews.push(review);

      // Update the number of the product's total reviews
      product.numReviews = product.reviews.length;

      // Recalculate the average rating for the product
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: 'Review added!' });
    } else {
      res.status(404);
      throw new error('Product not found');
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});
export {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
};
