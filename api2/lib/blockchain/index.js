var Web3 = require('web3');
var web3 = new Web3();

var WEB3_RPC =  process.env.WEB3_RPC || 'http://ac5b2c490b76111e693b00216fd30015-1818368795.eu-west-1.elb.amazonaws.com:8545';
//var WEB3_RPC =  "http://vps261196.ovh.net:8545";

var deviceContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"_actionOutput","type":"string"}],"name":"enableOutput","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_actionOutput","type":"string"}],"name":"disabelOutput","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_actionInput","type":"string"}],"name":"disabelInput","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_actionInput","type":"string"}],"name":"enableInput","outputs":[],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}]);
var personalContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"_device","type":"address"}],"name":"removeDevice","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"mapConsumers","outputs":[{"name":"device","type":"address"},{"name":"service","type":"address"},{"name":"action","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_device","type":"address"},{"name":"_service","type":"address"},{"name":"_action","type":"string"}],"name":"addConsumer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_device","type":"address"},{"name":"_service","type":"address"},{"name":"_action","type":"string"}],"name":"removeConsumer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_device","type":"address"}],"name":"addDevice","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_action","type":"string"},{"name":"_service","type":"address"}],"name":"getConsummer","outputs":[{"name":"_devices","type":"address[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"test","outputs":[{"name":"","type":"address[]"}],"payable":false,"type":"function"}]);
var serviceContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"_actionOutput","type":"string"}],"name":"enableOutput","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_actionOutput","type":"string"}],"name":"disabelOutput","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_actionInput","type":"string"}],"name":"disabelInput","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_actionInput","type":"string"}],"name":"enableInput","outputs":[],"payable":false,"type":"function"}]);

// -DEPENDENCIES
web3.setProvider(new web3.providers.HttpProvider(WEB3_RPC));
web3.eth.defaultAccount = web3.eth.accounts[0];
console.log(web3.eth.defaultAccount);

function whoOwnsDevice(args, next) {
    if (!args) {
        return next({message: "args is required."});
    }
    if (!args.deviceID) {
        return next({message: "args.deviceID is required."});
    }

    var device = deviceContract.at(args.deviceID);

    device.owner.call(function (err, value) {
        if (err) {
            return next(err);
        }

        console.log("THE OWNER WAS:", value);
        next(null, value);
    });
}

function getConsumers(args, next) {
    if (!args) {
        return next({message: "args is required."});
    }
    if (!args.action) {
        return next({message: "args.action is required."});
    }
    if (!args.owner) {
        return next({message: "args.owner is required."});
    }
    if (!args.serviceAddress) {
        return next({message: "args.serviceAddress is required."});
    }

    var person = personalContract.at(args.owner);
    var consumers = [];
    try {
        for (var i = 0; i < 999; i++) {
            var consumer = person.mapConsumers.call(i);
            if (consumer[2] == args.action && consumer[1] == args.serviceAddress) {
                consumers.push(consumer[0]);
            }
        }
    } catch(e) {
        console.log("DONE");
    }

    next(null, consumers);
}

function getAllConsumersForService(args, next) {
    if (!args) {
        return next({message: "args is required."});
    }
    if (!args.owner) {
        return next({message: "args.owner is required."});
    }
    if (!args.serviceAddress) {
        return next({message: "args.serviceAddress is required."});
    }

    var person = personalContract.at(args.owner);
    var consumers = [];
    try {
        for (var i = 0; i < 999; i++) {
            var consumer = person.mapConsumers.call(i);
            if (consumer[1] == args.serviceAddress) {
                consumers.push(consumer);
            }
        }
    } catch(e) {
        console.log("DONE");
    }

    next(null, consumers);

}

function setOwner(args, next) {
    if (!args) {
        return next({message: "args is required."});
    }
    if (!args.owner) {
        return next({message: "args.owner is required."});
    }
    if (!args.deviceID) {
        return next({message: "args.deviceID is required."});
    }

    var device = deviceContract.at(args.deviceID);

    device.setOwner.sendTransaction(args.owner, { gas: 4000000, from: web3.eth.defaultAccount }, next);
}

function removeConsumer(args, next) {
    if (!args) {
        return next({message: "args is required."});
    }
    if (!args.deviceID) {
        return next({message: "args.deviceID is required."});
    }
    if (!args.serviceAddress) {
        return next({message: "args.serviceAddress is required."});
    }
    if (!args.personAddress) {
        return next({message: "args.personAddress is required."});
    }
    if (!args.action) {
        return next({message: "args.action is required."});
    }

    console.log(args.personAddress, args.deviceID);
    var person = personalContract.at(args.personAddress);

    person.removeConsumer.sendTransaction(args.deviceID, args.serviceAddress, args.action,  { gas: 4000000, from: web3.eth.defaultAccount}, next);
}

function addConsumer(args, next) {
    if (!args) {
        return next({message: "args is required."});
    }
    if (!args.deviceID) {
        return next({message: "args.deviceID is required."});
    }
    if (!args.serviceAddress) {
        return next({message: "args.serviceAddress is required."});
    }
    if (!args.personAddress) {
        return next({message: "args.personAddress is required."});
    }
    if (!args.action) {
        return next({message: "args.action is required."});
    }

    console.log(args.personAddress, args.deviceID);
    var person = personalContract.at(args.personAddress);

    person.addConsumer.sendTransaction(args.deviceID, args.serviceAddress, args.action,  { gas: 4000000, from: web3.eth.defaultAccount}, next);
}

//var deploy = require("./deploy");

module.exports = {
    whoOwnsDevice: whoOwnsDevice,
    getConsumers: getConsumers,
    setOwner: setOwner,
    removeConsumer: removeConsumer,
    addConsumer: addConsumer,
    getAllConsumersForService: getAllConsumersForService,
  //g  doDeploy: deploy.doDeploy
};