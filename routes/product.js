const express = require("express");
const router = express.Router();
const {
  getProductHandler,
  getProductDetailHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
} = require("../controllers/product");

router.route("/").get(getProductHandler).post(createProductHandler);
router
  .route("/:id")
  .get(getProductDetailHandler)
  .put(updateProductHandler)
  .delete(deleteProductHandler);

module.exports = router;
