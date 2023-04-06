const asyncHandler = require("express-async-handler");
const Category = require("../models/category");

const getCategory = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find();
    return categories;
  } catch (error) {}
});

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { title, description, code } = req.body;
    if (!title && !code) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }
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
    return category;
  } catch (error) {
    throw new Error(`Failed to create category: ${error.message}`);
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    if (req.params.id.length != 24) {
      res.status(404);
      throw new Error("Category id must enough 24 character!");
    }
    const categoryId = await Category.findById(req.params.id);
    if (!categoryId) {
      res.status(404);
      throw new Error("Category not found!");
    }

    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return category;
  } catch (error) {
    throw new Error(`Failed to update category: ${error.message}`);
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
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
  } catch (error) {
    throw new Error(`Failed to delete category: ${error.message}`);
  }
});
module.exports = {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
