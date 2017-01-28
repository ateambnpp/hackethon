var express = require('express');
var app = express();

// LOCAL
var WEB3_RPC = 'http://blockone-norsborg-rpc.tr-api-services.net:8545/';
// -DEPENDENCIES
var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(WEB3_RPC));
web3.eth.defaultAccount = web3.eth.accounts[0];

var deviceContract = [{"constant":false,"inputs":[{"name":"_actionOutput","type":"string"}],"name":"enableOutput","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_actionOutput","type":"string"}],"name":"disabelOutput","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_actionInput","type":"string"}],"name":"disabelInput","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_actionInput","type":"string"}],"name":"enableInput","outputs":[],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}]
var personalContract = [{"constant":false,"inputs":[{"name":"_device","type":"address"}],"name":"removeDevice","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_device","type":"address"},{"name":"_service","type":"address"},{"name":"_action","type":"string"}],"name":"addConsumer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_device","type":"address"},{"name":"_service","type":"address"},{"name":"_action","type":"string"}],"name":"removeConsumer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_device","type":"address"}],"name":"addDevice","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_action","type":"string"},{"name":"_service","type":"address"}],"name":"getConsummer","outputs":[{"name":"_devices","type":"address[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"test","outputs":[{"name":"","type":"address[]"}],"payable":false,"type":"function"}]
var serviceContract = [{"constant":false,"inputs":[{"name":"_actionOutput","type":"string"}],"name":"enableOutput","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_actionOutput","type":"string"}],"name":"disabelOutput","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_actionInput","type":"string"}],"name":"disabelInput","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_actionInput","type":"string"}],"name":"enableInput","outputs":[],"payable":false,"type":"function"}]

deviceInstance = deviceContract.at("0x0bf0d0764526c268c93f61e58d275a0ccfb58105")
personalInstance = personalContract.at("0x0362596aa8aba98c7161aed5080f5994d46cfbaf")
serviceInstance = serviceContract.at("0x515b272d7876687294432dc4c4f3a92984851430")

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
