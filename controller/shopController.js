const Product = require("../models/product")

module.exports.getProducts = (req, res, next) => {
    Product.fetchAll().then(result => )
}