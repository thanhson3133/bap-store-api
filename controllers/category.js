const asyncHandler = require("express-async-handler");
const Category = require("../models/category");

//@desc Get all categories
//@route Get /api/bap-store/categories
//@access public

const getCategoryHandler = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {}
});

//@desc Create category
//@route Post /api/bap-store/category
//@access private

const createCategoryHandler = asyncHandler(async (req, res) => {
  try {
    const { title, description, code } = req.body;
    if (!title && !code) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }
    console.log("req.body", req.body);
    const categoryAvailabel = await Category.findOne({ code });
    if (categoryAvailabel) {
      res.status(400);
      throw new Error("Category already exist!");
    }

    const category = await Category.create({
      title,
      description,
      code,
    });
    res.status(201).json(category);
  } catch (error) {
    throw new Error(`Failed to create category: ${error.message}`);
  }
});

//@desc Update category
//@route Put /api/bap-store/category/:id
//@access private

const updateCategoryHandler = asyncHandler(async (req, res) => {
  try {
    if (req.params.id.length != 24) {
      res.status(404);
      throw new Error("Category id must enough 24 character!");
    }
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404);
      throw new Error("Category not found!");
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(201).json(updatedCategory);
  } catch (error) {
    throw new Error(`Failed to update category: ${error.message}`);
  }
});

//@desc Delete category
//@route Delete /api/bap-store/category/:id
//@access private

const deleteCategoryHandler = asyncHandler(async (req, res) => {
  try {
    if (req.params.id.length != 24) {
      res.status(404);
      throw new Error("Category id must enough 24 character!");
    }
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404);
      throw new Error("Category not found!");
    }
    await Category.deleteOne();
    res
      .status(200)
      .json({ message: `Delete category success ${category.title}!` });
  } catch (error) {
    throw new Error(`Failed to delete category: ${error.message}`);
  }
});

module.exports = {
  getCategoryHandler,
  createCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
};
