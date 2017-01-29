
var express = require('express');
var router = express.Router();
var config = require("./config");
var async = require("async");
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
    },{
        name: "PANIC BUTTON",
        id: config.deviceAddress,
        actions: ["BOOL_PRODUCT"]
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

router.get("/service", function (req, res) {
    var fn = [];

    var data = {
        devices: [{
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
    },{
        name: "PANIC BUTTON",
        id: config.deviceAddress,
        actions: ["BOOL_PRODUCER"]
    }]};

    data.service = {
        name: "Panic Service",
        actions: [
            "TEXT_PRODUCER",
            "BOOL_PRODUCER",
            "BOOL_CONSUMER"
        ],
        id: config.serviceAddress
    };

    var edges = [];

    data.devices.map(function (device) {
        device.actions.map(function (action) {
            edges.push({
                data: {
                    source: device.id,
                    target: device.id + ":" + action,
                    deviceLink: true,
                }, classes: "deviceLink"
            });
        })
    });

    data.service.actions.map(function (action) {
        edges.push({
            data: {
                source: data.service.id,
                target: data.service.id + ":" + action,
            }, classes: "deviceLink"
        });
    })



    var args = {
        owner: config.personAddress,
        serviceAddress: config.serviceAddress,
    };
    blockchain.getAllConsumersForService(args, function (err, response) {
        if (err) {
            return next(err);
        }
        var links = response.map(function (item) {
            if (item[0] == config.alarmService) {
                return {
                    data: {
                        source: config.serviceAddress + ":" +  "BOOL_PRODUCER",
                        target: item[0] + ":" + "BOOL_CONSUMER"
                    }
                };
            } else {
                return {
                    data: {
                        source: config.serviceAddress + ":" +  "TEXT_PRODUCER",
                        target: item[0] + ":" + "TEXT_CONSUMER"
                    }
                };
            }
        });
        links.push({
            data: {
                source: config.deviceAddress + ":" + "BOOL_PRODUCER",
                target: config.serviceAddress +":" + "BOOL_CONSUMER"
            }
        });

        data.edges = edges.concat(links);
        res.json(data);
    });

});


router.get('/', function(req, res, next) {
    res.status(200).json(config);
});
module.exports = router;
