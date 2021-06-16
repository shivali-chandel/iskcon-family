var express = require("express");
var router = express.Router();
var morgan = require("morgan");
var bodyParser = require("body-parser");
var session = require("express-session");
var nocache = require("nocache");
var morgan = require("morgan");
var querystring = require("querystring");
var https = require("http");
var Cryptr = require("cryptr");
var request = require("https");
var objDate = require("date-and-time");
const puppeteer = require("puppeteer");
// var strAPIKey="F8cvT2Y1hHYbbXOOAWtijc1PWPBbe8Be";
// var strAPIHostName="api.elvanto.com";

router.get("/", function (objReq, objResMain) {
  // Login Get Request
  objResMain.sendFile(appRoot + "/public/login.html");
});

router.post("/", function (objReq, objResMain) {
  // Login Post Request
  console.log(objReq.headers.origin);
  // Set headers to allow cross domain request and Session.
  //objResMain.header('Access-Control-Allow-Origin', objReq.headers.origin);
  // objResMain.header('Access-Control-Allow-Origin', '*');
  // objResMain.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // objResMain.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  // objResMain.header('Access-Control-Allow-Credentials', 'true');
  objResMain.header("Access-Control-Allow-Origin", objReq.headers.origin);
  objResMain.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,OPTIONS"
  );
  objResMain.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  objResMain.header("Access-Control-Allow-Credentials", "true");

  // Read Username and password
  var strUserName = objReq.body.username,
    strPassword = objReq.body.password;
  var strHostName = "";
  var strReqUserCookie = objReq.body.coki;
  var blncookieRequest = false;
  //var strHostName='';
  strHostName = objReq.body.hostname;
  //console.log(strHostName);
  if (
    strReqUserCookie != null &&
    strReqUserCookie != undefined &&
    strReqUserCookie != ""
  ) {
    strReqUserCookie = cryptr.decrypt(strReqUserCookie);
    if (strReqUserCookie.indexOf("$#$@$") > -1) {
      var arrUserData = strReqUserCookie.split("$#$@$");
      if (arrUserData.length > 1) {
        blncookieRequest = true;
        strUserName = arrUserData[1];
        strPassword = arrUserData[0];
      }
    }
  }
  var strStatusCode = "";
  //objReq.session.loggedUser="";
  // username="maunishpshah";
  // password="Maunish12!";
  var strPath = "/login";
  //var strRedirectURL="https://iskcon-build.elvanto.net";
  //console.log("before start extraction");
  if (
    strUserName == undefined ||
    strUserName == null ||
    strPassword == undefined ||
    strPassword == null ||
    strUserName.trim() == "" ||
    strPassword.trim() == ""
  ) {
    //console.log("no data");
    var jsonUser = { success: 0 };
    objResMain.send(jsonUser);
  }
  //console.log("Validate First level Data");
  // Prepare Request for Elvanto Login page to validate the user
  const postData = querystring.stringify({
    login_username: strUserName,
    login_password: strPassword,
    login_to: "member",
  });
  //console.log(postData);

  const options = {
    hostname: strHostName,
    port: 443,
    path: strPath,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded", //,
      //'Content-Length': Buffer.byteLength(postData)
    },
  };
  const reqElvanto = request.request(options, (resElvanto) => {
    console.log('res is', resElvanto.statusCode)
   // console.log(`STATUS: ${resElvanto.statusCode}`);
    strStatusCode = resElvanto.statusCode;
    resElvanto.setEncoding("utf8");
    // console.log(`HEADERS: ${JSON.stringify(resElvanto.headers)}`);
    if (strStatusCode == "302") {
      objReq.session.loggedUser = strUserName;
      objReq.session.hostname = strHostName;

      objReq.session.save(); // This saves the modifications
      retriveUserDetail(strUserName, objReq);
      //console.log(resElvanto.headers['set-cookie']);
      //var objCookies=resElvanto.headers['set-cookie'];
      if (resElvanto.headers["set-cookie"] != undefined) {
        var strCookies = JSON.stringify(resElvanto.headers["set-cookie"]);
        //console.log(strCookies.indexOf(strUserName));
        //if(strCookies.indexOf(strUserName)>-1)
        //{

        var strUserCookies = strPassword + "$#$@$" + strUserName;
        strUserCookies = cryptr.encrypt(strUserCookies);
        var jsonUser = {
          success: 1,
          cok: strUserCookies,
          uname: strUserName,
          pass: strPassword,
        };

        retriveHeader(objReq, { ...jsonUser, hostname: strHostName });
        //console.log("print Report");
        objResMain.send(jsonUser);
        //}
        //else
        //{
        //objResMain.send("0");
        //}
      } else {
        var jsonUser = { success: 0 };
        objResMain.send(jsonUser);
      }
    } else {
      // Return on Fail
      var jsonUser = { success: 0 };
      objResMain.send(jsonUser);
    }
  });

  reqElvanto.on("error", (e) => {
    console.log('my error', e)
    var jsonUser = { success: 0 };
    objResMain.send(jsonUser);
    console.error(`problem with request: ${e.message}`);
  });
  // write data to request body
  reqElvanto.write(postData);
  reqElvanto.end();
});

//Function to get UserID from the API
function retriveUserDetail(username, objReq) {
  var strReturnValue = "";
  // cehcek data here
  let now = new Date();
  now = objDate.addHours(now, -1);
  var utcdate = objDate.format(now, "YYYY/MM/DD HH:mm:ss", true);
  //console.log(utcdate);

  const postData = querystring.stringify({
    //'search[firstname]': 'maunish'
    "search[last_login]": utcdate,
  });
  var options = {
    method: "POST",
    hostname: strAPIHostName,
    path: "/v1/people/search.json",
    headers: {
      username: strAPIKey,
      password: "x",
      Authorization: strAuthorization,
      "Cache-Control": "no-cache",
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(postData),
    },
  };

  var objReqApi = request.request(options, function (objResApi) {
    var strChunks = [];

    objResApi.on("data", function (chunk) {
      strChunks.push(chunk);
    });

    objResApi.on("end", function () {
      var strBody = Buffer.concat(strChunks);
      //console.log(strBody.toString());
      var resultAPI = JSON.parse(strBody.toString());
      //console.log(resultAPI);
      //console.log(resultAPI.people.person);
      if (
        resultAPI != null &&
        resultAPI.people != null &&
        resultAPI.people.person != null
      ) {
        var objUserDetail = resultAPI.people.person.filter(function (item) {
          return item["username"] === username || item["email"] === username;
        });

        if (objUserDetail != null && objUserDetail.length > 0) {
          strReturnValue = objUserDetail[0].id;
          objReq.session.userId = strReturnValue;
          objReq.session.save();
        }
      }
      //console.log(objUserDetail);
      //objResMain.end(strBody.toString());
    });
  });
  // write data to request body
  objReqApi.write(postData);
  objReqApi.end();
} // Server Start to listen request

// Added By Vineet
retriveHeader = async (objReq, userData) => {
  console.log("I am here to retrive header");
  console.log(userData);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setRequestInterception(true);
  page.on("request", (interceptedRequest) => {
    var data = {
      method: "POST",
      postData: `login_username=${userData.uname}&login_password=${userData.pass}&hostname=${userData.hostname}`,
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
  objReq.session.headerData = data;
  objReq.session.save();
};
module.exports = router;
