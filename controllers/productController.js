const asyncHandler = require("express-async-handler");

//@desc Get all products
//@route Get /api/bap-store/products
//@access public

const getProduct = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "get all products" });
});

//@desc Get one product
//@route Get /api/bap-store/product/:id
//@access public

const getProductDetail = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `get one products for ${req.params.id}` });
});

//@desc Create product
//@route Post /api/bap-store/product
//@access public

const createProduct = asyncHandler(async (req, res) => {
  const { name, category, description } = req.body;
  if (!name || !category || description) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  res.status(201).json({ message: "create products" });
});

//@desc Update product
//@route Put /api/bap-store/product/:id
//@access public

const updateProduct = asyncHandler(async (req, res) => {
  res.status(201).json({ message: `update products for ${req.params.id}` });
});

//@desc Delete product
//@route Delete /api/bap-store/product/:id
//@access public

const deleteProduct = asyncHandler(async (req, res) => {
  res.status(201).json({ message: `delete products for ${req.params.id}` });
});

module.exports = {
  getProduct,
  getProductDetail,
  createProduct,
  updateProduct,
  deleteProduct,
};
