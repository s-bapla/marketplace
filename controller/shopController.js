const Cart = require("../models/cart");
const Product = require("../models/product");
const ProductCart = require("../models/cart_product.js");
const Order = require("../models/order.js");
const OrderProduct = require("../models/order_product");

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
      if (!cart[0][0]) {
        Cart.createCart(userId)
          .then((result) => {
            Cart.findByUserId(userId)
              .then((cart) => {
                ProductCart.findProductsInCart(cart[0][0].id)
                  .then((products) => {
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
          .then((result) => {
            Cart.findByUserId(userId)
              .then((cart) => {
                ProductCart.addProductToCart(cart[0][0].id, productId, 1);
                res.redirect("/shop/cart");
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      } else {
        ProductCart.findProductInCart(cart[0][0].id, productId)
          .then((productInCart) => {
            if (productInCart[0][0]) {
              ProductCart.updateProductQuantity(
                cart[0][0].id,
                productId,
                productInCart[0][0].quantity + 1
              );
            } else {
              ProductCart.addProductToCart(cart[0][0].id, productId, 1);
            }
          })
          .then(() => res.redirect("/cart"));
      }
    })
    .catch((err) => console.log(err));
};

module.exports.deleteProduct = (req, res, next) => {
  const userId = req.user.id;
  const productId = req.body.productId;
  console.log(userId, productId);

  Cart.findByUserId(userId)
    .then((cart) => {
      ProductCart.removeProductFromCart(cart[0][0].id, productId)
        .then((result) => res.redirect("/cart"))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  const userId = req.user.id;
  let orderId;
  Order.createOrder(userId)
    .then((result) => {
      orderId = result[0].insertId;
      return Cart.findByUserId(userId);
    })
    .then((cart) => {
      return ProductCart.findProductsInCart(cart[0][0].id);
    })
    .then(([cartItems]) => {
      const orderItemPromises = cartItems.map((item) => {
        return OrderProduct.addItemToOrder(
          orderId,
          item.product_id,
          item.quantity
        );
      });

      return Promise.all(orderItemPromises);
    })
    .then(() => {
      return Cart.findByUserId(userId);
    })
    .then(([cart]) => {
      return ProductCart.removeProductsFromCart(cart[0].id);
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  const userId = req.user.id;

  Order.findByUserId(userId)
    .then((orders) => {
      const orderList = orders[0].map((order) => {
        return OrderProduct.findItemsInOrder(order.id).then(([items]) => {
          return {
            id: order.id,
            products: items,
          };
        });
      });
      return Promise.all(orderList);
    })
    .then((orders) => {
      res.render("shop/order", {
        pageTitle: "orders",
        orders: orders,
      });
    })
    .catch(err => console.log(err))
};
