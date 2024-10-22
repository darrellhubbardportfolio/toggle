const express = require("express");
const app = express();
const path = require("path");

// setup view engine as html
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

// read all express static files
app.use("/public", express.static(path.join(__dirname, "public")));

// use middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// open and connect to database
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./models.db", function (err) {
    if (err) {
        console.error(err);
    }
    console.log("Succesfully opened and connected to database!");
});

// create a model for a single toggle button;
// this application is not for multiple ones.
var toggleModel = `
    CREATE TABLE IF NOT EXISTS ToggleButton (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        isActive TEXT DEFAULT 'false' CHECK(isActive IN ('false', 'true')),
        lastUpdate DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
    )
`;

// create the first model
// var addToggleModel = "INSERT INTO ToggleButton(isActive) VALUES ('false')";

// create the model;
// comment out code to prevent recreating table or annoying repeats.
// db.run(toggleModel, function (err) {
//     if (err) {
//         console.error(err);
//     }
//     console.log("Toggle Button Model has been created.");
// });

// create the 1st model;
// comment out this code after creating a new toggle, only want one toggle with only id of 1.
// db.run(addToggleModel, function (err) {
//     if (err) {
//         console.error(err);
//     }
//     console.log("Successfully created one model.");
// });

// view model
// db.all("SELECT * FROM ToggleButton", [], function (err, row) {
//     if (err) {
//         console.error(err);
//     }
//     console.log(row);
// });

// Home route
app.get("/", function (req, res) {
    res.render("index");
});

// get toggle button status at this API route
app.get("/api/toggle", function (req, res) {

    let query = "SELECT * FROM ToggleButton";

    // get data from database
    db.get(query, function (err, row) {
        if (err) {
            console.error(err);
        }
        res.send(row);
    });
});

// when a user wants to update their toggle status
app.post("/api/toggle/:id/update", function (req, res) {

    let { id } = req.params;

    let { model, key, value } = req.body;

    let query = "UPDATE " + model + " SET " +  key + " = ?, lastUpdate = CURRENT_TIMESTAMP WHERE id = ?";

    // check data
    console.log(req.body);
    // console.log(req.params);

    db.run(query, [ value, id ], function (err) {
        if (err) {
            console.error(err);
        }
        console.log("update complete!");
    });
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log("Server is listening on port " + port);
});