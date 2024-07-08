

module.exports.getProductsPage = (req, res, next) => {
    res.render("admin/products", {
        pageTitle: "Admin Products"
    });
}

module.exports.getAddProduct = (req, res, next) => {
    res.render("admin/edit-products",{
        pageTitle: "Add Products",
        editing: false
    });
}