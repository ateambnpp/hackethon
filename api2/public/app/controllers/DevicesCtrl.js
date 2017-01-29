app.controller("DevicesCtrl", ["$scope", "$http", function ($scope, $http) {
    $http.get("/api/device/list")
        .then(function (data) {
            console.log(data);
            $scope.devices = data.data;
        },function (err) {
            console.log(err);
        });


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