var Web3 = require('web3');
var web3 = new Web3();

var WEB3_RPC =  process.env.WEB3_RPC || 'http://ac5b2c490b76111e693b00216fd30015-1818368795.eu-west-1.elb.amazonaws.com:8545/';

var DEVICE_CONTRACT = process.env.DEVICE_CONTRACT || "0x0bf0d0764526c268c93f61e58d275a0ccfb58105";
var PERSONAL_CONTRACT = process.env.PERSONAL_CONTRACT || "0x0362596aa8aba98c7161aed5080f5994d46cfbaf";
var SERVICE_CONTRACT = process.env.SERVICE_CONTRACT || "0x515b272d7876687294432dc4c4f3a92984851430";

var deviceContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"_actionOutput","type":"string"}],"name":"enableOutput","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_actionOutput","type":"string"}],"name":"disabelOutput","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_actionInput","type":"string"}],"name":"disabelInput","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_actionInput","type":"string"}],"name":"enableInput","outputs":[],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}]);
var personalContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"_device","type":"address"}],"name":"removeDevice","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_device","type":"address"},{"name":"_service","type":"address"},{"name":"_action","type":"string"}],"name":"addConsumer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_device","type":"address"},{"name":"_service","type":"address"},{"name":"_action","type":"string"}],"name":"removeConsumer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_device","type":"address"}],"name":"addDevice","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_action","type":"string"},{"name":"_service","type":"address"}],"name":"getConsummer","outputs":[{"name":"_devices","type":"address[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"test","outputs":[{"name":"","type":"address[]"}],"payable":false,"type":"function"}]);
var serviceContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"_actionOutput","type":"string"}],"name":"enableOutput","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_actionOutput","type":"string"}],"name":"disabelOutput","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_actionInput","type":"string"}],"name":"disabelInput","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_actionInput","type":"string"}],"name":"enableInput","outputs":[],"payable":false,"type":"function"}]);

deviceInstance = deviceContract.at(DEVICE_CONTRACT);
personalInstance = personalContract.at(PERSONAL_CONTRACT);
serviceInstance = serviceContract.at(SERVICE_CONTRACT);

// -DEPENDENCIES
web3.setProvider(new web3.providers.HttpProvider(WEB3_RPC));
web3.eth.defaultAccount = web3.eth.accounts[0];
console.log(web3.eth.defaultAccount);

deviceInstance.owner.call(function (err, value) {
    console.log(value);
});

/*
personalInstance.addConsumer.sendTransaction("0x0362596aa8aba98c7161aed5080f5994d46cfbaf","0x0362596aa8aba98c7161aed5080f5994d46cfbaf", "TEXT", {
    gas: 4000000,
    from: web3.eth.defaultAccount
});
*/

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
    person.getConsummer.call(args.action, args.serviceAddress, function (err, consumers) {
        if (err) {
            return next(err);
        }

        next(null, consumers);
    });
}

module.exports = {
    whoOwnsDevice: whoOwnsDevice,
    getConsumers: getConsumers
};