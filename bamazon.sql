-- Drops the bamazon database if it already exists --
DROP DATABASE IF EXISTS bamazon;
-- Create a database called bamazon --
CREATE DATABASE bamazon;

-- Use bamazon db for the following statements --
USE bamazon;

CREATE TABLE products(
    item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) DEFAULT '',
    department_name VARCHAR(50) DEFAULT '',
    price DECIMAL(13,2) DEFAULT 0,
    stock_quantity INTEGER(10) DEFAULT 0,
    product_sales DECIMAL(13,2) DEFAULT 0,
    PRIMARY KEY (item_id)
);

-- Create new example products
INSERT	INTO products(product_name, department_name, price, stock_quantity)
VALUES ('Green Eggs and Ham', 'Books', 9.00, 100);

INSERT	INTO products(product_name, department_name, price, stock_quantity)
VALUES ('Where the Wild Things Are', 'Books', 3.50, 200);

INSERT	INTO products(product_name, department_name, price, stock_quantity)
VALUES ('Frying Pan', 'Kitchen', 25.00, 100);

INSERT	INTO products(product_name, department_name, price, stock_quantity)
VALUES ('Spatula', 'Kitchen', 11.00, 100);

INSERT	INTO products(product_name, department_name, price, stock_quantity)
VALUES ('Television', 'Electronics', 499.00, 99);

INSERT	INTO products(product_name, department_name, price, stock_quantity)
VALUES ('Headphones', 'Electronics', 149.00, 750);

INSERT	INTO products(product_name, department_name, price, stock_quantity)
VALUES ('T-Shirt', 'Clothing', 15.00, 10000);

INSERT	INTO products(product_name, department_name, price, stock_quantity)
VALUES ('Pants', 'Clothing', 30.00, 5000);

INSERT	INTO products(product_name, department_name, price, stock_quantity)
VALUES ('Diapers', 'Baby', 30.00, 50000);

INSERT	INTO products(product_name, department_name, price, stock_quantity)
VALUES ('Baby Wash', 'Baby', 30.00, 5000);

CREATE TABLE departments(
    department_id INTEGER(10) AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(50) DEFAULT '',
    over_head_costs DECIMAL(13,2) DEFAULT 0,
    PRIMARY KEY (department_id)
);

INSERT INTO departments(department_name, over_head_costs)
VALUES('Books', 10000);

INSERT INTO departments(department_name, over_head_costs)
VALUES('Kitchen', 20000);

INSERT INTO departments(department_name, over_head_costs)
VALUES('Electronics', 30000);

INSERT INTO departments(department_name, over_head_costs)
VALUES('Clothing', 40000);

INSERT INTO departments(department_name, over_head_costs)
VALUES('Baby', 50000);