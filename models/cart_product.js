const db = require("../util/database");

class Product_Cart {
  constructor(productId, quantity) {
    this.productId = productId;
    this.quantity = quantity;
  }

  // Static methods

  // Add a product to a cart
  static addProductToCart(cartId, productId, quantity) {
    return db.execute(
      "INSERT INTO product_cart (cart_id, product_id, quantity) VALUES (?, ?, ?)",
      [cartId, productId, quantity]
    );
  }

  // Find all products in a cart
  static findProductsInCart(cartId) {
    return db.execute(
      ` SELECT 
                p.id AS product_id,
                p.title,
                p.price,
                p.description,
                p.imageURL,
                pc.quantity
            FROM 
                product_cart pc
            JOIN 
                products p ON pc.product_id = p.id
            WHERE 
                pc.cart_id = ?
        `,
      [cartId]
    );
  }

  static findProductInCart(cartId, productId) {
    return db.execute(
      "SELECT * FROM product_cart WHERE cart_id = ? AND product_id = ?",
      [cartId, productId]
    );
  }

  // Remove a product from a cart
  static removeProductFromCart(cartId, productId) {
    return db.execute(
      "DELETE FROM product_cart WHERE cart_id = ? AND product_id = ?",
      [cartId, productId]
    );
  }

  static removeProductsFromCart(cartId) {
    return db.execute(
      "DELETE FROM product_cart WHERE cart_id = ?", [cartId]
    )
  }

  // Update product quantity in a cart
  static updateProductQuantity(cartId, productId, quantity) {
    return db.execute(
      "UPDATE product_cart SET quantity = ? WHERE cart_id = ? AND product_id = ?",
      [quantity, cartId, productId]
    );
  }
}

module.exports = Product_Cart;
