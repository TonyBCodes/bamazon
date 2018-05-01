// load inquirer NPM package
var inquirer = require("inquirer");
var mysql = require("mysql");

var bam_database = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "myproject",
    password: "My-Project!123",
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
            console.log("Product ID" + "\t" + "Product Name" + "\t" + "Product Department" + "\t" + "Price" + "\t" + "Quant In Stock");
            console.log("--------------------------------------------------------------------------------");
            for (var i = 0; i < res.length; i++) {
                console.log(res[i].prod_id + "\t" + res[i].prod_name + "\t" + res[i].prod_dept + "\t" + res[i].prod_price + "\t" + res[i].prod_stock);
            }
        };
    });
};

function show_low_inv() {
    bam_database.query("SELECT * FROM bam_prods WHERE prod_stock < 5", function (err, res) {
        if (err) {
            throw err;
            console.log("Error with DB");
        }
        else {
            console.log("Product ID" + "\t" + "Product Name" + "\t" + "Product Department" + "\t" + "Price" + "\t" + "Quant In Stock");
            console.log("--------------------------------------------------------------------------------");
            for (var i = 0; i < res.length; i++) {
                console.log(res[i].prod_id + "\t" + res[i].prod_name + "\t" + res[i].prod_dept + "\t" + res[i].prod_price + "\t" + res[i].prod_stock);
            }
        };
    });
};

function add_to_inv() {

    inquirer.prompt([
        {
            name: "product_num",
            type: "input",
            message: "What product would you like to replenish?  Please enter the ID#."
        },
        {
            name: "amount",
            type: "input",
            message: "Please enter the quantity you would like to add.",
            validate: function (quant) {
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

        var instock = 0;
        answer.prod_num = parseInt(answer.prod_num);
        bam_database.query("SELECT * FROM bam_prods WHERE prod_id = ?",[answer.product_num], function (err, res) {
            if (err) throw err;
            instock = res.prod_stock + parseInt(answer.amount);
        };

        bam_database.query("UPDATE bam_prods SET prod_stock = ? WHERE prod_id = ?", [instock, answer.product_num], function (err, res) {
            if (err) throw err;
            console.log("The quantity of " + res.prod_name + " is now " + res.prod_stock);
        };

    });
};

function add_new_prod() {
    var depts;
    bam_database.query("SELECT * FROM bam_prods", function (err, res) {
        if (err) {
            throw err;
            console.log("Error with DB");
        }
        else {

            for (var i = 0; i < res.length; i++) {
                depts[i] = res[i].prod_dept;
            }
        };
    });

    Console.log("Create new products")
    inquirer.prompt([
        {
            name: "new_prod_name",
            type: "input",
            message: "Enter the name of the product you would like to add."
        },
        {
            name: "new_prod_quant",
            type: "input",
            message: "Enter the quantity of the initial stock.",
            validate: function (quant) {
                if (Number.isInteger(quant) && (quant > 0)) {
                    return true;
                }
                else {
                    console.log("The quantity to buy must be a positive whole number.")
                    setTimeout(function () { return false; }, 3000);
                }
            }
        },
        {
            name: "new_prod_dept",
            type: "list",
            message: "Enter the name of the department to which the product belongs.  Use supervisor view to create a new department.",
            choices: depts
        }
        {
            name: "new_prod_price",
            type: "input",
            message: "Enter the sales price of the new product. Use numbers and decimal, dollars and cents (d.cc) format. DO NOT use the dollar sign ($).",
            validate: function (sale_price) {
                if (Number(sale_price) === NaN || Number(sale_price) <= 0) {
                    console.log("The price must be a positive numeric value with a decimal point.")
                    setTimeout(function () { return false; }, 3000);
                    return false;
                }
                else {
                    return true;
                }
            }
        }
    ]).then(function (answer) {

        bam_database.query("INSERT INTO bam_prods (prod_name, prod_dept, prod_price, prod_stock) VALUES (?)", [[answer.new_prod_name, answer.new_prod_dept, answer.new_prod_price, answer.new_prod_quant]], function (err, res) {
            if (err) {
                throw err;
                console.log("Error with DB");
            }
            else {
                console.log("Product Added");
            };
        });

    });

};


//View Products for Sale
//View Low Inventory
//Add to Inventory
//Add New Product

function sup_menu() {
    inquirer.prompt([

        {
            type: "list",
            name: "supervisor_menu",
            message: "Select what you want to do:",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
        }

        // After the prompt, store the user's response in a variable called location.
    ]).then(function (choice) {

        if (choice.supervisor_menu !== "Exit") {

            switch (choice.supervisor_menu) {
                case "View Products for Sale": {
                    show_products();
                    console.log("products for sale");
                    break;
                }
                case "View Low Inventory": {
                    show_low_inv();
                    console.log("purchase a product");
                    break;
                }
                case "Add to Inventory": {
                    add_to_inv();
                    console.log("purchase a product");
                    break;
                }
                case "Add New Product": {
                    add_new_prod();
                    console.log("purchase a product");
                    break;
                }
            }

            console.log("Running supervisor menu again");
            sup_menu();
        }
        else {
            console.log("Ending - Goodbye")
        }

    }
    )};

sup_menu();