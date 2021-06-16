const express = require("express");
const bodyParser = require("body-parser");
var morgan = require("morgan");
var session = require("express-session");
var compression = require("compression");
var nocache = require("nocache");
/*var morgan= require('morgan');*/
var querystring = require("querystring");
var Cryptr = require("cryptr");
var request = require("https");
var axios = require("axios");
const cors = require("cors");
// initiate App with express module.
var app = express();
//app.set('port',9055);
// set all configuration related to url enconding and Create server to serve https request.
app.use(cors());
app.use(compression());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
/*var server = https.createServer(app);*/
app.use(nocache());
/*var port = process.env.PORT || 8080;*/
const cryptr = new Cryptr("elevantoscript");
global.appRoot = __dirname;
//global.strAPIKey="F8cvT2Y1hHYbbXOOAWtijc1PWPBbe8Be";
global.strAPIKey = "5hGcHpRQWjMLzN08jZlnWXEek3jwIHmz";
global.strAPIHostName = "api.elvanto.com";
global.strAuthorization =
  "Basic RjhjdlQyWTFoSFliYlhPT0FXdGlqYzFQV1BCYmU4QmU6eA==";
global.cryptr = cryptr;
const puppeteer = require("puppeteer");
// initialize express-session to allow us track the logged-in user across sessions.

// Get dependencies
const path = require("path");
const http = require("http");
app.use(
  session({
    key: "user_sid",
    secret: "somerandonstuffsheretotest",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);

// Get our API routes
const api = require("./server/routes/api");

/*

const app = express();
*/

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, "public")));

// Iskcon Family App
app.use("/iskconfamily", express.static(path.join(__dirname, "/client/build")));
// app.use(
//   "/iskconfamily/*",
//   express.static(path.join(__dirname, "/client/build"))
// );
// End

// Display Upload Images
app.use("/uploads/", express.static(path.join(__dirname, "/uploads")));
// Set our api routes
app.use("/api", api);
app.use(require("./Services"));

// Catch all other routes and return the index file
//app.get('*', function (req, res) {
//    res.sendFile(path.join(__dirname, 'public/index.html'));
//});
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
app.get("/group-locator-builder", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
app.get("/group-map-iskcon", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
app.get("/terms-and-condition", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
app.get("/group-locator", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
app.get("assets/*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
app.get("/checkserver", function (req, res) {
  res.sendFile(path.join(__dirname, "public/checkserver.html"));
});

app.post("/get-loggedin-user-header", function (req, res) {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setRequestInterception(true);
    page.on("request", (interceptedRequest) => {
      var data = {
        method: "POST",
        postData: `login_username=${req.body.username}&login_password=${req.body.password}&hostname=${req.body.hostname}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      interceptedRequest.continue(data);
    });
    const response = await page.goto("https://iskcon.family/member/");
    let data = await page.evaluate(() => {
      let scripts = document.querySelectorAll("script");
      let all_scripts = [];
      scripts.forEach((script) => {
        if (script.innerText.includes("PageData")) {
          all_scripts.push(script.innerText);
        }
      });
      return all_scripts[0].replace("var PageData = ", "").slice(0, -1);
    });
    await browser.close();
   // console.log('mydatata bekar sa', data)
    res.send(data);
  })();
});
/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || "8080";
console.log('portt', port)
app.set("port", port);

app.listen(port, function () {
  console.log(`App started on port ${port}`);
});
/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
/*
server.listen(port, function () {
        console.log('API running on localhost:'+ port);
    }, function (err) {
    console.log(err)
    }
);*/
