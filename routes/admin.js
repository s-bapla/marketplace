const express = require("express");

const adminController = require("../controller/adminController");
const isAuth = require("../middleware/is-auth")

const router = express.Router();

router.get("/products", isAuth, adminController.getProductsPage);

router.get("/add-product", isAuth, adminController.getAddProduct);

router.post("/add-product", isAuth, adminController.postAddProduct);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post("/edit-product", isAuth, adminController.postEditProduct);

router.post("/delete-product", isAuth, adminController.postDeleteProduct);

module.exports = router;
