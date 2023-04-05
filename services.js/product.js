const asyncHandler = require("express-async-handler");

const createProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, quantity, category } = req.body;
    console.log("req.body", req.body);
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
    console.log("product", product);

    res.status(201).json(product);
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
    res.status(201).json(updatedProduct);
  } catch (error) {
    throw new Error(`Failed to update product: ${error.message}`);
  }
});

module.exports = { createProduct, updateProduct };
