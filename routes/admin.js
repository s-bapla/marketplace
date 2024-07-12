const express = require("express");

const adminController = require("../controller/adminController");

const router = express.Router();

router.get("/products", adminController.getProductsPage);

router.get("/add-product", adminController.getAddProduct);

router.post("/add-product", adminController.postAddProduct);

router.get("/edit-product/:productId", adminController.getEditProduct)

router.post("/edit-product", adminController.postEditProduct)

router.post("/delete-product", adminController.postDeleteProduct)

module.exports = router;
