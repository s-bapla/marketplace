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
    return db.execute("SELECT * FROM PRODUCTS WHERE products.id = ?", [id]);
  }

  static update(id, title, price, imageURL, description) {
    return db.execute(
      "UPDATE PRODUCTS SET title = ?, price = ?, imageURL = ?, description = ? WHERE id = ?",
      [title, price, imageURL, description, id]
    );
  }

  static delete(id) {
    return db.execute("DELETE FROM products WHERE id = ?", [id]);
  }
}

module.exports = Product;
