var express = require("express");
var router = express.Router();
var nocache = require("nocache");

var Cryptr = require("cryptr");
var request = require("https");
var objDate = require("date-and-time");
router.get("/", function (objReq, objResMain) {
    // Login Get Request
    objResMain.sendFile(appRoot + "/public/newsletter.html");
  });

  module.exports = router;