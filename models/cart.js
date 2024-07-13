const db = require("../util/database");

class Cart {
  constructor(createdAt, userId) {
    this.createdAt = createdAt;
    this.userId = userId
  }

  // Instance methods
  getFormattedCreationDate() {
    return new Date(this.createdAt).toLocaleString();
  }

  // Static methods

  // Create a new cart
  static createCart(userId) {
    return db.execute(
      "INSERT INTO cart (created_at, userId) VALUES (NOW(), ?)", [
        userId
      ]
    )
  }

  // Find a cart by userID
  static findByUserId(userId) {
    return db.execute("SELECT * FROM cart WHERE userId = ?", [
      userId,
    ]);
  }

  // Get all carts
  static async getAllCarts() {
    return db.execute("SELECT * FROM cart");
  }

  // Delete a cart by ID
  static async deleteById(cartId) {
    return db.execute("DELETE FROM cart WHERE id = ?", [
      cartId,
    ]);
  }

  // Update cart creation date by ID
  static async updateCreationDate(cartId, newDate) {
    return db.execute(
      "UPDATE cart SET created_at = ? WHERE id = ?",
      [newDate, cartId]
    );
  }
}

module.exports = Cart;
