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

app.post('/api/devices/distribution', function (req, res) {
	console.log(req.body)
	var service_id = req.query.serviceid || 'no-input';
	var action = req.query.action || 'no-input';
	var person_id = req.query.personid || 'no-input';
	res.status(200).send("Test Response :" + service_id + ' ' + action + '' + person_id);
});

// Action

app.post('/api/devices/action', function (req, res) {
	  var service_id = req.query.serviceid;
		var action = req.query.action;
		var person_id = req.query.personid;
		res.status(200).send("Test Response :" + service_id + ' ' + action + '' + person_id);
});

// app.get('/api/users',function (req, res) {
// 	var device_id = req.query.deviceid;
// 	res.status(200).send("Test Response :" + device_id);
// });
//
// app.get('/api/getServices',function (req, res) {
// 	var json = JSON.stringify(['Alarms','Sms']);
// 	res.status(200).send(json);
// });

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

module.exports = server;
