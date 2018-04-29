// load inquirer NPM package
var inquirer = require("inquirer");
var mysql = require("mysql");



var database = mysql.createConnection({
    host: "127.0.0.1:3306",
    port: 3306,
    user: "root",
    password: "09Les19AntCWH2014",
    database: "bamazon_prod"
});

console.log(database);

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

            console.log("Returning to Main Menu");
        }
    }
    )};


function menu() {
    inquirer.prompt([

        {
            type: "list",
            name: "main_menu",
            message: "Select what you want to do:",
            choices: ["Customer", "Manager", "Supervisor","Exit"]
        }

        // After the prompt, store the user's response in a variable called location.
    ]).then(function (choice) {

        if (choice.main_menu !== "Exit") {

            switch (choice.main_menu) {
                case "Customer": {
                    //console.log("customer selected");  
                    cust_menu();
                    break;
                }
                case "Manager": {
                    console.log("manager selected");
                    break;
                }
                case "Supervisor": {
                    console.log("supervisor selected");
                    break;
                }
            }

            console.log("Running again");
            menu();
        }
        else {

            console.log("Ending Bamazon");
        }
        // console.log(location.userInput);

        //// Then use the Google Geocoder to Geocode the address
        //geocoder.geocode(location.userInput, function (err, data) {

        //    console.log(JSON.stringify(data, null, 2));
        });
};


menu();