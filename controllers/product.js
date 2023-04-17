const asyncHandler = require("express-async-handler");
const Product = require("../models/product");
const {
  getProducts,
  getProductDetail,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../services.js/product");

//@desc Get all products
//@route Get /api/bap-store/products
//@access public

const getProductHandler = asyncHandler(async (req, res) => {
  const products = await getProducts(req, res);
  res.status(200).json(products);
});

//@desc Get one product
//@route Get /api/bap-store/product/:id
//@access public

const getProductDetailHandler = asyncHandler(async (req, res) => {
  const product = await getProductDetail(req, res);
  res.status(200).json(product);
});

//@desc Create product
//@route Post /api/bap-store/product
//@access private

const createProductHandler = asyncHandler(async (req, res) => {
  const product = await createProduct(req, res);
  res.status(201).json(product);
});

//@desc Update product
//@route Put /api/bap-store/product/:id
//@access private

const updateProductHandler = asyncHandler(async (req, res) => {
  const product = await updateProduct(req, res);
  res.status(201).json(product);
});

//@desc Delete product
//@route Delete /api/bap-store/product/:id
//@access private

const deleteProductHandler = asyncHandler(async (req, res) => {
  await deleteProduct(req, res);
  res.status(200).json({ message: `Delete product success ${req.params.id}!` });
});

module.exports = {
  getProductHandler,
  getProductDetailHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
};
