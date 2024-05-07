const express = require('express');
const {check} = require('express-validator');

const router = express.Router();

const productsController = require('../controllers/products-controller');

router.get('/', productsController.getProducts);
router.get('/:pid', productsController.getProductById);
router.get('/sellerproducts/:sid', productsController.getProductsBySellerId);
router.get('/category/:category', productsController.getProductsByCategory);
router.post("/new",productsController.createProduct);
router.patch("/:pid",productsController.updateProduct);
router.delete('/:pid',productsController.deleteProduct);

module.exports = router;