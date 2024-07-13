const express = require("express");

const shopController = require("../controller/shopController")

const router = express.Router();

router.get("/", shopController.getIndex)

router.get("/products", shopController.getProducts)

router.get("/products/:productId", shopController.getProduct)

router.get("/cart", shopController.getCart)

router.post("/cart", shopController.addToCart)

module.exports = router;