const express = require("express");
const router = express.Router();
const {
  getProduct,
  getProductDetail,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.route("/products").get(getProduct);
router.route("/product").post(createProduct);

router
  .route("/product/:id")
  .get(getProductDetail)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
