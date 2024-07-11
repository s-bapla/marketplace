const Product = require("../models/product");

module.exports.getProductsPage = (req, res, next) => {
  Product.fetchAll()
    .then((result) => {
      console.log(result[0]);
      res.render("admin/products", {
        pageTitle: "Admin Products",
        prods: result[0],
        path: "admin/products",
      });
    })
    .catch((err) => console.log(err));
};

module.exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-products", {
    pageTitle: "Add Products",
    editing: false,
  });
};

module.exports.postAddProduct = (req, res, next) => {
  const { title, imageURL, price, description } = req.body;
  const product = new Product(title, price, description, imageURL);
  product
    .save()
    .then(result => {
        console.log("created product");
        res.redirect("/admin/products");})
    .catch((err) => console.log(err));
};
