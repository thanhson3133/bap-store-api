const asyncHandler = require("express-async-handler");
const Category = require("../models/category");
const {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../services/category");

//@desc Get all categories
//@route Get /api/bap-store/categories
//@access public

const getCategoryHandler = asyncHandler(async (req, res) => {
  const category = await getCategory(req, res);
  res.status(200).json(category);
});

//@desc Create category
//@route Post /api/bap-store/category
//@access private

const createCategoryHandler = asyncHandler(async (req, res) => {
  const category = await createCategory(req, res);
  res.status(200).json(category);
});

//@desc Update category
//@route Put /api/bap-store/category/:id
//@access private

const updateCategoryHandler = asyncHandler(async (req, res) => {
  const category = await updateCategory(req, res);
  res.status(200).json(category);
});

//@desc Delete category
//@route Delete /api/bap-store/category/:id
//@access private

const deleteCategoryHandler = asyncHandler(async (req, res) => {
  await deleteCategory(req, res);
  res
    .status(200)
    .json({ message: `Delete category success ${req.params.id}!` });
});

module.exports = {
  getCategoryHandler,
  createCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
};
