USE node-complete;

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
    id INT AUTO_INCREMENT UNIQUE PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    price DOUBLE NOT NULL,
    description TEXT NOT NULL,
    imageURL VARCHAR(255) NOT NULL
);