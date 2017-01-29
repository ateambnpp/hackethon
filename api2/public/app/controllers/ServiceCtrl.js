app.controller("ServiceCtrl", ["$scope", "$http", function ($scope, $http) {
    $scope.service = {actions: []};
    $scope.devices = [];
    $scope.edges = [];
    $scope.smsService = {};
    $scope.slackService = {};
    $scope.alarmService = {};
    function load() {
        $http.get("/api/device/service")
            .then(function (data) {
                console.log(JSON.stringify(data.data));
                $scope.data = data.data;
                for (var i = 0; i < $scope.data.devices.length; i++) {
                    var device = $scope.data.devices[i];
                    if (device.name == "SMS Service") {
                        $scope.smsService = device;
                    }
                    if (device.name == "Slack Service") {
                        $scope.slackService = device;
                    }
                    if (device.name == "ALARM") {
                        $scope.alarmService = device;
                    }
                }
            }, function (error) {
                console.log(error);
            });
    }

    $scope.removeLink = function (id) {
        if (!id.address) {
            return;
        }

        var parts = id.address.split(":");
        var action = "TEXT";
        if (parts.length > 1) {
            action = parts[1] === "BOOL_CONSUMER" ? "BOOL" : "TEXT";
        }
        var address = parts[0];
        $http.get("/api/device/remove/" + address + "/" + action)
            .then(function () {
                setTimeout(load, 5000);
            }, function (err) {
                console.log(err);
            });
    };

    $scope.addSMSService = function () {
        $http.get("/api/device/add/" + $scope.smsService.id + "/TEXT")
            .then(function () {
                setTimeout(load, 5000);
            });
    };

    $scope.linkSlack = function () {
        $http.get("/api/device/add/" + $scope.slackService.id + "/TEXT")
            .then(function () {
                setTimeout(load, 5000);
            });
    };

    $scope.linkAlarm = function () {
        $http.get("/api/device/add/" + $scope.alarmService.id + "/BOOL")
            .then(function () {
                setTimeout(load, 5000);
            });
    };

    $scope.reload = function () {
        load();
    };

    load();

}]);
