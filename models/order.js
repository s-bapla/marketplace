const db = require("../util/database")

class Order {
  constructor(id, userId, createdAt) {
    this.id = id;
    this.userId = userId;
    this.createdAt = createdAt;
  }

  static findByUserId(userId) {
    return db.execute('SELECT * FROM orders WHERE user_id = ?', [userId]);
  }

  static createOrder(userId) {
    return db.execute('INSERT INTO orders (user_id) VALUES (?)', [userId]);
  }

  static deleteById(id) {
    return db.execute('DELETE FROM orders WHERE id = ?', [id]);
  }
}

module.exports = Order;
