
var express = require('express');
var router = express.Router();
var config = require("./config");

var blockchain = require("../lib/blockchain");

/* GET home page. */

router.get('/remove/:id', function (req, res) {
    var args = {
        deviceID: req.params.id,
        serviceAddress: config.serviceAddress,
        personAddress: config.personAddress,
        action: "TEXT"
    };

    blockchain.removeConsumer(args, function (err) {
        if (err) {
            console.error(err);
            return res.status(501).end();
        }
        res.status(200).end();
    } );
});

router.get('/add/:id', function (req, res) {
    var args = {
        deviceID: req.params.id,
        serviceAddress: config.serviceAddress,
        personAddress: config.personAddress,
        action: "TEXT"
    };

    blockchain.addConsumer(args, function (err) {
        if (err) {
            console.error(err);
            return res.status(501).end();
        }
        res.status(200).end();
    } );
});

router.get('/list', function (req, res) {
    var devices = [{
        name: "Slack Service",
        id: config.slackService,
        actions: ["TEXT_CONSUMER"]
    },{
        name: "SMS Service",
        id: config.smsService,
        actions: ["TEXT_CONSUMER"]
    },{
        name: "ALARM",
        id: config.alarmService,
        actions: ["BOOL_CONSUMER"]
    }];
    res.json(devices);
});

router.get('/list-services', function (req, res) {
    var devices = [{
        name: "Panic Service",
        id: config.serviceAddress,
        actions: ["TEXT_PRODUCER","BOOL_CONSUMER","BOOL_PRODUCER"]
    }];
    res.json(devices);
});

router.get("/deploy123", function (req, res) {
    blockchain.doDeploy(function (err, response) {
        if (err) {
            console.error(err);
            return res.status(501).end();
        }

        res.status(200).end();
    });
});

router.get('/', function(req, res, next) {
    res.status(200).json(config);
});
module.exports = router;
