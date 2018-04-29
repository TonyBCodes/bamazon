drop database if exists bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE bam_prods(
	prod_id INT AUTO_INCREMENT NOT NULL,
	prod_name varchar(30) NOT NULL,
	prod_dept varchar(30) NOT NULL,
	prod_price DECIMAL(10.2) NOT NULL,
	prod_stock INT NOT NULL,
	PRIMARY KEY(prod_id)
	);



-- Inserted a set of records into the table

INSERT INTO actors (name, coolness_points, attitude) VALUES ("Jerry", 90, "relaxed");
INSERT INTO actors (name, coolness_points, attitude) VALUES ("Elaine", 80, "righteous");
INSERT INTO actors (name, coolness_points, attitude) VALUES ("Kramer", 20, "doofus");
INSERT INTO actors (name, coolness_points, attitude) VALUES ("George", 70, "selfish");

use seinfeld_db;
select * from actors;