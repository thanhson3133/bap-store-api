const asyncHandler = require("express-async-handler");
const Product = require("../models/product");

//@desc Get all products
//@route Get /api/bap-store/products
//@access public

const getProductHandler = asyncHandler(async (req, res) => {
  try {
    const { page, size } = req.query;
    const products = await Product.find()
      .skip((page - 1) * size)
      .limit(size);
    res.status(200).json(products);
  } catch (error) {}
});

//@desc Get one product
//@route Get /api/bap-store/product/:id
//@access public

const getProductDetailHandler = asyncHandler(async (req, res) => {
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

    res.status(200).json(product);
  } catch (error) {
    throw new Error(`Failed to get product: ${error.message}`);
  }
});

//@desc Create product
//@route Post /api/bap-store/product
//@access private

const createProductHandler = asyncHandler(async (req, res) => {
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

//@desc Update product
//@route Put /api/bap-store/product/:id
//@access private

const updateProductHandler = asyncHandler(async (req, res) => {
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

//@desc Delete product
//@route Delete /api/bap-store/product/:id
//@access private

const deleteProductHandler = asyncHandler(async (req, res) => {
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
    res
      .status(200)
      .json({ message: `Xoá thành công sản phẩm ${product.name}!` });
  } catch (error) {
    throw new Error(`Failed to delete product: ${error.message}`);
  }
});

module.exports = {
  getProductHandler,
  getProductDetailHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
};
