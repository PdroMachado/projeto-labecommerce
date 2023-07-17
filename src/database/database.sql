-- Active: 1688768181367@@127.0.0.1@3306
CREATE TABLE users(
  id INT AUTO_INCREMENT UNIQUE, 
  nome VARCHAR(70) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(15) NOT NULl,
  createdAt TEXT DEFAULT (DATETIME()) NOT NULL,  
  PRIMARY KEY (ID)
);

CREATE TABLE product (
  id INT AUTO_INCREMENT UNIQUE, 
  nome VARCHAR(50) NOT NULL,
  price DOUBLE NOT NULL,
  description VARCHAR(255) NOT NULL,
  image_url NOT NULL,  
  PRIMARY KEY (ID));



CREATE TABLE IF NOT EXISTS purchases (
    id INT DEFAULT AUTO_ICREMENT UNIQUE,
    buyer INT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT DEFAULT (DATETIME()),
    PRIMARY KEY(id)
    Foreign Key (buyer) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS purchases_products(
    purchase_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    Foreign Key (purchase_id) REFERENCES purchases(id),
    Foreign Key (product_id) REFERENCES products(id)
) ;


DROP TABLE product;
DROP TABLE purchases;
DROP TABLE purchases_products;
DROP TABLE users;


CREATE TABLE users(
  id TEXT UNIQUE NOT NULL, 
  name VARCHAR(70) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(15) NOT NULl,
  createdAt TEXT DEFAULT (DATETIME()) NOT NULL,  
  PRIMARY KEY (ID)
);

CREATE TABLE product (
  id TEXT UNIQUE NOT NULL, 
  name VARCHAR(50) NOT NULL,
  price DOUBLE NOT NULL,
  description VARCHAR(255) NOT NULL,
  image_url NOT NULL,  
  PRIMARY KEY (ID));



CREATE TABLE IF NOT EXISTS purchases (
    id TEXT UNIQUE NOT NULL,
    buyer INT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT DEFAULT (DATETIME()),
    PRIMARY KEY(id),
    Foreign Key (buyer) REFERENCES users(id)
    ON UPDATE CASCADE
	  ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INT NOT NULL,
    Foreign Key (purchase_id) REFERENCES purchases(id)
    Foreign Key (product_id) REFERENCES product(id)
    ON UPDATE CASCADE
	  ON DELETE CASCADE
) ;

DROP TABLE product;
DROP TABLE purchases;
DROP TABLE users;
DROP TABLE purchases_products;


