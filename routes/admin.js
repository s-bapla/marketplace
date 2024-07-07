

const express = require("express");

const adminController = require("../controller/adminController");

const router = express.Router();

router.get("/products", adminController.getProductsPage)

router.post("/")

module.exports = router;