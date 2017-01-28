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

//- API - Device => contract

app.get('/api/contract/address', function (req, res) {
	res.status(200).send({ "status": "OK", "data": "Helloworld" });
});

//- API - Device => Router

// Distribution

app.get('/api/service/distribution/serviceId', function (req, res) {
	res.status(200).send({ "status": "OK", "data": "Helloworld" });
});

app.get('/api/service/distribution/action', function (req, res) {
	res.status(200).send({ "status": "OK", "data": "Helloworld" });
});

app.get('/api/service/distribution/date', function (req, res) {
	res.status(200).send({ "status": "OK", "data": "Helloworld" });
});

app.get('/api/service/distribution/personId', function (req, res) {
	res.status(200).send({ "status": "OK", "data": "Helloworld" });
});

// Action

app.get('/api/service/action/deviceId', function (req, res) {
	res.status(200).send({ "status": "OK", "data": "Helloworld" });
});

app.get('/api/service/action/action', function (req, res) {
	res.status(200).send({ "status": "OK", "data": "Helloworld" });
});

app.get('/api/service/action/date', function (req, res) {
	res.status(200).send({ "status": "OK", "data": "Helloworld" });
});


// ----------------------------------- WIRE & START WEB SERVER  ------------------------
app.use('/', express.static(__dirname + '/public'));

app.use(function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

var server = app.listen(8082, function () {

	var host = server.address().address
	var port = server.address().port

	console.log("nurseAlarm listening at http://%s:%s", host, port)
})
