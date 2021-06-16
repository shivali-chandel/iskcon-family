var express = require('express')
var router = express.Router()
 var bodyParser= require("body-parser");
var session= require("express-session");
var nocache = require('nocache')
var morgan= require('morgan');  
var querystring = require('querystring');
var https= require('http');
var Cryptr = require('cryptr');
var request = require("https");
var objDate=require('date-and-time');

// var strAPIKey="F8cvT2Y1hHYbbXOOAWtijc1PWPBbe8Be";
// var strAPIHostName="api.elvanto.com";

// API Call using API Key to Register Users
router.post("/",function(objReq,objResMain)  {
 
  objResMain.header('Access-Control-Allow-Origin', objReq.headers.origin);
  objResMain.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  objResMain.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  objResMain.header('Access-Control-Allow-Credentials', 'true');
 
  var strFirstName=objReq.body.firstname;
    var strLastName=objReq.body.lastname;
    var strEmail=objReq.body.email;
    var strPhone=objReq.body.phone;
    var strMobile=objReq.body.mobile;
    strUserName=objReq.body.username;
    strPassword=objReq.body.password;

  const postData = querystring.stringify({
    'firstname': strFirstName, 
     'lastname': strLastName,
     'email':strEmail,
     'phone':strPhone,
     'mobile':strMobile,
     'username':strUserName,
     'password':strPassword,
     "fields": {
        "access_permissions": [
            'Members'
        ]}
  });
  const options = {
    "method": "POST",
    "hostname": strAPIHostName,
    "path": "/v1/people/create.json",
    "headers": {
      "username": strAPIKey,
      "password": "x",
      "Authorization": strAuthorization,
      "Cache-Control": "no-cache",
       'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
  }
}; 
   var objReqApi = request.request(options, function (objResApi) {
    var strChunks = [];
  
    objResApi.on("data", function (chunk) {
      strChunks.push(chunk);
    });
  
    objResApi.on("end", function () {
      var strBody = Buffer.concat(strChunks);
	  
      var resultAPI = JSON.parse(strBody);
	  console.log(resultAPI);
      var strResult = "success";
      var jsonUser;
		
      if(resultAPI.status=="fail")
      {
        strResult=resultAPI.error.message;
        jsonUser={success:0,err:strResult};
      }
      else
      {
           var strUserCookies=strPassword+"$#$@$"+strUserName; 
			strUserCookies=cryptr.encrypt(strUserCookies);													
			jsonUser={success:1,cok:strUserCookies};

      }
     
      objResMain.send(jsonUser);
      objResMain.end();
      //objResMain.end(strBody.toString());
    });
  });
  // write data to request body
  
  objReqApi.write(postData);  
  objReqApi.end();
  });
module.exports = router;
