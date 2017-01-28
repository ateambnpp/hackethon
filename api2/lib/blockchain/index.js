
function whoOwnsDevice(args, next) {
    if (!args) {
        return next({message: "args is required."});
    }
    if (!args.deviceID) {
        return next({message: "args.deviceID is required."});
    }


    next(null, "ASDFASDFASDFASDFASDFASDFASDFASDF");
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

    var consumerIds = [
        "ALARMID",
        "SLACKID",
        "SMSID",
    ];

    next(null, consumerIds);

}

module.exports = {
    whoOwnsDevice: whoOwnsDevice,
    getConsumers: getConsumers
};