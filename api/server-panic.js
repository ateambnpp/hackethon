var express = require('express');
var https = require('https');

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


var test = function(){

  var postData = JSON.stringify({ 'percent': 100, 'duration_ms': 2000 });

    var postOptions = {
        host: 'api-http.littlebitscloud.cc',
        port: 443,
        path: '/v2/devices/00e04c02cba4/output',
        method: 'POST',
        headers: {
            'Authorization': 'Bearer 5fc3e2e92182b4f3c10796adad5d84db3505022e0a3f0d25dfccb308f18c2304',
            'Content-Type': 'application/json'
        }
    }

    var postRequest = https.request(postOptions, function(res) {
       // res.setEncoding('utf-8');
        res.on('data', function (data) {
            console.log('Posting Result:\n');
            process.stdout.write(data);
            console.log('\n\nPOST Operation Completed');
        });
        res.on('error', function (e) {
            console.error(e);
        });
    });

    postRequest.write(postData);
    postRequest.end();
    postRequest.on('error', function (e) {
        console.error(e);
    });

}
//  API - Function

app.post('/api/alarm', function (req, res) {
  // Watch the events "Panic"
  // Call the deviceBelongTo(device_id) methods that return the user address / contract address
  ////////////
  console.log(test())
  /////////////
  //
	var action = req.query.action;
	var device_id = req.query.deviceid;
    ///

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
