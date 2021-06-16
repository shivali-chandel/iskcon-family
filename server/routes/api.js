const express = require('express');
const router = express.Router();
var request = require('request');
const storage = require('node-persist');

/* GET api listing. */
var baseURL = 'https://api.elvanto.com';

router.post('/', function (req, res) {
/*    res.header("Access-Control-Allow-Origin", "*"); */
    var postData = req.body;
    var postheaders = {
        'Authorization': AuthHeader
    };
    request({
        url: baseURL + "/v1/groups/getAll.json",
        method: "POST",
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

var AuthHeader = 'Basic RjhjdlQyWTFoSFliYlhPT0FXdGlqYzFQV1BCYmU4QmU6eA==';
//var AuthHeader = 'Basic NWhHY0hwUlFXak1Mek4wOGpabG5XWEVlazNqd0lIbXo6';

module.exports = router;