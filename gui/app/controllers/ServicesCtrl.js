app.controller("ServicesCtrl", ["$scope", "$http", function ($scope, $http) {
    $scope.services = [
        {
            name: "Panic Service",
            actions: [
                "BOOL_RECEIVE",
                "BOOL_PRODUCE",
                "TEXT_PRODUCE"
            ]
        },
        {
            name: "SMS Service",
            actions: [
                "TEXT_RECEIVE",
            ]
        },
        {
            name: "Slack",
            actions: [
                "TEXT_RECEIVE",
            ]
        }
    ];
}]);