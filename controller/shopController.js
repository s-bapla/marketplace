const Cart = require("../models/cart");
const Product = require("../models/product");
const ProductCart = require("../models/cart_product.js");

module.exports.getProducts = (req, res, next) => {
  Product.fetchAll().then((result) => {
    console.log(result[0]);
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
  console.log(productId);
  Product.fetchById(productId)
    .then((product) => {
      res.render("shop/product-details", {
        pageTitle: "product details",
        product: product[0][0],
        path: "shop/product-details",
      });
    })
    .catch((err) => console.log(err));
};

module.exports.getCart = (req, res, next) => {
  const userId = req.user.id;
  Cart.findByUserId(userId)
    .then((cart) => {
      console.log(cart);
      if (!cart[0][0]) {
        // Create a new cart if it doesn't exist
        Cart.createCart(userId)
          .then((result) => {
            Cart.findByUserId(userId)
              .then((cart) => {
                ProductCart.findProductsInCart(cart[0][0].id)
                  .then((products) => {
                    console.log(products);
                    res.render("shop/cart", {
                      pageTitle: "cart",
                      products: products[0],
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      } else {
        ProductCart.findProductsInCart(cart[0][0].id)
          .then((products) => {
            console.log(products);
            res.render("shop/cart", {
              pageTitle: "cart",
              products: products[0],
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => console.log(err));
};

module.exports.addToCart = (req, res, next) => {
  const userId = req.user.id;
  const productId = req.body.productId;

  Cart.findByUserId(userId)
    .then((cart) => {
      if (!cart[0][0]) {
        Cart.createCart(userId)
          .then((result) => {Cart})
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
};
