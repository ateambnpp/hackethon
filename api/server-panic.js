var express = require('express');
var app = express();

// LOCAL
var WEB3_RPC = 'http://127.0.0.1:8110';
// -DEPENDENCIES
var Web3 = require('web3');
var web3 = new Web3();
// web3.setProvider(new web3.providers.HttpProvider(WEB3_RPC));
// web3.eth.defaultAccount = web3.eth.accounts[0];

///-
var bodyParser = require('body-parser')
app.use(bodyParser.json());       	// to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
}));

//  API - Function

app.post('/api/panic-service/button', function (req, res) {
	var action = req.query.action;
	var device_id = req.query.deviceid;
	res.status(200).send("Test Response :" + action + '' + device_id);
});

app.post('/api/panic-service/lbadapter', function (req, res) {
	var action = req.query.action;
	var device_id = req.query.deviceid;
	res.status(200).send("Test Response :" + action + '' + device_id);
});

app.post('/api/panic-service/action', function (req, res) {
	var action = req.query.triggered;
	var device_id = req.query.deviceid;
	res.status(200).send("Test Response :" + action + '' + device_id);
});

//------------------------------------ WIRE & START WEB SERVER  ------------------------

var server = app.listen(8083, function () {

	var host = server.address().address
	var port = server.address().port

	console.log("Panic Service listening at http://%s:%s", host, port)
})

module.exports = server;
