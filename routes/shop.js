const express = require("express");

const shopController = require("../controller/shopController")
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/", shopController.getIndex)

router.get("/products", shopController.getProducts)

router.get("/products/:productId", isAuth, shopController.getProduct);

router.get("/cart", isAuth, shopController.getCart);

router.post("/cart", isAuth, shopController.addToCart);

router.post("/cart-delete-item", isAuth, shopController.deleteProduct);

router.post("/create-order", isAuth, shopController.postOrder);

router.get("/orders", isAuth, shopController.getOrders);


module.exports = router;