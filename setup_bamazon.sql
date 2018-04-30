
--set up the database
drop database if exists bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

--  set up the products table
CREATE TABLE bam_prods(
	prod_id INT AUTO_INCREMENT NOT NULL,
	prod_name varchar(30) NOT NULL,
	prod_dept varchar(30) NOT NULL,
	prod_price DECIMAL(10,2) NOT NULL,
	prod_stock INT NOT NULL,
	PRIMARY KEY(prod_id)
	);

-- insert products into the products table
USE bamazon_db;
INSERT INTO bam_prods (prod_name, prod_dept, prod_price, prod_stock) VALUES ("Dog Leash", "Dogs", 15.99, 27);
INSERT INTO bam_prods (prod_name, prod_dept, prod_price, prod_stock) VALUES ("Dog Chew", "Dogs", 4.99, 50);
INSERT INTO bam_prods (prod_name, prod_dept, prod_price, prod_stock) VALUES ("Cat Collar", "Cats", 11.00, 15);
INSERT INTO bam_prods (prod_name, prod_dept, prod_price, prod_stock) VALUES ("Cat Litter", "Cats", 12.99, 35);
INSERT INTO bam_prods (prod_name, prod_dept, prod_price, prod_stock) VALUES ("Dog Bowl", "Dogs", 9.00, 12);
INSERT INTO bam_prods (prod_name, prod_dept, prod_price, prod_stock) VALUES ("Dog Food", "Dogs", 15.79, 100);
INSERT INTO bam_prods (prod_name, prod_dept, prod_price, prod_stock) VALUES ("Cat Ball", "Cats", 5.29, 18);
INSERT INTO bam_prods (prod_name, prod_dept, prod_price, prod_stock) VALUES ("Cat Toy", "Cats", 22.99, 4);
INSERT INTO bam_prods (prod_name, prod_dept, prod_price, prod_stock) VALUES ("Fish Bowl", "Fish", 10.00, 30);
INSERT INTO bam_prods (prod_name, prod_dept, prod_price, prod_stock) VALUES ("Fish Food", "Fish", 4.99, 28);
INSERT INTO bam_prods (prod_name, prod_dept, prod_price, prod_stock) VALUES ("Tank Gravel", "Fish", 6.00, 5);
INSERT INTO bam_prods (prod_name, prod_dept, prod_price, prod_stock) VALUES ("Air Pump", "Fish", 16.99, 7);

--see what's in the table
USE bamazon_db;
select * from bam_prods;

-- clear the table
USE bamazon_db;
DROP TABLE bam_prods;

-- pick a product using specific prod_id
USE bamazon_db;
SELECT * FROM bam_prods WHERE prod_id = 7;

-- update quantity for a product
USE bamazon_db;
UPDATE bam_prods SET prod_stock = 18 WHERE prod_id = 7;