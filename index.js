var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;
         console.log('process.env.PORT', process.env.PORT)
var request = require('request');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var cors = require('cors')
app.use(cors())

app.listen(port);

var baseURL = 'https://api.elvanto.com';
var AuthHeader = 'Basic NWhHY0hwUlFXak1Mek4wOGpabG5XWEVlazNqd0lIbXo6';

app.post("/url", function (req, res, next) {
    var postData = req.body;
    var postheaders = {
        'Authorization': AuthHeader
    };
    request({
        url: baseURL + "/v1/groups/getAll.json",
        method: "GET",
        headers: postheaders,
        json: true,
        body: postData
    }, function (error, response, body) {
        console.log(response.body);
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(res.statusCode);
        res.write(JSON.stringify(response.body));
        res.end();
    });
});

console.log('todo list RESTful API server started on: ' + port);


/**
 /*var postheaders = {
        'Content-Type' : 'application/json',
        'Authorization' : 'Basic NWhHY0hwUlFXak1Mek4wOGpabG5XWEVlazNqd0lIbXo6'
    };

 var options = {
        host: baseURL,
        port: 80,
        path: '/v1/groups/getAll.json',
        header: postheaders,
        method: 'POST'
    };
 console.log(options)
 http.request(options, function (res) {
        /!*console.log(res)*!/
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
            response = chunk;
        });
    }, function (error) {
        console.log(error)
    }).end();
 */