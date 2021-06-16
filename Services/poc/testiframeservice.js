var express = require('express')
var router = express.Router()
var morgan= require('morgan');  
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


//Iframe page for the Check Session. 
router.get('/',function(objReq, objResMain)  {
  // Check Session exist or not and based on it display message. 
  if( objReq.session.loggedUser != undefined && objReq.session.loggedUser!=="")
    {
		console.log(objReq.session.loggedUser);
      objResMain.write(objReq.session.loggedUser);
    //  objResMain.send(objReq.session.loggedUser);
    if(objReq.session.userId!= null && objReq.session.userId!=undefined && objReq.session.userId!="")
    {
		    const postData = querystring.stringify({
		      //'search[firstname]': 'maunish'
		      'id': objReq.session.userId
		    });
		    var options = {
		      "method": "POST",
		      "hostname": strAPIHostName,
		      "path": "/v1/people/getInfo.json",
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
        				//console.log(strBody.toString());
					var resultAPI = JSON.parse(strBody);
        			//console.log(resultAPI);
			        if(resultAPI!=null && resultAPI.status!=null && resultAPI.status=="ok"&& resultAPI.person!=null)
			        {
			         strBody= "\n FirstName:"+resultAPI.person[0].firstname+"\n LastName:"+resultAPI.person[0].lastname+"\n Email:"+resultAPI.person[0].email;
			        }
        			objResMain.end(strBody);
      			});
    		});
    		// write data to request body
    		objReqApi.write(postData);  
   			 objReqApi.end();
	}
	else
	{
		objResMain.send("sorry, did not able to connect with API.");
	}
}else
  {
    objResMain.send("No Session Set yet");
  }
    });
module.exports = router;
