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
// page for logout link 
router.get('/',function(objReq, objResMain)  {
  // Login Get Request
  //if(objReq.headers.referer.toLowerCase().indexOf("iskcon.elvanto.net")>-1)
  //{
      if(objReq.session.userId!= null && objReq.session.userId!=undefined && objReq.session.userId!="")
    {
        objReq.session.userId='';
        delete objReq.session.userId;
	    objReq.session.save();			
    }
    //objResMain.redirect('http://fanthespark.silverstone.io/login?logout=1');    
     var jsonUser={success:1};
          objResMain.send(jsonUser);
  //} 
  
    });
module.exports = router;


