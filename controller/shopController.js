const Product = require("../models/product");

module.exports.getProducts = (req, res, next) => {
  Product.fetchAll().then((result) => {
    res.render("shop/products-list", {
      pageTitle: "product list",
      path: "shop/product-list",
      prods: result[0],
    });
  });
};

module.exports.getIndex = (req, res, next) => {
  Product.fetchAll().then((result) => {
    res.render("shop/index", {
      pageTitle: "Homepage",
      path: "shop/index",
      prods: result[0],
    });
  });
};

module.exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.fetchById(productId)
    .then(product => {
        res.render("shop/product-details", {
            pageTitle: "product details",
            product: product[0][0],
            path: "shop/product-details"
        })
        
    })
    .catch((err) => console.log(err));
};
