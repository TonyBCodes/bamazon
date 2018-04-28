// load inquirer NPM package
var inquirer = require("inquirer");

var choice;

// Prompt the user to provide location information.

function menu() {
    inquirer.prompt([

        {
            type: "input",
            name: "userInput",
            message: "Enter x to exit."
        }

        // After the prompt, store the user's response in a variable called location.
    ]).then(function (location) {

        if (location.userInput !== "x") {
            console.log("Running again");
            menu();
        }
        else {
            console.log("Ending");
        }
        // console.log(location.userInput);

        //// Then use the Google Geocoder to Geocode the address
        //geocoder.geocode(location.userInput, function (err, data) {

        //    console.log(JSON.stringify(data, null, 2));
        });

};


menu();