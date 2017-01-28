app.controller("DevicesCtrl", ["$scope", "$http", function ($scope, $http) {
    $scope.devices = [
        {
            name: "Panic Button",
            id: "ABA2a32234acedfe3323232323",
            actions: [
                 "BOOL_OUT",
            ]
        },
        {
            name: "Alarm",
            id: "CDEEDEDEFACDE2a32234acedfe3323232323",
            actions: [
                 "BOOL_IN",
            ]
        },

    ];

    $scope.newDevice = {};

    $scope.addDevice = function (device) {
        if (device.actionList) {
            var actions = device.actionList.split(",");
            actions = actions.map(function (d) {
                return d.trim();
            });

            device.actions = actions;
        }

        $scope.devices.push(device);
        $scope.newDevice = {};
    };
}]);