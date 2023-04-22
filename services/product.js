const asyncHandler = require("express-async-handler");
const Product = require("../models/product");

const getProducts = asyncHandler(async (req, res) => {
  try {
    const { page, size } = req.query;
    const products = await Product.find()
      .skip((page - 1) * size)
      .limit(size);
    return products;
  } catch (error) {}
});

const getProductDetail = asyncHandler(async (req, res) => {
  try {
    if (req.params.id.length != 24) {
      res.status(404);
      throw new Error("Product id must enough 24 character!");
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Product Not Found!");
    }

    return product;
  } catch (error) {
    throw new Error(`Failed to get product: ${error.message}`);
  }
});

const createProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, quantity, category } = req.body;
    if (!name || !price || !quantity || !category) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }

    const product = await Product.create({
      name,
      description,
      price,
      quantity,
      category,
    });
    return product;
  } catch (error) {
    throw new Error(`Failed to create product: ${error.message}`);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    if (req.params.id.length != 24) {
      res.status(404);
      throw new Error("Product id must enough 24 character!");
    }
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found!");
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    return updatedProduct;
  } catch (error) {
    throw new Error(`Failed to update product: ${error.message}`);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    if (req.params.id.length != 24) {
      res.status(404);
      throw new Error("Product id must enough 24 character!");
    }
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found!");
    }
    await Product.deleteOne();
  } catch (error) {
    throw new Error(`Failed to delete product: ${error.message}`);
  }
});

module.exports = {
  getProducts,
  getProductDetail,
  createProduct,
  updateProduct,
  deleteProduct,
};
