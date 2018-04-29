// load inquirer NPM package
var inquirer = require("inquirer");
var mysql = require("mysql");



var bam_database = mysql.createConnection({
    host: "127.0.0.1:3306",
    port: 3306,
    user: "root",
    password: "09Les19AntCWH2014",
    database: "bamazon_db"
});

console.log(bam_database);

//CREATE TABLE bam_prods(
//    prod_id INT AUTO_INCREMENT NOT NULL,
//    prod_name varchar(30) NOT NULL,
//    prod_dept varchar(30) NOT NULL,
//    prod_price DECIMAL(10.2) NOT NULL,
//    prod_stock INT NOT NULL,
//    PRIMARY KEY(prod_id)
//);

function show_products() {
    bam_database.query("SELECT * FROM bam_prods", function (err, res) {
        if (err) {
            throw err;
        }
        else {
            for (var i = 0; i < res.length; i++) {
                console.log("Product ID #: " + res[i].prod_id + "\t| Name: " + res[i].prod_name + "\t| Price: $" + res[i].prod_price);
            }
        };
    });
};

function cust_menu() {
    inquirer.prompt([

        {
            type: "list",
            name: "customer_menu",
            message: "Select what you want to do:",
            choices: ["See Products For Sale", "Purchase a Product", "Exit"]
        }

        // After the prompt, store the user's response in a variable called location.
    ]).then(function (choice) {

        if (choice.customer_menu !== "Exit") {

            switch (choice.customer_menu) {
                case "See Products For Sale": {
                    console.log("products for sale");
                    break;
                }
                case "Purchase a Product": {
                    console.log("purchase a product");
                    break;
                }
            }

            console.log("Running customer menu again");
            cust_menu();
        }
        else {
            console.log("Ending - Goodbye")
        }

    }
    )};


cust_menu();