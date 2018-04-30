// load inquirer NPM package
var inquirer = require("inquirer");
var mysql = require("mysql");

var bam_database = mysql.createConnection({
    host: "127.0.0.1",
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
            console.log("Error with DB");
        }
        else {
            for (var i = 0; i < res.length; i++) {
                console.log("Product ID #: " + res[i].prod_id + "\t| Name: " + res[i].prod_name + "\t| Price: $" + res[i].prod_price);
            }
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
                if (Number.isInteger(quant) && (quant>0)) {
                    return true;
                }
                else {
                    console.log("The quantity to buy must be a positive whole number.")
                    setTimeout(function () { return false; },3000);
                }
            }
        }
    ]).then(function (answer) {
        console.log(answer);
        bam_database.query("SELECT * FROM bam_prods WHERE prod_id = answer.product_num", function (err, res) {
            if (err) throw err;
        };

        var in_stock = res.prod_stock;

        if (res.prod_stock == 0) {
            console.log("Sorry, we are sold out of " + res.prod_name + ".");
        }
        else {

            if (res.prod_stock >= parseInt(answer.amount)) {
                console.log("You bought " + parseInt(answer.amount) + " of " + res.prod_name + ".");
                console.log("Your bill is $ " + (parseInt(answer.amount) * res.prod_price));
                in_stock -= parseInt(answer.amount);
            }

            if (res.prod_stock < parseInt(answer.amount)) {
                console.log("You bought " + res.prod_stock + " of " + res.prod_name + ".");
                console.log("Your bill is $ " + (res.prod_stock * res.prod_price));
                in_stock -= res.prod_stock;
            }

            bam_database.query("UPDATE bam_prods SET prod_stock = instock WHERE prod_id = answer.product_num", function (err, res) {
                if (err) throw err;
            }
        }
    });
}

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
                    show_products();
                    console.log("products for sale");
                    break;
                }
                case "Purchase a Product": {
                    buy_products();
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