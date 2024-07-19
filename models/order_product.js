const db = require("../util/database");

class OrderProduct {
  constructor(id, orderId, productId, quantity) {
    this.id = id;
    this.orderId = orderId;
    this.productId = productId;
    this.quantity = quantity;
  }

  static findItemsInOrder(orderId) {
    return db.execute(
      `
      SELECT order_products.*, products.title, products.price, products.description, products.imageURL
      FROM order_products
      JOIN products ON order_products.product_id = products.id
      WHERE order_products.order_id = ?
    `,
      [orderId]
    );
  }

  static addItemToOrder(orderId, productId, quantity) {
    return db.execute(
      "INSERT INTO order_products (order_id, product_id, quantity) VALUES (?, ?, ?)",
      [orderId, productId, quantity]
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

module.exports = OrderProduct