const express = require("express");
const router = express.Router();
const {
  getCategoryHandler,
  createCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
} = require("../controllers/category");

router.route("/").get(getCategoryHandler).post(createCategoryHandler);
router.route("/:id").put(updateCategoryHandler).delete(deleteCategoryHandler);

module.exports = router;
