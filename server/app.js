const express = require("express");
const bodyParser = require("body-parser");
// const mysql = require("mysql");
const path = require("path");
const app = express();

// ========== SET MIDDLEWARE ========== //

var cors = require("cors");
// var corsOptions = {
//   origin: "http://192.168.100.9:3000/",
//   //   origin: "http://localhost:3000/",
//   allowedHeaders: ["Content-Type"],
//   origin: "*",
//   preflightContinue: true,

//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
app.use(cors());
app.use(bodyParser.json());

// ========== SERVE REACT APPLICATION ========== //
/*
    When using BrowserRouter inside of the react application, we must have a catch-all
    endpoint that allows the application to work without a hash in the url. For this reason,
    we need to comment-out the app.use(), and start using the app.get() below.
*/

app.use(express.static(__dirname + "/../build")); // comment out when using browser history

// ========== DECORATORS ========== //
/*
    The decorators function comes from /decorators/index.js, which automatically imports all of
    our decorator files. Each decorator file contains server-side routes for various pieces of
    functionality.
*/
require("./decorators/index")(app);
require("dotenv").config();

app.set("views", __dirname + "/views"); // set express to look in this folder to render our view
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, "public"))); // configure express to use public folder

module.exports = app;
