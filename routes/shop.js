const express = require("express");

const shopController = require("../controller/shopController")

const router = express.Router();

router.get("/", shopController.getIndex)

router.get("/products", shopController.getProducts)

router.get("/products/:productId", shopController.getProduct)

router.get("/cart", shopController.getCart)

router.post("/cart", shopController.addToCart)

router.post("/cart-delete-item", shopController.deleteProduct);

router.post("/create-order", shopController.postOrder);

router.get("/orders", shopController.getOrders);


module.exports = router;