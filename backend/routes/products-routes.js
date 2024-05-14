const express = require("express");
const { check } = require("express-validator");
const checkAuth = require("../middleware/check-auth");
const fileUpload = require("../middleware/file-upload");

const router = express.Router();

const productsController = require("../controllers/products-controller");

router.get("/", productsController.getProducts);
router.get("/:pid", productsController.getProductById);
router.get("/category/:category", productsController.getProductsByCategory);

router.use(checkAuth("seller"));
router.get("/sellerproducts/:sid", productsController.getProductsBySellerId);
router.post(
  "/new",
  fileUpload.single("image"),
  productsController.createProduct
);
router.patch("/:pid", productsController.updateProduct);
router.delete("/:pid", productsController.deleteProduct);

module.exports = router;
