const db = require("../util/database");

class Product {
  constructor(title, price, description, imageURL) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageURL = imageURL;
  }

  save() {
    return db.execute(
      "INSERT INTO products (title, price, description, imageURL) VALUES (?, ?, ?, ?)",
      [this.title, this.price, this.description, this.imageURL]
    );
  }

  static fetchAll() {
    return db.execute("SELECT * FROM PRODUCTS");
  }

  static fetchById(id) {
    return db.execute("SELECT * FROM PRODUCTS WHERE product.id = ?", [id]);
  }
}

module.exports = Product;
