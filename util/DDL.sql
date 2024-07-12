USE node-complete;

DROP TABLE IF EXISTS cart_products;

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
    id INT AUTO_INCREMENT UNIQUE PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    price DOUBLE NOT NULL,
    description TEXT NOT NULL,
    imageURL VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS cart;
CREATE TABLE cart (
    id INT AUTO_INCREMENT UNIQUE PRIMARY KEY,
    created_at TIMESTAMP
);

CREATE TABLE cart_products (
    id INT AUTO_INCREMENT UNIQUE PRIMARY KEY,
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (cart_id)
        REFERENCES cart (id),
    FOREIGN KEY (product_id)
        REFERENCES products (id)
);