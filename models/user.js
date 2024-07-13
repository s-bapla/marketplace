const db = require("../util/database");

class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
  }

  // Static methods

  // Create a new user
  static createUser(username, email) {
    return db.query(
      "INSERT INTO users (username, email, cart_id) VALUES (?, ?, ?)",
      [username, email]
    );
  }

  // Find a user by ID
  static findById(userId) {
    return db.query("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);
  }

  // Get all users
  static getAllUsers() {
    return db.query("SELECT * FROM users");
  }

  // Delete a user by ID
  static deleteById(userId) {
    return db.query("DELETE FROM users WHERE id = ?", [
      userId,
    ]);
  }

  // Update user email by ID
  static updateEmail(userId, newEmail) {
    return db.query(
      "UPDATE users SET email = ? WHERE id = ?",
      [newEmail, userId]
    );
}
};

module.exports = User;
