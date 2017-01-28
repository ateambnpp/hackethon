var express = require('express');
var blockchain = require("../lib/blockchain");
var router = express.Router();

var https = require("https");

var SMS_SERVICEID = "SMSID";
var SLACK_SERVICEID = "SLACKID";
var ALARM_ID = "ALARMID";

router.post("/action", function (req, res, next)  {
    var device_id = "Hardcoded ID";

    raiseAlarm(device_id);

    return res.status(200).send("OK");
});
router.get("/action", function (req, res, next)  {
    var device_id = "Hardcoded ID";

    raiseAlarm(device_id);

    return res.status(200).send("OK");
});

function raiseAlarm(deviceId, next) {
    blockchain.whoOwnsDevice({deviceID: deviceId}, function (err, owner) {
        if (err) {
            return next(err);
        }
        var args = {
            owner: owner,
            action: "BOOL"
        };
        blockchain.getConsumers(args, function (err, devices) {
            if (err) {
                console.error(err);
                return;
            }
            if (devices.indexOf(ALARM_ID) > -1) {
                soundAlarm();
            }
        });

        args.action = "TEXT";
        blockchain.getConsumers(args, function (err, devices) {
            if (err) {
                console.error(err);
                return;
            }
            if (devices.indexOf(SMS_SERVICEID) > -1) {
                sendSMS();
            }
            if (devices.indexOf(SLACK_SERVICEID) > -1) {
                sendSlack();
            }
        });
    });
}

function soundAlarm() {
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
    };

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

function sendSlack() {

}

function sendSMS() {

}

module.exports = router;
