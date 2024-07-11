const express = require("express");

const adminController = require("../controller/adminController");

const router = express.Router();

router.get("/products", adminController.getProductsPage);

router.get("/add-product", adminController.getAddProduct);

router.post("/add-product", adminController.postAddProduct);

module.exports = router;
