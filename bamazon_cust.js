// load inquirer NPM package
var inquirer = require("inquirer");
var mysql = require("mysql");
var clear = require('clear');

var bam_database = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "myproject",
    password: "My-Project!123",
    database: "bamazon_db"
});

// console.log(bam_database);

//CREATE TABLE bam_prods(
//    prod_id INT AUTO_INCREMENT NOT NULL,
//    prod_name varchar(30) NOT NULL,
//    prod_dept varchar(30) NOT NULL,
//    prod_price DECIMAL(10.2) NOT NULL,
//    prod_stock INT NOT NULL,
//    PRIMARY KEY(prod_id)
//);

function show_products() {
    clear();
    bam_database.query("SELECT * FROM bam_prods", function (err, res) {
        if (err) {
            throw err;
            console.log("Error with DB");
            return;
        }
        else {
            for (var i = 0; i < res.length; i++) {
                console.log("Product ID #: " + res[i].prod_id + "\t| Name: " + res[i].prod_name + "\t| Price: $" + res[i].prod_price);
            }
            return;
        };
    });
};

function buy_products() {
    inquirer.prompt([
        {
            name: "product_num",
            type: "input",
            message: "What would you like to buy?  Please enter the ID#."
        },
        {
            name: "amount",
            type: "input",
            message: "Please enter the quantity you would like to buy.",
            validate: function (quant) {
                quant = parseInt(quant);
                console.log(quant);
                console.log(Number.isInteger(quant));
                console.log(quant > 0);
                if (Number.isInteger(quant) && (quant > 0)) {
                    return true;
                }
                else {
                    console.log("The quantity to buy must be a positive whole number.")
                    setTimeout(function () { return false; }, 3000);
                }
            }
        }
    ]).then(function (answer) {
        bam_database.query("SELECT * FROM bam_prods WHERE prod_id = ?", [answer.product_num], function (err, res) {
            if (err) {
                console.log("There was an error with the database.")
                setTimeout(function () { return false; }, 3000);
                throw err;
                return;
            }
            else {
                console.log(res);
                var in_stock = res[0].prod_stock;
                console.log(in_stock);
                console.log(res[0].prod_stock);

                if (res[0].prod_stock == 0) {
                    console.log("Sorry, we are sold out of " + res[0].prod_name + ".");
                    return;
                }
                else {
                    if (res[0].prod_stock >= parseInt(answer.amount)) {
                        console.log("You bought " + parseInt(answer.amount) + " of " + res[0].prod_name + ".");
                        console.log("Your bill is $ " + (parseInt(answer.amount) * res[0].prod_price));
                        in_stock -= parseInt(answer.amount);
                    }
                    if (res[0].prod_stock < parseInt(answer.amount)) {
                        console.log("You bought " + res[0].prod_stock + " of " + res[0].prod_name + ".");
                        console.log("Your bill is $ " + (res[0].prod_stock * res[0].prod_price));
                        in_stock -= res[0].prod_stock;
                    }
                    console.log(in_stock);
                    bam_database.query("UPDATE bam_prods SET prod_stock = ? WHERE prod_id = ?", [in_stock, answer.product_num], function (err, res) {
                        if (err) throw err;
                    });
                    setTimeout(function () { return; }, 3000);

                }

            }
        });

    });
}

function cust_menu() {
    clear();
    inquirer.prompt([

        {
            type: "list",
            name: "customer_menu",
            message: "Select what you want to do:",
            choices: ["See Products For Sale", "Purchase a Product", "Exit"]
        }

    ]).then(function (choice) {

        if (choice.customer_menu !== "Exit") {

            switch (choice.customer_menu) {
                case "See Products For Sale": {
                    show_products();
                    console.log("products for sale");
                    break;
                }
                case "Purchase a Product": {
                    buy_products();
                    console.log("purchase a product");
                    clear();
                    break;
                }
            }

            console.log("Running customer menu again");
            cust_menu();
        }
        else {
            console.log("Ending - Goodbye");
            return;
        }

    }
    )
};

show_products();
buy_products();
//cust_menu();