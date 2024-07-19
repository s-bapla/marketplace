const db = require("../util/database");

class OrderProduct {
  constructor(id, orderId, productId, quantity) {
    this.id = id;
    this.orderId = orderId;
    this.productId = productId;
    this.quantity = quantity;
  }

  static findItemsInOrder(orderId) {
    return db.execute("SELECT * FROM order_products WHERE order_id = ?", [orderId]);
  }

  static addItemToOrder(orderId, productId, productTitle, productPrice, productDescription, productImageURL, quantity) {
    return db.execute(
      "INSERT INTO order_products (order_id, product_id, product_title, product_price, product_description, product_imageURL, quantity) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        orderId,
        productId,
        productTitle,
        productPrice,
        productDescription,
        productImageURL,
        quantity,
      ]
    );
  }

  static removeItemFromOrder(orderId, productId) {
    return db.execute(
      "DELETE FROM order_products WHERE order_id = ? AND product_id = ?",
      [orderId, productId]
    );
  }

  static updateItemQuantity(orderId, productId, quantity) {
    return db.execute(
      "UPDATE order_products SET quantity = ? WHERE order_id = ? AND product_id = ?",
      [quantity, orderId, productId]
    );
  }
}

module.exports = OrderProduct;
